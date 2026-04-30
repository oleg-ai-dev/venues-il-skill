import { BASE_URL } from './index.js'

export const getVenueInfoTool = {
  name: 'getVenueInfo',
  description:
    "Get venue logistics for an Israeli venue: parking, public transport, nearby restaurants, capacity, accessibility. Use the venue's slug from a searchEvents result. Coverage: 96.5% transport, 84% full logistics; rural venues may have null fields (check `data_completeness`).",
  inputSchema: {
    type: 'object',
    required: ['slug'],
    properties: {
      slug: {
        type: 'string',
        description:
          'Venue slug as used on venues-israel.com. Examples: auditorium-rozin-tel-aviv, beit-hagafen-haifa, house-abba-hushi-haifa.',
      },
      lang: {
        type: 'string',
        enum: ['he', 'ru'],
        default: 'he',
        description: 'Response language for any localized fields.',
      },
    },
  },
}

export async function callGetVenueInfo(args: Record<string, unknown>) {
  const slug = args.slug
  if (!slug || typeof slug !== 'string') {
    throw new Error('slug is required (string)')
  }
  const url = new URL('/api/venue/query', BASE_URL)
  url.searchParams.set('slug', slug)
  if (args.lang) url.searchParams.set('lang', String(args.lang))
  const resp = await fetch(url.toString())
  if (!resp.ok) {
    throw new Error(`getVenueInfo HTTP ${resp.status}: ${await resp.text()}`)
  }
  return resp.json()
}
