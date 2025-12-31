# See4me

Real-time computer vision helpers and accessibility tools for sighted assistance
and narration. This repository contains the See4me web application — a self-hosted
project maintained independently by the See4me team.


## Project overview

- **Purpose:** Provide real-time object detection, camera-based assistance,
  and optional voice narration to improve accessibility and situational awareness.
- **Key features:** Live camera view, detection overlay, voice narration,
  configurable settings, and lightweight UI components.

## Technologies

- Vite
- TypeScript
- React
- Tailwind CSS
- shadcn-ui

## Quick start (development)

Prerequisites: Node.js (recommended 16+ or later) and `npm` or `pnpm` installed.

Open a terminal and run:

```cmd
git clone <YOUR_GIT_URL>
cd See4me
npm install
npm run dev
```

The app will be available at the address printed by the dev server (usually
`http://localhost:5173`).

## Build and deploy

Build the optimized production bundle:

```cmd
npm run build
```

Serve the production build with your preferred static host (Netlify, Vercel,
static server, Docker, etc.). This repo contains a standard Vite setup — adapt
the deployment steps to your platform.

## Contributing

Contributions are welcome. To contribute:

1. Open an issue to discuss major changes or new features.
2. Create a branch for your change: `git checkout -b feature/my-change`.
3. Open a pull request with a clear description and testing notes.

Please keep PRs focused and include screenshots or recordings for UI/UX changes.

## Project independence notice

This repository originally used Lovable templates for bootstrapping. It has since
been separated and is now independently developed and maintained. References to
Lovable in this README or the repository scaffold have been removed or replaced
where appropriate. If you find any remaining references, please open an issue.

## Issues & support

- **Report bugs or request features:** open an issue in this repository.
- **Contact:** use GitHub issues or mention `@BarrileteChapin` on GitHub.

