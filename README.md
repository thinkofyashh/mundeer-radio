# Mafia Mundeer Radio

An immersive Indian nostalgia radio that turns an early-2010s bedroom desk into a playable music experience. Tune through fictional FM stations, control playback from a tactile 3D radio, and rediscover the era of Bluetooth transfers, cyber cafés, memory cards, college rides, and 50 KB/s downloads.

## Screenshots

> Desktop and mobile screenshots will be added after the first public deployment.

## Features

- Cinematic fullscreen 2011 Indian bedroom and cyber-café atmosphere
- Interactive React Three Fiber radio with animated tuning and volume controls
- Seven nostalgia stations with local TypeScript track metadata
- Official YouTube IFrame Player API playback inside the old monitor
- Play, pause, next, previous, seek, station, and volume controls
- Keyboard shortcuts and reduced-motion support
- Dedicated mobile composition with simplified secondary props
- Bluetooth, USB, CD, desktop-folder, and download-window Easter eggs
- Optional interface sounds synthesized in the browser
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
  nostalgia/            Desktop and physical-prop Easter eggs
  player/               Central playback state and YouTube player
  radio/                Station selector and frequency display
  scene/                Three.js radio scene
  ui/                   Entry and listener-presence interfaces
data/                   Station and track metadata
hooks/                  Playback and interface-sound hooks
lib/                    YouTube types and playback utilities
public/                 Social preview and future media directories
```

## Music and playback architecture

`MusicProvider` is the single source of truth for the current track, station, playback state, volume, timing, and player readiness. The radio scene and regular React controls consume the same provider and never call the YouTube API directly.

Track metadata and YouTube video IDs live in `data/tracks.ts`. Audio is neither downloaded nor proxied: the official embedded player remains visible inside the computer monitor and handles all media playback. Station changes select a local playlist, animate the frequency display, add a brief synthesized static effect, and load the next embedded video.

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
