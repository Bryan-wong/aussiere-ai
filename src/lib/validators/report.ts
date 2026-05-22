import { z } from 'zod'

// ─── Sub-schemas ──────────────────────────────────────────────────────────────

const FeaturesSchema = z.object({
  bedrooms:     z.number().nullable().optional(),
  bathrooms:    z.number().nullable().optional(),
  carSpaces:    z.number().nullable().optional(),
  landSize:     z.string().optional(),
  buildYear:    z.number().nullable().optional(),
  propertyType: z.string(),
  floorArea:    z.string().optional(),
})

const MarketSchema = z.object({
  estimatedValue:   z.string(),
  medianSuburb:     z.string(),
  priceAssessment:  z.enum(['undervalued', 'fair-value', 'slightly-overpriced', 'overpriced']),
  priceDiffPercent: z.number(),
  rentalYield:      z.string(),
  weeklyRent:       z.string(),
  vacancyRate:      z.string(),
  daysOnMarket:     z.number(),
})

const TrendScoreSchema = z.object({
  past1yr: z.number().min(0).max(100),
  past3yr: z.number().min(0).max(100),
  past5yr: z.number().min(0).max(100),
  next1yr: z.number().min(0).max(100),
  next3yr: z.number().min(0).max(100),
  next5yr: z.number().min(0).max(100),
})

const GrowthSchema = z.object({
  past1yr:         z.string(),
  past3yr:         z.string(),
  past5yr:         z.string(),
  forecast1yr:     z.string(),
  forecast3yr:     z.string(),
  forecast5yr:     z.string(),
  trendScore:      TrendScoreSchema,
  outlook:         z.enum(['strong', 'moderate', 'flat', 'declining']),
  narrativePast:   z.string(),
  narrativeFuture: z.string(),
})

const EconomicsSchema = z.object({
  cashRate:        z.string(),
  rateDate:        z.string(),
  rateDirection:   z.enum(['rising', 'holding', 'falling']),
  borrowingImpact: z.string(),
  policyAnalysis:  z.string(),
  stampDuty:       z.string(),
  landTax:         z.string(),
  investorImpact:  z.string(),
})

const SuburbProfileSchema = z.object({
  overview:         z.string(),
  demographics:     z.string(),
  medianHhIncome:   z.string(),
  ownerOccupierPct: z.string(),
  population:       z.string(),
  growthArea:       z.boolean(),
})

const SafetyTransportSchema = z.object({
  safetyRating:  z.number().min(0).max(100),
  safetyNote:    z.string(),
  transitScore:  z.number().min(0).max(100),
  transitDetail: z.string(),
  walkScore:     z.number().min(0).max(100),
  bikeScore:     z.number().min(0).max(100),
  cbdCommute:    z.string(),
  busRoutes:     z.array(z.string()),
  trainAccess:   z.string(),
})

const SchoolsAmenitiesSchema = z.object({
  schoolScore:       z.number().min(0).max(100),
  primarySchools:    z.array(z.string()),
  secondarySchools:  z.array(z.string()),
  schoolZoneNote:    z.string(),
  amenitiesScore:    z.number().min(0).max(100),
  shoppingCentres:   z.array(z.string()),
  hospitals:         z.array(z.string()),
  parks:             z.array(z.string()),
  cafesRestaurants:  z.string(),
})

const DevelopmentsSchema = z.object({
  newDevelopments:        z.array(z.string()),
  xFactors:               z.array(z.string()),
  rezoning:               z.string(),
  infrastructurePipeline: z.string(),
  populationTrend:        z.string(),
})

const BuildConditionSchema = z.object({
  overallScore:       z.number().min(0).max(100),
  buildQuality:       z.number().min(0).max(100),
  renovationPct:      z.number().min(0).max(100),
  structuralRisk:     z.number().min(0).max(100),
  maintenanceRisk:    z.number().min(0).max(100),
  buildNote:          z.string(),
  inspectionTips:     z.array(z.string()),
  estimatedRenovCost: z.string().optional(),
})

const KeyMetricsSchema = z.object({
  grossYield:     z.string(),
  netYieldEst:    z.string(),
  cashflowWeekly: z.string(),
  breakEvenYears: z.string(),
})

const InvestmentSchema = z.object({
  verdict:           z.enum(['Strong Buy', 'Good Buy', 'Long-Term Hold', 'Proceed with Caution', 'High Risk', 'Not Recommended']),
  overallScore:      z.number().min(0).max(100),
  confidenceLevel:   z.enum(['high', 'medium', 'low']),
  pros:              z.array(z.string()).min(3).max(6),
  cons:              z.array(z.string()).min(2).max(5),
  riskLevel:         z.enum(['low', 'medium', 'high']),
  riskFactors:       z.array(z.string()),
  cashflowAnalysis:  z.string(),
  capitalGrowthCase: z.string(),
  holdPeriodAdvice:  z.string(),
  finalSummary:      z.string(),
  keyMetrics:        KeyMetricsSchema,
})

// ─── Full report schema ───────────────────────────────────────────────────────

export const PropertyReportSchema = z.object({
  reportId:         z.string(),
  generatedAt:      z.string(),
  version:          z.string(),
  address:          z.string(),
  suburb:           z.string(),
  state:            z.string(),
  postcode:         z.string(),
  propertyType:     z.string(),
  purpose:          z.string(),
  features:         FeaturesSchema,
  market:           MarketSchema,
  growth:           GrowthSchema,
  economics:        EconomicsSchema,
  suburbProfile:    SuburbProfileSchema,
  safetyTransport:  SafetyTransportSchema,
  schoolsAmenities: SchoolsAmenitiesSchema,
  developments:     DevelopmentsSchema,
  buildCondition:   BuildConditionSchema,
  investment:       InvestmentSchema,
})

export type ValidatedReport = z.infer<typeof PropertyReportSchema>

// ─── Request validation ───────────────────────────────────────────────────────

export const AnalyzeRequestSchema = z.object({
  address:      z.string().min(5).max(200),
  street:       z.string().optional(),
  suburb:       z.string().min(2).max(80),
  state:        z.enum(['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'ACT', 'NT']),
  postcode:     z.string().regex(/^\d{4}$/, 'Postcode must be 4 digits'),
  type:         z.enum(['house', 'unit', 'townhouse', 'land', 'villa', 'studio']),
  purpose:      z.enum(['investment', 'owner-occupier', 'both']),
  listingPrice: z.string().regex(/^\d+$/).optional(),
  bedrooms:     z.number().int().min(0).max(20).optional(),
  bathrooms:    z.number().int().min(0).max(10).optional(),
  carSpaces:    z.number().int().min(0).max(10).optional(),
  landSize:     z.string().optional(),
})
