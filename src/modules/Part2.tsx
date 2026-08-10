import { useState } from "react";
import { bankFronts, regulatoryPush, instrumentTiers, criteria, fiveSources, sans, serif } from "@/content/data";
import { ModuleHeader, Section, KeyBox, TrainerNote } from "@/components/shared";
import { CountryPanel, useCountry } from "@/country/CountryContext";
import type { CountryInstrument } from "@/country/CountryContext";

// ---- Bank Decision Simulator --------------------------------------------
// Economics recovered from the deployed build: return on capital =
// (margin − admin − provisions) / capital-requirement, threshold 8%.
function Slider({ label, hint, value, set, min, max, step, unit }: {
  label: string; hint?: string; value: number; set: (n: number) => void;
  min: number; max: number; step: number; unit: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between mb-1">
        <label className="text-sm font-semibold" style={sans}>
          {label} {hint && <span className="font-normal text-xs text-stone-500">{hint}</span>}
        </label>
        <span className="text-sm tabular-nums">{unit === "€" ? `€${value.toLocaleString()}` : `${value.toFixed(1)}${unit}`}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => set(Number(e.target.value))} className="w-full accent-amber-600" />
    </div>
  );
}

export function BankSimulator() {
  const [loan, setLoan] = useState(40000);
  const [margin, setMargin] = useState(1);
  const [admin, setAdmin] = useState(2);
  const [provision, setProvision] = useState(3);
  const [capReq, setCapReq] = useState(8);
  const income = (margin / 100) * loan;
  const costs = (admin / 100) * loan + (provision / 100) * loan;
  const net = income - costs;
  const capital = (capReq / 100) * loan;
  const roc = capital > 0 ? (net / capital) * 100 : 0;
  const verdict = roc > 8
    ? { cls: "bg-emerald-50 border-emerald-300 text-emerald-800", msg: `Return on capital: ${roc.toFixed(1)}% — above the 8% threshold. The bank approves this business line.` }
    : roc > 0
    ? { cls: "bg-amber-50 border-amber-200 text-amber-800", msg: `Return on capital: ${roc.toFixed(1)}% — positive but below the 8% threshold. The bank hesitates: the loan is not attractive enough to build a business line around.` }
    : { cls: "bg-red-50 border-red-300 text-red-800", msg: `Return on capital: ${roc.toFixed(1)}% — the bank loses money on every loan. It will not lend.` };
  return (
    <div className="border border-stone-300 rounded-lg p-6 bg-white mb-10">
      <h3 className="text-xl font-semibold mb-1" style={sans}>Bank Decision Simulator</h3>
      <p className="text-sm text-stone-500 mb-5">
        Adjust the sliders to see how different factors affect whether a bank will approve a renovation loan.
        The target is a return on capital above 8% — the threshold most banks need to justify the business line.
      </p>
      <Slider label="Loan amount" value={loan} set={setLoan} min={10000} max={100000} step={5000} unit="€" />
      <Slider label="Interest margin (bank's spread)" value={margin} set={setMargin} min={0.5} max={3} step={0.1} unit="%" />
      <Slider label="Administrative cost (% of loan)" value={admin} set={setAdmin} min={0.5} max={4} step={0.1} unit="%" />
      <Slider label="Loan loss provision" hint="(0% if guarantee fund covers it)" value={provision} set={setProvision} min={0} max={5} step={0.1} unit="%" />
      <Slider label="Capital requirement" hint="(lower if taxonomy-aligned)" value={capReq} set={setCapReq} min={2} max={12} step={1} unit="%" />
      <div className="grid sm:grid-cols-2 gap-3 text-sm mt-5 mb-4" style={sans}>
        <div className="border border-stone-200 rounded p-3"><div className="text-xs text-stone-500">Annual interest income</div><div className="font-semibold tabular-nums">€{income.toFixed(0)}</div></div>
        <div className="border border-stone-200 rounded p-3"><div className="text-xs text-stone-500">Annual costs (admin + provisions)</div><div className="font-semibold tabular-nums">€{costs.toFixed(0)}</div></div>
        <div className="border border-stone-200 rounded p-3"><div className="text-xs text-stone-500">Capital the bank must hold</div><div className="font-semibold tabular-nums">€{capital.toFixed(0)}</div></div>
        <div className="border border-stone-200 rounded p-3"><div className="text-xs text-stone-500">Return on capital</div><div className="font-semibold tabular-nums">{roc.toFixed(1)}%</div></div>
      </div>
      <div className={`border rounded-lg p-4 text-sm font-medium ${verdict.cls}`}>{verdict.msg}</div>
      <p className="text-xs text-stone-400 mt-4">
        This is a simplified model for training purposes. Real bank decisions involve additional factors
        including loan duration, collateral value, and the borrower's individual credit profile.
      </p>
    </div>
  );
}

export function Module3() {
  const { data } = useCountry();
  const banking = data?.banking ?? {};
  const bankingRows = [
    ["Who actually lends", banking.activeLenders],
    ["Typical terms", banking.loanTerms],
    ["Guarantee fund", banking.guaranteeFund],
    ["Taxonomy-aligned lending", banking.taxonomyLending],
    ["Biggest obstacle banks cite", banking.biggestObstacle],
  ].filter(([, v]) => v);
  return (
    <div>
      <ModuleHeader tag="Module 3 · 20 minutes" title="How Banks Actually Think"
        epigraph={'"Banks are not hostile to renovation. They are indifferent to it — because the economics don\'t yet work for them. Once you understand what the economics actually look like from the bank\'s side, you can start to see how to change the equation."'} />
      <Section title="The bank's equation">
        <p className="text-base leading-relaxed mb-4">
          A bank evaluates any business line — including renovation lending — using a single equation.
          Everything else is detail. The equation is:
        </p>
        <div className="bg-stone-800 text-stone-100 rounded-lg p-6 text-center mb-4">
          <p className="text-lg" style={serif}>
            <span className="text-amber-400 font-semibold">Bank Value</span>{" = "}
            <span className="whitespace-nowrap">(Revenue − Costs − Provisions)</span>{" / "}
            <span className="whitespace-nowrap">Capital required</span>
          </p>
          <p className="text-xs text-stone-400 mt-2">Where each term has a specific meaning for renovation lending</p>
        </div>
        <p className="text-base leading-relaxed">
          Let's break this down. Each element of the equation tells you something about why banks behave the
          way they do — and what you can do about it.
        </p>
      </Section>
      <Section>
        <div className="space-y-4">
          <div className="bg-white border border-stone-200 rounded-lg p-4">
            <h4 className="font-semibold text-stone-800 mb-2" style={sans}>Revenue: the interest margin</h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              The bank's revenue on a renovation loan comes from the difference between what it charges the
              borrower and what it pays for the money it lends. For renovation loans, this margin is typically
              around 1% — modest, but workable if costs are low. The bank may also earn commissions for setting
              up the loan.
            </p>
          </div>
          <div className="bg-white border border-stone-200 rounded-lg p-4">
            <h4 className="font-semibold text-stone-800 mb-2" style={sans}>Costs: administration and IT</h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              This is where renovation lending becomes expensive. Each loan requires assessing the borrower,
              verifying the renovation project, checking compliance with subsidy rules, and monitoring repayment.
              Bank IT systems are often old and not designed for renovation-specific workflows. Every manual
              step adds cost. <strong>The single most effective thing an advisory service can do for banks is to
              reduce these costs</strong> — by delivering verified, pre-packaged applications that the bank can
              process with minimal handling.
            </p>
          </div>
          <div className="bg-white border border-stone-200 rounded-lg p-4">
            <h4 className="font-semibold text-stone-800 mb-2" style={sans}>Provisions: the cost of expected losses</h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              Banks must set aside capital to cover expected loan losses. For renovation lending, the challenge
              is that many potential borrowers are higher-risk — elderly, low-income, or already carrying debt.
              If a <strong>guarantee fund</strong> covers part or all of the default risk, the bank's provision
              falls toward zero — and the economics of lending to previously excluded households are transformed.
            </p>
          </div>
          <div className="bg-white border border-stone-200 rounded-lg p-4">
            <h4 className="font-semibold text-stone-800 mb-2" style={sans}>Capital required: the denominator that changes everything</h4>
            <p className="text-sm text-stone-600 leading-relaxed">
              Regulators (the ECB in the eurozone) require banks to hold a certain amount of their own capital
              for every euro they lend. This <em>capital requirement</em> is typically 8% but can be reduced for
              loans that align with the EU Taxonomy for sustainable activities. A renovation loan that can be
              proven to be taxonomy-compatible may attract a lower capital requirement — which means the bank
              needs to hold less of its own money, which means the return on capital improves dramatically.{" "}
              <strong>If you halve the capital requirement, you double the bank's return.</strong> This is why
              data and proof of a project's energy performance matter so much to the financial equation.
            </p>
          </div>
        </div>
      </Section>
      <Section title="What this means in practice">
        <p className="text-base leading-relaxed mb-4">
          If you want banks to lend for renovation, you need to work on four fronts simultaneously. No single
          intervention is sufficient:
        </p>
        <div className="space-y-3">
          {bankFronts.map((f, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-lg p-4">
              <h4 className="font-semibold text-stone-800" style={sans}>{f.title}</h4>
              <p className="text-sm text-stone-600 leading-relaxed mt-1">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Exercise: The Bank Decision Simulator">
        <p className="text-base leading-relaxed mb-4">
          Use the simulator below to explore how different factors affect the bank's willingness to lend. Try
          setting the loan loss provision to 0% (simulating a guarantee fund) and see what happens. Then try
          reducing the capital requirement from 8% to 4% (simulating taxonomy alignment). Notice how these two
          changes together transform the economics.
        </p>
        <BankSimulator />
      </Section>
      <CountryPanel show={bankingRows.length > 0}>
        <dl className="text-sm space-y-2">
          {bankingRows.map(([k, v]) => (
            <div key={k as string}><dt className="font-medium text-stone-800 inline">{k}: </dt><dd className="inline text-stone-600">{v}</dd></div>
          ))}
        </dl>
      </CountryPanel>
      <Section title="The regulatory push">
        <p className="text-base leading-relaxed mb-4">
          Banks are not only being incentivised — they are being required to change. Three regulatory
          developments are reshaping the landscape across Europe:
        </p>
        <div className="space-y-4">
          {regulatoryPush.map((r, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-lg p-4">
              <h4 className="font-semibold text-stone-800 mb-1" style={sans}>{r.title}</h4>
              <p className="text-sm text-stone-600 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ---- Module 4: Assembling the Financing Plan + Going Deeper ---------------
function CountryInstrumentList({ list, tier }: { list?: CountryInstrument[]; tier: string }) {
  if (!list?.length) return null;
  return (
    <div className="mb-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 mb-1">{tier}</p>
      <ul className="space-y-1.5 text-sm text-stone-700">
        {list.map((it, i) => (
          <li key={i}>
            <span className="font-medium">{it.name}</span>
            {it.amount && <span className="text-stone-500"> · {it.amount}</span>}
            {it.note && <span className="text-stone-500"> — {it.note}</span>}
            {it.links?.[0] && <> <a className="text-indigo-600 underline decoration-indigo-300" href={it.links[0]} target="_blank" rel="noreferrer">↗</a></>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SuitabilityScorer() {
  const [name, setName] = useState("");
  const [scores, setScores] = useState<(number | null)[]>(Array(8).fill(null));
  const done = scores.filter(s => s !== null) as number[];
  const avg = done.length ? done.reduce((a, b) => a + b, 0) / done.length : null;
  return (
    <div className="border border-stone-300 rounded-lg p-5 bg-white mt-6">
      <h4 className="font-semibold mb-1" style={sans}>Exercise: assess an instrument</h4>
      <p className="text-sm text-stone-500 mb-4">
        Pick a financial instrument you know and score it against the eight OSS-suitability criteria
        (1 = poor, 5 = excellent). This replicates, in simplified form, the analytical method used in the
        EU PEERS research.
      </p>
      <label className="text-sm font-semibold block mb-1" style={sans}>Instrument name:</label>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. national renovation grant"
        className="w-full border border-stone-300 rounded px-3 py-1.5 text-sm mb-4 focus:outline-none focus:ring-1 focus:ring-amber-500" />
      <div className="space-y-3">
        {criteria.map((c, i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
            <div className="flex-1 min-w-[220px]">
              <span className="text-sm font-medium">{c.name}</span>
              <span className="text-xs text-stone-400 ml-1">({c.weight})</span>
              <p className="text-xs text-stone-500">{c.desc}</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(v => (
                <button key={v} type="button"
                  onClick={() => setScores(s => s.map((x, j) => (j === i ? v : x)))}
                  className={`w-7 h-7 rounded text-xs font-semibold border ${scores[i] === v ? "bg-amber-600 text-white border-amber-600" : "border-stone-300 hover:border-amber-400"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm font-semibold" style={sans}>
        {name || "Instrument"}: {avg === null ? "not scored" : `average ${avg.toFixed(1)} / 5 (${done.length}/8 criteria)`}
      </p>
      <p className="text-xs text-stone-400 mt-2">
        In practice, the criteria are weighted differently (upfront capital, eligibility, and energy savings
        assurance carry the most weight). This simplified exercise gives you the method.
      </p>
    </div>
  );
}

function GoingDeeper() {
  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState<number | null>(null);
  return (
    <div className="border border-stone-300 rounded-lg overflow-hidden mb-8">
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-stone-100 hover:bg-stone-200 transition-colors text-left">
        <span className="text-lg font-semibold text-stone-700" style={sans}>Going Deeper: Financing Instruments Reference</span>
        <span className="text-stone-400">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="p-4 border-t border-stone-200">
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            Across Europe, a wide range of financial instruments and support mechanisms exist for building
            renovation. Some have been operating for decades; others are being tested for the first time. The
            challenge for an advisor is not just knowing what exists, but understanding which instruments are
            genuinely suited to the work of a One-Stop Shop — and which ones look useful on paper but fail in
            practice. Research conducted within the EU PEERS project (<em>WP5 research</em>) assessed financial
            instruments against a purpose-built OSS-suitability index — measuring not just whether an instrument
            exists, but whether it actually works for delivering renovation to homeowners through an integrated
            advisory service.
          </p>
          <h4 className="font-semibold mb-2" style={sans}>Three tiers of market maturity</h4>
          <p className="text-sm text-stone-500 mb-3">
            Financial instruments can be grouped by how established they are. Each tier has strengths and blind
            spots. Click each tier to explore its instruments.
          </p>
          <div className="space-y-3 mb-6">
            {instrumentTiers.map((t, i) => (
              <div key={i} className={`border rounded-lg ${t.color}`}>
                <button type="button" onClick={() => setTier(tier === i ? null : i)}
                  className="w-full text-left p-4">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold" style={sans}>{t.level}</h5>
                    <span className="text-stone-400">{tier === i ? "−" : "+"}</span>
                  </div>
                  <p className="text-sm text-stone-600 mt-1">{t.description}</p>
                </button>
                {tier === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm mb-3"><span className="font-semibold" style={sans}>Key finding: </span>{t.keyInsight}</p>
                    <div className="space-y-3">
                      {t.instruments.map((ins, j) => (
                        <div key={j} className={`rounded-lg border border-stone-200 p-3 ${t.cardBg}`}>
                          <h6 className="font-semibold text-sm mb-1" style={sans}>{ins.name}</h6>
                          <p className="text-xs text-stone-600 mb-1"><span className="font-semibold">How it works: </span>{ins.howItWorks}</p>
                          <p className="text-xs text-stone-600 mb-1"><span className="font-semibold">Strengths: </span>{ins.strengths}</p>
                          <p className="text-xs text-stone-600"><span className="font-semibold">Limitations: </span>{ins.limitations}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <h4 className="font-semibold mb-2" style={sans}>Eight criteria for assessing instruments</h4>
          <p className="text-sm text-stone-600 leading-relaxed mb-4">
            Not all financial instruments are equally suited to One-Stop Shop work. The EU PEERS research
            developed an OSS-suitability index based on eight criteria, weighted by expert assessment. These
            criteria give you a structured way to evaluate any instrument — rather than relying on which ones
            are best known or most heavily promoted.
          </p>
          <SuitabilityScorer />
          <p className="text-sm text-stone-500 italic mt-6">
            The opacity problem is real: research confirms that private financial organisations are reluctant to
            share instrument details, and even researchers struggle to find reliable data on transaction costs
            and guarantee conditions. If you find the landscape confusing, that is not your failure — it is a
            structural feature of an immature market. Your role is to navigate this opacity on behalf of the homeowner.
          </p>
          <TrainerNote>
            This module works best as a two-part session. First, present the three maturity tiers and ask
            participants to name every financing instrument they know — then sort them into tiers together. The
            gaps become visible immediately: most participants name traditional instruments easily but struggle
            with the tested-and-growing and innovative tiers. Second, have each participant pick one instrument
            they work with and score it against the eight criteria. Comparing scores across the group reveals
            which instruments are genuinely suited to OSS work and which are merely familiar. The key message:
            familiarity is not the same as suitability. The instruments your country uses most may not be the
            ones best adapted to the challenge ahead.
          </TrainerNote>
        </div>
      )}
    </div>
  );
}

export function Module4() {
  const { data } = useCountry();
  const ins = data?.instruments;
  return (
    <div>
      <ModuleHeader tag="Module 4 · 20 minutes" title="Assembling the Financing Plan" />
      <Section title="Five sources of money">
        <p className="text-base leading-relaxed mb-5">
          Module 2 introduced six stakeholders. Now we flip the question: instead of who they are, we ask what
          each one brings financially.
        </p>
        <div className="space-y-3">
          {fiveSources.map((s, i) => (
            <div key={i} className={`border-l-4 bg-white border rounded-lg p-4 ${s.border}`}>
              <h4 className={`font-semibold mb-1 ${s.titleColor}`} style={sans}>{s.name}</h4>
              <p className="text-sm text-stone-600 mb-1">{s.brings}</p>
              {s.constraint && <p className="text-sm text-stone-600 mb-1"><span className="font-semibold">Constraint: </span>{s.constraint}</p>}
              <p className={`text-xs italic ${s.noteColor}`}>{s.note}</p>
            </div>
          ))}
        </div>
      </Section>
      <CountryPanel show={!!(ins && (ins.traditional?.length || ins.testedGrowing?.length || ins.newInnovative?.length))}>
        <CountryInstrumentList list={ins?.traditional} tier="Traditional" />
        <CountryInstrumentList list={ins?.testedGrowing} tier="Tested and growing" />
        <CountryInstrumentList list={ins?.newInnovative} tier="New and innovative" />
      </CountryPanel>
      <KeyBox title="The assembly principle">
        No single source finances a renovation. The advisory service's core skill is <em>assembling</em>{" "}
        contributions from multiple actors: state money reduces the total, bank lending covers the gap,
        guarantee mechanisms enable the bank to say yes, and owner equity anchors the commitment. The result
        must be expressible as a single monthly number the homeowner can understand.
      </KeyBox>
      <GoingDeeper />
      <TrainerNote>
        This module works best when participants fill in a country financing map themselves. The most common
        gap: guarantee mechanisms and energy company contributions. For deeper sessions, open the Instruments
        Reference above.
      </TrainerNote>
    </div>
  );
}
