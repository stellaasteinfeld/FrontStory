# FrontStory — Campaign Dashboard (React + Vite + MUI)

## 🎯 Goal
Build a **campaign management dashboard** in React that lets users:
- View a table of campaigns
- Add new campaigns via a form
- Delete campaigns
- See **Profit = Revenue - Cost** per campaign

**Bonus implemented:**
- Clean styling with MUI
- Sorting by **name**, **date** (start/end), and **profit**
- Data persistence using **LocalStorage**

---

## 🚀 Stack
- **React 19**, **Vite 7**
- **MUI 7** + Emotion
- Optional: **React Router** (future routing)

---

## 📂 Project Structure
```
src/
 ├─ components/
 │   ├─ CampaignForm.jsx
 │   └─ CampaignTable.jsx
 ├─ hooks/
 │   └─ useLocalStorage.js
 ├─ helpers/
 │   ├─ initialSeed.js
 │   ├─ sortCampaigns.js
 │   └─ validateCampaign.js
 ├─ pages/
 │   └─ Dashboard/
 │       └─ Dashboard.jsx
 ├─ App.jsx
 ├─ main.jsx
 └─ App.scss (optional)
```

---

## 🔧 Getting Started

1) Install dependencies
```bash
npm install
```

2) (If you use `.scss`) install a Sass compiler
```bash
# recommended
npm i -D sass-embedded
# classic alternative
# npm i -D sass
```

3) Start dev server
```bash
npm run dev
```
Open the URL that Vite prints (default: `http://localhost:5173`).

4) Production build
```bash
npm run build
```

5) Preview the build
```bash
npm run preview
```

---

## ✅ Features

### Campaign table
- Columns: **Name**, **Start Date**, **End Date**, **Clicks**, **Cost**, **Revenue**, **Profit**
- **Profit** is computed at render time: `revenue - cost`

### Create & Delete
- **Add**: controlled form with validation (valid dates & `end >= start`, numeric ≥ 0)
- **Delete**: per-row action button

### Sorting (bonus)
- Sort by **Name**, **Start Date / End Date**, and **Profit** from the table header
- Implemented via `helpers/sortCampaigns.js` (stable sort, non-mutating)

### Persistence (bonus)
- `hooks/useLocalStorage.js` keeps campaigns across reloads

### Styling (bonus)
- MUI components: `CssBaseline`, `Container`, `Paper`, `Table`, `TextField`, `Button`
- Minimal theme in `App.jsx` (palette, radius)

---

## 🧠 Design Decisions

- **Validation decoupled**: `helpers/validateCampaign.js` (simple, reusable, unit-testable)
- **Sorting decoupled**: `helpers/sortCampaigns.js`
  - Locale-aware comparison for `name`
  - Robust date comparison (invalid/empty dates are pushed last)
  - **Stable** ordering (ties preserve original order)
- **Lean page component**: `pages/Dashboard/Dashboard.jsx` orchestrates state & delegates UI

---

## 🧪 How to Test Manually
1. Add a campaign with valid dates and non-negative numbers
2. Delete that campaign (🗑️ button)
3. Sort by **Name**, **Start Date**, and **Profit** (header toggles asc/desc)
4. Refresh the page and confirm data persists (LocalStorage)

---

## 🛠️ Troubleshooting

- **`[vite] Preprocessor dependency "sass-embedded" not found`**
  - Install: `npm i -D sass-embedded` (or `npm i -D sass`) and restart `npm run dev`

- **`does not provide an export named ...`**
  - Ensure the file exports match your imports. `validateCampaign.js` provides both a **named** and **default** export in our setup

- **Missing MUI icons**
  ```bash
  npm i @mui/icons-material
  ```

---

## 📦 Submission
Include the source code, `package.json`, and this **README**. If you used SCSS, include `App.scss` as well.
