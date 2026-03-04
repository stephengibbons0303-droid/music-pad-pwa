# 🎵 Musical Notepad (MusicPad PWA)

A distraction-free, kid-friendly Progressive Web App (PWA) that allows children to compose music, see it instantly transcribed into standard musical notation, and hear it played back. 

Designed specifically for tablets, this app runs entirely in the browser, works offline, and keeps all saved data securely on the local device.

## ✨ Features

* **Interactive Grand Staff:** Instantly renders inputted notes onto a Treble and Bass clef using the VexFlow engine.
* **Dual Input Modes:** * **Letter Mode:** Large, tactile letter buttons (C-B) with an intuitive octave up/down toggle to prevent typing errors.
  * **Piano Mode:** An onscreen piano keyboard (F3 to C6 default) with togglable note labels to help kids map physical keys to sheet music.
* **Touch-to-Edit Radial Menu:** Tapping any note on the staff summons a contextual pie menu, allowing kids to quickly change note durations (Whole, Half, Quarter, Eighth) or toggle it into a Rest.
* **Zero-Latency Playback:** Uses Tone.js to synthesize and play back the composed sequence with precise mathematical timing.
* **Digital Notebook (Save/Load):** A visual notebook interface that saves compositions directly to the tablet's local storage. No accounts, logins, or cloud databases required.

## 🛠️ Tech Stack

* **Frontend:** Vanilla HTML, CSS (Flexbox layout), and JavaScript.
* **Notation Engine:** [VexFlow](https://github.com/0xfe/vexflow) (SVG rendering).
* **Audio Engine:** [Tone.js](https://tonejs.github.io/) (Web Audio API).
* **Architecture:** Progressive Web App (PWA) with a `manifest.json` and Service Worker for offline, standalone tablet installation.

## 📱 How to Install on a Tablet

Because this is a Progressive Web App, you do not need to download it from an App Store. You can install it directly from the web to run as a full-screen, standalone app.

1. Open **Google Chrome** (Android) or **Safari** (iPad) on your tablet.
2. Navigate to the live URL: `https://[your-username].github.io/music-pad-pwa/` *(Replace with your actual GitHub Pages link)*
3. **On Android:** Tap the three-dot menu in the top right of Chrome and select **"Add to Home screen"** or **"Install app"**.
4. **On iPad:** Tap the "Share" icon (the square with an arrow pointing up) and select **"Add to Home Screen"**.

The app icon will appear on your home screen. When you tap it, the app will open in full-screen landscape mode without any browser toolbars or distractions.

## 💻 Local Development

If you want to run or modify this project locally on your computer:

1. Clone the repository.
2. Because of strict browser security policies regarding ES modules and Service Workers, you cannot just double-click the `index.html` file. You must serve it via a local web server.
3. If you have Python installed, open your terminal in the project folder and run:
   `python -m http.server 8000`
4. Open your browser and go to `http://localhost:8000`.

## 🔒 Privacy

This app contains no tracking, no analytics, and no backend database. All musical compositions are saved exclusively to the device's `localStorage`. If you clear your browser cache, your saved songs will be deleted.