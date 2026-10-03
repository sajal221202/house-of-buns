---
name: house-of-buns-design
description: Use when building or restyling any House of Buns page/section (public site or admin portal) — the real brand palette, type scale, and motion conventions already in this repo. Apply by default instead of inventing a new look.
---

# House of Buns Design System

## Brand tokens (from `src/index.css`)
```css
--cream: #f7ecd9;       /* primary background */
--cream-2: #f0e0c3;     /* secondary cream, cards */
--green: #1f6b3f;       /* primary brand green */
--green-light: #3c8a5c; /* hover/accent */
--green-dark: #123d24;  /* headings, strong text on cream */
--green-darker: #0d2e1b;/* darkest, sidebar/cover backgrounds */
--green-tint: #e5efe1;  /* subtle green-tinted surface */
--near-black: #14201a;  /* body text */
--white: #fffaf0;       /* off-white surface */
--text-muted: #6b7a70;
--gold: #f2c14e;        /* sparing accent, badges/highlights only */
```
- Fonts: `--font` (Poppins, body), `--font-display` (Bevan, headings/display), `--font-accent` (Dancing Script, playful flourishes only — never body text).

## Texture
The signature House of Buns texture is the "butter paper" effect: a hand-drawn burger-doodle tile
(`src/assets/pattern-tile.jpg`) layered with `background-blend-mode: soft-light` over a dark green
gradient. Used on: menu book cover (`menuBook.css`), `.quality-card`, and the admin portal sidebar/PIN
screen (`admin.css`). Reuse this exact technique for any new dark/cover-style surface — never a flat
color or a generic gradient.

## Motion
- `motion` (the renamed Framer Motion) is installed — import as `import { motion } from "motion/react"`.
- Keep animation restrained and food-brand-appropriate: fades + gentle upward slides on scroll reveal
  (see `useScrollReveal` hook — prefer extending that hook over adding ad-hoc motion everywhere), subtle
  scale on hover for cards/buttons. Avoid flashy/bouncy effects — this is a warm, artisanal, slightly
  playful brand, not a tech startup.
- Respect `prefers-reduced-motion` (already done for the menu book flip animation — follow that pattern).

## Layout conventions
- Public site: component-per-section under `src/components/`, each with its own concerns inline in
  `App.css` (no CSS-in-JS).
- Admin portal: cream/green themed (NOT dark-neon-tech) — see `src/admin/admin.css` for the full token
  remap (`--admin-*` variables derived from the same brand tokens above).
- Buttons: `.btn.btn-green` (primary, solid green) / `.btn.btn-dark` (secondary, dark green outline-ish).
- Rounded pill shapes for selectors/badges (payment method pills, nav badges) — not sharp corners.

## When building something new
1. Pull brand tokens from this file / `src/index.css` — never invent a new palette.
2. If it's a "cover" or hero-like dark surface, use the butter-paper texture technique above.
3. Keep motion subtle; extend `useScrollReveal` where possible instead of new one-off animation logic.
4. Mobile-first: this is a real restaurant site — verify on phone width (checkout flow, menu book, admin
   portal all get used on phones at the counter).
