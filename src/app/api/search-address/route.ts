import { NextRequest, NextResponse } from 'next/server'
import type { SearchAddressResponse, AddressSuggestion, AustralianState } from '@/types'

// ── Mock suggestions for development ──────────────────────────────────────────
// Replace this function body with real Google Places / Mapbox / ABS API calls
function generateMockSuggestions(query: string): AddressSuggestion[] {
  const q = query.toLowerCase()

  const stateDetection: Record<string, AustralianState> = {
    'nsw': 'NSW', 'new south wales': 'NSW', 'sydney': 'NSW', 'newtown': 'NSW',
    'vic': 'VIC', 'victoria': 'VIC', 'melbourne': 'VIC', 'fitzroy': 'VIC',
    'qld': 'QLD', 'queensland': 'QLD', 'brisbane': 'QLD', 'newstead': 'QLD',
    'sa':  'SA',  'south australia': 'SA',  'adelaide': 'SA',
    'wa':  'WA',  'western australia': 'WA', 'perth': 'WA',
    'tas': 'TAS', 'tasmania': 'TAS', 'hobart': 'TAS', 'kingston': 'TAS',
    'act': 'ACT', 'canberra': 'ACT',
    'nt':  'NT',  'darwin': 'NT',
  }

  let detectedState: AustralianState | undefined
  for (const [keyword, state] of Object.entries(stateDetection)) {
    if (q.includes(keyword)) { detectedState = state; break }
  }

  // Generate plausible suggestions based on the query
  const suggestions: AddressSuggestion[] = []
  const states: AustralianState[] = detectedState
    ? [detectedState]
    : ['NSW', 'VIC', 'QLD', 'WA', 'TAS']

  const suburbMap: Partial<Record<AustralianState, { suburb: string; postcode: string }>> = {
    NSW: { suburb: 'Newtown',     postcode: '2042' },
    VIC: { suburb: 'Fitzroy',     postcode: '3065' },
    QLD: { suburb: 'Newstead',    postcode: '4006' },
    WA:  { suburb: 'Subiaco',     postcode: '6008' },
    TAS: { suburb: 'Kingston',    postcode: '7050' },
    SA:  { suburb: 'Unley',       postcode: '5061' },
    ACT: { suburb: 'Braddon',     postcode: '2612' },
    NT:  { suburb: 'Stuart Park', postcode: '0820' },
  }

  for (const state of states.slice(0, 4)) {
    const info = suburbMap[state]
    if (!info) continue
    suggestions.push({
      display:  `${query}, ${info.suburb} ${state} ${info.postcode}`,
      street:   query,
      suburb:   info.suburb,
      state,
      postcode: info.postcode,
    })
  }

  return suggestions
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.trim()

    if (!query || query.length < 3) {
      return NextResponse.json<SearchAddressResponse>({ success: true, suggestions: [] })
    }

    // ── Production: replace with real autocomplete API ──────────────────────
    // Example with Google Places:
    // const response = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&components=country:au&types=address&key=${process.env.GOOGLE_PLACES_API_KEY}`
    // )
    // const data = await response.json()
    // const suggestions = data.predictions.map(parsePrediction)
    // ── ────────────────────────────────────────────────────────────────────

    const suggestions = generateMockSuggestions(query)

    return NextResponse.json<SearchAddressResponse>({ success: true, suggestions })
  } catch (error) {
    console.error('[search-address]', error)
    return NextResponse.json<SearchAddressResponse>(
      { success: false, suggestions: [], error: 'Failed to search addresses' },
      { status: 500 }
    )
  }
}
