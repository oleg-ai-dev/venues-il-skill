import { BASE_URL } from './index.js'

export const searchEventsTool = {
  name: 'searchEvents',
  description:
    'Search live events in Israel by city, genre, date, price, or artist. Returns events with affiliate purchase links. Bilingual (Hebrew + Russian).',
  inputSchema: {
    type: 'object',
    properties: {
      city: {
        type: 'string',
        description:
          'Normalized city slug. Examples: tel-aviv, haifa, jerusalem, beer-sheva, ramat-gan, herzliya, netanya, ashdod, petah-tikva.',
      },
      genre: {
        type: 'string',
        enum: ['concert', 'theater', 'standup', 'musical', 'dance', 'classical', 'opera', 'children', 'festival', 'lecture'],
        description: 'Event genre.',
      },
      lang: {
        type: 'string',
        enum: ['he', 'ru'],
        default: 'he',
        description: "Response language. 'he' returns Hebrew + kartisim.co.il checkout. 'ru' returns Russian + kassa.co.il checkout.",
      },
      date_from: {
        type: 'string',
        format: 'date',
        description: 'Filter events starting from this date (YYYY-MM-DD).',
      },
      price_max: {
        type: 'integer',
        description: 'Maximum ticket price in NIS.',
      },
      artist: {
        type: 'string',
        description: 'Artist or performer name (partial match).',
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 50,
        default: 10,
      },
    },
  },
}

export async function callSearchEvents(args: Record<string, unknown>) {
  const url = new URL('/api/events/query', BASE_URL)
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
  }
  const resp = await fetch(url.toString())
  if (!resp.ok) {
    throw new Error(`searchEvents HTTP ${resp.status}: ${await resp.text()}`)
  }
  return resp.json()
}
