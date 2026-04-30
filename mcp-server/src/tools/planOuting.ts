import { BASE_URL } from './index.js'

export const planOutingTool = {
  name: 'planOuting',
  description:
    'Compose a complete outing plan: event details + venue logistics + top-3 nearby restaurants within 600m + suggested arrival time (30 min before show) + parking recommendation + affiliate purchase link. Use after the user has chosen a specific event from a searchEvents result.',
  inputSchema: {
    type: 'object',
    required: ['event_slug'],
    properties: {
      event_slug: {
        type: 'string',
        description: 'Event slug from a searchEvents result, e.g. "al-bano-in-israel".',
      },
      lang: {
        type: 'string',
        enum: ['he', 'ru'],
        default: 'he',
      },
    },
  },
}

export async function callPlanOuting(args: Record<string, unknown>) {
  const eventSlug = args.event_slug
  if (!eventSlug || typeof eventSlug !== 'string') {
    throw new Error('event_slug is required (string)')
  }
  const url = new URL('/api/plan', BASE_URL)
  url.searchParams.set('event_slug', eventSlug)
  if (args.lang) url.searchParams.set('lang', String(args.lang))
  const resp = await fetch(url.toString())
  if (!resp.ok) {
    throw new Error(`planOuting HTTP ${resp.status}: ${await resp.text()}`)
  }
  return resp.json()
}
