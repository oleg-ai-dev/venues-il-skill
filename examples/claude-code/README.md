# Claude Code — install the Israeli Events skill

```bash
# 1. Add this repo as a plugin marketplace
/plugin marketplace add oleg-ai-dev/venues-il-skill

# 2. Install the skill + MCP server
/plugin install israeli-events@venues-il-skill

# 3. Verify
/plugin list
```

Once installed, the 4 tools appear in any Claude Code session in this project. Try:

> *"Find me a children's show in Tel Aviv next weekend under 150 NIS"*

→ Claude calls `searchEvents` with `city=tel-aviv genre=children price_max=150 date_from=...` and returns events with affiliate purchase links.

> *"What's the parking like at Heichal Hatarbut Tel Aviv?"*

→ Claude calls `getVenueInfo` with the venue slug and returns parking + transport + restaurants.

## Uninstall

```bash
/plugin uninstall israeli-events
/plugin marketplace remove oleg-ai-dev/venues-il-skill
```
