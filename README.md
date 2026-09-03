<div align="center">

# FurlPay Bot

**Persistent AI teammates you actually own — with a computer, a memory, and a voice.**

[![License](https://img.shields.io/badge/License-Apache%202.0-2563EB?style=for-the-badge&labelColor=0B1220)](./LICENSE)
[![Status](https://img.shields.io/badge/Status-Beta-B7791F?style=for-the-badge&labelColor=0B1220)](https://bot.furlpay.com)
[![Self-hosted](https://img.shields.io/badge/Self--hosted-Single%20VM-2E7D4F?style=for-the-badge&labelColor=0B1220)](./docs/self-host.md)

<br />

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js%2022-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React%2019-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Electron](https://img.shields.io/badge/Electron-47848F?style=flat-square&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)

[![Hono](https://img.shields.io/badge/Hono-E36002?style=flat-square&logo=hono&logoColor=white)](https://hono.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL%2016-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Caddy](https://img.shields.io/badge/Caddy-1F88C0?style=flat-square&logo=caddy&logoColor=white)](https://caddyserver.com/)
[![Biome](https://img.shields.io/badge/Biome-60A5FA?style=flat-square&logo=biome&logoColor=white)](https://biomejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)](https://playwright.dev/)
[![pnpm](https://img.shields.io/badge/pnpm%209-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)](https://turbo.build/)

</div>

---

FurlPay Bot is an open-source platform for running **persistent AI teammates**. A bot is not a chat
session — it is a long-lived agent with its own conversation history, memory files, scheduled
routines, and a real Linux computer it can drive. It runs on the web, as an Electron desktop app,
and through an Expo mobile app, all against one API.

Bring your own model and your own computer provider, or run the entire stack on a single machine
with Docker. No hosted vendor is required.

> **Beta.** Interfaces and schemas may still change between releases.

## Contents

- [Why FurlPay Bot](#why-furlpay-bot)
- [Features](#features)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start-published-images)
- [Local development](#local-development-source-checkout)
- [Configuration](#configuration)
- [Project structure](#project-structure)
- [Testing](#testing)
- [Security model](#security-model)
- [Desktop and mobile](#desktop-and-mobile)
- [Documentation](#documentation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)

## Why FurlPay Bot

Most agent frameworks give you a function-calling loop and leave the hard parts to you. FurlPay Bot
ships the hard parts:

| Problem | How FurlPay Bot solves it |
| :--- | :--- |
| Agents forget everything between runs | Versioned Markdown memory + optional semantic recall, scoped per bot |
| Agents can't act on the real world | A persistent Linux computer per bot — browser, terminal, files, desktop |
| Long tasks die when the user closes the tab | Runs are leased, heartbeated, and resumed by a background worker |
| Agents do irreversible things | A deterministic approval firewall gates every consequential tool call |
| Redirecting an agent means starting over | Mid-run steering injects new instructions without cancelling work |
| Tool sprawl blows the context window | Lazy tool catalog collapses 100+ tools into 3 meta-tools |
| Agents get stuck in loops | A loop guard detects repeated identical calls and halts early |

## Features

### Agents

| Capability | Detail |
| :--- | :--- |
| **Persistent bots** | Own instructions, avatar, model override, conversation, and history |
| **Memory** | Versioned Markdown documents, plus optional external vector recall |
| **Routines** | Cron schedules and natural-language triggers |
| **Webhook triggers** | `POST /api/v1/routines/webhook/:id` fires a routine from anything |
| **Scratchpad** | Bot-owned todo and open-work tracking that survives runs |
| **Skills** | Reusable `SKILL.md` recipes, plus playbooks taught by GUI recording |
| **Multi-bot** | Delegate to peer bots with their own computers, or short-lived subagents |
| **Group chats** | Multiple bots in one thread with `@mention` routing |
| **History compaction** | Old turns are summarised so long conversations stay affordable |

### Computer use

Each bot can be given a real machine. Providers are pluggable and selected per deployment.

| Provider | Multi-screen | Persistent home | Best for |
| :--- | :---: | :---: | :--- |
| **Docker** | Yes | Direct mount | Development, single-machine self-host |
| **E2B** | Yes | Checkpointed | Multi-user cloud production |
| **Daytona** | Yes | Checkpointed | Cloud dev environments |
| **Box** | No | Checkpointed | Simple managed desktop |
| **Desktop** | No | Host filesystem | Trusted local Electron use |

The sandbox image is Debian with Xvfb, Fluxbox, and Chromium, exposing browser automation, a shell,
a file manager, and a viewable desktop over noVNC. A human can take exclusive control of the screen
at any time, and the bot can explicitly hand control back for 2FA or CAPTCHA friction.

### Voice, messaging, and integrations

| Area | Support |
| :--- | :--- |
| **Voice** | Dictation, spoken replies, and half-duplex calls (ElevenLabs, OpenAI, Cartesia) |
| **Messaging** | Slack, WhatsApp Business, Telegram, and iMessage/SMS bridges |
| **Managed catalogs** | Composio and Pipedream Connect |
| **User-installed tools** | Remote MCP servers, Treg endpoints, and OpenAPI JSON documents |
| **Models** | OpenRouter, Anthropic, OpenAI, xAI Grok, GitHub Copilot, and local Ollama / LM Studio |

Connector credentials are encrypted with AES-256-GCM at rest and are never returned by the API.

## Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│  CLIENTS                                                     │
│  Web (React 19) │ Desktop (Electron) │ Mobile (Expo)         │
└───────────────────────────┬──────────────────────────────────┘
                            │  oRPC over HTTP + SSE
┌───────────────────────────▼──────────────────────────────────┐
│  API (Hono)                    │  WORKER (Graphile)          │
│  • oRPC procedures             │  • Agent runs               │
│  • Better Auth sessions        │  • Scheduled routines       │
│  • Webhooks (messaging, MCP)   │  • History compaction       │
└───────────────────────────┬────┴─────────────────────────────┘
                            │
┌───────────────────────────▼──────────────────────────────────┐
│  AGENT LOOP                                                  │
│  lease → context → reason → tool dispatch → approval → persist│
│                                   │                          │
│                     ┌─────────────┴─────────────┐            │
│                     ▼                           ▼            │
│            APPROVAL FIREWALL            LAZY TOOL CATALOG    │
│            rule hierarchy +             >20 tools collapse   │
│            optional judge LLM           into 3 meta-tools    │
└───────────────────────────┬──────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐  ┌────────────────┐  ┌──────────────────┐
│  PostgreSQL   │  │   COMPUTERS    │  │   CONNECTORS     │
│  Prisma       │  │ Docker / E2B / │  │ MCP / OpenAPI /  │
│  event log    │  │ Daytona / Box  │  │ Composio / Pipe. │
│  LISTEN/NOTIFY│  │ browser+shell  │  │ encrypted creds  │
└───────────────┘  └────────────────┘  └──────────────────┘
```

### The agent loop

1. **Trigger** — a user message, a cron routine, a webhook, or a peer bot.
2. **Gate** — if a run is already active the message becomes *steering* and is injected mid-run;
   otherwise a new run is queued.
3. **Lease** — the worker claims the run with a fencing token and takes an exclusive lease on the
   bot's computer, heartbeating both.
4. **Context** — model resolution, sandbox restore, memory injection, skills, tool assembly, and a
   sliding history window with a compacted summary.
5. **Reason** — streamed tokens are published over PostgreSQL `LISTEN/NOTIFY` to every connected
   client as they are produced.
6. **Dispatch** — each tool call passes the approval firewall before it executes.
7. **Persist** — the workspace is checkpointed, messages are stored as typed blocks, token usage is
   recorded, and leases are released.

### The approval firewall

Every consequential tool call resolves deterministically before it runs:

- **Rules** are matched by specificity — `tool` (3) beats `connector` (2) beats `category` (1).
- **`require_approval` and `always_allow` both beat the default**; only the default path may consult
  the optional judge model.
- **The judge only escalates.** It can turn an allow into an ask; it can never silently permit.
- **Errors fail closed** on consequential tools.
- **Security-boundary tools cannot be auto-reviewed or permanently allowed** — they always ask, and
  no rule can bypass them.

Approved calls replay the *exact recorded payload*, so an approval can never drift into a different
action between the moment it is shown and the moment it runs.

## Tech stack

| Layer | Technology |
| :--- | :--- |
| **Language** | TypeScript 5.9, Node.js 22+ |
| **Monorepo** | pnpm 9 workspaces, Turborepo, Biome |
| **API** | Hono, oRPC, Better Auth |
| **Data** | PostgreSQL 16, Prisma, append-only event log |
| **Jobs** | Graphile Worker (Postgres-backed), `LISTEN/NOTIFY` fanout |
| **Web** | React 19, Vite, Tailwind CSS v4, Lingui i18n |
| **Desktop** | Electron with native OAuth and auto-update |
| **Mobile** | Expo (iOS + Android) |
| **Marketing** | Astro |
| **Sandboxes** | Docker, E2B, Daytona, Box; Debian + Xvfb + Chromium image |
| **Proxy** | Caddy with automatic TLS |
| **Testing** | Vitest, Playwright, Testcontainers |

## Quick start (published images)

Requires Docker Engine, the Compose plugin, `curl`, and OpenSSL. No clone, no Node install.

```bash
mkdir -p furlpay-bot && cd furlpay-bot &&
curl -fsSLO https://raw.githubusercontent.com/FurlPay/furlpay-bot/main/infra/compose/install-images.sh &&
bash install-images.sh
```

The installer downloads the Compose files, generates `.env` with random secrets, and starts the
stack. Rerunning it preserves an existing `.env`.

Open <http://127.0.0.1:5173>, create an account, and connect a model. Local Docker computers are
enabled by default.

Default image tag is `edge` (main builds, `linux/amd64`). See the
[self-hosting guide](./docs/self-host.md#published-images-no-checkout) for tags and options, and
[restricted networks](./docs/self-host.md#restricted-networks--mirror-downloads) for mirrored
installs. For an agent-assisted install, use [SETUP_PROMPT.md](./SETUP_PROMPT.md).

## Local development (source checkout)

Requires Node.js 22+, pnpm 9, and Docker.

```bash
git clone https://github.com/FurlPay/furlpay-bot.git
cd furlpay-bot
cp .env.example .env
```

Set `BETTER_AUTH_SECRET`, `ENCRYPTION_KEY`, and `SCREEN_PROXY_SECRET` to independent long random
values. Docker sandboxes also need a dedicated `SANDBOX_SUPERVISOR_TOKEN`.

```bash
docker compose --env-file .env -f infra/compose/docker-compose.yml up postgres -d
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm sandbox:build
pnpm dev
```

Open <http://127.0.0.1:5173>, create an account, connect a model, and create your first bot.

## Configuration

Full reference in [`.env.example`](./.env.example). The values that matter most:

| Variable | Purpose |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Session signing secret |
| `ENCRYPTION_KEY` | AES-256-GCM key for credentials at rest |
| `SCREEN_PROXY_SECRET` | HMAC key for short-lived screen-viewing capabilities |
| `SANDBOX_PROVIDER` | `docker`, `e2b`, `daytona`, `box`, or `desktop` |
| `SANDBOX_SUPERVISOR_TOKEN` | Auth between the API and the Docker supervisor |
| `OPENROUTER_API_KEY` | Optional default model provider |
| `COMPOSIO_API_KEY` | Optional managed app catalog |
| `PIPEDREAM_CLIENT_ID` / `_SECRET` / `_PROJECT_ID` | Optional Pipedream Connect |
| `SIGNUPS_ENABLED` / `SIGNUP_ALLOWLIST` | Who may register |

> Never commit `.env`. Treat every tracked file and diff as public.

Managed catalogs are optional — users can add an HTTPS MCP server, a Treg endpoint, or an OpenAPI
document from **Integrations** without either. Treg is usage-metered; self-hosters supply their own
token, and operators embedding it in a hosted product should review Treg's integration terms.

## Project structure

```text
apps/
  api/        Hono HTTP server, oRPC router, Better Auth, webhooks
  worker/     Graphile Worker daemon — runs, routines, compaction
  web/        React 19 SPA (also hosted inside Electron)
  desktop/    Electron shell, native OAuth, auto-update
  mobile/     Expo app (iOS + Android)
  www/        Astro marketing site

packages/
  core/         Pure domain logic — approval, mentions, cron, redaction
  contracts/    End-to-end typed oRPC contracts and Zod schemas
  db/           Prisma schema, migrations, event append log
  adapters/     Runtime, sandboxes, MCP, connectors, voice
  adapter-kit/  Abstract interfaces for every external provider
  auth/         Better Auth configuration and signup policy
  memory/       Markdown store + semantic recall
  chat-ui/      Cross-platform chat rendering (web + native)
  ui-web/       Shared React primitives
  ui-tokens/    Design tokens (light/dark)
  testkit/      Harnesses, CLI runners, topology and canary tests

infra/
  compose/      Docker Compose stacks (dev, prod, images, topology)
  sandboxes/    Computer image, supervisor, desktop
  updater/      Self-updater sidecar (plan / apply / rollback)
```

The dependency rule: `core` is pure and depends on nothing; `adapter-kit` declares interfaces;
`adapters` implements them; `apps/api` and `apps/worker` are the only composition roots.

## Testing

```bash
pnpm lint              # Biome
pnpm check             # TypeScript project references
pnpm test              # unit, property, and in-process contract tests
pnpm test:integration  # Postgres journeys, Graphile jobs, LISTEN/NOTIFY
pnpm test:e2e          # Playwright against the emulated stack
pnpm test:topology     # Docker + worker recovery (needs Docker)
pnpm test:canary       # live provider canaries
```

The E2E suite runs against a `fake` sandbox by default and stays deterministic and offline. The same
suite can be pointed at a real provider:

```bash
pnpm test:e2e -- --sandbox=e2b       # or daytona, box
```

> **Platform note.** The updater and computer-supervisor suites assert POSIX paths and ownership
> (`path.posix.isAbsolute`, Linux-only `skipIf` guards). They are expected to fail on Windows and
> are exercised on Linux in CI.

## Security model

| Layer | Implementation |
| :--- | :--- |
| **Credentials** | AES-256-GCM with per-record salt and row-bound AAD |
| **Sessions** | Better Auth HTTP-only cookies and bearer tokens |
| **SSRF** | Remote MCP and OpenAPI URLs validated against private IP ranges |
| **Containers** | `cap_drop: ALL`; no Docker socket inside app containers |
| **Screen access** | HMAC-signed, short-lived capability tokens for the VNC proxy |
| **Secrets in output** | Streaming scrubber strips credentials from logs and transcripts |
| **Destructive actions** | Approval firewall, with an un-bypassable class that always asks |
| **Host** | `harden-host.sh` baseline — SSH, UFW, fail2ban, AppArmor, sysctl |

Report vulnerabilities privately per [SECURITY.md](./SECURITY.md) — do not open a public issue.

## Desktop and mobile

Both are clients of the same API as the web app.

```bash
pnpm --filter @furlpay-bot/desktop dev
```

On first run the desktop app asks whether to use the local stack (`http://127.0.0.1:5173`) or an
existing server. Public servers must use HTTPS; plain HTTP is accepted only for loopback and private
LAN addresses. The app verifies the health endpoint before saving.

Use **Change FurlPay Bot Server…** in the application menu to reconnect. For automation, set
`FURLPAY_WEB_URL` to point the shell elsewhere, or `FURLPAY_FORCE_SETUP=1` to rerun setup.

Mobile build and release steps are in [docs/mobile-release.md](./docs/mobile-release.md).

### Languages

The web and Electron UI ships English, Deutsch, 한국어, Türkçe, हिन्दी, Português (Brasil), and
简体中文 — **Settings → Language**. The marketing site is available in en/de/ko.

## Documentation

- [Self-hosting](./docs/self-host.md) — deployment, providers, backups, upgrades
- [Computer runtime and isolation](./docs/computer-runtime.md)
- [Mobile releases](./docs/mobile-release.md)
- [Performance testing](./docs/performance.md)
- [Contributing](./CONTRIBUTING.md) — workflow and test matrix
- [Security policy](./SECURITY.md)

## Roadmap

The agent platform above is implemented and running today. The payment layer is in progress and is
**not yet shipped** — nothing below is available in the current build.

| Area | Planned |
| :--- | :--- |
| **Wallets** | Custodial key management with AES-256-GCM at rest, per bot and per space |
| **Payments** | Send and receive on Solana and EVM chains, routed through the approval firewall |
| **Invoices** | Generation, delivery, and settlement tracking |
| **Payment links** | Shareable links with QR codes and usage limits |
| **Monitoring** | Real-time chain watching with balance and settlement alerts |
| **Price oracle** | Multi-source quotes with sanity bounds and a degradation path |
| **Analytics** | Revenue, cash flow, and anomaly detection |

Money-moving tools are designed to land in the approval firewall's un-bypassable class, so every
outbound payment requires an explicit human confirmation that no rule can turn off.

## Contributing

Contributions are welcome — please read [CONTRIBUTING.md](./CONTRIBUTING.md) first. For security
vulnerabilities, follow [SECURITY.md](./SECURITY.md) rather than filing a public issue.

FurlPay Bot is licensed under the [Apache License 2.0](./LICENSE).
