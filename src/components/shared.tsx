import { ReactNode, useState } from "react";
import { sans, serif } from "@/content/data";

export function ModuleHeader({ tag, title, epigraph }: { tag: string; title: string; epigraph?: string }) {
  return (
    <header className="mb-10">
      <p className="text-xs uppercase tracking-widest text-amber-700 mb-2" style={sans}>{tag}</p>
      <h2 className="text-3xl font-bold text-stone-900 mb-4" style={serif}>{title}</h2>
      {epigraph && <p className="text-lg text-stone-600 italic leading-relaxed border-l-4 border-amber-400 pl-4" style={serif}>{epigraph}</p>}
    </header>
  );
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      {title && <h3 className="text-xl font-semibold mb-4" style={sans}>{title}</h3>}
      {children}
    </section>
  );
}

export function KeyBox({ title, children, dark = false }: { title: string; children: ReactNode; dark?: boolean }) {
  return dark ? (
    <div className="bg-stone-800 text-stone-100 rounded-lg p-6 mb-10">
      <h4 className="font-semibold mb-3 text-amber-400" style={sans}>{title}</h4>
      <p className="text-base leading-relaxed">{children}</p>
    </div>
  ) : (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
      <h4 className="font-bold text-amber-800 mb-2" style={sans}>{title}</h4>
      <p className="text-base text-amber-900 leading-relaxed">{children}</p>
    </div>
  );
}

export function TrainerNote({ children }: { children: ReactNode }) {
  return (
    <div className="bg-stone-100 rounded-lg p-6 mt-10">
      <h4 className="text-lg font-semibold mb-1" style={sans}>Trainer's Note</h4>
      <p className="text-sm text-stone-600 leading-relaxed">{children}</p>
    </div>
  );
}

// ---- Quiz --------------------------------------------------------------
export interface QuizItem { question: string; options: { text?: string; label?: string; correct: boolean; feedback?: string; why?: string }[]; scenario?: string }

export function Quiz({ items, heading, sub, nextLabel = "Next Question →" }: { items: QuizItem[]; heading: string; sub: string; nextLabel?: string }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const q = items[idx];
  return (
    <div className="border border-stone-300 rounded-lg p-6 bg-white mb-10">
      <h3 className="text-xl font-semibold mb-1" style={sans}>{heading}</h3>
      <p className="text-sm text-stone-500 mb-4">{sub}</p>
      {q.scenario && (
        <div className="bg-stone-50 border border-stone-200 rounded p-4 mb-4">
          <p className="text-sm text-stone-700 leading-relaxed">{q.scenario}</p>
        </div>
      )}
      <p className="font-medium mb-4">{idx + 1}. {q.question}</p>
      <div className="space-y-2">
        {q.options.map((o, i) => {
          let cls = "border-stone-200 hover:border-stone-400";
          if (show && selected === i) cls = o.correct ? "border-emerald-300 bg-emerald-50/50" : "border-red-400 bg-red-50";
          else if (show && o.correct) cls = "border-emerald-300 bg-emerald-50/50";
          return (
            <button key={i} type="button" disabled={show}
              onClick={() => { setSelected(i); setShow(true); }}
              className={`w-full text-left border rounded-md p-3 text-sm transition-colors ${cls}`}>
              {o.text ?? o.label}
              {show && (selected === i || o.correct) && (
                <span className="block mt-2 text-xs text-stone-600 leading-relaxed">{o.feedback ?? o.why}</span>
              )}
            </button>
          );
        })}
      </div>
      {show && idx < items.length - 1 && (
        <button type="button" className="mt-4 text-sm border border-stone-300 rounded px-3 py-1.5 hover:bg-stone-100"
          onClick={() => { setIdx(idx + 1); setSelected(null); setShow(false); }}>
          {nextLabel}
        </button>
      )}
    </div>
  );
}

// ---- EU visibility compliance (Grant Agreement Art. 17 + Annex 5) -------
// The EU emblem is rendered as SVG per the official geometry (12 five-point
// gold stars, circle of radius 1/3 height, on blue). Beneficiaries may use
// the emblem without prior approval for their Art. 17 obligations.
function star(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const oa = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const ia = oa + Math.PI / 5;
    pts.push(`${cx + r * Math.cos(oa)},${cy + r * Math.sin(oa)}`);
    pts.push(`${cx + (r / 2.618) * Math.cos(ia)},${cy + (r / 2.618) * Math.sin(ia)}`);
  }
  return pts.join(" ");
}
export function EUEmblem({ height = 36 }: { height?: number }) {
  const h = 120, w = 180, R = h / 3, cx = w / 2, cy = h / 2, sr = h / 18;
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 6;
    return star(cx + R * Math.cos(a), cy + R * Math.sin(a), sr);
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} height={height} role="img" aria-label="European Union emblem" style={{ display: "block" }}>
      <rect width={w} height={h} fill="#003399" />
      {stars.map((p, i) => <polygon key={i} points={p} fill="#FFCC00" />)}
    </svg>
  );
}

export const EU_DISCLAIMER =
  "Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or CINEA. Neither the European Union nor the granting authority can be held responsible for them.";

export function EUFooter() {
  return (
    <footer className="border-t border-stone-200 mt-12">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <EUEmblem height={42} />
            <span className="text-sm font-semibold text-stone-700" style={sans}>Funded by<br />the European Union</span>
          </div>
          {/* LIFE Programme logo: official asset required (Annex 5). Drop the
              image at public/assets/life-logo.png and replace this slot. */}
          <div className="flex items-center border border-dashed border-stone-300 rounded px-3 py-2 text-xs text-stone-400" aria-label="LIFE Programme logo placeholder">
            LIFE Programme<br />logo — asset pending
          </div>
        </div>
        <p className="text-xs text-stone-500 leading-relaxed mt-4 max-w-2xl">{EU_DISCLAIMER}</p>
        <p className="text-xs text-stone-400 mt-4">
          EU PEERS · Train the Trainer · Financing Home Renovation<br />
          Developed within the EU PEERS project (LIFE22-CET-EU-Peers/101120790)
        </p>
      </div>
    </footer>
  );
}
