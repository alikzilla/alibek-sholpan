# Google Sheets RSVP Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect the RSVP form in `invitation.html` to a Google Sheet so every guest submission is recorded with a timestamp, name, and attendance answer.

**Architecture:** A Google Apps Script web app acts as the backend — it receives GET requests from the existing frontend fetch call and appends a row to a Google Sheet. The only code change to the repo is saving the GAS script locally for version control and replacing the `"YOUR_GAS_URL"` placeholder in `invitation.html` with the live deployed URL.

**Tech Stack:** Google Apps Script, Google Sheets, vanilla JS (existing fetch in invitation.html)

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `gas/Code.gs` | GAS script source (version-controlled copy) |
| Modify | `invitation.html:1070` | Replace `"YOUR_GAS_URL"` with real deployed URL |

---

### Task 1: Create the Google Sheet

- [ ] **Step 1: Open Google Sheets and create a new spreadsheet**

  Go to https://sheets.google.com and click **Blank spreadsheet**. Name it `Alibek & Sholpan — RSVP`.

- [ ] **Step 2: Add header row**

  In the new sheet, click cell **A1** and enter these three headers (one per cell):

  | A1 | B1 | C1 |
  |----|----|----|
  | Timestamp | Аты-жөні | Жауабы |

- [ ] **Step 3: Copy the Spreadsheet ID**

  The spreadsheet URL looks like:
  ```
  https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
  ```
  Copy the `SPREADSHEET_ID` part — you'll need it in Task 2.

---

### Task 2: Create and deploy the Google Apps Script

- [ ] **Step 1: Save the script source locally**

  Create the file `gas/Code.gs` in this repo with the following content:

  ```javascript
  function doGet(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var name = e.parameter.name || "";
    var radio = e.parameter.radio || "";
    var timestamp = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Almaty" });

    sheet.appendRow([timestamp, name, radio]);

    return ContentService.createTextOutput("OK");
  }
  ```

- [ ] **Step 2: Commit the local copy**

  ```bash
  git add gas/Code.gs
  git commit -m "feat: add Google Apps Script for RSVP → Sheets"
  ```

- [ ] **Step 3: Open Apps Script editor in the spreadsheet**

  In the Google Sheet you created in Task 1, click **Extensions → Apps Script**.

- [ ] **Step 4: Paste the script**

  Delete all default code in the editor and paste the exact content of `gas/Code.gs` from Step 1.

- [ ] **Step 5: Deploy as Web App**

  1. Click **Deploy → New deployment**
  2. Click the gear icon next to "Type" and select **Web app**
  3. Set **Execute as:** Me
  4. Set **Who has access:** Anyone
  5. Click **Deploy**
  6. When prompted, click **Authorize access** and follow the Google sign-in flow
  7. After deployment, copy the **Web App URL** — it looks like:
     ```
     https://script.google.com/macros/s/AKfycb.../exec
     ```

- [ ] **Step 6: Verify the script works**

  Paste this URL into your browser (replace with your real URL and a test name):
  ```
  https://script.google.com/macros/s/<YOUR_ID>/exec?name=Test&radio=Иә%2C%20әрине%20келемін
  ```
  Expected: browser shows `OK` and a new row appears in the Google Sheet with the current timestamp, "Test", and the radio value.

---

### Task 3: Wire the URL into invitation.html

- [ ] **Step 1: Replace the placeholder URL**

  In `invitation.html` at line 1070, change:

  ```js
  const GAS_URL = "YOUR_GAS_URL";
  ```

  to:

  ```js
  const GAS_URL = "https://script.google.com/macros/s/<YOUR_DEPLOYMENT_ID>/exec";
  ```

  Use the exact URL copied from Task 2 Step 5.

- [ ] **Step 2: Commit**

  ```bash
  git add invitation.html
  git commit -m "feat: connect RSVP form to Google Sheets via GAS"
  ```

---

### Task 4: End-to-end test

- [ ] **Step 1: Open invitation.html in a browser**

  Open the file directly in Chrome or Safari:
  ```
  open invitation.html
  ```

- [ ] **Step 2: Submit a test RSVP**

  Scroll to the RSVP section. Enter a test name (e.g., "Тест Тестов") and select any attendance option. Click **Жіберу**.

  Expected on the page: the message `"Рахмет! Жауабыңыз қабылданды."` appears and the form resets.

- [ ] **Step 3: Verify the row appeared in Google Sheets**

  Open the Google Sheet. A new row should appear under the headers with:
  - Column A: current date/time in Almaty timezone (e.g., `01.06.2026, 23:05:00`)
  - Column B: `Тест Тестов`
  - Column C: the selected radio option text

- [ ] **Step 4: Delete the test row**

  Right-click the test row in the sheet and click **Delete row** to keep the sheet clean before real guests submit.
