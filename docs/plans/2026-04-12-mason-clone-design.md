# Mason Clone Design

**Date:** 2026-04-12

## Goal

Recreate the source site in this repo with strict source fidelity based on observable output. That means matching the visible layout, route structure, typography, spacing, colors, motion, loading states, and source quirks, including the current broken post-detail behavior.

## Scope

- Build the public pages `/`, `/work`, `/writing`, `/about`, and `/contact`
- Match the source stack shape closely with Next App Router, Tailwind utilities, `next/font`, and Framer Motion
- Preserve the source's client-loaded writing index behavior
- Preserve the source's current post-detail behavior: route resolves, shows loading, then lands on `Post not found`
- Mirror `robots.txt` and `sitemap.xml` as observed

## Constraints

- Do not improve the product behavior unless required to make the local clone function
- Do not commit or push
- Keep the implementation simple and production-friendly despite the fidelity target
- Use local data for writing posts while preserving the source site's async loading pattern

## Observed Source Shape

### Stack

- Next App Router on Vercel
- Tailwind utility CSS
- Framer Motion for entry animation and nav underline
- `next/font` usage with `Outfit`, `IBM Plex Sans`, and `JetBrains Mono`

### Routes

- `/`
- `/work`
- `/writing`
- `/about`
- `/contact`
- `/writing/[slug]` exists as a route surface but currently resolves to `Post not found`

### Motion

- Hero blocks animate from `opacity: 0` and `translateY(20px)` to settled state
- Hero transition uses duration `0.6` and easing `[0.22, 1, 0.36, 1]`
- Staggered delays: subtitle `0.15`, button row `0.3`
- Header active-link underline uses Framer Motion `layoutId` with spring transition `{ type: "spring", bounce: 0.2, duration: 0.6 }`
- Work cards animate into view with `opacity/y` transitions and `viewport: { once: true }`

### Content Behavior

- `Writing` renders a client-side loading spinner before posts appear
- Post list content is fetched asynchronously in the browser in the source site
- Direct post pages currently render a loading state and then `Post not found`
- Contact form opens the user's mail client with a `mailto:` link instead of sending data to a backend

## Design Decision

Use a minimal Next 16 app with App Router, Tailwind 4, and Framer Motion. Reproduce source behavior with local modules instead of external services where possible, but keep the external behavior identical:

- local post data instead of Firestore
- client-side delayed loading instead of server-rendered post list
- intentionally unresolved post-detail route
- `mailto:` contact submission

This keeps the site maintainable while preserving what a user can observe from the source.

## Acceptance Criteria

- The local site matches the source page hierarchy and copy closely enough for side-by-side comparison
- Header, footer, spacing, and typography are visually aligned with the source
- Motion timing and interaction feel match the observed source behavior
- Writing index loads asynchronously from the client
- Post detail routes intentionally fail the same way
- No commits or pushes are made
