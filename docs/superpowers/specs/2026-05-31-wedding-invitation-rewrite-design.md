# Wedding Invitation — Clean HTML Rewrite Design
**Date:** 2026-05-31  
**Source of truth:** `extracted.html` (Tilda export, 10,531 lines)  
**Output:** `invitation.html` — standalone, semantic, zero Tilda dependency

---

## Goal
Produce a pixel-faithful copy of the Tilda wedding invitation site as a clean, self-contained HTML file. No Tilda runtime, no tracking scripts, no platform boilerplate.

## Approach
Full semantic rewrite (Option A). `extracted.html` is read-only reference for content, layout proportions, images, and text. The output file uses clean HTML5 + custom CSS + custom JS only.

---

## Assets
Download all Tilda CDN images into `assets/` folder (relative paths in HTML).

| File | Tilda URL | Usage |
|---|---|---|
| `names-hero.png` | tild3530-…/__84.png | Hero names overlay |
| `icon-play.png` | tild3261-…/8.png | Music play button |
| `icon-stop.png` | tild3062-…/9.png | Music stop button |
| `ornament-hero.svg` | tild3732-…/______3.svg | Hero ornament |
| `date.png` | tild3065-…/__65.png | Date graphic (names section) |
| `names.png` | tild3235-…/__83.png | Couple names (names section) |
| `ornament-names.png` | tild6330-…/__66.png | Ornament (names section) |
| `invite-bg.png` | tild3838-…/__68.png | Invite section background |
| `location-venue.png` | tild3839-…/__72.png | Venue photo |
| `location-heading.png` | tild3135-…/__71.png | Location heading graphic |
| `location-ornament.png` | tild3937-…/__69.png | Location ornament |
| `schedule-icon1.png` | tild6332-…/__73.png | Schedule icon — Беташар |
| `schedule-icon2.png` | tild6532-…/__75.png | Schedule icon — Құдалар |
| `schedule-icon3.png` | tild6133-…/__76.png | Schedule icon — Жиналу |
| `schedule-icon4.png` | tild3230-…/__74.png | Schedule icon — Шоу |
| `schedule-icon5.png` | tild3466-…/__77.png | Schedule icon 5 |
| `countdown-bg.jpeg` | tild3161-…/Wedding.jpeg | Countdown section background |
| `rsvp-heading.png` | tild6464-…/__78.png | RSVP section heading |
| `footer-text.png` | tild6239-…/__27.png | Footer closing text |
| `footer-ornament.png` | tild6638-…/__26.png | Footer ornament |

---

## Section Architecture

### 1. `#hero`
- Full-viewport height video background (Dropbox URL, autoplay muted loop playsinline)
- Centered overlay: couple names image (`names-hero.png`) + ornament SVG below
- Top-right: glass-morphism music button (play/stop SVG icons)
- Mobile: 670px height

### 2. `#names`
- Cream background
- Three stacked images centered: `date.png` | `names.png` | `ornament-names.png`
- Thin horizontal divider between elements

### 3. `#invite`
- Dark background (`#2d2a2e`) with `invite-bg.png` as full-bleed image
- "Құрметті қонақтар!" label (monument font, uppercase, spaced)
- Body paragraph (Georgia serif, line-height 2):
  > Сіздерді ұлымыз Бахтияр мен Аяжан қызымыздың үйлену тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!
- "Қуанышымызға ортақ болыңыздар!"
- Signed: "Құрметпен, Мағауия-Гүлжан!" (Kazaksha font)

### 4. `#location`
- Venue photo (`location-venue.png`) as top image (full width)
- Heading image (`location-heading.png`)
- Address text: "Ақтөбе қаласы, Ағайынды Жұбановтар көшесі, 276/1, «Курмет Холл» мейрамханасы"
- Map link → `https://2gis.kz/aktobe/firm/70000001045465548?m=57.151117%2C50.291091%2F14.32`
- Label: "Мекенжайымыз: (басыңыз)"
- Ornament image below

### 5. `#schedule`
- 4 rows, each row: icon image + time placeholder (`__:__`) + event name
  - `schedule-icon1.png` → Қонақтардың жиналуы
  - `schedule-icon2.png` → Беташар
  - `schedule-icon3.png` → Құдаларды қарсы алу
  - `schedule-icon4.png` → Шоу программа
- Thin horizontal dividers between rows
- Times shown as `__:__` placeholders (easy to fill in)

### 6. `#countdown`
- Full-width background: `countdown-bg.jpeg`
- "Тойға дейін:" heading
- 4 boxes: days / hours / minutes / seconds with Kazakh labels (күн / сағат / минут / секунд)
- Target: `2025-04-26T00:00:00+05:00` (Aktobe timezone UTC+5)
- Pure JS implementation — no external scripts

### 7. `#rsvp`
- Heading image: `rsvp-heading.png`
- Form fields:
  - Text input: "АТЫ-ЖӨНІҢІЗ:" (Name)
  - Radio group: "Иә, әрине келемін" / "Жұбайыммен келемін" / "Өкінішке орай, келе алмаймын"
  - Text input: comments/notes
  - Submit button: "Жіберу"
- POST to Google Apps Script (endpoint from `google-apps-script.js`)
- Success/error feedback inline

### 8. `#footer`
- Cream background
- `footer-text.png`: "Келіңіздер, қуанышымызға ортақ болыңыздар!"
- `footer-ornament.png`
- Small credit text: "САЙТ ЖАСАған: @SHAKYRU_ONLINE_9"

---

## Fonts
Three custom fonts loaded from Tilda CDN woff2 (same URLs as existing):
- `"Kazaksha"` — calligraphic, used for names/signature
- `"monument"` — labels, buttons, UI text
- `"ventura"` — decorative

## Colors
- `--cream: #fef6f4` — page background
- `--dark: #2d2a2e` — dark sections
- `--text-dark: #454242`
- `--text-light: #fcf7f4`

## JavaScript
Three self-contained functions at bottom of `<body>`:
1. `musicPlayer()` — play/pause toggle on `#music-btn`, targets `#bg-sound` audio element
2. `countdown()` — ticks every second, updates 4 display elements, stops at zero
3. `rsvpForm()` — intercepts submit, POSTs JSON to GAS endpoint, shows inline success/error

---

## What Gets Removed from Tilda Source
- All Tilda runtime scripts (`t396_init`, `t_onReady`, `t_onFuncLoad`)
- megatimer.ru external scripts
- All `data-elem-id`, `data-field-*`, `data-animationappear` attributes
- All Tilda CSS classes (`t396__elem`, `tn-elem`, `tn-atom`, `t-rec`, etc.)
- Google Analytics / tracking code
- Tilda branding label (footer "Made on Tilda")
- jQuery dependency

---

## File Structure
```
alibek-sholpan/
├── invitation.html        ← output (clean rewrite)
├── assets/
│   ├── names-hero.png
│   ├── icon-play.png
│   ├── icon-stop.png
│   ├── ornament-hero.svg
│   ├── date.png
│   ├── names.png
│   ├── ornament-names.png
│   ├── invite-bg.png
│   ├── location-venue.png
│   ├── location-heading.png
│   ├── location-ornament.png
│   ├── schedule-icon1.png … schedule-icon5.png
│   ├── countdown-bg.jpeg
│   ├── rsvp-heading.png
│   ├── footer-text.png
│   └── footer-ornament.png
├── extracted.html          ← read-only Tilda source
├── google-apps-script.js   ← RSVP backend
└── docs/
    └── superpowers/specs/
        └── 2026-05-31-wedding-invitation-rewrite-design.md
```
