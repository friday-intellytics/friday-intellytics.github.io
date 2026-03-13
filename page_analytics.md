# Page Heatmap — Implementation Plan

## Context

FRIDAY's static GitHub Pages site (`fridayintellytics.com`) has no analytics. We're adding click heatmap + scroll depth heatmap tracking to both pages, with a separate dashboard to visualize the data. Initially uses localStorage so it works immediately without external services; designed to swap in Firebase later.

## Architecture

Three components:

1. **Tracker script** (`/heatmap/tracker.js`) — Lightweight JS loaded on tracked pages. Captures clicks + scroll depth, stores in localStorage (Firebase-ready interface).
2. **Dashboard** (`/heatmap/index.html`) — Dark-themed page that reads stored data and renders heatmaps.
3. **Storage adapter** — localStorage now, swappable to Firebase Firestore later.

## Data Model

Each page session produces one record:

```js
{
  page: "/blog/logo-announcement/",   // pathname
  sessionId: "a1b2c3d4",              // random, in-memory only (no cookies)
  viewportWidth: 1440,
  viewportHeight: 900,
  pageHeight: 3200,
  timestamp: 1678901234567,
  clicks: [
    { x: 0.45, y: 0.12, t: 1623, el: "a.cta" }  // normalized 0-1 ratios
  ],
  scrollDepths: [
    { maxY: 0.0, t: 0 },
    { maxY: 0.25, t: 2000 }
  ],
  maxScrollDepth: 0.68
}
```

**Key decisions:**
- Click coordinates stored as **ratios (0-1)** relative to viewport width (x) and full page height (y) — aggregates correctly across devices
- Scroll depth = `(scrollY + innerHeight) / scrollHeight`
- Raw `viewportWidth` stored for device class filtering (mobile < 768, tablet < 1024, desktop >= 1024)
- Events batched in memory, flushed as single write on `visibilitychange` + `beforeunload`
- Anonymous: `sessionId` via `crypto.randomUUID()`, no cookies/localStorage for identity

## Files to Create

### 1. `/heatmap/tracker.js` (~120 lines)

Lightweight IIFE that:
- Guards against tracking on dashboard page or `navigator.doNotTrack`
- Generates session ID
- Listens for `click` events → captures normalized (x, y), timestamp offset, CSS selector of target element
- Samples scroll position every 2 seconds via `setInterval`
- Flushes accumulated data on `visibilitychange` (primary) and `beforeunload` (backup)
- Writes to a storage adapter (localStorage for now, trivially swappable to Firestore)

Storage adapter pattern:
```js
const storage = {
  save(record) {
    const events = JSON.parse(localStorage.getItem('heatmap_events') || '[]');
    events.push(record);
    localStorage.setItem('heatmap_events', JSON.stringify(events));
  },
  getAll() {
    return JSON.parse(localStorage.getItem('heatmap_events') || '[]');
  }
};
```

### 2. `/heatmap/index.html` (~500-600 lines)

Dashboard page with dark theme matching the landing page palette (`#07090e`, `#0e1320`, accents `#ffd54a`/`#ff7a18`).

**Layout:**
```
+------------------------------------------------------------------+
|  Heatmap Dashboard                               [Page Selector]  |
+------------------------------------------------------------------+
|  [Click Heatmap]                    [Scroll Depth Heatmap]        |
|  Live iframe with canvas overlay    Vertical bar, 10 color bands  |
|                                                                    |
+------------------------------------------------------------------+
|  [Stats: sessions, clicks, avg scroll]  [Device filter: M/T/D]   |
+------------------------------------------------------------------+
```

**Click heatmap:**
- Scaled-down `<iframe>` of the tracked page (`pointer-events: none`, `sandbox` attribute to prevent tracker firing inside iframe)
- heatmap.js canvas overlay on top (CDN: `https://cdn.jsdelivr.net/npm/heatmap.js@2.0.5/build/heatmap.min.js`)
- Normalized coordinates mapped to iframe dimensions

**Scroll depth:**
- 10 horizontal bands (0-10%, 10-20%, ... 90-100%)
- Color-coded hot (orange/yellow) to cold (dim/transparent) based on % of sessions reaching each depth

**Stats panel:** Total sessions, total clicks, average max scroll depth

**Device filter:** Toggle between Mobile / Tablet / Desktop / All

## Files to Modify

### 3. `/index.html` — Add 1 script tag before `</body>`

```html
<script src="/heatmap/tracker.js" defer></script>
```

### 4. `/blog/logo-announcement/index.html` — Same 1 script tag before `</body>`

```html
<script src="/heatmap/tracker.js" defer></script>
```

## Implementation Sequence

1. **Create `/heatmap/tracker.js`** — storage adapter + click/scroll capture + flush logic
2. **Create `/heatmap/index.html`** — dashboard with iframe preview, heatmap.js overlay, scroll depth bars, stats, device filter
3. **Add tracker to `/index.html`** — 1 line before `</body>`
4. **Add tracker to `/blog/logo-announcement/index.html`** — 1 line before `</body>`

## Edge Cases

| Issue | Solution |
|-------|----------|
| Landing page has `overflow:hidden` (no scroll) | Scroll depth reports 100% immediately — correct behavior |
| `beforeunload` unreliable on mobile Safari | Primary flush on `visibilitychange` which fires reliably |
| Sidebar clicks on blog page have different x-coords per viewport | Device class filter separates these |
| iframe on dashboard fires the tracker | `sandbox` attribute on iframe prevents script execution |
| localStorage fills up | Cap at 1000 records, FIFO eviction |

## Future: Swapping to Firebase

When ready, replace the storage adapter with Firestore calls:
1. Add Firebase compat SDK script tags to tracker and dashboard
2. Replace `storage.save()` with `firebase.firestore().collection('events').add(record)`
3. Replace `storage.getAll()` with Firestore query
4. Set Firestore security rules (create-only for tracker, read-only for dashboard)

## Verification

1. Open both pages in browser, click around, scroll
2. Check `localStorage.getItem('heatmap_events')` in DevTools — verify records with normalized coordinates
3. Open `/heatmap/` dashboard — verify page selector lists both pages
4. Verify click heatmap renders colored blobs on the iframe overlay at correct positions
5. Verify scroll depth bars show color distribution matching actual scroll behavior
6. Test device filter toggles
7. Test on mobile viewport (DevTools responsive mode)
