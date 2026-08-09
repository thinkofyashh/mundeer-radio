# Mafia Mundeer Radio

An immersive Indian nostalgia radio built as a moving 2011 night drive. Ride behind a white youth-era hatchback, keep one radio frequency running, and rediscover Bluetooth transfers, cyber cafés, cricket nights, recharge shops, and the songs that tied them together.

## Screenshots

> Desktop and mobile screenshots will be added after the first public deployment.

## Features

- Cinematic scroll-linked road trip with a stylized white hatchback and black alloys
- Animated road markings, lamps, roadside shops, wheel movement, camera sway, and dusk-to-night grading
- One Mundeer Radio frequency with the complete local TypeScript track catalog
- User-supplied halftone memory artwork blended into each chapter
- Official YouTube IFrame Player API playback inside the fixed dashboard console
- Play, pause, next, previous, seek, station, and volume controls
- Keyboard shortcuts and reduced-motion support
- Responsive mobile composition with reduced camera movement
- Cyber café, Bluetooth, cricket, recharge, and late-night-drive memory chapters
- Realtime listener-presence configuration point for a future Supabase connection
- Future-facing “Leave a memory” interface without persistence or authentication

## Tech stack

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4 with custom CSS
- Three.js, React Three Fiber, and Drei
- YouTube IFrame Player API
- Web Audio API for subtle interface sounds

## Local setup

Requirements: Node.js 22.12 or newer and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The first version runs without environment variables. Optional listener presence can later use:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Keep runtime values in `.env.local`. Environment files are ignored by Git except for `.env.example`.

## Development commands

```bash
npm run dev        # Start the local development server
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

The optimized application is emitted to `.next/`.

## Project structure

```text
app/                    Next.js route, metadata, and global styling
components/
  player/               Central playback state, dashboard player, and song drawer
  scene/                Three.js car and moving road scene
data/                   Single-station and track metadata
lib/                    YouTube types and playback utilities
public/                 Social previews and illustrated memory assets
```

## Music and playback architecture

`MusicProvider` is the single source of truth for the current track, playback state, volume, timing, and player readiness. The fixed dashboard console consumes that provider and never calls the YouTube API directly.

Track metadata and YouTube video IDs live in `data/tracks.ts`. Audio is neither downloaded nor proxied: the official embedded player remains visible in the dashboard and handles all media playback. The single Mundeer Radio playlist lets previous and next controls travel through the full catalog without changing stations.

## Deployment

### Vercel

Import the repository in Vercel, keep the default Next.js settings, configure any optional environment variables, and deploy.

### Other Node.js hosts

```bash
npm ci
npm run build
npm run start
```

The host must support Node.js 22.12 or newer. Configure environment variables in the host dashboard rather than committing `.env` files.
