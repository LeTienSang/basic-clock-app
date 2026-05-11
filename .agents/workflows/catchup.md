---
description: >
  Summarize project state to resume work after an interruption.
  Trigger: "catchup", "where were we", "recap", "what's next", "continue from where we left off".
---

# Workflow: catchup

## Step 1 — Read recent history

```
git log --oneline -10
git status
git diff --stat HEAD
```

## Step 2 — Summarize in 3 sentences

1. **What was done?** — What the last commits changed and why.
2. **Where are we now?** — Any uncommitted changes, current branch.
3. **What's next?** — Suggest 1–2 logical next steps based on the context.

## Rules

- Do not scan the full source tree — use only git output.
- Do not list files mechanically.
- Keep the total response under 10 lines.
- Reply in the same language the user is using.
