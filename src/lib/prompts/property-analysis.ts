import type { AnalyzePropertyRequest } from '@/types/report'
import { getSuburbContext, getStampDutyEstimate, RBA_CONTEXT, PROPERTY_TYPE_NOTES } from '@/lib/mock/property-data'

// ─── System prompt ─────────────────────────────────────────────────────────────

export const SYSTEM_PROMPT = `You are AussieRE AI — Australia's most trusted AI property investment analyst.

Your role is to produce PREMIUM, CONCISE, DATA-DRIVEN property investment reports for Australian real estate.

PERSONA:
- Expert in Australian residential property markets (all states and territories)
- Deep knowledge of RBA policy, lending environment, and macroeconomics
- Familiar with CoreLogic, Domain, and realestate.com.au data
- Investor-focused: you speak the language of yield, capital growth, cash flow, and risk

REPORT QUALITY STANDARDS:
- Be specific to the suburb and property type — avoid generic advice
- Use concrete numbers, percentages, and timeframes
- Name actual local schools, shopping centres, train lines, and infrastructure projects
- Give opinionated, clear verdicts — users need to make decisions
- Balance optimism with honest risk assessment
- Write for sophisticated property investors and first-time buyers alike

OUTPUT FORMAT:
- Return ONLY a valid JSON object — no markdown, no preamble, no trailing text
- All string values must be on a single line (no embedded newlines)
- No apostrophes or smart quotes inside string values — use "its" not "it's"  
- No trailing commas
- Integer fields must be plain integers (not quoted)
- Follow the exact schema provided — no extra or missing fields`

// ─── Build the user prompt ──────────────────────────────────────────────────────

export function buildPropertyPrompt(req: AnalyzePropertyRequest): string {
  const suburb      = getSuburbContext(req.suburb, req.state, req.postcode)
  const stampDuty   = req.listingPrice ? getStampDutyEstimate(req.state, parseInt(req.listingPrice)) : 'Not calculated (no listing price provided)'
  const propNote    = PROPERTY_TYPE_NOTES[req.type] ?? ''
  const listingNum  = req.listingPrice ? parseInt(req.listingPrice) : null
  const listingStr  = listingNum ? `AUD $${listingNum.toLocaleString()}` : 'Not provided'

  const contextBlock = `
=== PROPERTY DETAILS ===
Full address: ${req.address}
Suburb: ${req.suburb}, ${req.state} ${req.postcode}
Property type: ${req.type} — ${propNote}
Investment purpose: ${req.purpose}
Listing price: ${listingStr}
${req.bedrooms  ? `Bedrooms: ${req.bedrooms}` : ''}
${req.bathrooms ? `Bathrooms: ${req.bathrooms}` : ''}
${req.carSpaces ? `Car spaces: ${req.carSpaces}` : ''}
${req.landSize  ? `Land size: ${req.landSize}` : ''}

=== SUBURB MARKET DATA (CoreLogic / realestate.com.au, 2025) ===
Region: ${suburb.region}
Median house price: ${suburb.medianHousePrice}
Median unit price: ${suburb.medianUnitPrice}
Weekly rent (house): ${suburb.weeklyRentHouse}
Weekly rent (unit): ${suburb.weeklyRentUnit}
Gross rental yield: ${suburb.rentalYield}
Vacancy rate: ${suburb.vacancyRate}
Population: ${suburb.population}
Median household income: ${suburb.medianHhIncome}
Owner-occupier rate: ${suburb.ownerOccupierPct}
12-month price growth: ${suburb.coreLogicGrowth1yr}
5-year price growth: ${suburb.coreLogicGrowth5yr}
Distance to CBD: ${suburb.cbdDistanceKm}km / ${suburb.cbdCommuteMin} min drive

=== LOCAL AMENITIES ===
Primary schools: ${suburb.primarySchools.join(', ')}
Secondary schools: ${suburb.secondarySchools.join(', ')}
Shopping: ${suburb.shoppingCentres.join(', ')}
Hospitals: ${suburb.hospitals.join(', ')}
Transport: ${suburb.trainLines.join(', ')}
Safety: ${suburb.safetyNote}
Suburb character: ${suburb.suburbCharacter}

=== RECENT DEVELOPMENTS & INFRASTRUCTURE ===
${suburb.recentDevelopments.map(d => `- ${d}`).join('\n')}

=== KNOWN RISK FACTORS ===
${suburb.riskFactors.map(r => `- ${r}`).join('\n')}

=== RBA & ECONOMIC CONTEXT (${RBA_CONTEXT.rateDate}) ===
Cash rate: ${RBA_CONTEXT.cashRate}
Rate direction: ${RBA_CONTEXT.direction}
Last change: ${RBA_CONTEXT.lastChange}
Forecast: ${RBA_CONTEXT.forecastNote}
Borrowing power impact: ${RBA_CONTEXT.borrowingPower}

=== STAMP DUTY ===
Estimated stamp duty (${req.state}) on ${listingStr}: ${stampDuty}
`.trim()

  const schemaBlock = `
=== REQUIRED JSON SCHEMA ===
Return this exact structure. Fill every field with specific, accurate data:

{
  "reportId": "generate a short unique id like RPT-XXXXXX",
  "generatedAt": "${new Date().toISOString()}",
  "version": "2.0",
  "address": "${req.address}",
  "suburb": "${req.suburb}",
  "state": "${req.state}",
  "postcode": "${req.postcode}",
  "propertyType": "${req.type}",
  "purpose": "${req.purpose}",

  "features": {
    "bedrooms": ${req.bedrooms ?? 'null'},
    "bathrooms": ${req.bathrooms ?? 'null'},
    "carSpaces": ${req.carSpaces ?? 'null'},
    "landSize": "${req.landSize ?? 'Not provided'}",
    "buildYear": null,
    "propertyType": "${req.type}",
    "floorArea": "Not provided"
  },

  "market": {
    "estimatedValue": "AUD $XXX,XXX",
    "medianSuburb": "${req.type === 'unit' || req.type === 'studio' ? suburb.medianUnitPrice : suburb.medianHousePrice}",
    "priceAssessment": "fair-value | undervalued | slightly-overpriced | overpriced",
    "priceDiffPercent": 0.0,
    "rentalYield": "${suburb.rentalYield}",
    "weeklyRent": "AUD $XXX/week",
    "vacancyRate": "${suburb.vacancyRate}",
    "daysOnMarket": 28
  },

  "growth": {
    "past1yr": "${suburb.coreLogicGrowth1yr}",
    "past3yr": "X%",
    "past5yr": "${suburb.coreLogicGrowth5yr}",
    "forecast1yr": "X%",
    "forecast3yr": "X%",
    "forecast5yr": "X%",
    "trendScore": { "past1yr": 0, "past3yr": 0, "past5yr": 0, "next1yr": 0, "next3yr": 0, "next5yr": 0 },
    "outlook": "strong | moderate | flat | declining",
    "narrativePast": "2 sentences on past performance with specific ${req.suburb} data",
    "narrativeFuture": "2 sentences on growth outlook with specific catalysts"
  },

  "economics": {
    "cashRate": "${RBA_CONTEXT.cashRate}",
    "rateDate": "${RBA_CONTEXT.rateDate}",
    "rateDirection": "${RBA_CONTEXT.direction}",
    "borrowingImpact": "1 sentence on how current rates affect this purchase",
    "policyAnalysis": "2-3 sentences specific to ${req.suburb} and ${req.state}",
    "stampDuty": "${stampDuty}",
    "landTax": "State land tax notes for ${req.state} investors",
    "investorImpact": "1 concise sentence on net investment impact"
  },

  "suburbProfile": {
    "overview": "2 sentences summarising ${req.suburb}",
    "demographics": "key demographic note",
    "medianHhIncome": "${suburb.medianHhIncome}",
    "ownerOccupierPct": "${suburb.ownerOccupierPct}",
    "population": "${suburb.population}",
    "growthArea": true
  },

  "safetyTransport": {
    "safetyRating": 0,
    "safetyNote": "specific to ${req.suburb}",
    "transitScore": 0,
    "transitDetail": "specific transport options and commute times",
    "walkScore": 0,
    "bikeScore": 0,
    "cbdCommute": "${suburb.cbdCommuteMin} min",
    "busRoutes": [],
    "trainAccess": "specific train/tram info"
  },

  "schoolsAmenities": {
    "schoolScore": 0,
    "primarySchools": ${JSON.stringify(suburb.primarySchools)},
    "secondarySchools": ${JSON.stringify(suburb.secondarySchools)},
    "schoolZoneNote": "specific school zone value note",
    "amenitiesScore": 0,
    "shoppingCentres": ${JSON.stringify(suburb.shoppingCentres)},
    "hospitals": ${JSON.stringify(suburb.hospitals)},
    "parks": ["list local parks"],
    "cafesRestaurants": "description of local dining/cafe scene"
  },

  "developments": {
    "newDevelopments": ${JSON.stringify(suburb.recentDevelopments)},
    "xFactors": ["3-4 wildcard price catalysts specific to ${req.suburb}"],
    "rezoning": "any rezoning activity note",
    "infrastructurePipeline": "key infrastructure summary",
    "populationTrend": "population growth context"
  },

  "buildCondition": {
    "overallScore": 0,
    "buildQuality": 0,
    "renovationPct": 0,
    "structuralRisk": 0,
    "maintenanceRisk": 0,
    "buildNote": "2 sentences on typical build quality for ${req.type} in ${req.suburb}",
    "inspectionTips": ["3-4 specific inspection focus areas"],
    "estimatedRenovCost": "AUD $X,XXX - $XX,XXX if renovation potential exists"
  },

  "investment": {
    "verdict": "Strong Buy | Good Buy | Long-Term Hold | Proceed with Caution | High Risk | Not Recommended",
    "overallScore": 0,
    "confidenceLevel": "high | medium | low",
    "pros": [
      "specific pro 1 for ${req.suburb}",
      "specific pro 2",
      "specific pro 3",
      "specific pro 4",
      "specific pro 5"
    ],
    "cons": [
      "specific risk 1",
      "specific risk 2",
      "specific risk 3",
      "specific risk 4"
    ],
    "riskLevel": "low | medium | high",
    "riskFactors": ["specific risk factor 1", "specific risk factor 2", "specific risk factor 3"],
    "cashflowAnalysis": "weekly cash flow estimate with assumptions",
    "capitalGrowthCase": "capital growth investment thesis",
    "holdPeriodAdvice": "recommended hold period and exit strategy",
    "finalSummary": "3-4 sentence opinionated verdict with specific reasons for ${req.suburb} ${req.type}",
    "keyMetrics": {
      "grossYield": "${suburb.rentalYield}",
      "netYieldEst": "X.X% (after costs)",
      "cashflowWeekly": "+/-$XXX/wk (est.)",
      "breakEvenYears": "X years"
    }
  }
}`.trim()

  return `${contextBlock}\n\n${schemaBlock}\n\nNow generate the complete investment report JSON for ${req.address}. Be specific, accurate, and investor-focused.`
}
