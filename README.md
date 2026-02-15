# LureSeek 🎣

A visual search engine for fishing lures. Describe what you're looking for and browse results in a Pinterest-style image grid.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

- **Next.js 14** (App Router) + TypeScript + Tailwind CSS
- `/api/search` — search endpoint with adapter pattern
- `src/lib/search-adapter.ts` — swap search providers here
- Currently uses mock data; see TODO comments for real API integration

## TODO

- [ ] Integrate SerpAPI for real image search
- [ ] Amazon Product Advertising API for affiliate links
- [ ] Tackle Warehouse / Bass Pro Shops API integration
- [ ] Category filtering (topwater, crankbait, soft plastic, etc.)
- [ ] Infinite scroll / pagination
- [ ] Image similarity search
- [ ] User favorites / collections
