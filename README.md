# EU PEERS — Train the Trainer: Financing Home Renovation

Country-aware rebuild of the training minisite (D3.5). React + Vite + Tailwind.
Live predecessor: https://nstancioff.github.io/eu-peers-training/ (single-file bundle, no source).

## Provenance — read this once

The original Vite source was not preserved; only the compiled bundle survived.
This source tree was **reconstructed from the deployed bundle** (July 2026 build):
all training text, quiz banks, the stakeholder map, the three-tier instrument
reference, the eight OSS-suitability criteria, the role-play scenarios and the
bank-simulator economics were extracted verbatim from the production bundle.
Component structure and styling were rebuilt to match the deployed design.
The dead legacy Module 4 ("The Toolkit", `nP_old`) shipped in the old bundle
was intentionally not carried over.

## What's new versus the deployed build

1. **Country overlay layer** — top-nav selector; overlays render *beside* the
   country-agnostic core in labelled "In [country]" panels (Modules 2, 3, 4).
   Data is fetched at runtime from `data/{code}.json`: adding or updating a
   country is a one-file edit + commit, **no rebuild**. `?country=ie` deep-links.
   Registry: `public/data/index.json`. Schema: `public/data/country.schema.json`.
   Ireland (`ie.json`) ships as the worked example, figures flagged `[TO VERIFY]`.
2. **EU visibility compliance** (Grant Agreement Art. 17 + Annex 5) — EU emblem
   (SVG, official geometry) with funding statement and the verbatim disclaimer
   in the footer. **Pending:** official LIFE Programme logo asset — drop it at
   `public/assets/life-logo.png` and replace the placeholder in
   `src/components/shared.tsx` (`EUFooter`).
3. Terminology: "service provider" / "project enabler" throughout. Zero "ESCO".

## Build & deploy

    npm install        # or: pnpm install
    npx vite build     # outputs dist/ (multi-file: index.html + assets/ + data/)

Deploy the **contents of `dist/`** to GitHub Pages (or any static host).
`base: './'` is set, so it works at github.io/<repo>/, at training.eu-peers.eu,
and inside the eu-peers.eu Webflow iframe unchanged.

Note: this is deliberately no longer a single-file bundle — runtime country
data requires `data/` to sit beside `index.html`. Do not flatten it.

## Adding a country

1. Copy `public/data/_TEMPLATE.json` → `public/data/xx.json`, fill from the
   partner's Country Financing Snapshot return; flag anything unconfirmed
   `[TO VERIFY]`.
2. Add the country to `public/data/index.json`.
3. Commit. On a live deployment you may edit `dist/data/` (or the deployed
   `data/`) directly — no rebuild needed. Rebuild only for code changes.

Slices map to modules: stakeholders → M2 · banking → M3 · instruments → M4 ·
scenarios → M5 (scenarios cannot be derived from links; draft then verify).

## Structure

    src/content/data.ts        all training content (verbatim from bundle)
    src/modules/Part1.tsx      Welcome, Module 1, Module 2
    src/modules/Part2.tsx      Module 3 (+ Bank Simulator), Module 4 (+ Going Deeper)
    src/modules/Part3.tsx      Module 5 (scenario calculators, role-play timer)
    src/country/               country context, runtime fetch, selector, panel
    src/components/shared.tsx  quiz, boxes, trainer notes, EU footer/emblem
    public/data/               country registry, schema, template, ie.json
