# AussieRE AI v2.0

**Smarter Insights. Better Property Decisions.**

AI-powered Australian property investment analysis platform.

---

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Add OPENAI_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

> **Without an API key:** app runs in mock mode with realistic demo data — perfect for UI development.

---

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── analyze-property/route.ts   ← Main AI endpoint (POST)
│   │   └── search-address/route.ts     ← Address autocomplete (GET)
│   ├── property/page.tsx               ← Report page
│   ├── pricing/page.tsx
│   └── page.tsx                        ← Landing page
│
├── services/
│   ├── openai.ts                       ← OpenAI GPT-4o service layer
│   └── mock-report.ts                  ← Dev mock (no API key needed)
│
├── lib/
│   ├── prompts/property-analysis.ts   ← Prompt engineering
│   ├── mock/property-data.ts          ← Suburb data + RBA context
│   └── validators/report.ts          ← Zod schema validation
│
├── components/
│   ├── layout/Navbar.tsx
│   ├── search/{AddressSearch, PropertySearchForm}.tsx
│   ├── report/{8 section components}
│   └── ui/{ScoreRing, TrendBar, QualityBar, VerdictBadge}.tsx
│
└── types/report.ts                    ← All TypeScript interfaces
```

---

## API Routes

### `POST /api/analyze-property`

```json
{
  "address":      "27/39 Moir Road, Kingston TAS 7050",
  "suburb":       "Kingston",
  "state":        "TAS",
  "postcode":     "7050",
  "type":         "townhouse",
  "purpose":      "investment",
  "listingPrice": "649000",
  "bedrooms":     3,
  "bathrooms":    2
}
```

Returns a `PropertyReport` with 11 sections:
`features · market · growth · economics · suburbProfile · safetyTransport · schoolsAmenities · developments · buildCondition · investment`

### `GET /api/analyze-property`

Health check — returns `{ status, mode, version }`.

### `GET /api/search-address?q=kingston`

Returns address suggestions.

---

## Mode switching

| Condition | Mode | AI |
|-----------|------|----|
| `OPENAI_API_KEY` not set | **Mock** | Realistic fake data |
| `OPENAI_API_KEY=sk-...` | **Live** | GPT-4o real analysis |

---

## Deploy to Vercel

```bash
# Push to GitHub
git init && git add . && git commit -m "feat: AI backend v2"
git remote add origin https://github.com/YOU/aussiere-ai.git
git push -u origin main

# Vercel: Import repo → Add env vars → Deploy
# Required: OPENAI_API_KEY
```

---

## Roadmap (future)

- [ ] Supabase — report history, user accounts
- [ ] Stripe — subscription billing
- [ ] Google Places — real address autocomplete
- [ ] Redis — report caching
- [ ] CoreLogic/PropTrack API — real market data
- [ ] PDF report export
