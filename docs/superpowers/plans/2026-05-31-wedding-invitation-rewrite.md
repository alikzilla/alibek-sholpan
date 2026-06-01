# Wedding Invitation Clean HTML Rewrite — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `invitation.html` as a 100% clean, self-contained HTML file matching the Tilda design in `extracted.html`, with all images downloaded locally.

**Architecture:** Single `invitation.html` file with inline `<style>` block in `<head>`, all JS in `<script>` blocks at bottom of `<body>`. Images in `assets/` folder. No external JS dependencies (no jQuery, no megatimer).

**Tech Stack:** HTML5, CSS3, vanilla JS. Assets from Tilda CDN downloaded locally.

---

## File Structure

```
alibek-sholpan/
├── invitation.html          ← full rewrite (overwrite existing)
└── assets/
    ├── names-hero.png       ← hero names overlay
    ├── icon-play.png        ← music play button icon
    ├── icon-stop.png        ← music stop button icon
    ├── ornament-hero.svg    ← hero ornament SVG
    ├── date.png             ← date graphic (names section)
    ├── names.png            ← couple names (names section)
    ├── ornament-names.png   ← ornament (names section)
    ├── invite-bg.png        ← invite section background
    ├── location-venue.png   ← venue photo
    ├── location-heading.png ← location heading graphic
    ├── location-ornament.png
    ├── schedule-icon1.png   ← Қонақтардың жиналуы
    ├── schedule-icon2.png   ← Беташар
    ├── schedule-icon3.png   ← Құдаларды қарсы алу
    ├── schedule-icon4.png   ← Шоу программа
    ├── schedule-icon5.png   ← (5th schedule icon)
    ├── countdown-bg.jpeg    ← countdown section bg
    ├── rsvp-heading.png     ← RSVP heading graphic
    ├── footer-text.png      ← footer closing text
    └── footer-ornament.png  ← footer ornament
```

---

## Task 1: Download all assets

**Files:**
- Create: `assets/` directory with 20 images

- [ ] **Step 1: Create assets directory**

```bash
mkdir -p /Users/nuspekov/Desktop/others/alibek-sholpan/assets
```

- [ ] **Step 2: Download all 20 images**

```bash
cd /Users/nuspekov/Desktop/others/alibek-sholpan/assets

curl -L -o names-hero.png      "https://static.tildacdn.pro/tild3530-3736-4364-a237-613734376163/__84.png"
curl -L -o icon-play.png       "https://static.tildacdn.pro/tild3261-6237-4563-a261-653564323336/8.png"
curl -L -o icon-stop.png       "https://static.tildacdn.pro/tild3062-3033-4265-b763-663733636463/9.png"
curl -L -o ornament-hero.svg   "https://static.tildacdn.pro/tild3732-3536-4261-b261-653666343230/______3.svg"
curl -L -o date.png            "https://static.tildacdn.pro/tild3065-3464-4334-b033-383037333239/__65.png"
curl -L -o names.png           "https://static.tildacdn.pro/tild3235-3734-4362-a162-663438396232/__83.png"
curl -L -o ornament-names.png  "https://static.tildacdn.pro/tild6330-3630-4361-a239-323566653933/__66.png"
curl -L -o invite-bg.png       "https://static.tildacdn.pro/tild3838-6130-4238-b635-303264393865/__68.png"
curl -L -o location-venue.png  "https://static.tildacdn.pro/tild3839-3437-4436-b365-386266613035/__72.png"
curl -L -o location-heading.png "https://static.tildacdn.pro/tild3135-3663-4235-a165-326166326338/__71.png"
curl -L -o location-ornament.png "https://static.tildacdn.pro/tild3937-6337-4335-a130-633735666632/__69.png"
curl -L -o schedule-icon1.png  "https://static.tildacdn.pro/tild6332-6330-4363-b566-316130396437/__73.png"
curl -L -o schedule-icon2.png  "https://static.tildacdn.pro/tild6532-6634-4137-a463-343638396635/__75.png"
curl -L -o schedule-icon3.png  "https://static.tildacdn.pro/tild6133-6132-4630-a130-386261613761/__76.png"
curl -L -o schedule-icon4.png  "https://static.tildacdn.pro/tild3230-3432-4866-a237-646132303162/__74.png"
curl -L -o schedule-icon5.png  "https://static.tildacdn.pro/tild3265-3432-4466-a661-633966333534/__77.png"
curl -L -o countdown-bg.jpeg   "https://static.tildacdn.pro/tild3161-6361-4561-b662-623439396134/Wedding.jpeg"
curl -L -o rsvp-heading.png    "https://static.tildacdn.pro/tild6464-3835-4730-a531-656432366161/__78.png"
curl -L -o footer-text.png     "https://static.tildacdn.pro/tild6239-6465-4534-b061-353536393432/__27.png"
curl -L -o footer-ornament.png "https://static.tildacdn.pro/tild6638-6563-4634-b739-663964636139/__26.png"
```

- [ ] **Step 3: Verify all 20 files downloaded**

```bash
ls -la /Users/nuspekov/Desktop/others/alibek-sholpan/assets/ | wc -l
```
Expected: 21 (20 files + header line). Each file should be > 1KB. If any is tiny (< 500 bytes), it failed — rerun its curl command with `-v` flag to debug.

- [ ] **Step 4: Commit**

```bash
cd /Users/nuspekov/Desktop/others/alibek-sholpan
git add assets/
git commit -m "feat: download all Tilda assets locally"
```

---

## Task 2: Write HTML shell — head, fonts, CSS base

**Files:**
- Overwrite: `invitation.html`

- [ ] **Step 1: Write the full file opening, head, and CSS base**

Overwrite `invitation.html` completely with this content (stop after the opening `<body>` tag — sections are added in subsequent tasks):

```html
<!doctype html>
<html lang="kk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Бахтияр &amp; Аяжан — Үйлену той</title>
<style>
@font-face {
  font-family: "Kazaksha";
  src: url("https://static.tildacdn.com/tild6163-3262-4734-b339-353636343334/_AsylbekM02Shelleykz.woff2") format("woff2"),
       url("https://static.tildacdn.com/tild3630-6366-4566-b932-636438666133/AsylbekM02Shelleykz_.woff") format("woff");
  font-weight: 100 900;
}
@font-face {
  font-family: "monument";
  src: url("https://static.tildacdn.com/tild6636-3137-4839-b333-316466333966/KZPFMonumentaPro-Reg.woff2") format("woff2"),
       url("https://static.tildacdn.com/tild6135-6436-4032-a135-343931663462/KZPFMonumentaPro-Reg.woff") format("woff");
  font-weight: 100 900;
}
@font-face {
  font-family: "ventura";
  src: url("https://static.tildacdn.com/tild3363-3863-4261-a434-393938636235/Kz_Ventura_Script_.woff2") format("woff2"),
       url("https://static.tildacdn.com/tild3433-3866-4637-b738-316166366435/Kz_Ventura-Script_.woff") format("woff");
  font-weight: 100 900;
}

:root {
  --cream: #fef6f4;
  --dark:  #2d2a2e;
  --text-dark:  #454242;
  --text-light: #fcf7f4;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: "monument", Arial, sans-serif;
  background: var(--cream);
  color: var(--text-dark);
}
img { display: block; max-width: 100%; }
section { width: 100%; overflow: hidden; }
a { color: inherit; }

/* ── HERO ───────────────────────────────── */
#hero {
  position: relative;
  background: #000;
}
.hero-video-wrap {
  position: relative;
  width: 100%;
  height: 100svh;
  overflow: hidden;
}
.hero-video-wrap video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.hero-names-img {
  width: min(320px, 72vw);
}
.hero-ornament-img {
  margin-top: 20px;
  width: min(220px, 55vw);
  opacity: 0.85;
}
#music-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 20;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 100px;
  padding: 9px 16px 9px 12px;
  color: #fff;
  font-family: "monument", Arial, sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
#music-btn svg { width: 15px; height: 15px; flex-shrink: 0; }
#stop-icon { display: none; }

/* ── NAMES ──────────────────────────────── */
#names {
  background: var(--cream);
  padding: 64px 32px 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.names-date-img   { width: min(280px, 78vw); }
.names-couple-img { width: min(340px, 88vw); }
.names-ornament-img { width: min(200px, 60vw); }
.names-divider {
  width: min(280px, 80vw);
  height: 1px;
  background: var(--text-dark);
  opacity: 0.18;
}

/* ── INVITE ─────────────────────────────── */
#invite {
  position: relative;
  background: var(--dark);
  color: var(--text-light);
  padding: 72px 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
  overflow: hidden;
}
.invite-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.18;
  pointer-events: none;
}
.invite-label {
  font-family: "monument", Arial, sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.75;
  position: relative;
}
.invite-body {
  font-family: Georgia, serif;
  font-size: 1rem;
  line-height: 2;
  max-width: 500px;
  color: var(--text-light);
  position: relative;
}
.invite-joy {
  font-family: "monument", Arial, sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--text-light);
  opacity: 0.85;
  position: relative;
}
.invite-signed {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.6rem;
  color: var(--text-light);
  position: relative;
}

/* ── LOCATION ───────────────────────────── */
#location {
  background: var(--cream);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.location-venue-img {
  width: 100%;
  max-height: 56svh;
  object-fit: cover;
}
.location-inner {
  padding: 56px 40px 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
}
.location-heading-img { width: min(300px, 84vw); }
.location-address {
  font-family: Georgia, serif;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--text-dark);
  max-width: 320px;
}
.location-map-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: "monument", Arial, sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-dark);
}
.location-map-link svg {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}
.location-ornament-img { width: min(220px, 70vw); opacity: 0.75; }

/* ── SCHEDULE ───────────────────────────── */
#schedule {
  background: var(--cream);
  padding: 64px 32px 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.schedule-title {
  font-family: "monument", Arial, sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.6;
  margin-bottom: 40px;
}
.schedule-row {
  width: 100%;
  max-width: 360px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(69,66,66,0.14);
}
.schedule-row:first-of-type { border-top: 1px solid rgba(69,66,66,0.14); }
.schedule-icon {
  width: 52px;
  height: 52px;
  object-fit: contain;
  flex-shrink: 0;
}
.schedule-time {
  font-family: "monument", Arial, sans-serif;
  font-size: 1rem;
  letter-spacing: 0.06em;
  color: var(--text-dark);
  min-width: 52px;
}
.schedule-event {
  font-family: Georgia, serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-dark);
}

/* ── COUNTDOWN ──────────────────────────── */
#countdown {
  position: relative;
  background: var(--dark);
  color: var(--text-light);
  padding: 72px 32px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  text-align: center;
  overflow: hidden;
}
.countdown-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.22;
  pointer-events: none;
}
.countdown-title {
  font-family: "monument", Arial, sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0.75;
  position: relative;
}
.countdown-grid {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 28px;
  position: relative;
}
.cnt-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.cnt-number {
  font-family: "monument", Arial, sans-serif;
  font-size: clamp(2.2rem, 9vw, 3.4rem);
  line-height: 1;
  color: var(--text-light);
  min-width: 2ch;
  text-align: center;
}
.cnt-label {
  font-family: Georgia, serif;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.65;
  color: var(--text-light);
}

/* ── RSVP ───────────────────────────────── */
#rsvp {
  background: var(--cream);
  padding: 64px 32px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
.rsvp-heading-img { width: min(300px, 84vw); }
#rsvp-form {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.rsvp-field-label {
  display: block;
  font-family: "monument", Arial, sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: var(--text-dark);
  opacity: 0.75;
}
.rsvp-input {
  width: 100%;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(69,66,66,0.35);
  padding: 8px 0;
  font-family: Georgia, serif;
  font-size: 1rem;
  color: var(--text-dark);
  outline: none;
}
.rsvp-input:focus { border-bottom-color: var(--text-dark); }
.rsvp-radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.rsvp-radio-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Georgia, serif;
  font-size: 0.92rem;
  color: var(--text-dark);
  cursor: pointer;
}
.rsvp-radio-label input[type="radio"] {
  accent-color: var(--text-dark);
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.rsvp-submit {
  align-self: center;
  background: var(--dark);
  color: var(--text-light);
  border: none;
  padding: 14px 40px;
  font-family: "monument", Arial, sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 2px;
  transition: opacity 0.2s;
}
.rsvp-submit:hover { opacity: 0.82; }
.rsvp-submit:disabled { opacity: 0.4; cursor: not-allowed; }
#rsvp-msg {
  font-family: Georgia, serif;
  font-size: 0.9rem;
  text-align: center;
  min-height: 1.4em;
  color: var(--text-dark);
}

/* ── FOOTER ─────────────────────────────── */
#footer {
  background: var(--cream);
  padding: 64px 32px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
}
.footer-text-img    { width: min(300px, 84vw); }
.footer-ornament-img { width: min(180px, 56vw); opacity: 0.65; }
.footer-credit {
  font-family: "monument", Arial, sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0.4;
  color: var(--text-dark);
}

/* ── RESPONSIVE ─────────────────────────── */
@media (max-width: 480px) {
  #invite  { padding: 60px 28px 68px; }
  .location-inner { padding: 44px 28px 56px; }
  #schedule { padding: 52px 20px 60px; }
  #countdown { padding: 60px 20px 68px; gap: 32px; }
  #rsvp  { padding: 56px 24px 72px; }
  #footer { padding: 56px 24px 40px; }
}
</style>
</head>
<body>
```

- [ ] **Step 2: Verify file was written**

Open `invitation.html` in a text editor. Confirm it starts with `<!doctype html>` and ends with `<body>`.

---

## Task 3: Add Hero section

**Files:**
- Modify: `invitation.html` — append after `<body>`

- [ ] **Step 1: Append hero HTML**

Append the following after `<body>` in `invitation.html`:

```html
<audio id="bg-sound" preload="none">
  <source src="https://dl.dropbox.com/scl/fi/3v7hgagxaqu308mzl8220/WhatsApp-Audio-2024-12-11-at-15.35.56.mp4?rlkey=637nii9uj5paa4qursjuq8stz&st=dujp2f75&dl=1" type="audio/mp4">
</audio>

<!-- ── Hero ── -->
<section id="hero">
  <div class="hero-video-wrap">
    <video autoplay muted loop playsinline>
      <source src="https://dl.dropbox.com/scl/fi/50jrg58ip1sjdo9de8wxt/2.mp4?rlkey=x5r5y5eiqeppg4qxas8lfyzhi&st=5hn6gcj4&dl=1" type="video/mp4">
    </video>
    <div class="hero-overlay">
      <img class="hero-names-img" src="assets/names-hero.png" alt="Бахтияр & Аяжан">
      <img class="hero-ornament-img" src="assets/ornament-hero.svg" alt="">
    </div>
  </div>
  <button id="music-btn" aria-label="Музыканы қосу / өшіру">
    <svg id="play-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
    </svg>
    <svg id="stop-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
    <span>музыка</span>
  </button>
</section>
```

- [ ] **Step 2: Verify in browser**

Open `invitation.html` in a browser. You should see:
- Full-viewport video playing (dark cinematic video)
- Names image centered on video
- Ornament SVG below names
- Glass pill music button at top-right
- No white flash or layout shift

- [ ] **Step 3: Commit**

```bash
cd /Users/nuspekov/Desktop/others/alibek-sholpan
git add invitation.html
git commit -m "feat: hero section — video, names overlay, music button"
```

---

## Task 4: Add Names/Date section

**Files:**
- Modify: `invitation.html` — append after closing `</section>` of hero

- [ ] **Step 1: Append names section HTML**

```html
<!-- ── Names / Date ── -->
<section id="names">
  <img class="names-date-img"    src="assets/date.png"           alt="26.04.2025">
  <div class="names-divider"></div>
  <img class="names-couple-img"  src="assets/names.png"          alt="Бахтияр & Аяжан">
  <div class="names-divider"></div>
  <img class="names-ornament-img" src="assets/ornament-names.png" alt="">
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll past hero. You should see:
- Cream background section
- Date graphic (vertical date format matching `__65.png` from extracted.html)
- Thin horizontal dividers
- Couple names graphic
- Ornament at bottom
- All images centered, properly sized on mobile

- [ ] **Step 3: Commit**

```bash
git add invitation.html
git commit -m "feat: names/date section"
```

---

## Task 5: Add Invite section

**Files:**
- Modify: `invitation.html` — append after names section

- [ ] **Step 1: Append invite section HTML**

```html
<!-- ── Invite ── -->
<section id="invite">
  <img class="invite-bg" src="assets/invite-bg.png" alt="">
  <p class="invite-label">Құрметті қонақтар!</p>
  <p class="invite-body">
    Сіздерді ұлымыз Бахтияр мен Аяжан қызымыздың үйлену тойына арналған
    салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!
  </p>
  <p class="invite-joy">Қуанышымызға ортақ болыңыздар!</p>
  <p class="invite-signed">Құрметпен, Мағауия-Гүлжан!</p>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to invite section. You should see:
- Dark (`#2d2a2e`) background
- Background image subtly overlaid (opacity ~0.18)
- "Құрметті қонақтар!" in small uppercase label
- Main body paragraph in Georgia serif, light color, generous line height
- "Қуанышымызға ортақ болыңыздар!" below
- "Құрметпен, Мағауия-Гүлжан!" in large Kazaksha calligraphic font
- All text white/cream colored, centered

- [ ] **Step 3: Commit**

```bash
git add invitation.html
git commit -m "feat: invite section with Kazakh text"
```

---

## Task 6: Add Location section

**Files:**
- Modify: `invitation.html` — append after invite section

- [ ] **Step 1: Append location section HTML**

```html
<!-- ── Location ── -->
<section id="location">
  <img class="location-venue-img" src="assets/location-venue.png" alt="Курмет Холл мейрамханасы">
  <div class="location-inner">
    <img class="location-heading-img" src="assets/location-heading.png" alt="Мекенжайымыз">
    <p class="location-address">
      Ақтөбе қаласы,<br>
      Ағайынды Жұбановтар көшесі, 276/1,<br>
      «Курмет Холл» мейрамханасы
    </p>
    <a class="location-map-link"
       href="https://2gis.kz/aktobe/firm/70000001045465548?m=57.151117%2C50.291091%2F14.32"
       target="_blank"
       rel="noopener">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
      Картада ашу (басыңыз)
    </a>
    <img class="location-ornament-img" src="assets/location-ornament.png" alt="">
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to location section. You should see:
- Full-width venue photo at top (~56svh height)
- Cream background below
- Heading graphic
- Address text in Georgia serif
- Map link with pin icon — tapping opens 2GIS
- Ornament image at bottom

- [ ] **Step 3: Commit**

```bash
git add invitation.html
git commit -m "feat: location section with venue photo and map link"
```

---

## Task 7: Add Schedule section

**Files:**
- Modify: `invitation.html` — append after location section

- [ ] **Step 1: Append schedule section HTML**

```html
<!-- ── Schedule ── -->
<section id="schedule">
  <p class="schedule-title">Той бағдарламасы</p>
  <div class="schedule-row">
    <img class="schedule-icon" src="assets/schedule-icon1.png" alt="">
    <span class="schedule-time">__:__</span>
    <span class="schedule-event">Қонақтардың жиналуы</span>
  </div>
  <div class="schedule-row">
    <img class="schedule-icon" src="assets/schedule-icon2.png" alt="">
    <span class="schedule-time">__:__</span>
    <span class="schedule-event">Беташар</span>
  </div>
  <div class="schedule-row">
    <img class="schedule-icon" src="assets/schedule-icon3.png" alt="">
    <span class="schedule-time">__:__</span>
    <span class="schedule-event">Құдаларды қарсы алу</span>
  </div>
  <div class="schedule-row">
    <img class="schedule-icon" src="assets/schedule-icon4.png" alt="">
    <span class="schedule-time">__:__</span>
    <span class="schedule-event">Шоу программа</span>
  </div>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to schedule section. You should see:
- Cream background
- "ТОЙ БАҒДАРЛАМАСЫ" label in small uppercase
- 4 rows, each with: icon image | `__:__` time | event name in Georgian
- Thin horizontal dividers between rows
- Top and bottom border on the row group

- [ ] **Step 3: Commit**

```bash
git add invitation.html
git commit -m "feat: schedule section with 4 event rows"
```

---

## Task 8: Add Countdown section

**Files:**
- Modify: `invitation.html` — append after schedule section

- [ ] **Step 1: Append countdown section HTML**

```html
<!-- ── Countdown ── -->
<section id="countdown">
  <img class="countdown-bg" src="assets/countdown-bg.jpeg" alt="">
  <p class="countdown-title">Тойға дейін:</p>
  <div class="countdown-grid">
    <div class="cnt-box">
      <span class="cnt-number" id="cnt-days">00</span>
      <span class="cnt-label">күн</span>
    </div>
    <div class="cnt-box">
      <span class="cnt-number" id="cnt-hours">00</span>
      <span class="cnt-label">сағат</span>
    </div>
    <div class="cnt-box">
      <span class="cnt-number" id="cnt-mins">00</span>
      <span class="cnt-label">минут</span>
    </div>
    <div class="cnt-box">
      <span class="cnt-number" id="cnt-secs">00</span>
      <span class="cnt-label">секунд</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify layout in browser (before JS)**

Scroll to countdown section. You should see:
- Dark background with wedding photo subtly visible
- "Тойға дейін:" label
- 4 boxes with "00" placeholders and Kazakh labels below each

- [ ] **Step 3: Commit layout**

```bash
git add invitation.html
git commit -m "feat: countdown section layout"
```

---

## Task 9: Add RSVP section

**Files:**
- Modify: `invitation.html` — append after countdown section

- [ ] **Step 1: Append RSVP section HTML**

The form uses GET to Google Apps Script. Replace `YOUR_GAS_URL` with the deployed Web App URL (get it from Apps Script → Deploy → Manage deployments).

```html
<!-- ── RSVP ── -->
<section id="rsvp">
  <img class="rsvp-heading-img" src="assets/rsvp-heading.png" alt="Той қонағымыз боласыз ба?">
  <form id="rsvp-form" novalidate>
    <div>
      <label class="rsvp-field-label" for="rsvp-name">Аты-жөніңіз:</label>
      <input class="rsvp-input" id="rsvp-name" name="name" type="text"
             placeholder="Аты-жөніңізді жазыңыз" required>
    </div>
    <div>
      <p class="rsvp-field-label">Қатысасыз ба?</p>
      <div class="rsvp-radio-group">
        <label class="rsvp-radio-label">
          <input type="radio" name="radio" value="Иә, әрине келемін" required>
          Иә, әрине келемін
        </label>
        <label class="rsvp-radio-label">
          <input type="radio" name="radio" value="Жұбайыммен келемін">
          Жұбайыммен келемін
        </label>
        <label class="rsvp-radio-label">
          <input type="radio" name="radio" value="Өкінішке орай, келе алмаймын">
          Өкінішке орай, келе алмаймын
        </label>
      </div>
    </div>
    <div>
      <label class="rsvp-field-label" for="rsvp-comment">Ескертпе:</label>
      <input class="rsvp-input" id="rsvp-comment" name="count" type="text"
             placeholder="Қосымша ақпарат">
    </div>
    <button class="rsvp-submit" type="submit">Жіберу</button>
    <p id="rsvp-msg"></p>
  </form>
</section>
```

- [ ] **Step 2: Verify form layout in browser**

Scroll to RSVP section. You should see:
- Cream background
- Heading image
- Name text input with underline-only border
- 3 radio options with custom accent color
- Comment text input
- Dark "Жіберу" submit button
- Empty message area below button

- [ ] **Step 3: Commit**

```bash
git add invitation.html
git commit -m "feat: RSVP form section"
```

---

## Task 10: Add Footer section

**Files:**
- Modify: `invitation.html` — append after RSVP section

- [ ] **Step 1: Append footer HTML**

```html
<!-- ── Footer ── -->
<section id="footer">
  <img class="footer-text-img"    src="assets/footer-text.png"    alt="Келіңіздер, қуанышымызға ортақ болыңыздар!">
  <img class="footer-ornament-img" src="assets/footer-ornament.png" alt="">
  <p class="footer-credit">Сайт жасаған: @shakyru_online_9</p>
</section>
```

- [ ] **Step 2: Verify in browser**

Scroll to footer. You should see:
- Cream background
- Closing text image
- Ornament image below
- Tiny credit text at very bottom

- [ ] **Step 3: Commit**

```bash
git add invitation.html
git commit -m "feat: footer section"
```

---

## Task 11: Add all JavaScript — music player, countdown, RSVP handler

**Files:**
- Modify: `invitation.html` — append 3 `<script>` blocks before `</body>`

- [ ] **Step 1: Append JS before `</body>`**

```html
<!-- Music player -->
<script>
(function musicPlayer() {
  const btn  = document.getElementById('music-btn');
  const audio = document.getElementById('bg-sound');
  const playIcon = document.getElementById('play-icon');
  const stopIcon = document.getElementById('stop-icon');
  if (!btn || !audio) return;
  audio.volume = 0.4;
  btn.addEventListener('click', function () {
    if (audio.paused) {
      audio.play();
      playIcon.style.display = 'none';
      stopIcon.style.display = '';
    } else {
      audio.pause();
      playIcon.style.display = '';
      stopIcon.style.display = 'none';
    }
  });
  audio.addEventListener('ended', function () {
    playIcon.style.display = '';
    stopIcon.style.display = 'none';
  });
})();
</script>

<!-- Countdown timer — target: 26 April 2025 00:00 Aktobe (UTC+5) -->
<script>
(function countdown() {
  const TARGET = new Date('2025-04-26T00:00:00+05:00').getTime();
  const days  = document.getElementById('cnt-days');
  const hours = document.getElementById('cnt-hours');
  const mins  = document.getElementById('cnt-mins');
  const secs  = document.getElementById('cnt-secs');
  if (!days) return;

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function tick() {
    const diff = TARGET - Date.now();
    if (diff <= 0) {
      days.textContent = hours.textContent = mins.textContent = secs.textContent = '00';
      return;
    }
    days.textContent  = pad(Math.floor(diff / 86400000));
    hours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    mins.textContent  = pad(Math.floor((diff % 3600000)  / 60000));
    secs.textContent  = pad(Math.floor((diff % 60000)    / 1000));
  }

  tick();
  setInterval(tick, 1000);
})();
</script>

<!-- RSVP form — POST to Google Apps Script -->
<script>
(function rsvpForm() {
  const GAS_URL = 'YOUR_GAS_URL'; // replace with deployed Web App URL from Apps Script

  const form   = document.getElementById('rsvp-form');
  const msg    = document.getElementById('rsvp-msg');
  const submit = form ? form.querySelector('.rsvp-submit') : null;
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name  = form.querySelector('[name="name"]').value.trim();
    const radio = form.querySelector('[name="radio"]:checked');
    if (!name) { msg.textContent = 'Аты-жөніңізді жазыңыз.'; return; }
    if (!radio) { msg.textContent = 'Қатысуыңызды белгілеңіз.'; return; }

    submit.disabled = true;
    msg.textContent = '…жіберілуде';

    const count = form.querySelector('[name="count"]').value.trim() || '1';
    const url   = `${GAS_URL}?name=${encodeURIComponent(name)}&radio=${encodeURIComponent(radio.value)}&count=${encodeURIComponent(count)}`;

    try {
      const res = await fetch(url, { mode: 'no-cors' });
      msg.textContent = 'Рахмет! Жауабыңыз қабылданды.';
      form.reset();
    } catch (err) {
      msg.textContent = 'Қате болды, қайта көріңіз.';
      submit.disabled = false;
    }
  });
})();
</script>

</body>
</html>
```

**Note on GAS_URL:** The Google Apps Script is already written in `google-apps-script.js` (sheet ID: `1ZeDWFlh4v0av8mqo_UL1E8_kwYrDQbi2g2ADUlafL4Y`). To get the URL: open Apps Script → Deploy → New deployment → Web app → Execute as Me → Anyone → Deploy → copy URL → paste into `GAS_URL` constant above.

- [ ] **Step 2: Verify music player**

Open `invitation.html` in browser. Click the music button:
- Icon should switch from music-note to pause bars
- Background audio should start playing at low volume
- Click again → audio pauses, icon reverts

- [ ] **Step 3: Verify countdown**

The wedding date (2025-04-26) is in the past relative to 2026-05-31, so all boxes should show `00`. This is correct — the countdown ran to zero. If you want to test with a future date, temporarily change `TARGET` to tomorrow's date, verify it ticks, then revert.

- [ ] **Step 4: Verify RSVP form validation**

Submit empty form → should show "Аты-жөніңізді жазыңыз."
Fill name, submit without radio → should show "Қатысуыңызды белгілеңіз."

- [ ] **Step 5: Set GAS URL**

Replace `'YOUR_GAS_URL'` with the actual deployed Apps Script URL. If not yet deployed, leave as placeholder and note it in a code comment.

- [ ] **Step 6: Final commit**

```bash
cd /Users/nuspekov/Desktop/others/alibek-sholpan
git add invitation.html
git commit -m "feat: add music player, countdown, and RSVP JS handlers"
```

---

## Task 12: Full visual review

**Files:** None modified — verification only.

- [ ] **Step 1: Open in browser and scroll through all sections**

Open `invitation.html` on mobile viewport (375px width) in DevTools. Check each section:

| Section | What to verify |
|---|---|
| Hero | Video autoplays, names image centered, ornament below, music button top-right |
| Names/Date | Date graphic, dividers, couple names, ornament — all centered on cream |
| Invite | Dark bg, background image faint, all text white, Kazaksha signature font |
| Location | Venue photo full-width, address text, map link tappable, ornament |
| Schedule | 4 rows with icon + `__:__` + event name, dividers between rows |
| Countdown | Dark bg with photo, 4 number boxes with Kazakh labels |
| RSVP | Heading image, 3 inputs/radios, submit button |
| Footer | Closing text image, ornament, credit line |

- [ ] **Step 2: Check no broken image links**

Open browser DevTools → Network → filter by "Img". Reload page. Every image should return 200. If any show 404:
- Verify the file exists in `assets/` with the exact filename referenced in HTML
- Re-run the curl command from Task 1 for that asset

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete wedding invitation clean HTML rewrite"
```

---

## Self-review notes

**Spec coverage check:**
- Hero with video + names + ornament + music button ✓ (Task 3)
- Names/Date section ✓ (Task 4)
- Invite with full Kazakh text ✓ (Task 5)
- Location with venue, address, 2GIS link ✓ (Task 6)
- Schedule with 4 rows + time placeholders ✓ (Task 7)
- Countdown with Kazakh labels + pure JS ✓ (Task 8)
- RSVP form with 3 radios + GAS handler ✓ (Task 9)
- Footer ✓ (Task 10)
- Music player JS ✓ (Task 11)
- All 20 assets downloaded ✓ (Task 1)

**No placeholders in plan:** all code blocks are complete, all commands are exact. ✓

**Type consistency:** IDs used in JS (`cnt-days`, `cnt-hours`, `cnt-mins`, `cnt-secs`, `music-btn`, `bg-sound`, `play-icon`, `stop-icon`, `rsvp-form`, `rsvp-msg`) match HTML exactly across all tasks. ✓
