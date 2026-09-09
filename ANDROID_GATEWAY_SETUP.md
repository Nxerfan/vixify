# Android Gateway Setup Guide

> ## ⚠️ OPERATOR-ONLY DOCUMENT — READ THIS FIRST
>
> **This guide is for Vixify platform operators only.**
>
> Regular Vixify customers **do NOT need to follow this guide**, do **NOT** need
> any hardware, and do **NOT** need to configure any phones or SIM cards.
>
> Vixify is a **managed OTP service**. Customers simply integrate the API/SDK and
> pay for the OTPs they send — Vixify handles all SMS infrastructure on their
> behalf using the single operator-maintained gateway described below.
>
> If you are a developer using Vixify to send OTPs to your users, you can stop
> reading here and go to the [API documentation](#customer-facing-api-reference)
> at the bottom of this file.
>
> **If you are the Vixify operator** (the person running the Vixify platform),
> continue reading to learn how to set up and maintain the gateway phone that
> serves every Vixify customer.

---

## Overview

Vixify does not use a traditional third-party SMS provider. Instead, a **single
Android phone with an active SIM card** — maintained by the Vixify operator —
acts as the SMS gateway for **all** customers.

The flow is fully asynchronous:

1. A customer calls `POST /api/request-otp`.
2. Vixify generates a 6-digit code, persists it with status `pending`, and
   returns `200 OK` immediately. The customer's API call never blocks on carrier
   latency.
3. The operator's Android phone runs a small automation app (MacroDroid or
   Tasker) that **polls** `GET /api/v1/get-pending-sms` every 10 seconds.
4. When a pending OTP is returned, the phone **sends the SMS** to the recipient
   using its own SIM card.
5. After sending, the phone calls `POST /api/v1/confirm-sent` to update the
   OTP's status from `pending` to `sent`. Webhooks (`otp.sent`) fire at this
   point.

This model gives Vixify direct carrier delivery, zero per-message third-party
fees, and no provider lock-in — at the cost of the operator maintaining one
always-on device.

---

## Prerequisites

| Requirement | Notes |
|---|---|
| Android phone | Android 8.0 (Oreo) or newer. A dedicated, always-charging, always-online device is strongly recommended. |
| Active SIM card | Postpaid preferred to avoid running out of credit. Must support the destination countries you intend to serve. |
| Stable internet | The phone must reach the Vixify API over Wi-Fi or mobile data at all times. |
| MacroDroid **or** Tasker | Automation app to poll the API and send SMS. MacroDroid is recommended for ease of setup. |
| `GATEWAY_SECRET` | A shared secret issued by the Vixify backend. Sent in the `x-gateway-secret` header on every gateway call. |

---

## 1. Obtain the gateway secret

The gateway secret authenticates the phone to the Vixify API. It is set as the
`GATEWAY_SECRET` environment variable on the Vixify server and must match the
`x-gateway-secret` header sent by the phone.

```bash
# On the Vixify server (.env)
GATEWAY_SECRET="<a long random string>"
```

Generate a strong secret, for example:

```bash
openssl rand -hex 32
```

Store this securely. Anyone with the secret can read pending OTPs and confirm
sends — treat it like a production credential.

---

## 2. Set up the Android phone

### 2.1 Prepare the device

1. Factory-reset a dedicated phone (recommended) or use a clean device.
2. Insert the active SIM and confirm it can send SMS manually.
3. Connect to a reliable Wi-Fi network (mobile data as fallback).
4. Disable battery optimization for the automation app you choose below — this
   is critical, or Android will kill the polling loop.
5. Keep the phone plugged into power at all times.

### 2.2 Install the automation app

Install **one** of:

- **MacroDroid** (recommended) — free, simpler UI, sufficient for this task.
  - Google Play: search "MacroDroid"
  - Ad-free version optional.
- **Tasker** (paid) — more powerful, steeper learning curve.
  - Google Play: search "Tasker"

---

## 3. Configure the polling macro (MacroDroid)

Create a new macro with the following logic. The macro runs on a 10-second
timer, calls the get-pending endpoint, and—if a pending OTP exists—sends the SMS
and confirms.

### Trigger

- **Timer / Repeat**: every `10 seconds`

### Action 1 — HTTP GET pending OTP

| Field | Value |
|---|---|
| Method | `GET` |
| URL | `https://vixify.vercel.app/api/v1/get-pending-sms` |
| Header | `x-gateway-secret: <YOUR_GATEWAY_SECRET>` |
| Content type | `application/json` |
| Store response in | local variable `response` |

### Action 2 — Parse and send (Conditional)

Add a **condition**: the response body is not empty / does not equal `{"pending":null}`.

When a pending OTP exists, the response looks like:

```json
{
  "pending": {
    "id": "otp_01HZX...",
    "phone": "+989120000000",
    "code": "482913",
    "message": "Your Vixify code is 482913 — Vixify"
  }
}
```

Parse the JSON (MacroDroid's *Variable Operation → Parse JSON* or a JavaScript
fragment) and extract:

- `id` → store in `otp_id`
- `phone` → store in `target_phone`
- `message` → store in `sms_body`

### Action 3 — Send SMS

| Field | Value |
|---|---|
| Action | **Send SMS** |
| Number | `{target_phone}` |
| Message | `{sms_body}` |

> **Important:** Send the `message` field exactly as provided. Vixify constructs
> the full message server-side, including the code and any branding/signature
> enforced by the sender's plan. Do not alter the text.

### Action 4 — Confirm sent (HTTP POST)

| Field | Value |
|---|---|
| Method | `POST` |
| URL | `https://vixify.vercel.app/api/v1/confirm-sent` |
| Header | `x-gateway-secret: <YOUR_GATEWAY_SECRET>` |
| Content type | `application/json` |
| Body | `{"id":"{otp_id}"}` |

This marks the OTP as `sent` and triggers the `otp.sent` webhook to the
customer.

### Action 5 — Error handling

If the send SMS action fails (no signal, invalid number), POST to
`/api/v1/confirm-sent` with:

```json
{ "id": "{otp_id}", "status": "failed", "error": "<reason>" }
```

This records the failure so the customer's webhook (`otp.failed`) fires and the
delivery ledger reflects the true state.

---

## 4. Configure with Tasker (alternative)

If you prefer Tasker, the equivalent profile is:

1. **Profile → Time → Repeat Every**: `10` seconds.
2. **Task → Net → HTTP Request**:
   - Method: `GET`
   - URL: `https://vixify.vercel.app/api/v1/get-pending-sms`
   - Headers: `x-gateway-secret:<YOUR_GATEWAY_SECRET>`
   - Output: `%response`
3. **Task → If** `%response` doesn't contain `"pending":null`:
   - **Variable Split / JSON Read** to extract `id`, `phone`, `message`.
   - **Phone → Send SMS** to `%phone` with `%message`.
   - **Net → HTTP Request** `POST` to `/api/v1/confirm-sent` with
     `{"id":"%id"}`.
4. **Else** do nothing (no pending OTPs).
5. Set Tasker's foreground notification and disable battery optimization.

---

## 5. Health & monitoring

The gateway phone is a single point of failure for the whole platform. Monitor
it actively:

- **Uptime check:** the Vixify dashboard should expose a "last gateway poll"
  timestamp. If no poll arrives within 30 seconds, alert the operator.
- **Battery:** keep the device charging; a UPS on the charger is advisable.
- **Connectivity:** confirm Wi-Fi is stable; configure a mobile-data fallback.
- **SIM balance:** if prepaid, set a low-balance alert with your carrier.
- **Sent/failed ratio:** if the failed rate rises, the SIM may be blocked or out
  of credit — investigate immediately.
- **SMS rate limits:** carriers may throttle high-volume senders. If you
  approach carrier limits, consider load-balancing across multiple gateway
  phones (advanced, requires backend changes).

---

## 6. Security notes

- The `GATEWAY_SECRET` grants full read access to pending OTPs. Never commit it
  to git, never embed it in client-side code, and rotate it if the phone is lost
  or compromised.
- The phone should be **locked** with a PIN/biometric and stored physically
  secure.
- Restrict the gateway endpoints by IP if the phone has a static IP (optional
  defense-in-depth).
- The phone only ever **sends** SMS via the automation app — it must never be
  used as a personal device, to avoid accidental interference with the polling
  loop.

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| OTPs stay `pending` forever | Phone offline, macro killed, no internet | Check device is charging, Wi-Fi connected, MacroDroid not battery-optimized |
| OTPs marked `sent` but users don't receive | SIM out of credit, carrier blocking, wrong number format | Check SIM balance, test a manual SMS, validate E.164 format |
| `401`/`403` on gateway endpoints | Wrong or rotated `GATEWAY_SECRET` | Re-issue secret, update both server `.env` and macro header |
| Polling works but no SMS sent | MacroDroid SMS permission revoked | Re-grant SMS permission in Android settings |
| Duplicate SMS sent | Polling faster than confirm round-trip | Ensure confirm-sent runs immediately after send; do not lower poll interval below 10s |

---

## Customer-facing API reference

> The endpoints below are the **public, customer-facing** API. Customers use
> these with their own API key (Bearer auth) — they never touch the gateway
> endpoints above.

| Endpoint | Auth | Purpose |
|---|---|---|
| `POST /api/request-otp` | `Authorization: Bearer <API_KEY>` | Request a 6-digit code be sent to a phone number |
| `POST /api/verify-otp` | `Authorization: Bearer <API_KEY>` | Verify a code the user entered |
| `GET /api/usage` | `Authorization: Bearer <API_KEY>` | Fetch usage and remaining quota |

The gateway endpoints (`/api/v1/get-pending-sms`, `/api/v1/confirm-sent`) are
**internal** and require the `x-gateway-secret` header — customers never call
them.

---

*Part of the Vixify platform — a managed OTP-as-a-Service product. Customers
integrate the `@nixify/sms` SDK or REST API and pay only for the OTPs they send;
no hardware, no carrier contracts, no per-message markup.*
