# Wedding Invitation HTML Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `invitation.html` — a clean, self-contained wedding invitation page — from the Tilda export `extracted.html`, using a `build.py` script that extracts base64 images and writes the final HTML.

**Architecture:** `build.py` reads `extracted.html`, extracts 17 base64-embedded images by filename into a dict, then writes `invitation.html` from a Python f-string template. CSS and JS live entirely inside the HTML `<style>` and `<script>` blocks. No external dependencies beyond Tilda CDN font URLs.

**Tech Stack:** Python 3 (stdlib only), HTML5, CSS3 (flexbox + grid), vanilla JS (~70 lines)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `build.py` | Create | Extracts images from `extracted.html`, writes `invitation.html` |
| `invitation.html` | Generated | Final output — open in browser to verify |

---

## Asset Reference

**Media URLs** (Dropbox — carry verbatim from extracted.html):
- Video: `https://dl.dropbox.com/scl/fi/50jrg58ip1sjdo9de8wxt/2.mp4?rlkey=x5r5y5eiqeppg4qxas8lfyzhi&st=5hn6gcj4&dl=0`
- Audio: `https://dl.dropbox.com/scl/fi/3v7hgagxaqu308mzl8220/WhatsApp-Audio-2024-12-11-at-15.35.56.mp4?rlkey=637nii9uj5paa4qursjuq8stz&st=dujp2f75&dl=0`

**Map URL:** `https://2gis.kz/aktobe/firm/70000001045465548?m=57.151117%2C50.291091%2F14.32`

**Music button CDN URLs:**
- Play icon: `https://static.tildacdn.pro/tild3261-6237-4563-a261-653564323336/8.png`
- Stop icon: `https://static.tildacdn.pro/tild3062-3033-4265-b763-663733636463/9.png`

**Font CDN URLs (Tilda static):**
- Kazaksha woff2: `https://static.tildacdn.com/tild6163-3262-4734-b339-353636343334/_AsylbekM02Shelleykz.woff2`
- Kazaksha woff: `https://static.tildacdn.com/tild3630-6366-4566-b932-636438666133/AsylbekM02Shelleykz_.woff`
- monument woff2: `https://static.tildacdn.com/tild6636-3137-4839-b333-316466333966/KZPFMonumentaPro-Reg.woff2`
- monument woff: `https://static.tildacdn.com/tild6135-6436-4032-a135-343931663462/KZPFMonumentaPro-Reg.woff`
- ventura woff2: `https://static.tildacdn.com/tild3363-3863-4261-a434-393938636235/Kz_Ventura_Script_.woff2`
- ventura woff: `https://static.tildacdn.com/tild3433-3866-4637-b738-316166366435/Kz_Ventura-Script_.woff`

**Base64 images** (extracted by filename from `extracted.html`):

| Slug key | Filename | Section |
|----------|----------|---------|
| `__84.png` | `__84.png` | Hero — couple names overlay |
| `______3.svg` | `______3.svg` | Hero — floral ornament SVG |
| `__65.png` | `__65.png` | Invite — ornament top |
| `__83.png` | `__83.png` | Invite — ornament bottom |
| `__66.png` | `__66.png` | Invite — decorative divider |
| `__68.png` | `__68.png` | Location — map screenshot |
| `__71.png` | `__71.png` | Location — ornament left |
| `__69.png` | `__69.png` | Location — ornament right |
| `__73.png` | `__73.png` | Schedule — section ornament |
| `__75.png` | `__75.png` | Schedule — icon: Беташар |
| `__76.png` | `__76.png` | Schedule — icon: Құдаларды қарсы алу |
| `__74.png` | `__74.png` | Schedule — icon: Қонақтардың жиналуы |
| `__77.png` | `__77.png` | Schedule — icon: Шоу программа |
| `Wedding.jpeg` | `Wedding.jpeg` | Countdown — full-width photo |
| `__78.png` | `__78.png` | RSVP — ornament |
| `__27.png` | `__27.png` | Closing — ornament left |
| `__26.png` | `__26.png` | Closing — ornament right |

---

## Task 1: build.py skeleton — image extractor + empty writer

**Files:**
- Create: `build.py`

- [ ] **Step 1: Create build.py with image extraction**

```python
import re

SRC = 'extracted.html'
OUT = 'invitation.html'

with open(SRC, encoding='utf-8') as f:
    raw = f.read()

# Extract <img data-original="URL" ... src="data:..."> pairs
img_pat = re.compile(
    r'data-original="https://[^"]+/([^"/]+)"\s[^>]*src="(data:[^"]+)"',
    re.DOTALL
)
imgs = {}
for fname, data_uri in img_pat.findall(raw):
    imgs[fname] = data_uri

print(f'Extracted {len(imgs)} images: {list(imgs.keys())}')
```

- [ ] **Step 2: Run to verify extraction**

```bash
python3 build.py
```

Expected output: `Extracted 17 images:` followed by list of filenames including `__84.png`, `Wedding.jpeg`, `______3.svg`, etc.

If count is wrong, check regex — the pattern matches `<img ... data-original="...FILENAME" ... src="data:...">`. Make sure `re.DOTALL` is set.

- [ ] **Step 3: Add writer stub**

Append to `build.py` after the extraction block:

```python
html = f"""<!doctype html>
<html lang="kk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Бахтияр & Аяжан — Үйлену той</title>
</head>
<body>
<p>Build works</p>
</body>
</html>"""

with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)
print(f'Saved {OUT}')
```

- [ ] **Step 4: Run again, open output**

```bash
python3 build.py && open invitation.html
```

Expected: browser opens, shows "Build works". File size should be several hundred KB (mostly the base64 image data in the `imgs` dict — it will grow when we embed images in the template).

- [ ] **Step 5: Commit**

```bash
git add build.py
git commit -m "feat: build.py skeleton — extracts 17 base64 images from extracted.html"
```

---

## Task 2: @font-face + CSS custom properties + base reset

**Files:**
- Modify: `build.py` — replace the `<head>` content in the template

- [ ] **Step 1: Replace head block in build.py template**

Replace the `<head>...</head>` section in the `html = f"""..."""` with:

```python
# In build.py, replace the <head> block with:
HEAD = """<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Бахтияр & Аяжан — Үйлену той</title>
<style>
@font-face {
  font-family: "Kazaksha";
  src: url("https://static.tildacdn.com/tild6163-3262-4734-b339-353636343334/_AsylbekM02Shelleykz.woff2") format("woff2-variations"),
       url("https://static.tildacdn.com/tild3630-6366-4566-b932-636438666133/AsylbekM02Shelleykz_.woff") format("woff-variations");
  font-weight: 100 900;
  font-style: normal;
}
@font-face {
  font-family: "monument";
  src: url("https://static.tildacdn.com/tild6636-3137-4839-b333-316466333966/KZPFMonumentaPro-Reg.woff2") format("woff2"),
       url("https://static.tildacdn.com/tild6135-6436-4032-a135-343931663462/KZPFMonumentaPro-Reg.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "ventura";
  src: url("https://static.tildacdn.com/tild3363-3863-4261-a434-393938636235/Kz_Ventura_Script_.woff2") format("woff2"),
       url("https://static.tildacdn.com/tild3433-3866-4637-b738-316166366435/Kz_Ventura-Script_.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
:root {
  --cream: #fef6f4;
  --dark1: #2d2a2e;
  --dark2: #444743;
  --text-light: #fcf7f4;
  --text-dark: #454242;
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: "monument", Arial, sans-serif;
  background: var(--cream);
  color: var(--text-dark);
}
img { display: block; max-width: 100%; }
section { width: 100%; overflow: hidden; }
</style>
</head>"""
```

Then in the `html = f"""..."""`, use `{HEAD}` in place of the head block. (Since `HEAD` is a plain string, not an f-string, the `{}` in CSS are literal.)

Rewrite the template assignment as:

```python
html = f"""<!doctype html>
<html lang="kk">
{HEAD}
<body>
<p>Fonts loaded</p>
</body>
</html>"""
```

- [ ] **Step 2: Run and verify fonts load**

```bash
python3 build.py && open invitation.html
```

Open DevTools → Network → filter "Font". You should see requests to `static.tildacdn.com` for `KZPFMonumentaPro-Reg.woff2`, `_AsylbekM02Shelleykz.woff2`, `Kz_Ventura_Script_.woff2`. If CDN requests are blocked, fonts fall back to Arial — that's fine for now; the page still works.

- [ ] **Step 3: Commit**

```bash
git add build.py
git commit -m "feat: @font-face + CSS custom properties + reset"
```

---

## Task 3: Hero + Invite CSS

**Files:**
- Modify: `build.py` — extend `HEAD` CSS block

- [ ] **Step 1: Append hero CSS inside the `<style>` block in HEAD**

Add after the `section` rule in HEAD:

```css
/* ── Hero ─────────────────────────────── */
#hero {
  position: relative;
  height: 100svh;
  overflow: hidden;
}
#hero video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-ornament {
  position: absolute;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  pointer-events: none;
}
.hero-names {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
}
#music-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  cursor: pointer;
  width: 56px;
  height: 56px;
  background: none;
  border: none;
  padding: 0;
}
#music-btn img { width: 100%; height: 100%; object-fit: contain; }
#stop-icon { display: none; }
/* ── Invite ───────────────────────────── */
#invite {
  background: var(--dark1);
  color: var(--text-light);
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
}
.invite-ornament { width: 140px; }
.invite-ornament-sm { width: 80px; }
#invite p {
  font-family: Georgia, serif;
  font-size: 1.05rem;
  line-height: 1.9;
  max-width: 520px;
  color: var(--text-light);
}
.invite-signed {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.4rem;
  color: var(--text-light);
}
```

- [ ] **Step 2: Run and check hero + invite render**

```bash
python3 build.py && open invitation.html
```

The page still shows "Fonts loaded" — that's fine. The CSS classes are defined, we'll wire the HTML in Task 6.

- [ ] **Step 3: Commit**

```bash
git add build.py
git commit -m "feat: hero and invite CSS"
```

---

## Task 4: Location + Schedule CSS

**Files:**
- Modify: `build.py` — extend `HEAD` CSS block

- [ ] **Step 1: Add location CSS inside `<style>` in HEAD**

```css
/* ── Location ─────────────────────────── */
#location {
  background: var(--cream);
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
}
.location-ornaments {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
.location-ornaments img { width: 72px; }
#location h2 {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.9rem;
  color: var(--text-dark);
}
#location p {
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 380px;
  color: var(--text-dark);
}
.map-link {
  display: block;
  width: 100%;
  max-width: 420px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}
.map-link img { width: 100%; height: auto; }
/* ── Schedule ─────────────────────────── */
#schedule {
  background: var(--cream);
  padding: 80px 40px 60px;
}
#schedule h2 {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.9rem;
  text-align: center;
  margin-bottom: 12px;
}
.schedule-ornament {
  display: block;
  width: 100px;
  margin: 0 auto 48px;
}
.schedule-grid {
  display: grid;
  gap: 52px;
  max-width: 580px;
  margin: 0 auto;
}
.sched-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: center;
}
.sched-item.right { direction: rtl; }
.sched-item.right .sched-text { direction: ltr; }
.sched-item img { width: 110px; margin: 0 auto; }
.sched-text { text-align: center; }
.sched-time {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.6rem;
  line-height: 1.1;
  color: var(--text-dark);
  display: block;
  margin-bottom: 6px;
}
.sched-label {
  font-size: 0.9rem;
  color: var(--text-dark);
  line-height: 1.4;
}
```

- [ ] **Step 2: Run to verify no CSS errors**

```bash
python3 build.py && open invitation.html
```

Page still shows placeholder text — CSS is valid if no errors appear in DevTools console.

- [ ] **Step 3: Commit**

```bash
git add build.py
git commit -m "feat: location and schedule CSS"
```

---

## Task 5: Countdown + RSVP + Closing CSS + Responsive

**Files:**
- Modify: `build.py` — complete `HEAD` CSS block

- [ ] **Step 1: Add countdown CSS**

```css
/* ── Countdown ─────────────────────────── */
#countdown { background: var(--cream); }
.wedding-photo {
  width: 100%;
  max-height: 70svh;
  object-fit: cover;
  display: block;
}
.countdown-wrap {
  padding: 60px 40px;
  text-align: center;
}
.countdown-label {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.2rem;
  color: var(--text-dark);
  margin-bottom: 24px;
}
.countdown-row {
  display: flex;
  justify-content: center;
  gap: 32px;
}
.cnt-unit { text-align: center; }
.cnt-number {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 3.2rem;
  line-height: 1;
  display: block;
  color: var(--text-dark);
}
.cnt-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-dark);
  opacity: 0.7;
  margin-top: 4px;
  display: block;
}
```

- [ ] **Step 2: Add RSVP + Closing CSS**

```css
/* ── RSVP ─────────────────────────────── */
#rsvp {
  background: var(--dark2);
  color: var(--text-light);
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
}
#rsvp h2 {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.9rem;
}
.rsvp-ornament { width: 110px; }
#rsvp-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  max-width: 400px;
  text-align: left;
}
#rsvp-form input[type="text"] {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid rgba(252,247,244,0.5);
  border-radius: 8px;
  background: transparent;
  color: var(--text-light);
  font-family: "monument", Arial, sans-serif;
  font-size: 0.95rem;
  outline: none;
}
#rsvp-form input[type="text"]::placeholder { color: rgba(252,247,244,0.45); }
#rsvp-form input[type="text"]:focus { border-color: var(--text-light); }
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.radio-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.4;
}
.radio-group input[type="radio"] { accent-color: var(--text-light); flex-shrink: 0; }
#rsvp-form button[type="submit"] {
  padding: 16px;
  background: var(--text-light);
  color: var(--dark2);
  border: none;
  border-radius: 8px;
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.05rem;
  cursor: pointer;
  transition: opacity 0.2s;
}
#rsvp-form button[type="submit"]:hover { opacity: 0.88; }
#rsvp-success {
  display: none;
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.2rem;
  color: var(--text-light);
  text-align: center;
}
/* ── Closing ──────────────────────────── */
#closing {
  background: var(--cream);
  padding: 60px 40px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}
.closing-ornaments {
  display: flex;
  gap: 20px;
  justify-content: center;
}
.closing-ornaments img { width: 72px; }
.closing-text {
  font-family: "Kazaksha", Georgia, serif;
  font-size: 1.2rem;
  color: var(--text-dark);
}
/* ── Responsive ───────────────────────── */
@media (max-width: 480px) {
  .hero-names { width: 240px; }
  .hero-ornament { width: 200px; }
  #invite, #location, #schedule, #rsvp, #closing { padding-left: 24px; padding-right: 24px; }
  #invite p { font-size: 0.9rem; }
  .sched-item { grid-template-columns: 1fr; }
  .sched-item.right { direction: ltr; }
  .sched-item img { width: 80px; }
  .countdown-row { gap: 20px; }
  .cnt-number { font-size: 2.4rem; }
  #rsvp-form { max-width: 100%; }
}
```

- [ ] **Step 3: Run to confirm no CSS parse errors**

```bash
python3 build.py && open invitation.html
```

DevTools Console should be clean. Page still shows placeholder — CSS ready.

- [ ] **Step 4: Commit**

```bash
git add build.py
git commit -m "feat: countdown, RSVP, closing CSS + responsive breakpoint"
```

---

## Task 6: Hero + Invite section HTML

**Files:**
- Modify: `build.py` — replace `<body>` placeholder with actual sections

- [ ] **Step 1: Replace body placeholder in the template**

Replace `<body>\n<p>Fonts loaded</p>\n</body>` with:

```python
BODY_OPEN = """<body>
<audio id="bg-sound">
  <source src="https://dl.dropbox.com/scl/fi/3v7hgagxaqu308mzl8220/WhatsApp-Audio-2024-12-11-at-15.35.56.mp4?rlkey=637nii9uj5paa4qursjuq8stz&st=dujp2f75&dl=0">
</audio>"""
```

Then build the `html` f-string as:

```python
html = f"""<!doctype html>
<html lang="kk">
{HEAD}
{BODY_OPEN}

<section id="hero">
  <video autoplay muted loop playsinline>
    <source src="https://dl.dropbox.com/scl/fi/50jrg58ip1sjdo9de8wxt/2.mp4?rlkey=x5r5y5eiqeppg4qxas8lfyzhi&st=5hn6gcj4&dl=0" type="video/mp4">
  </video>
  <img class="hero-ornament" src="{imgs['______3.svg']}" alt="">
  <img class="hero-names" src="{imgs['__84.png']}" alt="Бахтияр & Аяжан">
  <button id="music-btn" aria-label="Музыканы қосу / өшіру">
    <img id="play-icon" src="https://static.tildacdn.pro/tild3261-6237-4563-a261-653564323336/8.png" alt="Play">
    <img id="stop-icon" src="https://static.tildacdn.pro/tild3062-3033-4265-b763-663733636463/9.png" alt="Stop">
  </button>
</section>

<section id="invite">
  <img class="invite-ornament" src="{imgs['__65.png']}" alt="">
  <p>
    Ардақты қонақ!<br><br>
    Сізді біздің үйлену тоймызға шақырамыз.<br>
    Қуанышымызды бірге бөліссек деп үміттенеміз.
  </p>
  <img class="invite-ornament-sm" src="{imgs['__66.png']}" alt="">
  <p>
    Сіздің болуыңыз — бізге ең үлкен сыйлық.
  </p>
  <img class="invite-ornament-sm" src="{imgs['__83.png']}" alt="">
  <p class="invite-signed">Құрметпен, Мағауия-Гүлжан!</p>
</section>
"""
```

(Leave the closing `</body></html>` for later tasks — add a temporary placeholder for now.)

- [ ] **Step 2: Run and check hero + invite visually**

```bash
python3 build.py && open invitation.html
```

Verify:
- Hero: video plays on loop, couple names image visible at bottom center, SVG ornament above names, music button visible top-right with play icon
- Invite: dark `#2d2a2e` background, ornaments and Kazakh text visible

- [ ] **Step 3: Commit**

```bash
git add build.py
git commit -m "feat: hero and invite section HTML"
```

---

## Task 7: Location + Schedule section HTML

**Files:**
- Modify: `build.py` — append location and schedule sections to the f-string template

- [ ] **Step 1: Add location section**

Append after the invite section close tag in the f-string:

```python
"""
<section id="location">
  <div class="location-ornaments">
    <img src="{imgs['__71.png']}" alt="">
    <img src="{imgs['__69.png']}" alt="">
  </div>
  <h2>Мекен-жай</h2>
  <p>
    Ақтөбе қаласы,<br>
    Ағайынды Жұбановтар көшесі, 276/1,<br>
    «Курмет Холл» мейрамханасы
  </p>
  <a class="map-link" href="https://2gis.kz/aktobe/firm/70000001045465548?m=57.151117%2C50.291091%2F14.32" target="_blank" rel="noopener">
    <img src="{imgs['__68.png']}" alt="2GIS картасы">
  </a>
</section>

<section id="schedule">
  <h2>Той бағдарламасы</h2>
  <img class="schedule-ornament" src="{imgs['__73.png']}" alt="">
  <div class="schedule-grid">
    <div class="sched-item left">
      <img src="{imgs['__74.png']}" alt="">
      <div class="sched-text">
        <span class="sched-time">__:__</span>
        <span class="sched-label">Қонақтардың жиналуы</span>
      </div>
    </div>
    <div class="sched-item right">
      <img src="{imgs['__75.png']}" alt="">
      <div class="sched-text">
        <span class="sched-time">__:__</span>
        <span class="sched-label">Беташар</span>
      </div>
    </div>
    <div class="sched-item left">
      <img src="{imgs['__76.png']}" alt="">
      <div class="sched-text">
        <span class="sched-time">__:__</span>
        <span class="sched-label">Құдаларды қарсы алу</span>
      </div>
    </div>
    <div class="sched-item right">
      <img src="{imgs['__77.png']}" alt="">
      <div class="sched-text">
        <span class="sched-time">__:__</span>
        <span class="sched-label">Шоу программа</span>
      </div>
    </div>
  </div>
</section>
"""
```

- [ ] **Step 2: Run and verify location + schedule visually**

```bash
python3 build.py && open invitation.html
```

Verify:
- Location: cream background, ornaments, venue address, map image (should be clickable)
- Schedule: 4 rows in chess layout — odd rows icon-left, even rows icon-right; `__:__` time placeholders visible

- [ ] **Step 3: Commit**

```bash
git add build.py
git commit -m "feat: location and schedule section HTML"
```

---

## Task 8: Countdown + RSVP + Closing section HTML

**Files:**
- Modify: `build.py` — complete the body sections

- [ ] **Step 1: Add countdown section**

Append after schedule:

```python
"""
<section id="countdown">
  <img class="wedding-photo" src="{imgs['Wedding.jpeg']}" alt="Бахтияр & Аяжан">
  <div class="countdown-wrap" id="countdown-wrap">
    <p class="countdown-label">Тойға дейін:</p>
    <div class="countdown-row">
      <div class="cnt-unit">
        <span class="cnt-number" id="cnt-days">00</span>
        <span class="cnt-label">күн</span>
      </div>
      <div class="cnt-unit">
        <span class="cnt-number" id="cnt-hours">00</span>
        <span class="cnt-label">сағат</span>
      </div>
      <div class="cnt-unit">
        <span class="cnt-number" id="cnt-mins">00</span>
        <span class="cnt-label">минут</span>
      </div>
      <div class="cnt-unit">
        <span class="cnt-number" id="cnt-secs">00</span>
        <span class="cnt-label">секунд</span>
      </div>
    </div>
  </div>
</section>
"""
```

- [ ] **Step 2: Add RSVP section**

Append after countdown:

```python
"""
<section id="rsvp">
  <img class="rsvp-ornament" src="{imgs['__78.png']}" alt="">
  <h2>Той тізімі</h2>
  <p>Сізді күтеміз!</p>
  <form id="rsvp-form" novalidate>
    <input type="text" name="name" placeholder="Атыңыз" required>
    <div class="radio-group">
      <label>
        <input type="radio" name="attend" value="yes" required>
        Иә, әрине келемін
      </label>
      <label>
        <input type="radio" name="attend" value="couple">
        Жұбайыммен келемін
      </label>
      <label>
        <input type="radio" name="attend" value="no">
        Өкінішке орай, келе алмаймын
      </label>
    </div>
    <button type="submit">Жіберу</button>
  </form>
  <p id="rsvp-success">Рахмет! Сіздің жауабыңыз қабылданды.</p>
</section>
"""
```

- [ ] **Step 3: Add closing section + close body/html**

Append after RSVP:

```python
f"""
<section id="closing">
  <div class="closing-ornaments">
    <img src="{imgs['__27.png']}" alt="">
    <img src="{imgs['__26.png']}" alt="">
  </div>
  <p class="closing-text">Сіздерді той мерекемізде көруді асыға күтеміз!</p>
</section>

</body>
</html>"""
```

- [ ] **Step 4: Run and verify all sections**

```bash
python3 build.py && open invitation.html
```

Scroll through the full page. All 6 sections + closing should be visible. Countdown shows `00:00:00:00` (target date is `TODO`). RSVP form shows all 3 radio options.

- [ ] **Step 5: Commit**

```bash
git add build.py
git commit -m "feat: countdown, RSVP, and closing section HTML"
```

---

## Task 9: JavaScript — music player, countdown, RSVP fetch

**Files:**
- Modify: `build.py` — add `<script>` block before `</body>`

- [ ] **Step 1: Add JavaScript block**

Replace `</body>` in the template with:

```python
"""
<script>
const WEDDING_DATE = new Date('TODO');
const GAS_URL = 'TODO';

// Music player
(function() {
  const audio = document.getElementById('bg-sound');
  const playIcon = document.getElementById('play-icon');
  const stopIcon = document.getElementById('stop-icon');
  audio.volume = 0.4;
  document.getElementById('music-btn').addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
      playIcon.style.display = 'none';
      stopIcon.style.display = 'block';
    } else {
      audio.pause();
      stopIcon.style.display = 'none';
      playIcon.style.display = 'block';
    }
  });
  audio.addEventListener('ended', function() {
    stopIcon.style.display = 'none';
    playIcon.style.display = 'block';
  });
})();

// Countdown
(function() {
  function tick() {
    var diff = WEDDING_DATE - Date.now();
    if (isNaN(diff) || diff <= 0) return;
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cnt-days').textContent = String(d).padStart(2, '0');
    document.getElementById('cnt-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cnt-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cnt-secs').textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();

// RSVP form
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var name = e.target.name.value.trim();
  var attend = e.target.attend.value;
  if (!name || !attend) return;
  var url = GAS_URL + '?name=' + encodeURIComponent(name) + '&attend=' + encodeURIComponent(attend);
  fetch(url, { method: 'GET', mode: 'no-cors' })
    .catch(function() {})
    .finally(function() {
      document.getElementById('rsvp-form').style.display = 'none';
      document.getElementById('rsvp-success').style.display = 'block';
    });
});
</script>
</body>"""
```

- [ ] **Step 2: Run and verify JavaScript**

```bash
python3 build.py && open invitation.html
```

Check in browser:
1. Click music button → play icon hides, stop icon appears, audio starts (or network error if Dropbox URL expired — that's OK)
2. Click stop button → stop icon hides, play icon reappears, audio pauses
3. Countdown shows `00:00:00:00` (target is `TODO` → `isNaN` guard prevents errors)
4. Fill RSVP form with name + radio selection → submit → form hides, success message appears

DevTools Console should be clean of JavaScript errors.

- [ ] **Step 3: Commit**

```bash
git add build.py
git commit -m "feat: JavaScript — vanilla music player, countdown, RSVP fetch"
```

---

## Task 10: Run final build, cross-check all sections, commit output

**Files:**
- Run: `build.py`
- Commit: `invitation.html`

- [ ] **Step 1: Final build**

```bash
python3 build.py
```

Expected: `Extracted 17 images: [...]` then `Saved invitation.html`. File size ~2–3 MB (due to base64 images).

- [ ] **Step 2: Visual QA in browser**

Open `invitation.html` and scroll through each section. Checklist:

- **Hero**: video background plays, names image visible bottom-center, SVG ornament above names, music button top-right
- **Invite**: dark `#2d2a2e` background, ornaments, Kazakh text in serif, signed line "Құрметпен, Мағауия-Гүлжан!"
- **Location**: cream background, venue address, 2GIS map image with link wrapping it
- **Schedule**: 4 items in alternating left/right layout, icons visible, `__:__` time placeholders
- **Countdown**: wedding photo full width, countdown row showing `00:00:00:00`
- **RSVP**: dark `#444743` background, form with name input + 3 radio options + submit button
- **Closing**: two ornaments side by side, Kazakh farewell text
- **Responsive**: resize to 375px — single column schedule, no overflow

- [ ] **Step 3: Check TODOs are in place and easy to find**

```bash
grep -n "TODO" invitation.html
```

Expected 2 results:
```
...const WEDDING_DATE = new Date('TODO');
...const GAS_URL = 'TODO';
```

Also verify schedule times are `__:__` (easily grepped):
```bash
grep -c "__:__" invitation.html
```

Expected: `4`

- [ ] **Step 4: Commit everything**

```bash
git add build.py invitation.html
git commit -m "feat: invitation.html generated — ready for TODO fill-in (date, times, GAS URL)"
```

---

## TODOs to fill in before sharing

1. **Wedding date** — in `invitation.html` or `build.py`: `const WEDDING_DATE = new Date('TODO');` → replace with e.g. `new Date('2026-09-05T14:00:00+05:00')`
2. **Schedule times** — 4× `__:__` in the schedule section → replace with actual times
3. **Google Apps Script URL** — `const GAS_URL = 'TODO';` → deploy the Apps Script and paste URL

These 3 changes can be made directly in `invitation.html` without re-running `build.py`.
