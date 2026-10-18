# CineMind - AI Entertainment Companion for Fire TV

Amazon Developer Hackathon 2026 - Fire TV Track (AI-enhanced viewing)

## What it does

CineMind is an AI-powered TV companion that recommends movies and shows based on your mood,
available time, language, and viewing preferences - all from a remote-control-friendly
interface built for Amazon Fire TV.

Features:
- Natural language search: "Find me a thriller under 2 hours"
- AI explanations: personalized "Why you will love it" for every recommendation
- Family Mode: one-click content filter
- Language filter: English, Hindi, Korean, Spanish, and more
- Duration filter: Under 90 min, 90-120 min, 2+ hours
- Mood chips: Feel Good, Thriller, Comedy, Romance, Action, Mind-bending
- Dual AI: switch between Google Gemini and AWS Bedrock (Claude 3 Haiku)
- Trending Now: real-time from TMDB
- D-pad navigable: built for Fire TV remote control

## Architecture

```
Fire TV / Browser
    |
    | HTTP
    v
Node.js + Express Backend (Port 3001)
    |-- POST /api/recommendations  --> TMDB search + Gemini/Bedrock ranking
    |-- GET  /api/trending         --> TMDB trending
    |-- GET  /health
    |
    |-- Google Gemini 1.5 Flash (primary AI)
    |-- AWS Bedrock Claude 3 Haiku (secondary AI - AWS Builder challenge)
    |-- TMDB API (movie data + posters)
```

## Quick Start

### 1. Get API Keys

| Key | URL | Required |
|-----|-----|----------|
| GEMINI_API_KEY | https://aistudio.google.com/app/apikey | Yes |
| TMDB_API_KEY | https://www.themoviedb.org/settings/api | Yes |
| AWS_ACCESS_KEY_ID | AWS IAM with BedrockFullAccess | Optional |
| AWS_SECRET_ACCESS_KEY | AWS IAM | Optional |

### 2. Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env with your API keys
npm install
npm run dev
# Runs on http://localhost:3001
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 4. Open in browser

Navigate to http://localhost:5173

## Running on Fire TV

### Fire TV Simulator (ADB)

1. Enable ADB Debugging: Settings > My Fire TV > Developer Options > ADB Debugging ON
2. Connect: `adb connect YOUR_FIRETV_IP:5555`
3. Build frontend: `cd frontend && npm run build`
4. Serve: `npx serve dist -p 8080`
5. Open Silk browser on Fire TV and go to http://YOUR_PC_IP:8080

### Fire TV Simulator (Android Studio)

Download Fire TV AVD image from Amazon developer docs, run in Android Studio emulator.

## Hackathon Tracks

- Primary: Fire TV (AI-enhanced viewing category)
- Mini Challenge 1: AWS Builder (AWS Bedrock integration in backend/src/services/bedrock.ts)
- Mini Challenge 2: Open Source (MIT license, public repo)

## Tech Stack

- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Primary AI: Google Gemini 1.5 Flash
- Secondary AI: AWS Bedrock - Claude 3 Haiku
- Movie Data: TMDB API
- Styling: Pure CSS (TV-optimized, no UI library)
- Navigation: Custom D-pad hook (Arrow keys + Enter/Back)

## D-pad Navigation

| Remote | Keyboard | Action |
|--------|----------|--------|
| Up/Down/Left/Right arrows | Arrow Keys | Move focus |
| Select | Enter | Activate |
| Back | Backspace/Escape | Go back |

## License

MIT - see LICENSE file
