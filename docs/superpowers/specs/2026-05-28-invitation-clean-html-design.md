# Wedding Invitation — Clean HTML Design Spec

**Date:** 2026-05-28  
**Event:** Бахтияр & Аяжан — Үйлену той  
**Source:** `extracted.html` (Tilda T396 export, 10 531 lines)  
**Output:** `invitation.html` — single self-contained file

---

## Goal

Rewrite the extracted Tilda page as clean, modern HTML+CSS. No Tilda framework, no jQuery, no external tracking. All images already base64-embedded in `extracted.html`; carry them over verbatim.

---

## Color Palette

| Token       | Value     | Usage                        |
|-------------|-----------|------------------------------|
| `--cream`   | `#fef6f4` | Page background              |
| `--dark1`   | `#2d2a2e` | Invite section background    |
| `--dark2`   | `#444743` | RSVP section background      |
| `--text-light` | `#fcf7f4` | Text on dark backgrounds  |
| `--text-dark`  | `#454242` | Body text on light           |

## Typography

All fonts loaded from Tilda CDN (no auth required):

- **Kazaksha** — Kazakh calligraphy (`woff2` + `woff`), used for headings and decorative text
- **monument** — clean sans-serif, used for body and labels
- **ventura** — script font, used for couple name display

---

## Sections (6)

### 1. Hero
- Full-viewport (`100svh`) `<video>` loop from Dropbox URL (muted, autoplay, playsinline)
- Couple name image overlay, centered bottom
- Music toggle button (play/stop PNG icons from base64) — top-right corner
- `<audio id="bg-sound">` with Dropbox audio URL

### 2. Invite
- Background: `#2d2a2e`
- Centered ornament PNG (base64)
- Kazakh invitation text in `Georgia` serif, `#fcf7f4`
- Signed: "Құрметпен, Мағауия-Гүлжан!"

### 3. Location
- Background: `#fef6f4`
- Ornament images (base64)
- Venue text: `Ақтөбе қаласы, Ағайынды Жұбановтар көшесі, 276/1, "Курмет Холл" мейрамханасы`
- 2GIS map button (linked `<a>` wrapping the map image, href to 2GIS)

### 4. Schedule
- Background: `#fef6f4`
- 4 items in a staggered chess layout (odd left, even right) matching extracted.html
- Each item: icon image (base64) + time placeholder (`__:__`) + label
  - Қонақтардың жиналуы
  - Беташар
  - Құдаларды қарсы алу
  - Шоу программа

### 5. Countdown + Photo
- Wedding photo full-width (`Wedding.jpeg`, base64)
- Below photo: "Тойға дейін:" label
- Countdown row: days / hours / minutes / seconds — native JS, updates every second
- Target date constant: `const WEDDING_DATE = new Date('TODO');` — easy to find and replace

### 6. RSVP
- Background: `#444743`
- Heading in Kazaksha font
- Ornament image (base64)
- Form fields:
  - Text input: guest name (`Name`)
  - Radio group: 3 options
    - "Иә, әрине келемін"
    - "Жұбайыммен келемін"
    - "Өкінішке орай, келе алмаймын"
  - Submit button
- On submit: `fetch(GAS_URL + ...)` — Google Apps Script endpoint
- `const GAS_URL = 'TODO';` — easy to find and replace
- Success state: hide form, show confirmation message

---

## HTML Structure

```
<!doctype html>
<html lang="kk">
<head>
  meta charset / viewport
  title
  @font-face blocks (Kazaksha, monument, ventura — Tilda CDN URLs)
  <style> single block, ~500 lines
</head>
<body>
  <audio id="bg-sound"> ... </audio>
  <section id="hero"> ... </section>
  <section id="invite"> ... </section>
  <section id="location"> ... </section>
  <section id="schedule"> ... </section>
  <section id="countdown"> ... </section>
  <section id="rsvp"> ... </section>
  <script> music player + countdown + RSVP fetch </script>
</body>
```

---

## CSS Approach

- CSS custom properties for palette
- `section` as the layout unit, each self-contained
- Flexbox for centering and stacking; CSS Grid for schedule chess layout
- Single responsive breakpoint at `max-width: 480px`
- No Tilda classes (`.t396`, `.tn-elem`, etc.)
- No inline styles — all layout in `<style>`

---

## JavaScript (inline, ~80 lines total)

### Music Player
```js
// Vanilla — no jQuery
audio.play() / audio.pause() on click
toggle visibility of play/stop icons
handle 'ended' event
```

### Countdown
```js
const WEDDING_DATE = new Date('TODO');
setInterval(tick, 1000);
// updates #cnt-days, #cnt-hours, #cnt-mins, #cnt-secs
```

### RSVP Form
```js
const GAS_URL = 'TODO';
form.addEventListener('submit', async e => {
  fetch(GAS_URL + params)
  show success message on resolve
})
```

---

## Assets Carried Over

All images are base64 `data:image/webp` blobs extracted directly from `extracted.html`:
- Hero ornaments (×2 PNG, 1 SVG)
- Invite ornament (×1)
- Location ornaments + map (×3)
- Schedule icons (×5)
- Wedding photo (`Wedding.jpeg`)
- RSVP ornament (×1)
- Closing ornaments (×2)

---

## TODOs (fill in before sharing)

1. `const WEDDING_DATE = new Date('TODO');` — set actual date/time
2. `const GAS_URL = 'TODO';` — deploy Google Apps Script, paste URL
3. Schedule time placeholders `__:__` — replace with actual times

---

## Out of Scope

- Animations / fade-in effects (Tilda had these; omitted for simplicity)
- Tilda form validation UI (replaced with native browser validation)
- Tilda "Made on Tilda" label — removed
