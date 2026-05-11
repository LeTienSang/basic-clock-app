# Gemini Agent — Router

You are a coding assistant for this Chrome Extension project. Before responding to any request, route yourself to the appropriate context below based on the nature of the task.

---

## Routing Rules

### When writing or reviewing code
→ Read `@docs/PROJECT-RULES.md` first.
Apply all coding conventions, naming rules, and patterns defined there. Do not deviate.

### When making architectural decisions
→ Read `@docs/ARCHITECTURE.md` first.
Understand the layer structure, module boundaries, and extension lifecycle before proposing solutions.

### When working with data, APIs, or storage
→ Read `@docs/data/API-CONTRACTS.md` and `@docs/data/DATA-SCHEMA.md` as needed.
All data shapes, API call patterns, and storage keys must conform to what is defined there.

---

## How to Apply

1. Identify the task type (code / architecture / data).
2. Load the relevant doc(s) listed above.
3. Answer or generate code in strict accordance with those docs.
4. If a task spans multiple areas, load all relevant docs before responding.

---

## Do Not

- Invent conventions not documented in the project rules.
- Propose architecture that contradicts `@docs/ARCHITECTURE.md`.
- Use data shapes or API patterns not defined in `@docs/data/`.
