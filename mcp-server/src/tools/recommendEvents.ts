import { BASE_URL } from './index.js'

export const recommendEventsTool = {
  name: 'recommendEvents',
  description:
    "Natural-language event recommendations. Personalized by genre, city, mood, budget, family-friendliness — extracted from a free-form query via Claude Haiku. Use when the user gives fuzzy preferences ('something romantic for date night', 'a high-energy show this weekend') rather than specific filters.",
  inputSchema: {
    type: 'object',
    required: ['query'],
    properties: {
      query: {
        type: 'string',
        description:
          'Free-form description of what the user wants. Example: "rock concert in Tel Aviv next weekend under 200 NIS".',
      },
      lang: {
        type: 'string',
        enum: ['he', 'ru'],
        default: 'he',
        description: "Strict language filter — only events with content in this language are returned.",
      },
      limit: {
        type: 'integer',
        minimum: 1,
        maximum: 50,
        default: 20,
      },
    },
  },
}

export async function callRecommendEvents(args: Record<string, unknown>) {
  const query = args.query
  if (!query || typeof query !== 'string') {
    throw new Error('query is required (string)')
  }
  const body: Record<string, unknown> = { query, lang: args.lang ?? 'he' }
  if (typeof args.limit === 'number') body.limit = args.limit
  const url = new URL('/api/recommend', BASE_URL)
  const resp = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!resp.ok) {
    throw new Error(`recommendEvents HTTP ${resp.status}: ${await resp.text()}`)
  }
  return resp.json()
}
