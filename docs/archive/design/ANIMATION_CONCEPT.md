---
status: archived
owner: Documentation Maintainers
last_reviewed: 2026-04-09
source_of_truth: docs/README.md
---

> Archivhinweis: Dieses Dokument ist historisch und nicht normativ.

# StackAtlas – Splash Animation Concept

## Overview

The splash screen builds a visual metaphor of a layered digital infrastructure stack,
ending with "Sovereign Standards" placed on top as a crown — before revealing the app title.

---

## Layout Structure (top → bottom in DOM, bottom → top visually)

```
┌─────────────────────────────────────┐
│  [ LABEL AREA ]  ← text label zone  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │   Sovereign Standards       │  ← crown (white, 2 segments)
│  │   ██████████████  ██████████│    │
│  ├─────────────────────────────┤    │
│  │ Applications (9 segments)   │  ← yellow, layer 4
│  ├─────────────────────────────┤    │
│  │ Building Blocks (7 segments)│  ← green, layer 3
│  ├─────────────────────────────┤    │
│  │ Platform (5 segments)       │  ← blue, layer 2
│  ├─────────────────────────────┤    │
│  │ Infrastructure (3 segments) │  ← red, layer 1
│  └─────────────────────────────┘    │
│                                     │
│  [ APP TITLE ]   ← StackAtlas       │
└─────────────────────────────────────┘
```

All layers are equal width (`min(330px, 86vw)`).
Segments increase bottom→top: 3 → 5 → 7 → 9 → 2 (crown).

---

## Timeline

| t (s) | Event                                                               |
| ----- | ------------------------------------------------------------------- |
| 0.0   | Layer 1 (Infrastructure, red, 3 seg) rises from below               |
| 0.6   | Label **"Infrastructure"** fades in (pink)                          |
| 1.8   | Layer 2 (Platform, blue, 5 seg) rises from below                    |
| 2.4   | Label **"Platform"** fades in (light blue)                          |
| 3.6   | Layer 3 (Building Blocks, green, 7 seg) rises from below            |
| 4.2   | Label **"Building Blocks"** fades in (light green)                  |
| 5.2   | Layer 4 (Applications, yellow, 9 seg) rises from below              |
| 5.8   | Label **"Applications"** fades in (yellow)                          |
| 6.0   | Sovereign Standards segments appear above stack, drop down          |
| 7.4   | Label **"Sovereign Standards"** fades in below segments             |
| 8.0   | App title appears: "Public Digital Infrastructure / **StackAtlas**" |
| ~9s   | Splash exits (fade + scale up)                                      |

---

## Animation Details per Phase

### Phase 1–4 – Stack Layers (Infrastructure → Applications)

- **Trigger:** each layer starts 1.8s after the previous
- **Motion:** segments rise from **50px below**, scale from 60% → 100%
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — fast rise, soft landing
- **Duration:** 0.7s per layer
- **Label:** fades in 0.6s after its layer starts, visible for ~1s, then fades out upward

### Phase 5 – Sovereign Standards (Crown)

**Desired behavior:**

- Segments **appear at one layer height above** their final position (= 18px segment + 6px gap = **24px offset**)
- Fade in while elevated: `opacity: 0 → 1` during first 30% of animation
- Then **glide exactly one layer down** (24px) to rest on top of the Applications row
- Slight overshoot on landing: 3px below final position, bounce back to 0
- Duration: 1.6s, delay: 6.0s
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` — smooth deceleration
- Text "Sovereign Standards" appears after segments have landed (delay 7.4s)

### Phase 6 – App Title

- Fades in from 12px below
- Both subtitle and heading appear together
- Duration: 0.8s, delay: 8.0s

### Phase 7 – Exit

- Entire splash fades out + scales up slightly (`scale(1.04)`)
- Triggered by JS after app is ready
- Duration: 0.6s

---

## Open Design Questions

1. **Drop height for crown** — 70px feels visible but not dramatic. Should it be higher (120px)?
2. **Label visibility** — Labels currently pulse and disappear. Should the last active label stay visible?
3. **Speed** — Total animation ~9s. Too slow? Too fast? A 30% speedup would bring it to ~6.3s.
4. **Sovereign Standards label position** — Currently below the segments (under the crown). Should it be above?
5. **Exit trigger** — Currently JS-driven. Should there be a manual "skip" button?
6. **Sound** (optional) — Should a subtle sound cue accompany the crown landing?

---

## Color Reference

| Layer | Name                | Color                    |
| ----- | ------------------- | ------------------------ |
| 1     | Infrastructure      | `#c5192d` (red)          |
| 2     | Platform            | `#1a56a0` (blue)         |
| 3     | Building Blocks     | `#00883d` (green)        |
| 4     | Applications        | `#f39c12` (yellow/amber) |
| Crown | Sovereign Standards | `#ffffff` (white)        |

Background gradient: `#002d62` → `#003d82` → `#004a9e` (dark blue)
