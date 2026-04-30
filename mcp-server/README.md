# venues-il-mcp — MCP server for Israeli live events

TypeScript Model Context Protocol server. Wraps the public agentic API at `venues-israel.com`. Public + unauthenticated.

## Install

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "israeli-events": {
      "command": "npx",
      "args": ["-y", "@oleg-ai-dev/venues-il-mcp"]
    }
  }
}
```

Restart Claude Desktop. The 4 tools (`searchEvents`, `getVenueInfo`, `planOuting`, `recommendEvents`) appear automatically.

### Cursor

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "israeli-events": {
      "command": "npx",
      "args": ["-y", "@oleg-ai-dev/venues-il-mcp"]
    }
  }
}
```

### Smithery

Listed at `https://smithery.ai/server/@oleg-ai-dev/venues-il-skill` (URL-proxy mode). Smithery acts as the transport — no local install required.

## Local development

```bash
cd mcp-server
npm install
npm run build
npm start
```

To run the inspector:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## Tools

| Tool | Description |
|--|--|
| `searchEvents` | Filtered event search by city/genre/date/price/artist |
| `getVenueInfo` | Parking, transport, nearby restaurants for a venue |
| `planOuting` | Composed event + venue + restaurants + arrival time |
| `recommendEvents` | Natural-language ranked recommendations |

Full schema: [`https://www.venues-israel.com/api/openapi.json`](https://www.venues-israel.com/api/openapi.json).

## License

MIT
