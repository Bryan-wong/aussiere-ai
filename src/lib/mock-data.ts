import type { PropertyReport, AddressSuggestion } from '@/types'

export const MOCK_REPORT: PropertyReport = {
  address:      '27/39 Moir Road, Kingston TAS 7050',
  suburb:       'Kingston',
  state:        'TAS',
  propertyType: 'townhouse',

  overallScore: 74,
  verdict:      'Good Buy',

  estimatedMarketValue: 'AUD $618,000',
  medianPrice:          'AUD $625,000',
  rentalYield:          '4.2%',
  vacancyRate:          '0.8%',
  fiveYrGrowth:         '+42%',
  listingPrice:         'AUD $649,000',
  priceAssessment:      'overpriced',
  priceDiffPct:         5.0,

  rbaCashRate: '4.10%',
  rbaDate:     'May 2025',

  propertyFeatures: {
    bedrooms:     3,
    bathrooms:    2,
    carSpaces:    1,
    landSize:     '210 sqm',
    buildYear:    2008,
    propertyType: 'Townhouse',
  },

  pros: [
    'Kingston is one of Hobart\'s most sought-after southern suburbs with consistent capital growth',
    'Low rental vacancy rate of 0.8% indicates strong rental demand — ideal for investment',
    'Close proximity to Channel Highway corridor and Kingston Town Centre',
    'Good school catchment including Kingston Primary and Huonville High School',
    'Strong owner-occupier demographic provides price floor stability',
  ],
  cons: [
    'Listed approximately 5% above AI estimated market value — room to negotiate',
    'Strata fees apply for townhouse complex — factor into cash flow calculations',
    'Hobart market has cooled slightly in 2024-25 after the post-COVID surge',
    'Limited public transport compared to mainland capital cities',
  ],
  xFactors: [
    'Channel Highway upgrade project — approved $180M corridor improvement boosting connectivity',
    'Kingston Park Masterplan rezoning — 1,200 new dwellings planned, may impact supply by 2027',
    'Strong interstate migration from NSW/VIC continues to underpin Hobart demand',
  ],

  trendNarrative:
    'Kingston property prices surged 38% between 2019 and 2022, driven by interstate migration and COVID sea-change demand. ' +
    'Growth has moderated to approximately 3-5% annually in 2023-25 as interest rates impacted affordability. ' +
    'The 5-year outlook remains positive, with infrastructure investment and continued population growth forecast to sustain 4-6% annual appreciation.',

  trendScores: {
    past1yr: 58,
    past3yr: 72,
    past5yr: 82,
    next1yr: 62,
    next3yr: 68,
    next5yr: 75,
  },

  policyAnalysis:
    'The RBA held the cash rate at 4.10% in May 2025, with two cuts expected by year-end. ' +
    'For Kingston investors, lower rates will improve borrowing power by approximately 8-12%, ' +
    'likely stimulating renewed buyer activity and supporting price growth in the $550K-$700K segment. ' +
    'Tasmania\'s state budget has maintained first home buyer stamp duty concessions for properties under $600K.',

  taxSummary:
    'Stamp duty (TAS) on $649,000: approximately $24,106 (standard rate). ' +
    'Land tax threshold in Tasmania: $25,000 (primary production exempt). ' +
    'For investors, land tax applies at 0.55% on assessed value above $25,000. ' +
    'No foreign investor surcharge applies to Australian citizens/residents.',

  communityScore:  76,
  safetyScore:     78,
  transitScore:    62,
  schoolScore:     74,
  amenitiesScore:  78,

  schoolDetail:
    'Kingston Primary School (rated 7.2/10 — above state average). ' +
    'Roslyn Primary nearby (7.0/10). Kingston High School is the local secondary (6.8/10). ' +
    'Catholic College Kingborough also within zone.',

  transitDetail:
    'Metro Bus Route 60 and 61 connect Kingston to Hobart CBD (30-35 min). ' +
    'No train service. Channel Highway provides direct car access — approx 25 min to CBD. ' +
    'Walk Score: 58 (some errands on foot). Bike Score: 44.',

  shoppingDetail:
    'Kingston Town Centre: Coles, Woolworths, Target, specialty retail within 1km. ' +
    'Channel Court Shopping Centre — major retail hub 1.5km. ' +
    'Huonville Farmers Market accessible via highway.',

  newDevelopments:
    'Kingston Park Masterplan approved Feb 2024 — mixed-use precinct with residential, retail and open space. ' +
    'New Kingborough Community Hub under construction (open 2026). ' +
    'Channel Highway upgrade Stage 2 commenced Q1 2025.',

  costOfLiving:  'Medium — lower than mainland capitals. Average household costs approx $3,200/month.',
  environment:   'Low bushfire risk. No flood zone. Clean air quality. 15 min to beach at Blackmans Bay. Parks and reserves walking distance.',

  buildQualityNote:
    'Townhouses built circa 2008 in Kingston typically use brick veneer construction with good insulation ratings. ' +
    'Key inspection areas: roof (re-pointing of older mortar common), strata drainage, and window seals given Hobart\'s wet winters.',

  buildQualityScores: {
    build:       74,
    reno:        65,
    structRisk:  22,
    maintenance: 30,
  },

  finalSummary:
    'Kingston represents a solid mid-tier investment in the Hobart market with reliable rental demand and infrastructure tailwinds. ' +
    'The listing is approximately 5% above our AI-estimated market value of $618,000 — we recommend negotiating toward $620K-$630K before proceeding. ' +
    'For long-term investors with a 5+ year horizon, the Kingston Park precinct development and rate cut cycle make this a compelling hold.',

  generatedAt: new Date().toISOString(),
}

export const MOCK_ADDRESS_SUGGESTIONS: AddressSuggestion[] = [
  { display: '27/39 Moir Road, Kingston TAS 7050',       street: '27/39 Moir Road', suburb: 'Kingston',       state: 'TAS', postcode: '7050' },
  { display: '27/39 Moir Road, Spring Farm NSW 2570',     street: '27/39 Moir Road', suburb: 'Spring Farm',    state: 'NSW', postcode: '2570' },
  { display: '27/39 Moir Road, Moorabbin VIC 3189',       street: '27/39 Moir Road', suburb: 'Moorabbin',      state: 'VIC', postcode: '3189' },
  { display: '27 Moir Street, Newstead QLD 4006',         street: '27 Moir Street',  suburb: 'Newstead',       state: 'QLD', postcode: '4006' },
]

export const PRICING_PLANS = [
  {
    id:       'free',
    name:     'Free Trial',
    price:    '$0',
    period:   '',
    desc:     '3–5 free property searches',
    badge:    null,
    featured: false,
    features: [
      { text: '3–5 property searches',    included: true  },
      { text: 'Basic AI insights',         included: true  },
      { text: 'Limited report preview',    included: true  },
      { text: 'Full investment analysis',  included: false },
      { text: 'Price accuracy check',      included: false },
      { text: 'X-factor signals',          included: false },
    ],
    cta: 'Get started free',
  },
  {
    id:       'starter',
    name:     'Starter',
    price:    '$9',
    period:   '/wk',
    desc:     'AUD $9 per week',
    badge:    null,
    featured: false,
    features: [
      { text: '3–5 addresses per week',   included: true  },
      { text: 'Full AI analysis',          included: true  },
      { text: 'Investment scoring',        included: true  },
      { text: 'Price accuracy check',      included: true  },
      { text: 'Policy & rate impact',      included: true  },
      { text: 'Unlimited searches',        included: false },
    ],
    cta: 'Start Starter',
  },
  {
    id:       'plus',
    name:     'Starter Plus',
    price:    '$19',
    period:   '/wk',
    desc:     'AUD $19 per week',
    badge:    null,
    featured: false,
    features: [
      { text: 'Unlimited searches',        included: true  },
      { text: 'Full AI analysis',          included: true  },
      { text: 'Investment scoring',        included: true  },
      { text: 'X-factor signals',          included: true  },
      { text: 'Suburb trend data',         included: true  },
      { text: 'Advanced forecasting',      included: false },
    ],
    cta: 'Start Plus',
  },
  {
    id:       'pro',
    name:     'Pro Plan',
    price:    '$30',
    period:   '/mo',
    desc:     'AUD $30 per month',
    badge:    'Most Popular · Best Value',
    featured: true,
    features: [
      { text: 'Unlimited searches',        included: true },
      { text: 'Full AI analysis',          included: true },
      { text: 'Investment scoring',        included: true },
      { text: 'Price accuracy check',      included: true },
      { text: 'X-factor signals',          included: true },
      { text: 'Advanced forecasting',      included: true },
      { text: 'Full suburb analysis',      included: true },
      { text: 'Priority generation',       included: true },
    ],
    cta: 'Start Pro Plan',
    savingNote: 'Save vs $76/mo on weekly plans',
  },
]
