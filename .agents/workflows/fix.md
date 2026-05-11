---
description: >
  Diagnose and fix errors. Use for runtime errors, build failures, or wrong behavior.
  Trigger: "fix", "this error", "not working", "why is this broken", "debug", or a pasted stack trace.
---

# Workflow: fix

## Step 1 — Identify the context

Ask (or infer from the error): where does the failure occur?

| Context | Signal |
|---------|--------|
| `popup` | Breaks when clicking the extension icon |
| `content` | Breaks on the active webpage |
| `background` | Service worker, alarms, storage issues |
| `sidepanel` | Side panel not rendering or crashing |
| `build` | TypeScript / Vite error at compile time |

## Step 2 — Trace the layer stack

Follow the call chain inward:

```
UI component → hook → service → core/browser/
```

For cross-context errors, follow the message flow:

```
content → background (chrome.runtime.sendMessage)
        → popup / sidepanel (chrome.runtime.onMessage)
```

Read `docs/data/API-CONTRACTS.md` if message types are involved.

## Step 3 — Fix

- Fix at the correct layer. Do not patch by bypassing layers.
- Never add `any` to silence a TypeScript error.
- Never call `chrome.*` outside `core/browser/`.

## Step 4 — Verify

```
npm run type-check
npm run build
```

Report: what was fixed, in which file, and why the error occurred. One short paragraph.
