#!/usr/bin/env node
/**
 * MCP server for Israeli Live Events. Bridges any MCP client (Claude Code,
 * Cursor, Claude Desktop, etc.) to the public agentic API at venues-israel.com.
 *
 * Public + unauthenticated upstream — no API key needed.
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { tools, callTool } from './tools/index.js'

const server = new Server(
  {
    name: 'israeli-events',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}))

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params
  const result = await callTool(name, args ?? {})
  // The SDK's response union includes a streaming/task variant; for plain
  // synchronous tool calls we return the standard {content, isError?} shape
  // and cast to the broad return type the SDK expects.
  return result as never
})

const transport = new StdioServerTransport()
await server.connect(transport)

// stderr is the only "log" channel that doesn't corrupt the stdio MCP transport.
console.error('[israeli-events] MCP server running on stdio')
