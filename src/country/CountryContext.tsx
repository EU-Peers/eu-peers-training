import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// ---------------------------------------------------------------------------
// Country overlay layer.
// Design contract (do not change lightly):
//  - The country-agnostic core is NEVER altered by a country selection.
//    Overlays render BESIDE core content in clearly-labelled panels.
//  - Data is fetched at runtime from data/{code}.json (same origin, no CORS).
//    Adding or updating a country = editing one JSON file. No rebuild.
//  - "generic" = no overlay. Missing/empty slices render nothing.
//  - Every unverified figure in country files carries [TO VERIFY].
// ---------------------------------------------------------------------------

export interface CountryInstrument {
  category?: string; name: string; provider?: string; note?: string;
  amount?: string; combinableWithGrant?: unknown; links?: string[];
}
export interface CountryData {
  country: string; code: string; contributor?: string; updated?: string; status?: string;
  stakeholders?: { name: string; role?: string; link?: string }[];
  instruments?: { traditional?: CountryInstrument[]; testedGrowing?: CountryInstrument[]; newInnovative?: CountryInstrument[] };
  banking?: Record<string, string>;
  advisory?: Record<string, string>;
  scenarios?: unknown[];
}
interface Registry { countries: { code: string; label: string; status?: string }[] }

interface Ctx {
  code: string; setCode: (c: string) => void;
  data: CountryData | null; registry: Registry;
  loading: boolean; error: string | null;
}
const CountryCtx = createContext<Ctx>({ code: "generic", setCode: () => {}, data: null, registry: { countries: [] }, loading: false, error: null });
export const useCountry = () => useContext(CountryCtx);

const initialCode = () => {
  try { return new URLSearchParams(window.location.search).get("country") || "generic"; }
  catch { return "generic"; }
};

export function CountryProvider({ children }: { children: ReactNode }) {
  const [code, setCode] = useState<string>(initialCode);
  const [data, setData] = useState<CountryData | null>(null);
  const [registry, setRegistry] = useState<Registry>({ countries: [{ code: "generic", label: "Europe-wide edition" }] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("data/index.json").then(r => (r.ok ? r.json() : null)).then(j => { if (j?.countries) setRegistry(j); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (code === "generic") { setData(null); setError(null); return; }
    setLoading(true); setError(null);
    fetch(`data/${code}.json`)
      .then(r => { if (!r.ok) throw new Error(`no data file for "${code}"`); return r.json(); })
      .then(j => setData(j))
      .catch(e => { setData(null); setError(String(e.message || e)); })
      .finally(() => setLoading(false));
    try {
      const u = new URL(window.location.href);
      u.searchParams.set("country", code);
      window.history.replaceState({}, "", u);
    } catch { /* iframe with restricted history — fine */ }
  }, [code]);

  return <CountryCtx.Provider value={{ code, setCode, data, registry, loading, error }}>{children}</CountryCtx.Provider>;
}

export function CountrySelector() {
  const { code, setCode, registry, loading } = useCountry();
  const hasUnpublished = registry.countries.some(c => c.status && c.status !== "default" && c.status !== "published");
  return (
    <label className="flex items-center gap-2 text-xs text-stone-300">
      <span className="hidden sm:inline">Country:</span>
      <select
        aria-label="Select country overlay"
        value={code}
        onChange={e => setCode(e.target.value)}
        title={hasUnpublished ? "* = draft or pending country data, not yet nationally confirmed" : undefined}
        className="bg-stone-800 border border-stone-600 rounded px-2 py-1 text-stone-100 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
      >
        {registry.countries.map(c => (
          <option key={c.code} value={c.code}>{c.label}{c.status && c.status !== "default" && c.status !== "published" ? " *" : ""}</option>
        ))}
      </select>
      {hasUnpublished && (
        <span className="hidden sm:inline text-stone-500" title="* = draft or pending country data, not yet nationally confirmed">
          (* = draft/pending)
        </span>
      )}
      {loading && <span className="animate-pulse">…</span>}
    </label>
  );
}

/** Labelled overlay panel. Renders nothing when generic / empty / erroring. */
export function CountryPanel({ children, show = true }: { children: ReactNode; show?: boolean }) {
  const { code, data, error } = useCountry();
  if (code === "generic") return null;
  // Error (no data file yet) always renders the explanatory note, even in modules
  // whose `show` flag is derived from the (missing) data — otherwise those modules
  // silently render nothing and it looks broken rather than "not ready yet".
  if (error) return (
    <div className="border border-dashed border-stone-300 rounded-lg p-4 my-6 text-sm text-stone-500">
      Country data for “{code}” is not available yet. The generic framework above applies everywhere.
    </div>
  );
  if (!show || !data) return null;
  return (
    <div className="border-2 border-indigo-200 bg-indigo-50/50 rounded-lg p-5 my-6">
      <div className="flex items-baseline justify-between mb-3 flex-wrap gap-1">
        <h4 className="font-semibold text-indigo-900" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          In {data.country}
        </h4>
        <span className="text-[11px] text-indigo-400">
          {data.status === "draft-unverified" ? "draft — figures marked [TO VERIFY] await national confirmation" : data.updated ? `updated ${data.updated}` : ""}
        </span>
      </div>
      {children}
      {data.contributor && <p className="text-[11px] text-indigo-400 mt-3">Source: {data.contributor}</p>}
    </div>
  );
}
