# Mafia Mundeer Radio

A single-frequency music experience that turns a 2011 Chandigarh night drive into an interactive memory lane. The interface combines a tactile reference hi-fi player with cyber cafés, Bluetooth transfers, cricket nights, recharge shops, and a fifteen-track catalog.

## Screenshots

> Desktop and mobile screenshots will be added after the first public release.

## Features

- Compact and full-screen hi-fi player modes
- Play, pause, previous, next, ±10-second seek, timeline, and volume controls
- Circular brass progress dial with restrained tactile feedback
- One Mundeer Radio frequency and a fifteen-track glovebox library
- Official YouTube IFrame Player API playback with a persistent player instance
- Six scroll-linked memory chapters using optimized period artwork
- Lightweight chapter detection with `IntersectionObserver`
- Keyboard controls, accessible labels, reduced-motion support, and responsive layouts

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4 with custom CSS
- YouTube IFrame Player API
- Native browser APIs for scroll state and media interaction

## Local setup

Requirements: Node.js 22.12 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The current version runs without environment variables. Optional deployment settings can use:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Keep local values in `.env.local`. Environment files are ignored by Git except for `.env.example`.

## Development commands

```bash
npm run dev        # Start the development server
npm run typecheck  # Check TypeScript
npm run lint       # Run static analysis
npm run build      # Create a production build
npm run start      # Serve the production build
```

## Build

```bash
npm ci
npm run typecheck
npm run build
```

The production application is emitted to `.next/`.

## Project structure

```text
app/                    Route, metadata, and visual system
components/
  player/               Playback state, YouTube adapter, and hi-fi controls
data/                   Single-station and track metadata
lib/                    YouTube types and playback utilities
public/assets/          Optimized scene and memory artwork
```

## Music and playback architecture

`MusicProvider` owns the current track, playback state, volume, timing, and player readiness. `HiFiPlayer` consumes that state in both compact and expanded layouts, so changing views never creates a second media player.

Track metadata and YouTube video IDs live in `data/tracks.ts`. Audio is neither downloaded nor proxied: the visible embedded player handles playback through the official IFrame API. Previous and next controls travel through the complete single-station catalog.

The memory backdrop swaps one optimized image when the active chapter changes. Native intersection observation replaces continuous scroll rendering, keeping the interface responsive on lower-powered devices.

## Deployment

### Vercel

Import the repository, keep the default Next.js settings, configure optional environment variables, and deploy.

### Other Node.js hosts

```bash
npm ci
npm run build
npm run start
```

The host must support Node.js 22.12 or newer. Configure environment variables in the host dashboard rather than committing environment files.
