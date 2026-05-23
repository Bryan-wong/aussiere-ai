import { NextRequest, NextResponse } from 'next/server'
import type { SearchAddressResponse, AddressSuggestion, AustralianState } from '@/types'

// ── Parse the user's raw query into address components ────────────────────────
// Handles formats like:
//   "1/3 Lennox Avenue Newtown 7009"
//   "27 George St, Newtown NSW 2042"
//   "Spring Farm NSW"
//   "Fitzroy VIC 3065"

const STATE_CODES: AustralianState[] = ['NSW','VIC','QLD','SA','WA','TAS','ACT','NT']

const STATE_WORDS: Record<string, AustralianState> = {
  'new south wales': 'NSW', 'victoria': 'VIC', 'queensland': 'QLD',
  'south australia': 'SA', 'western australia': 'WA', 'tasmania': 'TAS',
  'australian capital territory': 'ACT', 'northern territory': 'NT',
}

function parseQuery(raw: string): {
  street: string
  suburb: string
  state:  AustralianState | null
  postcode: string
} {
  let q = raw.trim()

  // Extract 4-digit postcode
  const postcodeMatch = q.match(/\b(\d{4})\b/)
  const postcode = postcodeMatch ? postcodeMatch[1] : ''
  if (postcode) q = q.replace(postcodeMatch![0], '').trim()

  // Extract state code (e.g. NSW, VIC)
  let state: AustralianState | null = null
  for (const code of STATE_CODES) {
    const re = new RegExp(`\\b${code}\\b`, 'i')
    if (re.test(q)) { state = code; q = q.replace(re, '').trim(); break }
  }
  // Extract state as full word
  if (!state) {
    for (const [word, code] of Object.entries(STATE_WORDS)) {
      if (q.toLowerCase().includes(word)) {
        state = code
        q = q.replace(new RegExp(word, 'i'), '').trim()
        break
      }
    }
  }

  // Clean up extra commas/spaces
  q = q.replace(/,+/g, ',').replace(/\s+/g, ' ').replace(/^[,\s]+|[,\s]+$/g, '').trim()

  // Split on comma: "street, suburb" or just "suburb"
  const parts = q.split(',').map(p => p.trim()).filter(Boolean)

  let street = ''
  let suburb = ''

  if (parts.length >= 2) {
    street = parts[0]
    suburb = parts[1]
  } else if (parts.length === 1) {
    // Single part — figure out if it's street+suburb or just suburb
    const words = parts[0].split(' ')
    // If first token looks like a street number (digit or unit like "1/3"), treat as street
    if (/^\d|^\d+\/\d+/.test(words[0]) && words.length > 1) {
      // Last word(s) are likely suburb — heuristic: last capitalised word
      street = parts[0]
      suburb = ''
    } else {
      suburb = parts[0]
    }
  }

  return { street, suburb, state, postcode }
}

// ── Build suggestions from parsed query ────────────────────────────────────────
function buildSuggestions(query: string): AddressSuggestion[] {
  const parsed = parseQuery(query)
  const suggestions: AddressSuggestion[] = []

  if (parsed.state && parsed.postcode) {
    // Best case: state AND postcode both explicit in query
    const displaySuburb = parsed.suburb || parsed.street
    suggestions.push({
      display:  `${parsed.street ? parsed.street + ', ' : ''}${displaySuburb}, ${parsed.state} ${parsed.postcode}`,
      street:   parsed.street,
      suburb:   displaySuburb,
      state:    parsed.state,
      postcode: parsed.postcode,
    })
  } else if (parsed.state && parsed.suburb) {
    // State known, no postcode — show just the one match
    suggestions.push({
      display:  `${parsed.street ? parsed.street + ', ' : ''}${parsed.suburb}, ${parsed.state}`,
      street:   parsed.street,
      suburb:   parsed.suburb,
      state:    parsed.state,
      postcode: parsed.postcode || '',
    })
  } else if (parsed.state) {
    // Only state, use street as suburb
    suggestions.push({
      display:  `${parsed.street}, ${parsed.state}`,
      street:   parsed.street,
      suburb:   parsed.street,
      state:    parsed.state,
      postcode: parsed.postcode || '',
    })
  } else {
    // No state detected — show raw input as a single "Search for:" option
    // Let user confirm by clicking it
    const displayText = query.trim()
    suggestions.push({
      display:  displayText,
      street:   parsed.street || displayText,
      suburb:   parsed.suburb || displayText,
      state:    'NSW',   // default — user can change
      postcode: parsed.postcode || '',
    })
  }

  return suggestions.filter(s => s.display.length > 3)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.trim()

    if (!query || query.length < 3) {
      return NextResponse.json<SearchAddressResponse>({ success: true, suggestions: [] })
    }

    // ── Production: swap this for Google Places / Mapbox ─────────────────────
    // const res = await fetch(
    //   `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
    //   `?input=${encodeURIComponent(query)}&components=country:au&types=address` +
    //   `&key=${process.env.GOOGLE_PLACES_API_KEY}`
    // )
    // const data = await res.json()
    // const suggestions = data.predictions.map(parsePlacesPrediction)
    // ─────────────────────────────────────────────────────────────────────────

    const suggestions = buildSuggestions(query)

    return NextResponse.json<SearchAddressResponse>({ success: true, suggestions })
  } catch (error) {
    console.error('[search-address]', error)
    return NextResponse.json<SearchAddressResponse>(
      { success: false, suggestions: [], error: 'Failed to search addresses' },
      { status: 500 }
    )
  }
}