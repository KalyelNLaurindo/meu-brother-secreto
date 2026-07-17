# 🎉 Secret Santa Draw Engine

![Status](https://img.shields.io/badge/status-planned_v2-yellow.svg)
![Focus](https://img.shields.io/badge/focus-frontend%20%2B%20algorithm-blue.svg)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Vite-61DAFB?logo=react)
![License](https://img.shields.io/badge/license-MIT-green)

> A constraint-aware Secret Santa draw engine with private, per-participant result delivery.

---

## 📌 Status

**This repository is a planned rebuild.** The v1 codebase was deprecated due to architectural debt accumulated during early development. This placeholder preserves the project's concept and scope definition for the upcoming v2 implementation.

---

## 🎯 The Problem

Every existing Secret Santa solution forces a tradeoff:

- **Paper slips**: The organizer sees all pairings and can't participate fairly.
- **Generic draw sites**: Single-device reveal — everyone watches the same screen, destroying the surprise.
- **Chat bots**: Platform-locked, no configurable exclusion rules, no individual delivery.

The core structural gap: **draw generation** and **private reveal delivery** are conflated into one step. Whoever runs the draw knows the full mapping.

---

## 💡 What v2 Will Build

A web-based Secret Santa engine that separates the two responsibilities:

| Concern | Solution |
|---|---|
| Constrained draw generation | Algorithm that enforces: no self-draw, no reciprocal pairs, user-defined exclusion rules — with up to 5,000 retry attempts for impossible constraints |
| Private result delivery | Each participant receives **only their own match** via independent channel (individual link or QR code) — the organizer never sees the full mapping |

### Core Rules (algorithm contract)

1. A person **never draws themselves**.
2. **Reciprocal pairs** are invalid (A → B and B → A cannot coexist).
3. **Manual exclusion rules** are respected (e.g. "A cannot draw B").
4. Invalid draws are reprocessed automatically until the constraints are satisfied or the retry limit is reached.

---

## 🏗 Planned Architecture (v2)

```
src/
├── domain/            # Pure draw engine — constraint validation, shuffle algorithm
├── application/       # Use cases: CreateDraw, ValidateConstraints, DeliverResult
├── infrastructure/    # Persistence (localStorage), delivery adapters (link/QR)
├── pages/             # React screens: Setup, Draw, Reveal
├── context/           # Global state orchestration
└── styles/            # CSS Modules
```

**Stack:** React + Vite + CSS Modules

**Key design decisions for v2:**
- Domain logic fully decoupled from React (testable in isolation)
- Organizer-blind mode: organizer can participate without seeing the full mapping
- No backend required — all state in `localStorage`, delivery via shareable links

---

## 📋 v1 Retrospective

The v1 implementation demonstrated the right problem framing and core algorithm (circular draw with exclusion rules), but was built without architectural planning:

- No separation between domain logic and UI
- No test coverage
- Inline state management without a clear data flow
- Developed before establishing any engineering standards

v2 exists to rebuild the same idea with proper software engineering discipline.

---

## 📅 Backlog Scope (planned)

| Phase | Goal |
|---|---|
| Phase 1 | Domain engine — constraint validator + shuffle algorithm (pure functions, 100% unit tested) |
| Phase 2 | React UI — participant setup, rule configuration, draw execution |
| Phase 3 | Private delivery — individual shareable links, QR code generation |
| Phase 4 | Organizer-blind mode — organizer participates without seeing the full mapping |

---

## 👤 Author

**Kalyel N. Laurindo / Software Engineer**
[GitHub](https://github.com/KalyelNLaurindo) · [LinkedIn](https://www.linkedin.com/in/kalyel-n-laurindo/)
