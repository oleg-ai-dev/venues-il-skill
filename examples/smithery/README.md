# Smithery — published MCP server

This MCP server is published on [Smithery](https://smithery.ai/) for one-click install.

## Submission

The Smithery scanner reads `/.well-known/mcp/server-card.json` from `https://www.venues-israel.com` to populate the listing. The submission to `https://smithery.ai/new` only needs:

- The HTTPS base URL: `https://www.venues-israel.com`
- The MCP server-card path (default): `/.well-known/mcp/server-card.json`
- License: MIT
- Repo: `https://github.com/oleg-ai-dev/venues-il-skill`

## End-user install

Once listed, users can install in any MCP client via Smithery's standard install command (one-click in Smithery UI, or paste the install command).
