import type { PropertyReport, AnalyzePropertyRequest } from '@/types/report'
import { getSuburbContext, getStampDutyEstimate, RBA_CONTEXT } from '@/lib/mock/property-data'

function rid() {
  return 'RPT-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

export function generateMockReport(req: AnalyzePropertyRequest): PropertyReport {
  const suburb = getSuburbContext(req.suburb, req.state, req.postcode)
  const listingNum = req.listingPrice ? parseInt(req.listingPrice) : null
  const estimatedNum = listingNum ? Math.round(listingNum * 0.96) : 720000
  const estimatedStr = `AUD $${estimatedNum.toLocaleString()}`
  const priceDiff = listingNum ? parseFloat(((listingNum - estimatedNum) / estimatedNum * 100).toFixed(1)) : 0
  const priceAssessment = priceDiff > 5 ? 'overpriced' : priceDiff > 2 ? 'slightly-overpriced' : priceDiff < -3 ? 'undervalued' : 'fair-value'
  const stampDuty = listingNum ? getStampDutyEstimate(req.state, listingNum) : 'Not calculated'

  return {
    reportId:     rid(),
    generatedAt:  new Date().toISOString(),
    version:      '2.0',
    address:      req.address,
    suburb:       req.suburb,
    state:        req.state,
    postcode:     req.postcode,
    propertyType: req.type,
    purpose:      req.purpose,

    features: {
      bedrooms:    req.bedrooms    ?? 3,
      bathrooms:   req.bathrooms   ?? 2,
      carSpaces:   req.carSpaces   ?? 1,
      landSize:    req.landSize    ?? '420 sqm',
      buildYear:   2005,
      propertyType: req.type.charAt(0).toUpperCase() + req.type.slice(1),
      floorArea:   '185 sqm',
    },

    market: {
      estimatedValue:   estimatedStr,
      medianSuburb:     req.type === 'unit' ? suburb.medianUnitPrice : suburb.medianHousePrice,
      priceAssessment,
      priceDiffPercent: priceDiff,
      rentalYield:      suburb.rentalYield,
      weeklyRent:       `AUD ${suburb.weeklyRentHouse}/week`,
      vacancyRate:      suburb.vacancyRate,
      daysOnMarket:     24,
    },

    growth: {
      past1yr:    suburb.coreLogicGrowth1yr,
      past3yr:    '+18.4%',
      past5yr:    suburb.coreLogicGrowth5yr,
      forecast1yr: '+4.5%',
      forecast3yr: '+14.2%',
      forecast5yr: '+28.5%',
      trendScore: { past1yr: 62, past3yr: 70, past5yr: 80, next1yr: 60, next3yr: 66, next5yr: 73 },
      outlook:    'moderate',
      narrativePast:   `${req.suburb} has demonstrated resilient price growth over the past 5 years, with ${suburb.coreLogicGrowth5yr} total appreciation driven by strong demand fundamentals and limited new supply. The post-COVID period saw accelerated growth, which has since moderated to a sustainable pace.`,
      narrativeFuture: `The 5-year growth outlook for ${req.suburb} remains positive, underpinned by infrastructure investment, population growth, and the current rate-cutting cycle expected to stimulate buyer demand. We forecast 4-5% annual appreciation through to 2030, with upside risk from the planned developments noted above.`,
    },

    economics: {
      cashRate:        RBA_CONTEXT.cashRate,
      rateDate:        RBA_CONTEXT.rateDate,
      rateDirection:   'holding',
      borrowingImpact: `At ${RBA_CONTEXT.cashRate}, a typical investor borrowing $600,000 over 30 years pays approximately $3,200/month. A further 25bps cut would reduce this by approximately $90/month.`,
      policyAnalysis:  `The ${RBA_CONTEXT.rateDate} hold follows a February 2025 cut, signalling the RBA is cautiously easing. For ${req.suburb} ${req.state} investors, improved borrowing conditions in H2 2025 should support buyer activity and underpin price floors. ${req.state} land tax thresholds and investor surcharges remain a key cost consideration.`,
      stampDuty,
      landTax:         `${req.state} land tax applies above the state threshold. Investors should obtain a land tax assessment. Primary residence is exempt.`,
      investorImpact:  `Net yield after rates, land tax, and management fees estimated at 2.8-3.2% — consistent with established inner-ring markets.`,
    },

    suburbProfile: {
      overview:         `${req.suburb} is a ${suburb.suburbCharacter}`,
      demographics:     `Predominantly ${parseInt(suburb.ownerOccupierPct) > 55 ? 'owner-occupier' : 'renter'} demographic with median household income of ${suburb.medianHhIncome}. Strong family appeal.`,
      medianHhIncome:   suburb.medianHhIncome,
      ownerOccupierPct: suburb.ownerOccupierPct,
      population:       suburb.population,
      growthArea:       true,
    },

    safetyTransport: {
      safetyRating:  76,
      safetyNote:    suburb.safetyNote,
      transitScore:  suburb.trainLines[0].includes('No') ? 52 : 74,
      transitDetail: `${suburb.trainLines.join(', ')}. CBD commute approximately ${suburb.cbdCommuteMin} minutes by car.`,
      walkScore:     55,
      bikeScore:     42,
      cbdCommute:    `${suburb.cbdCommuteMin} min drive / ${suburb.cbdCommuteMin + 15} min public transport`,
      busRoutes:     suburb.trainLines,
      trainAccess:   suburb.trainLines[0],
    },

    schoolsAmenities: {
      schoolScore:      74,
      primarySchools:   suburb.primarySchools,
      secondarySchools: suburb.secondarySchools,
      schoolZoneNote:   `Being in the catchment for ${suburb.primarySchools[0]} adds measurable value — zone properties typically command a 5-8% premium vs comparable non-zone stock.`,
      amenitiesScore:   78,
      shoppingCentres:  suburb.shoppingCentres,
      hospitals:        suburb.hospitals,
      parks:            [`${req.suburb} Reserve`, `${req.suburb} Oval`, 'Foreshore walking track'],
      cafesRestaurants: `${req.suburb} has a growing cafe culture along the main strip, with multiple independent coffee shops, casual dining, and a weekend farmers market nearby.`,
    },

    developments: {
      newDevelopments:        suburb.recentDevelopments,
      xFactors:               [
        `${suburb.recentDevelopments[0]} — potential 8-15% uplift in adjacent property values on completion`,
        `Rising interstate migration to ${req.state} continues to absorb new supply faster than expected`,
        `Falling interest rates in H2 2025 could trigger a demand surge in the $600K-$900K segment`,
        `${req.suburb} rezoning watch — monitor council planning updates for medium-density approvals`,
      ],
      rezoning:               `No current rezoning applications for ${req.suburb} centre. Council is reviewing the local strategic planning statement for 2026-2036.`,
      infrastructurePipeline: suburb.recentDevelopments.slice(0, 2).join('. '),
      populationTrend:        `${req.state} population grew 1.8% in 2024, with ${req.suburb} and surrounding LGA absorbing strong net migration inflows.`,
    },

    buildCondition: {
      overallScore:    72,
      buildQuality:    74,
      renovationPct:   65,
      structuralRisk:  22,
      maintenanceRisk: 30,
      buildNote:       `${req.type.charAt(0).toUpperCase() + req.type.slice(1)}s in ${req.suburb} built in this era typically feature brick veneer or double-brick construction with good thermal performance. Expect standard maintenance costs with no major structural concerns for well-maintained stock.`,
      inspectionTips:  [
        'Commission a full pest and building inspection — budget $500-$800',
        'Check roof condition and guttering — Hobart winters are wet',
        'Inspect plumbing for any cast-iron pipes (common in pre-1980 stock)',
        req.type !== 'house' ? 'Review strata financial statements — check the sinking fund balance' : 'Check boundary fencing and retaining walls',
      ],
      estimatedRenovCost: 'AUD $25,000 - $60,000 for cosmetic refresh to unlock equity',
    },

    investment: {
      verdict:         'Good Buy',
      overallScore:    74,
      confidenceLevel: 'medium',
      pros: [
        `${req.suburb} has a vacancy rate of ${suburb.vacancyRate} — well below the 3% threshold indicating strong rental demand`,
        `Gross rental yield of ${suburb.rentalYield} is competitive for established ${req.type === 'unit' ? 'unit' : 'house'} stock`,
        `${suburb.coreLogicGrowth5yr} 5-year capital growth demonstrates long-term resilience`,
        `${suburb.recentDevelopments[0] ?? 'Infrastructure investment'} will improve liveability and long-term values`,
        `Strong owner-occupier rate (${suburb.ownerOccupierPct}) provides price floor stability`,
      ],
      cons: [
        listingNum && priceDiff > 2 ? `Listing is approximately ${priceDiff}% above our AI estimated market value of ${estimatedStr} — negotiate before exchanging` : 'Limited negotiating room at current asking price',
        `${suburb.riskFactors[0] ?? 'Market conditions may moderate near-term growth'}`,
        `${suburb.riskFactors[1] ?? 'Interest rate sensitivity may impact borrowing costs'}`,
        `Stamp duty of approximately ${stampDuty} adds to upfront acquisition cost`,
      ],
      riskLevel:         'medium',
      riskFactors:       suburb.riskFactors,
      cashflowAnalysis:  `At ${suburb.rentalYield} gross yield, weekly rent of ${suburb.weeklyRentHouse} covers approximately 75-80% of interest-only repayments at current rates. Estimated cash flow: -$80 to -$150/week negative gearing position, improving as rates fall.`,
      capitalGrowthCase: `The primary investment case is capital growth. ${req.suburb} has historically outperformed the broader ${req.state} median. The combination of infrastructure investment, population growth, and supply constraints supports a 4-6% annual appreciation thesis over a 7-10 year hold.`,
      holdPeriodAdvice:  `Recommend a minimum 7-year hold to fully capture the infrastructure uplift from ${suburb.recentDevelopments[0] ?? 'planned developments'}. Short-term (1-3 year) resale likely to face headwinds from stamp duty recoupment and transaction costs.`,
      finalSummary:      `${req.suburb} presents a solid medium-term investment case with a good balance of yield and growth potential. The vacancy rate of ${suburb.vacancyRate} confirms strong rental demand, and the suburb profile supports sustained owner-occupier price floors. ${listingNum && priceDiff > 3 ? `The current listing at ${listingStr} appears ${Math.round(priceDiff)}% above our estimated fair value of ${estimatedStr} — we recommend negotiating toward ${estimatedStr} before exchange.` : 'Pricing appears reasonable relative to suburb fundamentals.'} For a ${req.purpose === 'investment' ? 'rental investor' : 'owner-occupier'}, this is a Good Buy subject to a satisfactory building inspection.`,
      keyMetrics: {
        grossYield:     suburb.rentalYield,
        netYieldEst:    `${(parseFloat(suburb.rentalYield) - 1.2).toFixed(1)}% (est. after costs)`,
        cashflowWeekly: '-$120/wk (est. negative gearing)',
        breakEvenYears: '8-10 years',
      },
    },
  }
}
