# GreenRep

A simple, phone-friendly gym tracker in one HTML file.

- **Today**: today's planned workout, calories left, water.
- **Workouts**: ready-made routines (Push, Pull, Legs, Upper, Lower, Core and Cardio, Full Body, Home), a routine builder, a week plan, and a library of 39 exercises with animated demos, start/end pictures, steps, and YouTube tutorial links. You can save your own video link per exercise.
- **Workout mode**: log weight and reps per set, see last time's numbers, automatic rest timer.
- **Food**: quick-add common foods, custom foods, meals, calorie ring and macros, water glasses, goal calculator.
- **Progress**: week streak, calories chart, body-weight trend, workout history.

Data is saved in the browser (and synced privately when opened as a Claude artifact).

## Public web app

Live at **https://6ix411.github.io/Higgsfield/greenrep/** once GitHub Pages is on
(Settings → Pages → Deploy from a branch → this branch, `/docs` folder).
Open it on a phone and use "Add to Home Screen" to install it. It works offline.

## Editing

Edit `greenrep.html` (the app), then run `./build.sh`. It rebuilds `docs/greenrep/`
with the install manifest, icons (`icons/`) and offline service worker (`sw.js`).
Commit and push, and the live site updates within a minute or two.
