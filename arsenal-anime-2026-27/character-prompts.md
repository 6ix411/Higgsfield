# 砲兵 GUNNERS — Character & Asset Prompts (EP0 + EP1)

Copy-paste prompts for making the reference images yourself, in Higgsfield or any image tool.
Every prompt is built as **STYLE LOCK + SHEET TYPE + CHARACTER BLOCK + NEGATIVE TAIL**, so all the characters come out in the same style.

> **Likeness rule:** each player is an *original anime character* recognisable by build, hair, skin tone, kit and squad number. Don't paste player photos in as references and don't ask for a lifelike face. Video models often block real-face references, and Higgsfield's character-sheet guide requires original characters. Check squad numbers and hairstyles against the current squad before generating.

---

## 0. Settings for every image

| Setting | Value |
|---|---|
| Aspect ratio | **16:9** (landscape) |
| Resolution | 2K if available (at least 1024 px wide) |
| One character per image | always |
| Background | plain white seamless |
| Naming | `name-sheet.png`, e.g. `gabriel-turnaround.png`, `gabriel-head.png`, `gabriel-expressions.png` |
| Consistency trick | Generate the **turnaround first**. Then use it as the reference image for the head sheet and the expression sheet, so the face stays the same. |

---

## 1. STYLE LOCK (paste at the start of every prompt)

```
Japanese anime key-visual style, modern shonen sports anime, crisp clean lineart, cel-shaded flat color with soft gradient shadows, sharp expressive eyes, dynamic but grounded anatomy, mature adult proportions, consistent character model-sheet style, even flat studio lighting, pure white seamless background,
```

## 2. The team kit (use in every Arsenal player block)

```
wearing an original team kit: bright red (#EF0107) shirt with white sleeves and thin gold trim, a small gold cannon emblem on the chest (original design, no real club crest), white shorts with a red side stripe, red socks with white bands, black football boots, a short red-and-white haori jacket with gold cannon motifs worn open over the kit, squad number [NUMBER] in white on the back and on the shorts,
```

## 3. NEGATIVE TAIL (paste at the end of every prompt)

```
single character only, no other people, no duplicate figures, no background objects, no props unless stated, no text, no watermark, no real club crests, no sponsor logos, no brand logos, no frame borders, no photorealism, no realistic human face, not a likeness of any real person, no babyface, no extra fingers, no distorted anatomy
```

---

## 4. The three sheet types (the "all angles" set)

Make **all three** for every main character. Minor characters only need Sheet A.

### Sheet A — Full-body turnaround (body from every angle)
```
Character turnaround model sheet, five consistent full-body views of the same original character standing in a row, evenly spaced: front view, three-quarter left view, left side profile, three-quarter back view, back view, standing upright in a neutral pose, arms relaxed, entire body head-to-toe with both feet visible, not cropped, same height and scale in every view,
```

### Sheet B — Head turnaround (the face from all angles)
```
Character head turnaround sheet, eight consistent head-and-shoulders views of the same original character arranged in two rows of four: top row — front view, three-quarter left, left profile, back of head; bottom row — three-quarter right, right profile, looking up at 30 degrees, looking down at 30 degrees, identical face, hairstyle, and features in every view, neutral expression, same scale,
```

### Sheet C — Expression sheet (the emotions the script needs)
```
Character expression sheet, one full-body reference standing on the left, and a 3x2 grid of head-and-shoulders portraits on the right showing: [EXPRESSIONS], identical face and hairstyle in every panel,
```

---

## 5. Character blocks — EP0 + EP1

Each block replaces `[CHARACTER]` in: **STYLE LOCK + SHEET + [CHARACTER] + NEGATIVE TAIL**.

### 5.1 Mikel Arteta — the sensei (A + B + C)
```
original anime character "Sensei Arteta", a slim, athletic man in his mid-40s, light olive skin, dark hair neatly slicked back with a clean side part and slight grey at the temples, sharp defined jaw, light stubble, intense dark eyes, wearing a fitted black quarter-zip training top under a long dark-charcoal haori with a subtle gold cannon motif, black tailored trousers, black trainers,
```
Expressions: `furious roaring shout, fist-pump celebration, intense quiet whisper, arms-wide crowd-rousing yell, kneeling despair, calm proud smile`
Prop sheet (optional, Sheet A variant): holding a glass lightbulb in one hand.

### 5.2 Martin Ødegaard — the captain (A + B + C)
```
original anime character, a slim, graceful young man in his late 20s, fair Scandinavian skin, short light-brown hair neatly styled, calm pale-blue eyes, gentle composed face, captain's armband in gold on the left arm, [TEAM KIT with NUMBER 8],
```
Expressions: `calm neutral, soft encouraging smile, focused shooting stare, quiet grief, raising a trophy with pride, hand-on-shoulder comforting look`

### 5.3 Gabriel Magalhães — the oni with a wound (A + B + C)
```
original anime character, a very tall, powerfully built centre-back in his late 20s, warm brown Brazilian skin, short black hair with a sharp fade, short dark beard, fierce dark eyes, broad shoulders, [TEAM KIT with NUMBER 6],
```
Expressions: `ferocious roar, haunted thousand-yard stare, kneeling in despair with head down, tears held back, determined clenched jaw, relieved smile with eyes closed`

### 5.4 Kai Havertz — the cool ghost (A + B + C)
```
original anime character, a tall, lean forward in his late 20s, fair skin, short dark-brown hair, relaxed half-lidded sleepy eyes, calm expressionless face, long limbs, [TEAM KIT with NUMBER 29],
```
Expressions: `sleepy neutral, small satisfied nod, focused heading stare, quiet disappointment, rare half-smile, calm determined look`

### 5.5 David Raya — the guardian (A + B + C)
```
original anime goalkeeper character, an athletic man in his early 30s, light olive Spanish skin, short dark hair, neat dark beard, calm focused eyes, wearing an original goalkeeper kit: deep teal shirt and shorts with gold trim, small gold cannon emblem, teal socks, large goalkeeper gloves, short teal haori open over the kit, squad number [NUMBER 1] in white,
```
Expressions: `calm neutral, roaring after a save, diving-save concentration, glowing golden spirit eyes, reassuring smile, quiet focus polishing gloves`

### 5.6 Eberechi Eze — the silent artist (A + B + C)
```
original anime character, a slim, agile attacking midfielder in his late 20s, dark brown Black British skin, short neat black hair with a crisp line-up, thin neat beard, warm expressive eyes, light graceful build, [TEAM KIT with NUMBER 10],
```
Expressions: `easy relaxed smile, quiet withdrawn look, missed-penalty shock, small returning smile, focused dribbling gaze, gentle mentoring look`

### 5.7 Viktor Gyökeres — the masked killer (A + B + C)
```
original anime character, a tall, very muscular, powerful striker in his late 20s, fair Scandinavian skin, short dark-blond hair swept back, light stubble, cold piercing grey-blue eyes, thick neck and broad chest, [TEAM KIT with NUMBER 14],
```
Expressions: `cold emotionless killer stare, fingers laced over face in mask pose, frustrated clenched jaw on the bench, hood-up brooding, explosive scream, quiet 'soon' whisper`

### 5.8 Riccardo Calafiori — the flame (A only, B optional)
```
original anime character, an athletic left-back in his mid-20s, light olive Italian skin, dark wavy hair, short dark beard, both forearms covered in stylised tattoos, wild emotional eyes, [TEAM KIT with NUMBER 33],
```
Expressions (if Sheet C): `shirt-tearing celebration scream, wide-eyed sprint, fist to chest, grin, fierce, crying with joy`

---

## 6. Opponents & crowd (Sheet A only)

### 6.1 PSG "shadow clan" player (also used for Dembélé)
```
original anime character shown as a dark silhouette, faceless, deep navy-blue body with a faint red vertical stripe glowing down the chest, glowing white eyes only, athletic footballer build, no numbers, no crest, menacing, ink-wash shadow edges,
```

### 6.2 Man City "sky clan" player
```
original anime footballer, generic athletic build, face partly in shadow, sky-blue shirt with white shorts and sky-blue socks, no crest, no numbers, no sponsor, stern expression,
```

### 6.3 Gooner cheer squad (ōendan) fan
```
original anime football supporter, a young adult, red-and-white scarf held above head, red hachimaki headband with a gold cannon, red happi coat, mouth open singing loudly, energetic pose,
```

---

## 7. Other things the production needs

### 7.1 Series style sheet (make this FIRST — it's the master reference)
```
Japanese anime key-visual style guide sheet, a colour palette strip of bright red #EF0107, white, and gold, a sample character in the team kit mid-sprint, a sample goal-celebration freeze frame with an ink-splash burst, speed lines, cherry-blossom petal trail, a brushed katakana sound effect shape, a lantern-lit night sky swatch, and a black-and-white ink-wash sample with a single red football, clean presentation on white, no text labels, no logos
```

### 7.2 Gyökeres's jutsu — two sheets
**Unsealed (full power):**
```
[STYLE LOCK] dynamic action sheet of the same original striker character (tall, muscular, dark-blond, number 14, red kit), three panels: 1) shoulder-dropping a defender with the ball at his feet, 2) close-up of cold grey-blue eyes as the world turns grey with a glowing red sniper crosshair, 3) fingers laced over his face in a mask pose with a ghostly red oni mask forming over his hands and a faint brushed kanji 殺 behind him, [NEGATIVE TAIL minus 'single character only']
```
**Sealed:**
```
[STYLE LOCK] the same original striker character standing, head down, heavy black chains wrapped around both football boots and ankles, faint dark aura, frustrated clenched fists, [NEGATIVE TAIL]
```

### 7.3 Props (one image, 16:9)
```
[STYLE LOCK] prop design sheet, isolated objects on white: an ornate gold-and-silver league trophy topped with a crown (original design, not a real trophy), a silver shield trophy, a glass lightbulb, a football with a white-star pattern (original, no logo), a pair of teal goalkeeper gloves, a black captain's armband with gold trim, a red-and-white scarf, no text, no logos
```

### 7.4 Backgrounds (optional, 16:9, no characters)
```
[STYLE LOCK minus 'pure white seamless background'] anime background art, no people:
1) Budapest-style modern football stadium at night rendered entirely in black-and-white ink wash, one red football glowing on the centre spot
2) a traditional Japanese castle gate opening onto a modern stadium roof at golden hour
3) a modern football locker room with wooden benches, a red folding shoji screen used as a tactics board, a steaming kettle
4) "Cannon Castle": a modern football stadium reimagined as a Japanese castle at night, lanterns, a golden cannon on the highest roof
```

---

## 8. Checklist and counts

| # | Asset | Sheets | Images |
|---|---|---|---|
| 1 | Style sheet | 1 | 1 |
| 2 | Arteta, Ødegaard, Gabriel, Havertz, Raya, Eze, Gyökeres | A + B + C | 21 |
| 3 | Calafiori | A (+B) | 1–2 |
| 4 | PSG shadow, City player, ōendan fan | A | 3 |
| 5 | Gyökeres jutsu (unsealed + sealed) | — | 2 |
| 6 | Props | — | 1 |
| 7 | Backgrounds (optional) | — | 4 |
| | **Total** | | **~29 required + 4 optional** |

If you generate these on Higgsfield with Nano Banana Pro (2 credits each), that's **~58 credits** for the required set, or **~66** with backgrounds. Add about 30% for redoing bad images.

**Suggested order:** style sheet first, then each character's turnaround (A), then B and C using A as the reference image, then jutsu, props and backgrounds. When they're done, upload them to Higgsfield (or tell me where they are) and I'll check each one before any video credits are spent.
