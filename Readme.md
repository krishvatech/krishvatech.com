# KrishvaTech Landing (Vite + React + Tailwind)

This is a ready-to-run landing page for **KrishvaTech** with animated sections, demo widgets, and a contact form UI.

## Quick start

```bash
# 1) Extract
unzip krishvatech-site.zip && cd krishvatech-site

# 2) Install deps
npm install

# 3) Run locally
npm run dev
```

Open the dev URL from the terminal (usually http://localhost:5173).

## Notes
- Replace `public/logo.svg` with your actual company logo file; keep the same name to avoid code changes.
- The contact form is UI-only. Wire it to your API/email/WhatsApp as needed.
- Tech used: Vite, React 18, TailwindCSS, Framer Motion, lucide-react.


## Use your real Computer Vision examples

- Put one or more real frames in `public/vision/`, e.g.:
  - `public/vision/fire.jpg`
  - `public/vision/ppe.jpg`
  - `public/vision/fall.jpg`
- By default the page shows `public/vision/sample.svg` (a neutral placeholder). Replace it with your frame, or change the `src` inside `VisionPreview` in `src/App.jsx`.
- Only add detection boxes when they are correct for the image.

## Use your logo
Your uploaded logo is set at `public/logo.png` and referenced in the header/footer. Replace that file anytime to update the site.


## Real vision images
This build uses real images placed at:
- `public/vision/real1.png` (Computer Vision card)
- `public/vision/real2.png` (Vision Detection Demo card)
You can replace these files with your own CCTV frames anytime (keep the same filenames), or add more and change the `src` props in `src/App.jsx`.
