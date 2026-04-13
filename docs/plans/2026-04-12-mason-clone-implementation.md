# Mason Clone Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a strict 1:1 Mason-branded clone in `~/mason-site`, preserving the observed source UI, motion, route structure, and quirks.

**Architecture:** Use a small Next App Router application with a shared shell, route-level page files, client components only where the source requires runtime behavior, and local post data that is fetched asynchronously on the client to mimic the source site's Firestore-backed list view. Keep the writing detail route intentionally unresolved so local behavior matches the current live site.

**Tech Stack:** Next 16, React 19, Tailwind 4, Framer Motion, `next/font/google`, TypeScript

---

### Task 1: Scaffold the app shell

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `.gitignore`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`

**Step 1: Create the minimal Next/Tailwind package manifest**

Include only runtime and build dependencies required for the clone.

**Step 2: Add the App Router config files**

Create the TypeScript and Next config needed for a plain App Router app.

**Step 3: Add the root layout and global CSS**

Wire fonts, base HTML structure, color variables, and shared body classes.

**Step 4: Run the app once to confirm the shell builds**

Run: `npm install && npm run lint`
Expected: install succeeds and lint can run without config errors

### Task 2: Build shared site primitives

**Files:**
- Create: `components/site-header.tsx`
- Create: `components/site-footer.tsx`
- Create: `components/page-shell.tsx`
- Create: `components/animated-enter.tsx`
- Create: `lib/navigation.ts`

**Step 1: Build the fixed header with active underline animation**

Match the source nav structure and Framer Motion underline behavior.

**Step 2: Build the footer**

Mirror the source footer layout and social links.

**Step 3: Build a reusable page shell**

Keep route pages small and consistent with the observed max-width and spacing patterns.

**Step 4: Add the shared motion wrapper**

Reuse the hero-style `opacity/y` entrance transition with the observed easing.

**Step 5: Run lint**

Run: `npm run lint`
Expected: PASS

### Task 3: Implement the homepage

**Files:**
- Modify: `app/page.tsx`

**Step 1: Recreate the hero structure and copy**

Match heading, subcopy, buttons, alignment, and spacing.

**Step 2: Apply staggered Framer Motion timing**

Mirror the observed `0`, `0.15`, and `0.3` delays.

**Step 3: Verify visually in the browser**

Run: `npm run dev`
Expected: homepage renders with the correct shell and visible motion

### Task 4: Implement the work page

**Files:**
- Create: `app/work/page.tsx`
- Create: `lib/work-items.ts`
- Create: `components/project-card.tsx`

**Step 1: Add the local project data**

Use the observed six work entries, tags, links, and years.

**Step 2: Build the animated project card**

Match the observed article/link structure, borders, hover behavior, and while-in-view motion.

**Step 3: Build the work route**

Render the heading, intro copy, and project list with the same spacing rhythm.

**Step 4: Run lint**

Run: `npm run lint`
Expected: PASS

### Task 5: Implement the writing index

**Files:**
- Create: `app/writing/page.tsx`
- Create: `components/blog-list.tsx`
- Create: `lib/posts.ts`

**Step 1: Add local post metadata**

Store the observed post titles, dates, excerpts, and slugs.

**Step 2: Build an async client-side post loader**

Use a client component with a loading spinner first, then reveal the posts after a short async delay.

**Step 3: Match the observed list layout**

Preserve date placement, border rhythm, hover treatment, and spacing.

**Step 4: Keep routing links source-faithful**

Use the observed slugs and visible labels, including source quirks where needed.

### Task 6: Implement intentionally broken writing detail pages

**Files:**
- Create: `app/writing/[slug]/page.tsx`
- Create: `components/post-not-found.tsx`

**Step 1: Render the source-like loading shell first**

Start with a loading-looking route body.

**Step 2: Resolve to the source-equivalent broken state**

Render `Post not found` plus the back link regardless of slug so behavior stays faithful.

**Step 3: Verify against a sampled source route**

Run: `npm run dev`
Expected: direct `/writing/<slug>` behaves like the live source

### Task 7: Implement about and contact

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `components/contact-form.tsx`

**Step 1: Build the about page**

Match the prose structure, section headings, and list content.

**Step 2: Build the contact form**

Mirror field styling and button treatment.

**Step 3: Recreate `mailto:` submit behavior**

On submit, open a prefilled `mailto:` URL and show the source-like success state.

**Step 4: Run lint**

Run: `npm run lint`
Expected: PASS

### Task 8: Add source-adjacent metadata routes

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

**Step 1: Mirror the observed robots rules**

Return `Allow: /` and the canonical sitemap URL shape for the local app.

**Step 2: Mirror the observed sitemap surface**

Include only the five top-level routes that appeared in the live sitemap.

### Task 9: Verify the clone end-to-end

**Files:**
- Modify: `README.md`

**Step 1: Run the full local verification pass**

Run: `npm run lint`
Expected: PASS

**Step 2: Manually inspect each route**

Check `/`, `/work`, `/writing`, `/writing/<slug>`, `/about`, and `/contact`.

**Step 3: Document any irreducible gaps**

Update `README.md` with the local run command and any known fidelity limitations.

**Step 4: Do not commit**

User explicitly asked for no commit or push in this round.
