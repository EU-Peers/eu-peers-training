import { useEffect, useRef, useState } from "react";
import { roleplayScenarios, conversationSteps, sans, serif } from "@/content/data";
import { ModuleHeader, Section, TrainerNote } from "@/components/shared";

function monthlyRepayment(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  if (n <= 0) return 0;
  if (annualRate === 0) return principal / n;
  const r = annualRate / 100 / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

function ScenarioCard({ s }: { s: (typeof roleplayScenarios)[number] }) {
  const [tab, setTab] = useState<"none" | "numbers" | "coach">("none");
  const loan = s.renovationCost - s.subsidies;
  const repay = monthlyRepayment(loan, s.interestRate, s.loanTerm);
  const fill = (t: string) => t.replace("{repay}", repay.toFixed(0));
  return (
    <div className="border border-stone-300 rounded-lg bg-white p-5">
      <h4 className="font-semibold mb-1" style={sans}>{s.name}</h4>
      <p className="text-sm text-stone-600 leading-relaxed mb-3">{s.situation}</p>
      <div className="mb-3">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1">The homeowner's concerns:</p>
        <ul className="text-sm text-stone-600 italic space-y-0.5">{s.concerns.map((c, i) => <li key={i}>“{c}”</li>)}</ul>
      </div>
      <div className="flex gap-2 mb-3">
        <button type="button" onClick={() => setTab(tab === "numbers" ? "none" : "numbers")}
          className={`text-xs border rounded px-3 py-1.5 ${tab === "numbers" ? "bg-stone-800 text-white border-stone-800" : "border-stone-300 hover:bg-stone-100"}`}>The numbers</button>
        <button type="button" onClick={() => setTab(tab === "coach" ? "none" : "coach")}
          className={`text-xs border rounded px-3 py-1.5 ${tab === "coach" ? "bg-stone-800 text-white border-stone-800" : "border-stone-300 hover:bg-stone-100"}`}>The conversation</button>
      </div>
      {tab === "numbers" && (
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm border border-stone-200 rounded p-3 bg-stone-50" style={sans}>
          {s.energyBill > 0 && <><dt className="text-stone-500">Current energy bill</dt><dd className="text-right tabular-nums">€{s.energyBill}/month</dd></>}
          <dt className="text-stone-500">Renovation cost</dt><dd className="text-right tabular-nums">€{s.renovationCost.toLocaleString()}</dd>
          <dt className="text-stone-500">Subsidies</dt><dd className="text-right tabular-nums">− €{s.subsidies.toLocaleString()}</dd>
          <dt className="text-stone-500">Loan needed</dt><dd className="text-right tabular-nums">€{loan.toLocaleString()}</dd>
          <dt className="text-stone-500">Loan term / rate</dt><dd className="text-right tabular-nums">{s.loanTerm} yrs · {s.interestRate}%</dd>
          <dt className="font-semibold text-stone-700">Monthly repayment</dt><dd className="text-right font-semibold tabular-nums">€{repay.toFixed(0)}</dd>
          {s.savings > 0 && <><dt className="font-semibold text-emerald-700">Monthly energy savings</dt><dd className="text-right font-semibold text-emerald-700 tabular-nums">€{s.savings}</dd></>}
        </dl>
      )}
      {tab === "coach" && (
        <div className="space-y-2 border border-stone-200 rounded p-3 bg-stone-50">
          {s.coaching.map((c, i) => (
            <p key={i} className="text-sm text-stone-700 leading-relaxed">
              <span className="font-semibold" style={sans}>{c.lead} </span>{fill(c.body)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function RolePlayTimer() {
  const [left, setLeft] = useState(180);
  const [running, setRunning] = useState(false);
  const t = useRef<number | null>(null);
  useEffect(() => {
    if (running && left > 0) {
      t.current = window.setTimeout(() => setLeft(l => l - 1), 1000);
    } else if (left === 0) setRunning(false);
    return () => { if (t.current) clearTimeout(t.current); };
  }, [running, left]);
  const mm = String(Math.floor(left / 60)).padStart(1, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <div className="bg-stone-100 rounded-lg p-6 text-center">
      <h4 className="text-lg font-semibold mb-2" style={sans}>Role-Play Timer</h4>
      <p className="text-sm text-stone-500 mb-4">Challenge: explain the financing plan to a homeowner in under 3 minutes.</p>
      <div className={`text-4xl font-mono font-bold mb-4 ${left === 0 ? "text-red-600" : "text-stone-800"}`}>{mm}:{ss}</div>
      <div className="flex justify-center gap-2">
        <button type="button" onClick={() => setRunning(r => !r)}
          className="text-sm border border-stone-400 rounded px-4 py-1.5 bg-white hover:bg-stone-50">{running ? "Pause" : left === 180 ? "Start" : "Resume"}</button>
        <button type="button" onClick={() => { setRunning(false); setLeft(180); }}
          className="text-sm border border-stone-300 rounded px-4 py-1.5 hover:bg-stone-50">Reset</button>
      </div>
      {left === 0 && <p className="text-sm text-red-600 font-semibold mt-3">Time! How far did the advisor get?</p>}
    </div>
  );
}

export function Module5() {
  return (
    <div>
      <ModuleHeader tag="Module 5 · 15 minutes" title="Building the Conversation with the Homeowner" />
      <Section title="The one-number discipline">
        <p className="text-base leading-relaxed mb-4">
          A renovation financing plan may involve subsidies, loans, tax incentives, guarantee support, and the
          homeowner's own savings. The assembly is complex. But the homeowner must not experience that
          complexity. They must experience a single, clear question:
        </p>
        <div className="bg-stone-800 text-stone-100 rounded-lg p-6 text-center mb-4">
          <p className="text-lg" style={serif}>
            How much will I pay per month, for how many years,<br />and how much will I save per month on energy?
          </p>
        </div>
        <p className="text-base leading-relaxed mb-4">
          If the monthly repayment is less than or equal to the monthly energy saving, the renovation is
          cash-flow neutral or positive from day one. The homeowner pays no more than they are already paying —
          they are simply redirecting their energy spending into their property. This is the argument that
          converts hesitation into action.
        </p>
        <p className="text-base leading-relaxed">
          If the monthly repayment is slightly higher than the energy saving, there is a modest net cost — but
          it comes with increased comfort, property value, regulatory compliance, and protection against future
          energy price increases. The advisor's job is to present both numbers honestly and let the homeowner decide.
        </p>
      </Section>
      <Section title="A structure for the conversation">
        <p className="text-base leading-relaxed mb-4">
          The conversation with a homeowner about financing should follow a clear sequence. Each step builds on
          the previous one, moving from the homeowner's situation to a concrete proposal.
        </p>
        <div className="space-y-3">
          {conversationSteps.map((s, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-stone-200 rounded-lg p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
              <div>
                <h4 className="font-semibold text-stone-800 text-sm" style={sans}>{s.title}</h4>
                <p className="text-sm text-stone-600 mt-0.5">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Exercise: Three Homeowner Scenarios">
        <p className="text-base leading-relaxed mb-4">
          Each scenario below presents a different homeowner profile. Click <em>The numbers</em> to see the
          financing calculation, and <em>The conversation</em> for suggested approaches. In a group training,
          these work well as role-play exercises: one person plays the homeowner, another plays the advisor.
        </p>
        <div className="space-y-4 mb-6">
          {roleplayScenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
        </div>
        <RolePlayTimer />
      </Section>
      <TrainerNote>
        This module is where the training becomes practical. If you only have time for one group exercise, make
        it the role-play: pair participants, assign one as advisor and one as homeowner using one of the three
        scenarios, and give them three minutes. Then debrief: what worked? What didn't? Where did the advisor
        get stuck? The most common failure point is overwhelming the homeowner with detail. Remind participants:
        the homeowner needs one number and one honest answer to their main concern. Everything else is background
        that the advisor carries in their head, not in the conversation.
      </TrainerNote>
    </div>
  );
}
