import type { AustralianState, PropertyType } from '@/types/report'

// ─── Suburb profiles ──────────────────────────────────────────────────────────
// Realistic Australian suburb data used to enrich the AI prompt

export interface SuburbContext {
  state:             AustralianState
  postcode:          string
  region:            string
  medianHousePrice:  string
  medianUnitPrice:   string
  weeklyRentHouse:   string
  weeklyRentUnit:    string
  rentalYield:       string
  vacancyRate:       string
  population:        string
  medianHhIncome:    string
  ownerOccupierPct:  string
  coreLogicGrowth1yr: string
  coreLogicGrowth5yr: string
  primarySchools:    string[]
  secondarySchools:  string[]
  shoppingCentres:   string[]
  hospitals:         string[]
  trainLines:        string[]
  cbdDistanceKm:     number
  cbdCommuteMin:     number
  safetyNote:        string
  suburbCharacter:   string
  recentDevelopments: string[]
  riskFactors:       string[]
}

const SUBURB_DB: Record<string, SuburbContext> = {
  'KINGSTON_TAS': {
    state: 'TAS', postcode: '7050',
    region: 'Southern Hobart',
    medianHousePrice: 'AUD $650,000', medianUnitPrice: 'AUD $480,000',
    weeklyRentHouse: '$550', weeklyRentUnit: '$420',
    rentalYield: '4.4%', vacancyRate: '0.9%',
    population: '14,200', medianHhIncome: '$91,000', ownerOccupierPct: '67%',
    coreLogicGrowth1yr: '+4.1%', coreLogicGrowth5yr: '+42%',
    primarySchools: ['Kingston Primary School (7.2/10)', 'Roslyn Primary (7.0/10)', 'Our Lady of Mercy Catholic Primary'],
    secondarySchools: ['Kingston High School (6.8/10)', 'Catholic College Kingborough'],
    shoppingCentres: ['Kingston Town Centre (Coles, Woolworths, Target)', 'Channel Court Shopping Centre', 'Kingston Central Plaza'],
    hospitals: ['Kingston Community Health Centre', 'Royal Hobart Hospital (25 min)'],
    trainLines: ['No rail. Metro Bus routes 60, 61, 65'],
    cbdDistanceKm: 14, cbdCommuteMin: 25,
    safetyNote: 'Low crime rate. Safe family suburb with strong community policing.',
    suburbCharacter: 'Established family suburb with mix of older homes and newer estates. Strong owner-occupier culture, popular with young families and downsizers.',
    recentDevelopments: [
      'Kingston Park Masterplan (1,200 lots approved, 2024)',
      'Kingborough Community Hub under construction (open 2026)',
      'Channel Highway upgrade Stage 2 commenced Q1 2025',
      'New Woolworths Metro opening Kingston Central 2025',
    ],
    riskFactors: [
      'Limited public transport — car dependent suburb',
      'New housing supply from Kingston Park may soften prices 2026-27',
      'Hobart market cooling after 2021-22 peak',
    ],
  },

  'NEWTOWN_NSW': {
    state: 'NSW', postcode: '2042',
    region: 'Inner West Sydney',
    medianHousePrice: 'AUD $1,820,000', medianUnitPrice: 'AUD $820,000',
    weeklyRentHouse: '$1,100', weeklyRentUnit: '$650',
    rentalYield: '3.2%', vacancyRate: '1.8%',
    population: '15,400', medianHhIncome: '$108,000', ownerOccupierPct: '38%',
    coreLogicGrowth1yr: '+5.8%', coreLogicGrowth5yr: '+38%',
    primarySchools: ['Newtown Public School (8.1/10)', 'Erskineville Public School (7.9/10)'],
    secondarySchools: ['Sydney Secondary College Newtown (7.8/10)', 'Marrickville High School'],
    shoppingCentres: ['Newtown King Street (major retail strip)', 'Westfield Hurstville (15 min)', 'Broadway Shopping Centre (10 min)'],
    hospitals: ['Royal Prince Alfred Hospital (2 min)', 'Sydney Children\'s Hospital Network'],
    trainLines: ['Newtown Station (Airport/Inner West/South line)'],
    cbdDistanceKm: 3.5, cbdCommuteMin: 12,
    safetyNote: 'Moderate crime. Some street crime on King Street at night. Gentrifying rapidly.',
    suburbCharacter: 'Vibrant inner-city village known for cafes, live music, LGBTQ+ culture. High renter population, strong demand from young professionals.',
    recentDevelopments: [
      'Sydney Metro City & Southwest — Waterloo station (adjacent) opening 2025',
      'Multiple boutique apartment developments on King Street',
      'Green Square urban renewal corridor benefiting nearby suburbs',
    ],
    riskFactors: [
      'Already highly priced — limited upside vs risk',
      'High renters-to-owners ratio creates strata complexity for units',
      'Heritage overlays restrict development of older terraces',
    ],
  },

  'FITZROY_VIC': {
    state: 'VIC', postcode: '3065',
    region: 'Inner Melbourne',
    medianHousePrice: 'AUD $1,480,000', medianUnitPrice: 'AUD $650,000',
    weeklyRentHouse: '$920', weeklyRentUnit: '$520',
    rentalYield: '3.3%', vacancyRate: '2.1%',
    population: '10,800', medianHhIncome: '$115,000', ownerOccupierPct: '31%',
    coreLogicGrowth1yr: '+3.9%', coreLogicGrowth5yr: '+28%',
    primarySchools: ['Fitzroy Primary School (8.3/10)', 'Holy Trinity Primary'],
    secondarySchools: ['Melbourne High School (selective, 9.2/10)', 'Fitzroy High School'],
    shoppingCentres: ['Brunswick Street retail strip', 'Smith Street shopping precinct', 'Coles Fitzroy'],
    hospitals: ['St Vincent\'s Hospital (2 min)', 'Royal Melbourne Hospital (10 min)'],
    trainLines: ['Tram routes 11, 86, 96 to CBD'],
    cbdDistanceKm: 2.8, cbdCommuteMin: 10,
    safetyNote: 'Low crime for inner Melbourne. Some antisocial behaviour on Brunswick St at night.',
    suburbCharacter: 'Iconic inner-Melbourne suburb. Heritage terraces, thriving cafe/bar scene, arts precinct. Gentrified — strong rental demand from professionals.',
    recentDevelopments: [
      'Melbourne Metro Tunnel — improved connectivity to southeast suburbs',
      'Fitzroy Arts Precinct expansion ($45M)',
      'Multiple boutique hotel conversions of heritage buildings',
    ],
    riskFactors: [
      'Melbourne\'s weaker population growth vs Sydney/Brisbane',
      'State land tax increases impacting investor yield calculations',
      'Rising interest rates hit investor sentiment harder in VIC',
    ],
  },

  'SPRING_FARM_NSW': {
    state: 'NSW', postcode: '2570',
    region: 'South West Sydney — Camden LGA',
    medianHousePrice: 'AUD $895,000', medianUnitPrice: 'AUD $620,000',
    weeklyRentHouse: '$620', weeklyRentUnit: '$480',
    rentalYield: '3.6%', vacancyRate: '1.1%',
    population: '18,600', medianHhIncome: '$112,000', ownerOccupierPct: '72%',
    coreLogicGrowth1yr: '+6.2%', coreLogicGrowth5yr: '+54%',
    primarySchools: ['Spring Farm Public School (6.8/10)', 'Harrington Park Public School (7.2/10)'],
    secondarySchools: ['Camden High School', 'Macarthur Anglican School (private, 8.4/10)'],
    shoppingCentres: ['Spring Farm Shopping Centre (NEW 2024 — Coles, Aldi, specialty)', 'Narellan Town Centre (5 min)', 'Macarthur Square (10 min)'],
    hospitals: ['Camden Hospital (8 min)', 'Campbelltown Hospital (15 min)'],
    trainLines: ['No direct rail. Bus to Campbelltown Station. South West Rail Link planned.'],
    cbdDistanceKm: 65, cbdCommuteMin: 75,
    safetyNote: 'Very low crime. New estate — predominantly young families.',
    suburbCharacter: 'High-growth outer suburban estate. Strong first-home buyer and young family demographics. Excellent value vs inner-ring suburbs.',
    recentDevelopments: [
      'Spring Farm Shopping Centre opened Dec 2024 (major milestone)',
      'South West Sydney Growth Corridor — state infrastructure investment $4.2B',
      'Western Sydney Airport at Badgerys Creek (opens 2026) — 30 min drive',
      'New schools and community facilities approved 2024-2026',
      'Sydney Metro Southwest extension studies underway',
    ],
    riskFactors: [
      'Car-dependent — no train line yet increases holding costs',
      'Long CBD commute (75 min+) limits appeal to city workers',
      'New supply risk — ongoing greenfield development in corridor',
    ],
  },

  'NEWSTEAD_QLD': {
    state: 'QLD', postcode: '4006',
    region: 'Inner Brisbane',
    medianHousePrice: 'AUD $1,650,000', medianUnitPrice: 'AUD $760,000',
    weeklyRentHouse: '$950', weeklyRentUnit: '$620',
    rentalYield: '3.9%', vacancyRate: '1.4%',
    population: '8,200', medianHhIncome: '$132,000', ownerOccupierPct: '29%',
    coreLogicGrowth1yr: '+9.1%', coreLogicGrowth5yr: '+72%',
    primarySchools: ['Valley State School', 'Holy Spirit Primary (7.8/10)'],
    secondarySchools: ['Brisbane State High School (selective, 9.1/10)', 'Fortitude Valley State Secondary College'],
    shoppingCentres: ['James Street Precinct (premium retail)', 'Gasworks Plaza', 'Fortitude Valley Mall'],
    hospitals: ['Royal Brisbane and Women\'s Hospital (10 min)', 'St Andrew\'s War Memorial Hospital'],
    trainLines: ['Fortitude Valley Station (Ferny Grove/Airport lines, 5 min walk)'],
    cbdDistanceKm: 2.2, cbdCommuteMin: 8,
    safetyNote: 'Generally safe. Some late-night activity near Fortitude Valley entertainment precinct.',
    suburbCharacter: 'Premium inner Brisbane suburb. Revitalised gasworks precinct, luxury apartments, thriving restaurant scene. Strong investment fundamentals.',
    recentDevelopments: [
      'Brisbane 2032 Olympics — significant infrastructure upgrade programme',
      'Cross River Rail project opening 2025 — transforms inner Brisbane connectivity',
      'Newstead Riverpark luxury residential development (ongoing)',
      'Gasworks Phase 3 commercial & residential ($800M)',
    ],
    riskFactors: [
      'Unit oversupply risk — significant new apartment stock 2024-26',
      'Olympic-related cost pressures driving construction delays',
      'Premium pricing means lower yield relative to Brisbane average',
    ],
  },
}

// Default context for unknown suburbs
const DEFAULT_CONTEXT: Omit<SuburbContext, 'state' | 'postcode' | 'region'> = {
  medianHousePrice: 'AUD $750,000', medianUnitPrice: 'AUD $520,000',
  weeklyRentHouse: '$580', weeklyRentUnit: '$440',
  rentalYield: '4.0%', vacancyRate: '1.5%',
  population: 'Data unavailable', medianHhIncome: '$95,000', ownerOccupierPct: '60%',
  coreLogicGrowth1yr: '+4.0%', coreLogicGrowth5yr: '+30%',
  primarySchools: ['Local primary school (data pending)'],
  secondarySchools: ['Local high school (data pending)'],
  shoppingCentres: ['Local retail (verify locally)'],
  hospitals: ['Nearest hospital (verify locally)'],
  trainLines: ['Verify locally'],
  cbdDistanceKm: 0, cbdCommuteMin: 0,
  safetyNote: 'Verify locally via Crime Stoppers and state police data.',
  suburbCharacter: 'Suburb profile data pending — AI analysis based on postcode and state context.',
  recentDevelopments: ['Verify recent developments via local council website'],
  riskFactors: ['Conduct independent due diligence'],
}

// ─── Lookup ───────────────────────────────────────────────────────────────────

export function getSuburbContext(suburb: string, state: AustralianState, postcode: string): SuburbContext {
  const key = `${suburb.toUpperCase().replace(/\s+/g, '_')}_${state}`
  const found = SUBURB_DB[key]
  if (found) return found

  // Partial match on suburb name
  for (const [k, v] of Object.entries(SUBURB_DB)) {
    if (k.startsWith(suburb.toUpperCase().replace(/\s+/g, '_')) && v.state === state) return v
  }

  return { ...DEFAULT_CONTEXT, state, postcode, region: `${state} region` }
}

// ─── RBA data (update periodically or pull from API) ─────────────────────────

export const RBA_CONTEXT = {
  cashRate:       '4.10%',
  rateDate:       'May 2025',
  direction:      'holding' as const,
  lastChange:     'Cut 25bps in February 2025',
  forecastNote:   'Markets pricing 1-2 further cuts in H2 2025. Big Four banks forecast rate to reach 3.35% by end 2025.',
  borrowingPower: 'A 25bps cut adds approximately $15,000-$25,000 borrowing capacity for a median-income household.',
}

// ─── State stamp duty quick reference ────────────────────────────────────────

export function getStampDutyEstimate(state: AustralianState, priceNum: number): string {
  const p = priceNum
  if (state === 'NSW') {
    if (p <= 14000)  return `$${Math.round(p * 0.0125).toLocaleString()} (1.25%)`
    if (p <= 31000)  return `$175 + 1.5% over $14,000`
    if (p <= 83000)  return `$430 + 1.75% over $31,000`
    if (p <= 310000) return `$1,340 + 3.5% over $83,000`
    if (p <= 1033000) return `$9,285 + 4.5% over $310,000`
    const sd = Math.round(9285 + (p - 310000) * 0.045)
    return `AUD $${sd.toLocaleString()} (approx — NSW standard rate)`
  }
  if (state === 'VIC') {
    if (p <= 600000) { const sd = Math.round(p * 0.055); return `AUD $${sd.toLocaleString()} (5.5%)` }
    const sd = Math.round(p * 0.065)
    return `AUD $${sd.toLocaleString()} (6.5% over $600K)`
  }
  if (state === 'QLD') {
    const sd = p <= 500000 ? Math.round(p * 0.035) : Math.round(17500 + (p - 500000) * 0.045)
    return `AUD $${sd.toLocaleString()} (QLD standard)`
  }
  if (state === 'TAS') {
    const sd = p <= 75000 ? Math.round(p * 0.0175)
      : p <= 200000 ? Math.round(1313 + (p - 75000) * 0.025)
      : p <= 375000 ? Math.round(4438 + (p - 200000) * 0.03)
      : p <= 725000 ? Math.round(9688 + (p - 375000) * 0.035)
      : Math.round(21938 + (p - 725000) * 0.04)
    return `AUD $${sd.toLocaleString()} (TAS standard)`
  }
  if (state === 'WA') {
    const sd = p <= 120000 ? Math.round(p * 0.019)
      : p <= 150000 ? Math.round(2280 + (p - 120000) * 0.0285)
      : p <= 360000 ? Math.round(3135 + (p - 150000) * 0.038)
      : p <= 725000 ? Math.round(11115 + (p - 360000) * 0.045)
      : Math.round(27540 + (p - 725000) * 0.051)
    return `AUD $${sd.toLocaleString()} (WA standard)`
  }
  if (state === 'SA') {
    const sd = Math.round(p * 0.055)
    return `AUD $${sd.toLocaleString()} (SA approx 5.5%)`
  }
  if (state === 'ACT') {
    const sd = Math.round(p * 0.0490)
    return `AUD $${sd.toLocaleString()} (ACT approx 4.9%)`
  }
  // NT
  const sd = Math.round(p * 0.0495)
  return `AUD $${sd.toLocaleString()} (NT approx 4.95%)`
}

// ─── Property type descriptors ────────────────────────────────────────────────

export const PROPERTY_TYPE_NOTES: Record<string, string> = {
  house:      'Standalone house. Land component drives long-term capital growth. Higher maintenance. No strata fees.',
  unit:       'Apartment/unit. Strata fees apply. Lower maintenance. Strong inner-city rental demand. Less land appreciation.',
  townhouse:  'Townhouse. Moderate strata or low body corporate. Balance of land and convenience. Good rental profile.',
  land:       'Vacant land. Pure capital play. No income generation until built. Lower stamp duty in some states.',
  villa:      'Villa/group dwelling. Moderate strata. Typically older stock. Check by-laws carefully.',
  studio:     'Studio apartment. High yield but limited capital growth. Narrow tenant pool. Check minimum size requirements.',
}
