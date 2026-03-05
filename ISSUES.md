# MusicPad PWA - Known Issues & Improvement Areas

> Catalogued for review — March 2026

---

## Audio

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| A1 | **Piano samples load delay** | Medium | Salamander Grand Piano samples (~18 MP3s) load from `tonejs.github.io` CDN. ~2-3 second delay on first visit with no loading indicator — user hears the thin triangle8 fallback synth during this window. |
| A2 | **No loading indicator for samples** | Medium | `pianoReady` flag exists but nothing in the UI reflects loading state. User has no idea why sound quality changes after a few seconds. |
| A3 | **Fallback synth sounds poor** | Low | The `triangle8` fallback is harsh/thin. Could use a better-configured FM synth for the brief loading period. |
| A4 | **No velocity/dynamics** | Low | All notes play at identical volume regardless of input. No support for piano/forte or touch-sensitive velocity on piano keys. |
| A5 | **Playback has no visual feedback** | Medium | When pressing Play, notes sound but there's no highlight/cursor tracking on the notation. User can't follow along. |
| A6 | **No tempo control** | Medium | Playback tempo is hardcoded (quarter = 0.5s = 120 BPM). No way to adjust. |
| A7 | **No stop/pause during playback** | Medium | Once Play is pressed, the entire tune plays out with no way to stop it. |

---

## Notation & VexFlow Rendering

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| N1 | **No time signature or bar lines** | High | Notes render in a continuous stream with no measures. Voice uses `num_beats: 1000` as a workaround for "no meter". Real music needs bars. |
| N2 | **No key signature support** | Medium | All accidentals must be manually added per-note. No way to set a key signature (e.g. G major = F# implied). |
| N3 | **Grand staff voice alignment is fragile** | Medium | Ghost rests (invisible rests in the opposite staff) are used to keep treble/bass aligned. This works but can produce formatting glitches with many notes. |
| N4 | **No ties, dots, or tuplets** | Medium | Only whole/half/quarter/eighth durations supported. No dotted notes, tied notes, or triplets. |
| N5 | **No beaming** | Low | Eighth notes render as individual flags, not beamed groups. VexFlow supports auto-beaming. |
| N6 | **SVG rendering can overflow** | Low | Canvas width grows linearly (`masterTune.length * 50 + 100`). With many notes this creates a very wide scroll area but the stave height is fixed at 190px — could clip on small screens. |
| N7 | **Stave is small / hard to read on mobile** | Medium | Fixed 190px height for the grand staff. On phone screens, notes are tiny and hard to tap for the radial menu. |

---

## Input & Interaction

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| I1 | **Radial menu note selection is unreliable** | High | `findNearestNote()` searches by X-coordinate proximity (40px threshold). On dense passages or zoomed-out views, tapping the wrong note or missing entirely is common. |
| I2 | **No undo/redo** | High | Deleting a note is permanent. No history stack, no Ctrl+Z. |
| I3 | **Double-fire on touch devices** | Medium | Letter buttons bind both `click` and `touchend`. The `touchend` handler calls `e.preventDefault()` but the click handler also fires on some browsers, causing double notes. |
| I4 | **No drag-to-reorder notes** | Low | Notes can only be appended; no way to rearrange order after input. |
| I5 | **Piano keyboard doesn't respect octave/accidental controls** | Low | The piano keyboard generates its own pitch from key position, ignoring the octave selector and accidental buttons. This is correct UX but can confuse users who switch modes mid-input. |
| I6 | **No note insertion (only append)** | Medium | New notes always go to the end. No way to insert a note between existing notes. |
| I7 | **Accidental state is "sticky"** | Low | Selecting # stays active until manually cleared. User might accidentally add sharps to subsequent notes. Debatable whether this is a bug or feature. |

---

## Save / Load (Notebook)

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| S1 | **No delete song option** | Medium | Songs can be saved and loaded but never deleted from localStorage. |
| S2 | **No overwrite warning** | Low | Saving with an existing name silently overwrites. |
| S3 | **No export (PDF, MIDI, MusicXML, image)** | Medium | No way to share or export compositions. |
| S4 | **localStorage only** | Medium | Data is device-local. No cloud sync, no cross-device access. Clearing browser data loses everything. |
| S5 | **No song metadata** | Low | No date created, last modified, or note count shown in the song list. |

---

## PWA & Infrastructure

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| P1 | **Service worker caches only 2 files** | Medium | `sw.js` caches `index.html` and `manifest.json`. CDN scripts (VexFlow, Tone.js) and piano samples are not cached — app doesn't work fully offline. |
| P2 | **No offline fallback page** | Low | If offline and cache misses, fetch just fails silently. |
| P3 | **Icons may not exist** | Low | `manifest.json` references `icon-192.png` and `icon-512.png` but these files may not be present in the repo. |
| P4 | **Everything is in one HTML file** | Low | All CSS, JS, and HTML are in a single `index.html` (~720 lines). Not a bug but makes maintenance harder as the app grows. |
| P5 | **No landscape/portrait responsiveness** | Medium | Manifest forces `"orientation": "landscape"` but styles don't adapt well if the device is held in portrait. |

---

## UI / UX Polish

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| U1 | **Trash icon used for both "New" and "Delete"** | Low | The header "New" button (🗑) uses a trash/wastebasket icon, which reads as "delete" not "new". |
| U2 | **No confirmation on "New" (clear all)** | Medium | Tapping the trash/new button instantly wipes `masterTune` with no "Are you sure?" prompt. |
| U3 | **No dark mode** | Low | Fixed blue/white theme. |
| U4 | **No onboarding or help** | Low | No tutorial, tooltips, or help text explaining the radial menu or workflow. |
| U5 | **Rest toggle in radial menu is not intuitive** | Low | The center radial button toggles rest state but uses a sixteenth rest symbol (𝅘𝅥𝅲) regardless of the note's actual duration. |

---

## Summary by Priority

**High** (core functionality broken or missing):
- N1 — No time signature / bar lines
- I1 — Radial menu note selection unreliable
- I2 — No undo/redo

**Medium** (significantly impacts usability):
- A1, A2 — Sample loading with no indicator
- A5, A6, A7 — Playback lacks feedback, tempo, stop
- N2, N4, N7 — Key sig, ties/dots, mobile readability
- I3, I6 — Touch double-fire, no note insertion
- S1, S3, S4 — No delete, no export, localStorage only
- P1, P5 — Offline gaps, orientation issues
- U2 — No confirmation on clear

**Low** (nice-to-have improvements):
- A3, A4 — Fallback synth quality, dynamics
- N5, N6 — Beaming, SVG overflow
- I4, I5, I7 — Reorder, mode confusion, sticky accidentals
- S2, S5 — Overwrite warning, metadata
- P2, P3, P4 — Offline fallback, icons, file structure
- U1, U3, U4, U5 — Icon semantics, dark mode, onboarding, rest symbol
