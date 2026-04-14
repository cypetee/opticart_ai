# OptiCart v1 (local MVP)

Single-page web app that runs **entirely in the browser** on your machine. Store inventory, prices, “vision,” and “voice cleanup” use **in-memory mock data** shaped like real API responses—no keys or backend required.

## Prerequisites

- **Node.js** 20+ (or current LTS; npm included)

## Run in development

```bash
cd /Users/timi/Downloads/cursor_projects/opticart/v1
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build (optional)

```bash
npm run build
npm run preview
```

`preview` serves the built files locally so you can sanity-check the production bundle.

## What to try

1. **De-Choicer**: Switch between *Lowest price*, *Organic first*, and *Brand loyal* (with a brand hint), then click **Build mission plan**.
2. **Multimodal list**: Parse the sample text, use **Voice** (Chrome/Edge works best), or **Image** (returns a fixed mock list).
3. **Location & budget**: Adjust radius and budget; the demo anchor is near Austin, TX coordinates in `src/data/demoData.ts`.
4. **Path planner**: Map uses **OpenStreetMap** tiles; the green line is home → stores in nearest-neighbor order.
5. **Report price change**: Logs a demo message to the browser console (stand-in for crowdsourcing).

## Where mocks live

| Feature | File / area |
|--------|----------------|
| Stores, catalog, prices | `src/data/demoData.ts` |
| Text / image / voice “API” | `src/services/mockApi.ts` |
| Rules-based AI substitute | `src/lib/deChoicer.ts` + `src/lib/buildPlan.ts` |

Swap these modules for real HTTP clients when you are ready.
