# Claude context — eu-peers-training

EU PEERS Train-the-Trainer minisite (deliverable D3.5). React+Vite+Tailwind.
Owner: Nicholas Stancioff (Ēkubirojs/LABEEF). Maintainer: Ankur (non-developer).

Rules that matter here:
- Terminology: never "ESCO" — always "service provider" or "project enabler".
- Training content in src/content/data.ts is verbatim project output
  (incl. EEDAL 2024 three-tier framework + eight OSS criteria). Do not cut or
  paraphrase it; presentation may change, substance may not.
- Country overlays: runtime JSON in public/data/ (deployed: docs/data/).
  Overlays render BESIDE the generic core, never replace it. Country edits are
  JSON-only — no rebuild. Unverified figures carry [TO VERIFY]; never invent numbers.
- EU compliance footer (emblem + disclaimer) is a Grant Agreement obligation
  (Art. 17 / Annex 5) — never remove. LIFE logo placeholder awaits official asset.
- Build: npm install && npx vite build → dist/. Deploy = copy dist/ contents
  into repo docs/ (GitHub Pages serves /docs on main). Keep data/ beside index.html.
- Public URL: training.eu-peers.eu, iframed by eu-peers.eu/training (Webflow).
  Host changes must never require Webflow edits again.
