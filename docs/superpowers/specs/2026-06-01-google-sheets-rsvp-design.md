# Google Sheets RSVP Integration — Design Spec

**Date:** 2026-06-01  
**Project:** Alibek & Sholpan Wedding Invitation

---

## Overview

The RSVP form in `invitation.html` already sends a GET request to a Google Apps Script URL. This spec covers the Google Apps Script backend that receives those requests and appends responses to a Google Sheet, plus the one-line change in `invitation.html` to wire in the real URL.

---

## Google Sheet Structure

| Column | Header | Source |
|--------|--------|--------|
| A | Timestamp | Server-side `new Date()` at time of submission |
| B | Аты-жөні | `name` query param |
| C | Жауабы | `radio` query param |

Row 1 is the header row. All guest responses append below it.

---

## Google Apps Script

File: `Code.gs` (in the Apps Script project bound to the Sheet)

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

**Deployment settings:**
- Execute as: **Me** (the Google account owner)
- Who has access: **Anyone**

---

## invitation.html Change

Replace the placeholder on line 1070:

```js
// Before
const GAS_URL = "YOUR_GAS_URL";

// After
const GAS_URL = "https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec";
```

No other frontend changes needed. The existing fetch call (`mode: "no-cors"`) is compatible with GAS web apps.

---

## Setup Steps (Manual)

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. In row 1, add headers: `Timestamp`, `Аты-жөні`, `Жауабы`.
3. Open **Extensions → Apps Script**.
4. Delete the default `myFunction` code and paste in the `doGet` function above.
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, authorize when prompted, and copy the Web App URL.
7. In `invitation.html`, replace `"YOUR_GAS_URL"` with the copied URL.

---

## Error Handling

- The frontend already shows `"Қате болды, қайта көріңіз."` if the fetch throws. Since `mode: "no-cors"` always resolves (never rejects on 4xx/5xx), a failed GAS execution will silently not write a row but the user sees "Рахмет!". This is acceptable for a wedding invitation — reliability is sufficient and complexity is kept minimal.
- Empty `name` or `radio` params: GAS writes an empty string. Frontend validation already prevents this from the browser side.

---

## Out of Scope

- Authentication / protecting the sheet from spam (acceptable risk for a private wedding invitation URL)
- Email notifications on submission
- Duplicate submission prevention
