# venues-il-skill — Israeli Live Events for AI agents

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Claude Skill + Model Context Protocol (MCP) server giving AI agents access to:

- 🎭 **Live events** in Israel — concerts, theatre, comedy, dance, opera, children's shows, festivals
- 📍 **Venue logistics** — parking, public transport, nearby restaurants, capacity, accessibility
- 🍽️ **Outing planning** — composes event + venue + restaurants into one structured response
- 🤖 **Natural-language recommendations** — personalized by genre, city, mood, budget

Bilingual: **Hebrew + Russian**. Affiliate purchase links go through Bravo's `kassa.co.il` (Russian) and `kartisim.co.il` (Hebrew) checkout.

The agentic API is hosted at **[venues-israel.com](https://www.venues-israel.com)** and is **public + unauthenticated**. This repo packages it for two distribution channels:

- **Claude Skill** (`SKILL.md`) — works in Claude Code, Cursor, Gemini CLI, Codex CLI, Antigravity IDE
- **MCP server** (`mcp-server/`) — TypeScript Model Context Protocol server that proxies the same endpoints; works with any MCP-compatible client

---

## כלי AI לאיתור הופעות חיות בישראל

מיומנות Claude + שרת MCP המספקים לסוכני AI גישה ל:

- 🎭 **הופעות חיות בישראל** — קונצרטים, תיאטרון, סטנד-אפ, מחול, אופרה, ילדים, פסטיבלים
- 📍 **לוגיסטיקת אולם** — חניה, תחבורה ציבורית, מסעדות סמוכות, תכולה, נגישות
- 🍽️ **תכנון יציאה** — משלב אירוע, אולם ומסעדות בתגובה אחת מובנית
- 🤖 **המלצות בשפה טבעית** — מותאמות לפי ז'אנר, עיר, מצב רוח, תקציב

דו-לשוני: **עברית ורוסית**. קישורי רכישה דרך Bravo (kassa.co.il לרוסית, kartisim.co.il לעברית).

---

## Quick install

### Claude Code (plugin)

```bash
/plugin marketplace add oleg-ai-dev/venues-il-skill
/plugin install israeli-events@venues-il-skill
```

### Cursor / Claude Desktop (MCP server)

Add to your MCP client config (e.g. `~/.cursor/mcp.json` or Claude Desktop settings):

```json
{
  "mcpServers": {
    "israeli-events": {
      "command": "npx",
      "args": ["-y", "github:oleg-ai-dev/venues-il-skill#main", "mcp-server"]
    }
  }
}
```

See [`examples/`](./examples) for per-client snippets.

---

## What's in this repo

```
venues-il-skill/
├── .claude-plugin/plugin.json   # Claude Code plugin manifest
├── skills/israeli-events/
│   └── SKILL.md                 # Anthropic Skill (instructions + frontmatter)
├── mcp-server/
│   ├── src/index.ts             # MCP server entrypoint
│   └── src/tools/               # 4 tools: searchEvents, getVenueInfo, planOuting, recommendEvents
├── examples/
│   ├── claude-code/             # /plugin install demo
│   ├── cursor/                  # mcp.json snippet
│   └── smithery/                # smithery URL submission notes
└── LICENSE                      # MIT
```

---

## Tool reference

| Tool | Inputs | Output |
|--|--|--|
| `searchEvents` | `city`, `genre`, `lang`, `date_from`, `price_max`, `artist`, `limit` | Filtered event list with affiliate links |
| `getVenueInfo` | `slug` (req), `lang` | Parking, transport, nearby restaurants, capacity, accessibility |
| `planOuting` | `event_slug` (req), `lang` | Event + venue + 3 restaurants + arrival-time recommendation |
| `recommendEvents` | `query` (req), `lang`, `limit` | NL-ranked event recommendations |

Full schema at [`https://www.venues-israel.com/api/openapi.json`](https://www.venues-israel.com/api/openapi.json).

---

## Coverage (verified 2026-04-30)

- 227 venues, 96.5% with public-transport data, 84% with full logistics (parking + ≥3 nearby restaurants)
- 12 largest cities at 100% full-logistics coverage except Jerusalem (92%), Ashkelon (75%), Netanya (50%)
- ~640 active events from Bravo's daily feed (kassa.co.il + kartisim.co.il)

---

## License

MIT — see [LICENSE](./LICENSE).

## Provider

[venues-israel.com](https://www.venues-israel.com) · `venues.israel@gmail.com`
