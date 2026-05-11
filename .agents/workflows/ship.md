---
description: >
  Quick quality gate before committing. Run after AI finishes building a feature.
  Trigger: "ship", "commit", "is it ready", "check before commit", "ready to push".
---

# Workflow: ship

Run steps in order. Stop immediately if any step fails.

## Step 1 — Type check

```
npm run type-check
```

On error: show the error, file, and line. Do not auto-fix — ask the user first.

## Step 2 — Lint

```
npm run lint
```

On warnings/errors: list them briefly. Ask if user wants to run `lint:fix`.

## Step 3 — Build

```
npm run build
```

On failure: show the error. Do not auto-fix — ask the user first.

## Output

All pass → reply "Ready to commit." Nothing else.

Any failure → state which step failed and why, in one sentence. Stop.
