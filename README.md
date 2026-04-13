# mason-site

Strict local Mason-branded clone of the source site, based on observable public output.

## Run

```bash
npm install
npm run dev
```

## Notes

- The writing index intentionally loads on the client with a visible loading state.
- Writing detail routes intentionally resolve to `Post not found` to preserve the current live-site behavior.
- This repo intentionally preserves the source site's visible quirks for fidelity.
