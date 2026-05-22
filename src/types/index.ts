// ─── Address ──────────────────────────────────────────────────────────────────
export interface AddressSuggestion {
  display:  string
  street:   string
  suburb:   string
  state:    AustralianState
  postcode: string
}

export type AustralianState = 'NSW' | 'VIC' | 'QLD' | 'SA' | 'WA' | 'TAS' | 'ACT' | 'NT'

// ─── Property ─────────────────────────────────────────────────────────────────
export type PropertyType = 'house' | 'unit' | 'townhouse' | 'land'
export type InvestmentPurpose = 'investment' | 'owner' | 'both'

export interface PropertyFeatures {
  bedrooms?:    number
  bathrooms?:   number
  carSpaces?:   number
  landSize?:    string
  buildYear?:   number
  propertyType: string
}

// ─── Report ───────────────────────────────────────────────────────────────────
export type InvestmentVerdict =
  | 'Strong Buy'
  | 'Good Buy'
  | 'Long-Term Hold'
  | 'Proceed with Caution'
  | 'High Risk'
  | 'Not Recommended'

export interface TrendScores {
  past1yr: number
  past3yr: number
  past5yr: number
  next1yr: number
  next3yr: number
  next5yr: number
}

export interface BuildQualityScores {
  build:      number
  reno:       number
  structRisk: number
  maintenance: number
}

export interface PropertyReport {
  // Identity
  suburb:        string
  state:         AustralianState
  propertyType:  PropertyType
  address:       string

  // Verdict
  overallScore:  number           // 0-100
  verdict:       InvestmentVerdict

  // Market
  estimatedMarketValue: string
  medianPrice:          string
  rentalYield:          string
  vacancyRate:          string
  fiveYrGrowth:         string
  listingPrice?:        string
  priceAssessment?:     'overpriced' | 'fair' | 'undervalued'
  priceDiffPct?:        number

  // RBA / Economy
  rbaCashRate: string
  rbaDate:     string

  // Features
  propertyFeatures: PropertyFeatures

  // Investment Analysis
  pros:     string[]
  cons:     string[]
  xFactors: string[]

  // Trends
  trendNarrative: string
  trendScores:    TrendScores

  // Policy
  policyAnalysis: string
  taxSummary:     string

  // Community
  communityScore:  number
  safetyScore:     number
  transitScore:    number
  schoolScore:     number
  amenitiesScore:  number
  schoolDetail:    string
  transitDetail:   string
  shoppingDetail:  string
  newDevelopments: string
  costOfLiving:    string
  environment:     string

  // Build Quality
  buildQualityNote:   string
  buildQualityScores: BuildQualityScores

  // Summary
  finalSummary: string

  // Meta
  generatedAt: string
}

// ─── API Request / Response ───────────────────────────────────────────────────
export interface AnalyzePropertyRequest {
  address:      string
  street?:      string
  suburb:       string
  state:        AustralianState
  postcode:     string
  type:         PropertyType
  purpose:      InvestmentPurpose
  listingPrice?: string
}

export interface AnalyzePropertyResponse {
  success: boolean
  report?: PropertyReport
  error?:  string
}

export interface SearchAddressResponse {
  success:     boolean
  suggestions: AddressSuggestion[]
  error?:      string
}
