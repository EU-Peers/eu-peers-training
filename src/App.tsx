import { useState } from "react";
import { navItems, sans } from "@/content/data";
import { Welcome, Module1, Module2 } from "@/modules/Part1";
import { Module3, Module4 } from "@/modules/Part2";
import { Module5 } from "@/modules/Part3";
import { CountryProvider, CountrySelector } from "@/country/CountryContext";
import { EUFooter } from "@/components/shared";

export default function App() {
  const [page, setPage] = useState("welcome");
  const idx = navItems.findIndex(n => n.id === page);
  const go = (id: string) => { setPage(id); window.scrollTo({ top: 0 }); };
  return (
    <CountryProvider>
      <div className="min-h-screen bg-stone-50 text-stone-900">
        <nav className="sticky top-0 z-50 bg-stone-900 text-stone-100 shadow-lg">
          <div className="max-w-5xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <button type="button" onClick={() => go("welcome")} className="text-lg font-semibold tracking-tight" style={sans}>
                Train the Trainer · EU PEERS
              </button>
              <CountrySelector />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {navItems.map(n => (
                <button key={n.id} type="button" onClick={() => go(n.id)}
                  className={`text-xs rounded px-2.5 py-1.5 whitespace-nowrap transition-colors ${page === n.id ? "bg-amber-600 text-white" : "text-stone-300 hover:bg-stone-800"}`}
                  style={sans}>
                  <span className="sm:hidden">{n.shortLabel}</span>
                  <span className="hidden sm:inline">{n.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
        <main className="max-w-3xl mx-auto px-4 py-8">
          {page === "welcome" && <Welcome go={go} />}
          {page === "mod1" && <Module1 />}
          {page === "mod2" && <Module2 />}
          {page === "mod3" && <Module3 />}
          {page === "mod4" && <Module4 />}
          {page === "mod5" && <Module5 />}
          {page !== "welcome" && (
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-stone-200">
              <button type="button" className="text-sm text-stone-500 hover:text-stone-800" onClick={() => go(navItems[idx - 1].id)}>← Previous</button>
              {idx < navItems.length - 1
                ? <button type="button" className="text-sm font-semibold text-amber-700 hover:text-amber-900" onClick={() => go(navItems[idx + 1].id)}>Next module →</button>
                : <button type="button" className="text-sm font-semibold text-amber-700 hover:text-amber-900" onClick={() => go("welcome")}>Back to start →</button>}
            </div>
          )}
        </main>
        <EUFooter />
      </div>
    </CountryProvider>
  );
}
