import { useState } from "react";
import { quizM1, fiveWays, stakeholders, scenariosM2, splitIncentives, moduleList, sans, serif } from "@/content/data";
import { ModuleHeader, Section, KeyBox, TrainerNote, Quiz } from "@/components/shared";
import { CountryPanel, useCountry } from "@/country/CountryContext";

export function Welcome({ go }: { go: (id: string) => void }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-widest text-amber-700 mb-3" style={sans}>Train the Trainer</p>
      <h1 className="text-4xl font-bold leading-tight mb-4 text-stone-900" style={serif}>Financing Home Renovation</h1>
      <p className="text-lg text-stone-600 leading-relaxed max-w-xl mb-10">
        A practical training for professionals who advise homeowners. Five modules, each under 20 minutes.
        No financial background required — just the willingness to understand why money is the conversation
        that stalls renovation, and how to unstall it.
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
          <h3 className="font-semibold text-emerald-800 mb-3" style={sans}>This training will help you:</h3>
          <ul className="space-y-2 text-sm text-emerald-900">
            <li>→ Understand why homeowners hesitate, and what the real obstacle is</li>
            <li>→ Explain how banks evaluate renovation loans — and what makes them say yes</li>
            <li>→ Map the financing instruments available in your country</li>
            <li>→ Have a clear, confident conversation with a homeowner about money</li>
          </ul>
        </div>
        <div className="bg-stone-100 border border-stone-200 rounded-lg p-5">
          <h3 className="font-semibold text-stone-700 mb-3" style={sans}>This training does not:</h3>
          <ul className="space-y-2 text-sm text-stone-600">
            <li>→ Require financial expertise — we build from first principles</li>
            <li>→ Focus on one country — the framework applies across Europe</li>
            <li>→ Replace professional financial advice — it equips you to guide the conversation</li>
            <li>→ Take more than 90 minutes total if you do all five modules</li>
          </ul>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4" style={sans}>Five Modules</h2>
      <div className="space-y-4 mb-8">
        {moduleList.map(m => (
          <button key={m.num} type="button" onClick={() => go(`mod${m.num}`)}
            className="w-full flex items-start gap-4 text-left border border-stone-200 rounded-lg p-4 bg-white hover:border-amber-400 transition-colors">
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">{m.num}</span>
            <span className="flex-1">
              <span className="flex items-baseline justify-between">
                <span className="font-semibold text-stone-800" style={sans}>{m.title}</span>
                <span className="text-xs text-stone-400 ml-2 flex-shrink-0">{m.time}</span>
              </span>
              <span className="block text-sm text-stone-500 mt-1">{m.desc}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg mb-8">
        <h3 className="font-semibold text-amber-800 mb-2" style={sans}>Note for Trainers</h3>
        <p className="text-sm text-amber-900 leading-relaxed">
          Each module is self-contained. You can deliver them in sequence as a half-day workshop, or pick
          individual modules for shorter sessions. Each includes an interactive exercise and a Trainer's Note
          with guidance on how to present the material to homeowners. The exercises work on screen or can be
          run as group discussions.
        </p>
      </div>
      <button type="button" onClick={() => go("mod1")}
        className="bg-stone-900 text-stone-50 rounded-md px-5 py-2.5 text-sm font-semibold hover:bg-stone-700 transition-colors" style={sans}>
        Start Module 1 →
      </button>
    </div>
  );
}

export function Module1() {
  return (
    <div>
      <ModuleHeader tag="Module 1 · 15 minutes" title="Why Renovation Is a Financial Question" />
      <Section title="The real obstacle">
        <p className="text-base leading-relaxed mb-4">
          The reasons to renovate are well understood: lower energy bills, improved comfort, regulatory
          compliance, reduced dependence on fossil fuel imports. But for a homeowner standing in their kitchen,
          none of these reasons answer the question that actually matters: <em>how will I pay for this?</em>
        </p>
        <p className="text-base leading-relaxed mb-4">
          A deep renovation — one that genuinely transforms a building's energy performance — costs roughly
          half of what it would cost to build the same property new, excluding the land. This places it in the
          same category of financial significance as the original property purchase. It is not a repair. It is
          a reinvestment.
        </p>
        <p className="text-base leading-relaxed">
          Unlike the original purchase, however, the homeowner has time to think. There is no deadline, no
          competing buyer, no urgency. And so they think, and hesitate, and defer — not because they don't want
          to renovate, but because the financial landscape is complex and no one has made it simple for them.
        </p>
      </Section>
      <Section title="Five ways renovation creates value">
        <p className="text-base leading-relaxed mb-5">
          Before discussing how to finance renovation, a trainer must be able to explain <em>why</em> it is
          financially rational. The value of renovation is not a single number — it operates across five
          dimensions, each of which matters to different homeowners at different times.
        </p>
        <div className="space-y-4">
          {fiveWays.map((w, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-lg p-4">
              <h4 className="font-semibold text-stone-800 mb-1" style={sans}>{i + 1}. {w.title}</h4>
              <p className="text-sm text-stone-600 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <KeyBox title="The key shift">
        Renovation is not a cost — it is an investment. The homeowner is not spending money they don't have;
        they are redirecting money they are already spending on energy, and protecting the value of their
        largest asset. Your role as a trainer is to help advisors make this shift visible to every homeowner
        they work with.
      </KeyBox>
      <Quiz items={quizM1} heading="Exercise: Check Your Understanding" sub="Select the best answer for each question." />
    </div>
  );
}

export function Module2() {
  const [open, setOpen] = useState<number | null>(null);
  const { data } = useCountry();
  return (
    <div>
      <ModuleHeader tag="Module 2 · 15 minutes" title="Who Pays and Why — The Stakeholder Map" />
      <p className="text-base leading-relaxed mb-8">
        A renovation project is not a transaction between two parties. It is a coordination problem involving
        at least six categories of actor, each with their own motivations, constraints, and decision logic.
        Understanding this landscape is essential before discussing any specific financing instrument — because
        the instruments only make sense when you understand who they are designed to move, and why.
      </p>
      <Section title="The six stakeholders">
        <p className="text-sm text-stone-500 mb-4">Click each stakeholder below to see their role, what drives them, and what holds them back.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {stakeholders.map((s, i) => (
            <button key={i} type="button" onClick={() => setOpen(open === i ? null : i)}
              className={`text-left border rounded-lg p-4 transition-colors ${s.color}`}>
              <div className="flex items-center justify-between">
                <h4 className="font-semibold" style={sans}>{s.name}</h4>
                <span className="text-stone-400 text-sm">{open === i ? "−" : "+"}</span>
              </div>
              <p className="text-sm text-stone-600 mt-1">{s.role}</p>
              {open === i && (
                <div className="mt-3 space-y-2 text-sm">
                  <div><span className="font-semibold" style={sans}>Motivation: </span><span className="text-stone-700">{s.motivation}</span></div>
                  <div><span className="font-semibold" style={sans}>Constraint: </span><span className="text-stone-700">{s.constraint}</span></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </Section>
      <CountryPanel>
        <ul className="space-y-1.5 text-sm text-stone-700">
          {(data?.stakeholders ?? []).map((s, i) => (
            <li key={i}>
              <span className="font-medium">{s.link ? <a className="underline decoration-indigo-300 hover:decoration-indigo-600" href={s.link} target="_blank" rel="noreferrer">{s.name}</a> : s.name}</span>
              {s.role && <span className="text-stone-500"> — {s.role}</span>}
            </li>
          ))}
        </ul>
      </CountryPanel>
      <KeyBox dark title="The one-third problem">
        Under current banking criteria in most European countries, only about one-third of households have
        access to long-term renovation financing. The remaining two-thirds — those who are elderly, low-income,
        already indebted, or health-impaired — are excluded by standard credit algorithms. This is not a market
        failure that subsidies alone can fix. It requires guarantee mechanisms, alternative financing models,
        or both. Every module that follows connects back to this structural fact.
      </KeyBox>
      <Section title="The split incentive problem">
        <p className="text-base leading-relaxed mb-4">
          Beyond the credit access problem, there is a structural misalignment of interests that no single
          stakeholder can solve alone. Research identifies several forms of this "split incentive":
        </p>
        <div className="space-y-4">
          {splitIncentives.map((s, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-lg p-4">
              <h4 className="font-semibold text-stone-800 mb-1" style={sans}>{s.title}</h4>
              <p className="text-sm text-stone-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-stone-500 italic mt-4">
          These split incentives are beyond the direct control of the advisory service, but understanding them
          is essential. The OSS operates as an intermediary and facilitator — finding financing sources,
          aligning interests, and building coalitions among stakeholders who may not naturally cooperate.
        </p>
      </Section>
      <Section title="How the money flows">
        <p className="text-base leading-relaxed mb-4">
          In a typical renovation project, financing comes from multiple sources assembled by the advisory
          service (One-Stop Shop) into a single plan the homeowner can understand. The flow looks like this:
        </p>
        <div className="bg-white border border-stone-300 rounded-lg p-5 text-center text-sm" style={sans}>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {["Owner's Equity", "State Subsidies", "Bank Loan", "Guarantee Support"].map(x => (
              <span key={x} className="border border-stone-300 rounded px-3 py-1.5 bg-stone-50">{x}</span>
            ))}
          </div>
          <div className="text-stone-400 mb-3">↓</div>
          <div className="border border-amber-300 bg-amber-50 rounded px-3 py-1.5 inline-block mb-3">Assembled by One-Stop Shop into a financing plan</div>
          <div className="text-stone-400 mb-3">↓</div>
          <div className="border border-stone-300 rounded px-3 py-1.5 inline-block mb-3 bg-stone-50">Construction work delivered</div>
          <div className="text-stone-400 mb-3">↓</div>
          <div className="border border-emerald-300 bg-emerald-50 rounded px-3 py-1.5 inline-block font-semibold">Monthly repayment ≤ Energy savings</div>
        </div>
        <p className="text-sm text-stone-600 mt-4">
          The goal: the homeowner's monthly repayment should be less than or equal to their monthly energy
          savings. When this is achieved, renovation costs them nothing net — they are simply redirecting spending.
        </p>
      </Section>
      <Quiz items={scenariosM2.map(s => ({ question: s.question, scenario: s.scenario, options: s.options }))}
        heading="Exercise: Stakeholder Analysis" sub="Read the scenario, then identify the key constraint." nextLabel="Next Scenario →" />
      <TrainerNote>
        When presenting the stakeholder map to homeowners, do not present all six actors. The homeowner only
        needs to understand three things: what <em>they</em> bring (equity and the decision), what the{" "}
        <em>state</em> brings (subsidies and regulatory requirements), and what the <em>bank</em> brings (the
        loan for the remainder). The One-Stop Shop's role is to make this assembly invisible — the homeowner
        should experience a single, coherent plan, not a puzzle with six pieces. Your job as a trainer is to
        help advisors see all six pieces, so they can assemble the puzzle before the homeowner even knows it exists.
      </TrainerNote>
    </div>
  );
}
