// ─── Core enums ───────────────────────────────────────────────────────────────

export type AustralianState =
  | 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'ACT' | 'NT'

export type PropertyType =
  | 'house' | 'unit' | 'townhouse' | 'land' | 'villa' | 'studio'

export type InvestmentPurpose =
  | 'investment' | 'owner-occupier' | 'both'

export type InvestmentVerdict =
  | 'Strong Buy'
  | 'Good Buy'
  | 'Long-Term Hold'
  | 'Proceed with Caution'
  | 'High Risk'
  | 'Not Recommended'

export type PriceAssessment =
  | 'undervalued' | 'fair-value' | 'slightly-overpriced' | 'overpriced'

export type RiskLevel = 'low' | 'medium' | 'high'
export type GrowthOutlook = 'strong' | 'moderate' | 'flat' | 'declining'

// ─── Request ──────────────────────────────────────────────────────────────────

export interface AnalyzePropertyRequest {
  // Address components
  address:      string          // full display address
  street?:      string
  suburb:       string
  state:        AustralianState
  postcode:     string

  // Property details
  type:          PropertyType
  purpose:       InvestmentPurpose
  listingPrice?: string         // raw numeric string e.g. "750000"

  // Optional enrichment
  bedrooms?:    number
  bathrooms?:   number
  carSpaces?:   number
  landSize?:    string
}

// ─── Sub-sections of the report ───────────────────────────────────────────────

export interface PropertyFeatures {
  bedrooms?:     number
  bathrooms?:    number
  carSpaces?:    number
  landSize?:     string
  buildYear?:    number
  propertyType:  string
  floorArea?:    string
}

export interface MarketData {
  estimatedValue:   string     // "AUD $720,000"
  medianSuburb:     string     // "AUD $695,000"
  priceAssessment:  PriceAssessment
  priceDiffPercent: number     // +5.2 means 5.2% over estimate
  rentalYield:      string     // "4.1%"
  weeklyRent:       string     // "AUD $580/week"
  vacancyRate:      string     // "1.2%"
  daysOnMarket:     number
}

export interface GrowthData {
  past1yr:    string     // "+5.2%"
  past3yr:    string     // "+18.4%"
  past5yr:    string     // "+41.2%"
  forecast1yr: string    // "+4.0%"
  forecast3yr: string    // "+14.0%"
  forecast5yr: string    // "+28.0%"
  trendScore: {          // 0–100 for chart rendering
    past1yr:  number; past3yr: number; past5yr: number
    next1yr:  number; next3yr: number; next5yr: number
  }
  outlook: GrowthOutlook
  narrativePast:    string
  narrativeFuture:  string
}

export interface RBAEconomics {
  cashRate:         string    // "4.10%"
  rateDate:         string    // "May 2025"
  rateDirection:    'rising' | 'holding' | 'falling'
  borrowingImpact:  string    // narrative sentence
  policyAnalysis:   string    // 2-3 sentence analysis
  stampDuty:        string    // estimate
  landTax:          string    // threshold note
  investorImpact:   string    // concise sentence
}

export interface SuburbProfile {
  overview:         string
  demographics:     string
  medianHhIncome:   string
  ownerOccupierPct: string
  population:       string
  growthArea:       boolean
}

export interface SafetyTransport {
  safetyRating:    number   // 0–100
  safetyNote:      string
  transitScore:    number   // 0–100
  transitDetail:   string
  walkScore:       number
  bikeScore:       number
  cbdCommute:      string   // "28 min by car"
  busRoutes:       string[]
  trainAccess:     string
}

export interface SchoolsAmenities {
  schoolScore:     number   // 0–100
  primarySchools:  string[]
  secondarySchools:string[]
  schoolZoneNote:  string
  amenitiesScore:  number   // 0–100
  shoppingCentres: string[]
  hospitals:       string[]
  parks:           string[]
  cafesRestaurants: string
}

export interface DevelopmentSignals {
  newDevelopments:  string[]   // list of concrete projects
  xFactors:         string[]   // wildcard price catalysts
  rezoning:         string
  infrastructurePipeline: string
  populationTrend:  string
}

export interface BuildCondition {
  overallScore:    number   // 0–100
  buildQuality:    number
  renovationPct:   number   // potential renovation score
  structuralRisk:  number   // 0-100 RISK (lower = better)
  maintenanceRisk: number   // 0-100 RISK (lower = better)
  buildNote:       string
  inspectionTips:  string[]
  estimatedRenovCost?: string
}

export interface InvestmentAnalysis {
  verdict:        InvestmentVerdict
  overallScore:   number      // 0–100
  confidenceLevel: 'high' | 'medium' | 'low'
  pros:           string[]    // 4–5 specific items
  cons:           string[]    // 3–4 specific items
  riskLevel:      RiskLevel
  riskFactors:    string[]    // specific risks
  cashflowAnalysis: string
  capitalGrowthCase: string
  holdPeriodAdvice:  string
  finalSummary:      string   // 3–4 sentence verdict
  keyMetrics: {
    grossYield:     string
    netYieldEst:    string
    cashflowWeekly: string    // "–$120/wk" or "+$80/wk"
    breakEvenYears: string
  }
}

// ─── Full report ──────────────────────────────────────────────────────────────

export interface PropertyReport {
  // Meta
  reportId:    string
  generatedAt: string
  version:     string

  // Identity
  address:      string
  suburb:       string
  state:        AustralianState
  postcode:     string
  propertyType: PropertyType
  purpose:      InvestmentPurpose

  // Sections
  features:     PropertyFeatures
  market:       MarketData
  growth:       GrowthData
  economics:    RBAEconomics
  suburbProfile: SuburbProfile
  safetyTransport: SafetyTransport
  schoolsAmenities: SchoolsAmenities
  developments: DevelopmentSignals
  buildCondition: BuildCondition
  investment:   InvestmentAnalysis
}

// ─── API types ────────────────────────────────────────────────────────────────

export interface AnalyzePropertyResponse {
  success:    boolean
  report?:    PropertyReport
  cached?:    boolean
  error?:     string
  requestId?: string
}

export interface SearchAddressResponse {
  success:     boolean
  suggestions: AddressSuggestion[]
  error?:      string
}

export interface AddressSuggestion {
  display:  string
  street:   string
  suburb:   string
  state:    AustralianState
  postcode: string
  placeId?: string
}
