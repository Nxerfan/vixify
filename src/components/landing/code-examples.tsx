"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";
import { SectionHeading } from "./features-grid";
import { cn } from "@/lib/utils";
import styles from "./code-examples.module.scss";

type TabKey = "node" | "php" | "python" | "curl";

export function CodeExamples() {
  const { t } = useLocale();
  const [tab, setTab] = useState<TabKey>("node");
  const [copied, setCopied] = useState(false);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "node", label: t("code.tab.node") },
    { key: "php", label: t("code.tab.php") },
    { key: "python", label: t("code.tab.python") },
    { key: "curl", label: t("code.tab.curl") },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPETS[tab].plain);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="docs"
      className="relative scroll-mt-20 py-20 sm:py-28"
      aria-labelledby="code-title"
    >
      <div className="container-edge">
        <SectionHeading
          kicker={t("code.kicker")}
          title={t("code.title")}
          subtitle={t("code.subtitle")}
          titleId="code-title"
        />

        <div className="mt-12">
          <div className={styles.codeblock}>
            <div className={styles.tabs} role="tablist" aria-label="Code language">
              {tabs.map((tb) => (
                <button
                  key={tb.key}
                  role="tab"
                  aria-selected={tab === tb.key}
                  onClick={() => setTab(tb.key)}
                  className={cn(styles.tab, tab === tb.key && styles.tabActive)}
                >
                  {tb.label}
                </button>
              ))}
              <button
                type="button"
                onClick={copy}
                aria-label={t("a11y.copyCode")}
                className={cn(styles.copyBtn, copied && styles.copyBtnDone)}
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={2.25} />
                ) : (
                  <Copy className="h-3.5 w-3.5" strokeWidth={2} />
                )}
                {copied ? t("code.copied") : t("code.copy")}
              </button>
            </div>

            <div role="tabpanel">
              <pre className={`${styles.pre} vixify-scroll`}>
                <code>{SNIPPETS[tab].highlighted}</code>
              </pre>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Terminal className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="text-gold">@nixify/sms</span>
            <span>· REST endpoints identical across languages</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---- snippet source (kept LTR + ASCII for code fidelity) ---- */

const NODE_PLAIN = `import { Vixify } from "@nixify/sms";

// initialize with your API key
const client = new Vixify({ apiKey: process.env.VIXIFY_KEY });

// request a one-time code
const { id } = await client.requestOtp({
  phone: "09120000000",
  brand: "Acme",
});

// verify the code the user entered
const ok = await client.verifyOtp({ id, code: "482913" });`;

const PHP_PLAIN = `<?php
require __DIR__ . "/vendor/autoload.php";

use Nixify\\Sms\\Client;

// initialize with your API key
$client = new Client(getenv("VIXIFY_KEY"));

// request a one-time code
$req = $client->requestOtp([
  "phone" => "09120000000",
  "brand" => "Acme",
]);

// verify the code the user entered
$ok = $client->verifyOtp($req["id"], "482913");`;

const PYTHON_PLAIN = `from nixify_sms import Client
import os

# initialize with your API key
client = Client(api_key=os.environ["VIXIFY_KEY"])

# request a one-time code
req = client.request_otp(
    phone="09120000000",
    brand="Acme",
)

# verify the code the user entered
ok = client.verify_otp(req["id"], "482913")`;

const CURL_PLAIN = `# request a one-time code
curl -X POST https://vixify.vercel.app/api/request-otp \\
  -H "Authorization: Bearer $VIXIFY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"phone":"09120000000","brand":"Acme"}'

# verify the code the user entered
curl -X POST https://vixify.vercel.app/api/verify-otp \\
  -H "Authorization: Bearer $VIXIFY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"id":"otp_...","code":"482913"}'`;

/* ---- highlighted JSX (manual token spans) ---- */

const NODE_JSX = (
  <>
    <span className={styles.keyword}>import</span>{" "}
    <span className={styles.punct}>{"{ "}</span>
    <span className={styles.const}>Vixify</span>
    <span className={styles.punct}>{" }"}</span>{" "}
    <span className={styles.keyword}>from</span>{" "}
    <span className={styles.string}>{"\"@nixify/sms\""}</span>;{"\n\n"}
    <span className={styles.comment}>{"// initialize with your API key"}</span>{"\n"}
    <span className={styles.keyword}>const</span>{" "}
    <span className={styles.var}>client</span> ={" "}
    <span className={styles.keyword}>new</span>{" "}
    <span className={styles.fn}>Vixify</span>
    <span className={styles.punct}>({"{"}</span> apiKey: process.
    <span className={styles.var}>env</span>.VIXIFY_KEY{" "}
    <span className={styles.punct}>{"})"}</span>;{"\n\n"}
    <span className={styles.comment}>{"// request a one-time code"}</span>{"\n"}
    <span className={styles.keyword}>const</span>{" "}
    <span className={styles.punct}>{"{"}</span> id{" "}
    <span className={styles.punct}>{"}"}</span> ={" "}
    <span className={styles.keyword}>await</span>{" "}
    <span className={styles.var}>client</span>.
    <span className={styles.fn}>requestOtp</span>
    <span className={styles.punct}>({"{"}</span>{"\n  "}
    phone: <span className={styles.string}>{"\"09120000000\""}</span>,{"\n  "}
    brand: <span className={styles.string}>{"\"Acme\""}</span>,{"\n"}
    <span className={styles.punct}>{"})"}</span>;{"\n\n"}
    <span className={styles.comment}>{"// verify the code the user entered"}</span>{"\n"}
    <span className={styles.keyword}>const</span> ok ={" "}
    <span className={styles.keyword}>await</span>{" "}
    <span className={styles.var}>client</span>.
    <span className={styles.fn}>verifyOtp</span>
    <span className={styles.punct}>({"{"}</span> id, code:{" "}
    <span className={styles.string}>{"\"482913\""}</span>{" "}
    <span className={styles.punct}>{"})"}</span>;
  </>
);

const PHP_JSX = (
  <>
    <span className={styles.tag}>{"<?php"}</span>{"\n"}
    <span className={styles.keyword}>require</span>{" "}
    <span className={styles.string}>{"__DIR__ . \"/vendor/autoload.php\""}</span>;{"\n\n"}
    <span className={styles.keyword}>use</span>{" "}
    <span className={styles.const}>Nixify\Sms\Client</span>;{"\n\n"}
    <span className={styles.comment}>{"// initialize with your API key"}</span>{"\n"}
    <span className={styles.var}>$client</span> ={" "}
    <span className={styles.keyword}>new</span>{" "}
    <span className={styles.fn}>Client</span>
    <span className={styles.fn}>(</span>
    <span className={styles.fn}>getenv</span>
    <span className={styles.punct}>(</span>
    <span className={styles.string}>{"\"VIXIFY_KEY\""}</span>
    <span className={styles.punct}>))</span>;{"\n\n"}
    <span className={styles.comment}>{"// request a one-time code"}</span>{"\n"}
    <span className={styles.var}>$req</span> ={" "}
    <span className={styles.var}>$client</span>-&gt;
    <span className={styles.fn}>requestOtp</span>
    <span className={styles.punct}>([</span>{"\n  "}
    <span className={styles.string}>{"\"phone\""}</span> =&gt;{" "}
    <span className={styles.string}>{"\"09120000000\""}</span>,{"\n  "}
    <span className={styles.string}>{"\"brand\""}</span> =&gt;{" "}
    <span className={styles.string}>{"\"Acme\""}</span>,{"\n"}
    <span className={styles.punct}>]);</span>{"\n\n"}
    <span className={styles.comment}>{"// verify the code the user entered"}</span>{"\n"}
    <span className={styles.var}>$ok</span> ={" "}
    <span className={styles.var}>$client</span>-&gt;
    <span className={styles.fn}>verifyOtp</span>
    <span className={styles.punct}>(</span>
    <span className={styles.var}>$req</span>
    <span className={styles.punct}>[</span>
    <span className={styles.string}>{"\"id\""}</span>
    <span className={styles.punct}>],</span>{" "}
    <span className={styles.string}>{"\"482913\""}</span>
    <span className={styles.punct}>);</span>
  </>
);

const PYTHON_JSX = (
  <>
    <span className={styles.keyword}>from</span>{" "}
    <span className={styles.const}>nixify_sms</span>{" "}
    <span className={styles.keyword}>import</span>{" "}
    <span className={styles.const}>Client</span>{"\n"}
    <span className={styles.keyword}>import</span> os{"\n\n"}
    <span className={styles.comment}>{"# initialize with your API key"}</span>{"\n"}
    <span className={styles.var}>client</span> ={" "}
    <span className={styles.fn}>Client</span>
    <span className={styles.punct}>(</span>api_key=os.
    <span className={styles.var}>environ</span>
    <span className={styles.punct}>[</span>
    <span className={styles.string}>{"\"VIXIFY_KEY\""}</span>
    <span className={styles.punct}>])</span>{"\n\n"}
    <span className={styles.comment}>{"# request a one-time code"}</span>{"\n"}
    <span className={styles.var}>req</span> ={" "}
    <span className={styles.var}>client</span>.
    <span className={styles.fn}>request_otp</span>
    <span className={styles.punct}>(</span>{"\n    "}
    phone=<span className={styles.string}>{"\"09120000000\""}</span>,{"\n    "}
    brand=<span className={styles.string}>{"\"Acme\""}</span>,{"\n"}
    <span className={styles.punct}>)</span>{"\n\n"}
    <span className={styles.comment}>{"# verify the code the user entered"}</span>{"\n"}
    <span className={styles.var}>ok</span> ={" "}
    <span className={styles.var}>client</span>.
    <span className={styles.fn}>verify_otp</span>
    <span className={styles.punct}>(</span>
    <span className={styles.var}>req</span>
    <span className={styles.punct}>[</span>
    <span className={styles.string}>{"\"id\""}</span>
    <span className={styles.punct}>],</span>{" "}
    <span className={styles.string}>{"\"482913\""}</span>
    <span className={styles.punct}>)</span>
  </>
);

const CURL_JSX = (
  <>
    <span className={styles.comment}>{"# request a one-time code"}</span>{"\n"}
    <span className={styles.tag}>curl</span> -X POST https://vixify.vercel.app/api/request-otp{" \\\n  "}
    -H <span className={styles.string}>{"\"Authorization: Bearer $VIXIFY_KEY\""}</span>{" \\\n  "}
    -H <span className={styles.string}>{"\"Content-Type: application/json\""}</span>{" \\\n  "}
    -d <span className={styles.string}>{"'{\"phone\":\"09120000000\",\"brand\":\"Acme\"}'"}</span>{"\n\n"}
    <span className={styles.comment}>{"# verify the code the user entered"}</span>{"\n"}
    <span className={styles.tag}>curl</span> -X POST https://vixify.vercel.app/api/verify-otp{" \\\n  "}
    -H <span className={styles.string}>{"\"Authorization: Bearer $VIXIFY_KEY\""}</span>{" \\\n  "}
    -H <span className={styles.string}>{"\"Content-Type: application/json\""}</span>{" \\\n  "}
    -d <span className={styles.string}>{"'{\"id\":\"otp_...\",\"code\":\"482913\"}'"}</span>
  </>
);

const SNIPPETS: Record<TabKey, { plain: string; highlighted: React.ReactNode }> = {
  node: { plain: NODE_PLAIN, highlighted: NODE_JSX },
  php: { plain: PHP_PLAIN, highlighted: PHP_JSX },
  python: { plain: PYTHON_PLAIN, highlighted: PYTHON_JSX },
  curl: { plain: CURL_PLAIN, highlighted: CURL_JSX },
};
