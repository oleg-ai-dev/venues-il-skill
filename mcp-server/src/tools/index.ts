/**
 * Tool registry for the Israeli Live Events MCP server.
 *
 * Each tool wraps one HTTPS endpoint from venues-israel.com. The upstream
 * is public + unauthenticated, so the wrappers are very thin — input
 * validation + URL construction + JSON pass-through.
 */
import { searchEventsTool, callSearchEvents } from './searchEvents.js'
import { getVenueInfoTool, callGetVenueInfo } from './getVenueInfo.js'
import { planOutingTool, callPlanOuting } from './planOuting.js'
import { recommendEventsTool, callRecommendEvents } from './recommendEvents.js'

export const BASE_URL =
  process.env.VENUES_IL_BASE_URL || 'https://www.venues-israel.com'

export const tools = [
  searchEventsTool,
  getVenueInfoTool,
  planOutingTool,
  recommendEventsTool,
]

interface ToolResult {
  content: { type: 'text'; text: string }[]
  isError?: boolean
}

export async function callTool(
  name: string,
  args: Record<string, unknown>
): Promise<ToolResult> {
  try {
    let payload: unknown
    switch (name) {
      case 'searchEvents':
        payload = await callSearchEvents(args)
        break
      case 'getVenueInfo':
        payload = await callGetVenueInfo(args)
        break
      case 'planOuting':
        payload = await callPlanOuting(args)
        break
      case 'recommendEvents':
        payload = await callRecommendEvents(args)
        break
      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        }
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
    }
  } catch (e) {
    return {
      content: [
        {
          type: 'text',
          text: `Error calling ${name}: ${e instanceof Error ? e.message : String(e)}`,
        },
      ],
      isError: true,
    }
  }
}
