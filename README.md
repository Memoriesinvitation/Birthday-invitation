# Birthday Invitation Template

This template is a separate reusable birthday invitation website built with plain HTML, CSS, and JavaScript.

## Files

- `index.html`: Section structure and layout templates.
- `config.js`: Main control file for text, colors, fonts, music, links, toggles, images, and the RSVP form.
- `app.js`: Reads the config and renders the invitation.
- `styles.css`: Theme, layout, animations, responsive behavior, and decorative visuals.
- `assets/images/`: Birthday image placeholders or real event images.
- `assets/audio/`: Music file location.

## Main Editing Workflow

Open `birthday-invitation/config.js`. Nearly everything important is controlled from there.
The birthday template now reads its color system from `config.js`, so changing the theme colors updates the actual page styling instead of only parts of it.

## 1. Change the celebrant name and opening envelope text

Edit:

```js
brand: {
  celebrantName: "Omar",
  ageLabel: "26th Birthday Celebration",
  openingEyebrow: "A special birthday invite awaits",
  openingTitle: "Open Invitation",
  openingSubtitle: "For Omar's 18th Birthday",
  openingHint: "Tap the envelope to open"
}
```

## 2. Change the full color palette

Edit:

```js
theme: {
  colors: {
    background: "#040c19",
    backgroundSoft: "#0a1a2d",
    surface: "#f5f3ef",
    surfaceMuted: "#e3ded4",
    ink: "#0f1a26",
    inkSoft: "#4a5a6a",
    gold: "#e6c27a",
    goldStrong: "#c89b3c",
    goldDim: "rgba(230, 194, 122, 0.24)",
    line: "rgba(230, 194, 122, 0.42)",
    whiteLine: "rgba(245, 243, 239, 0.34)",
    shadow: "rgba(0, 0, 0, 0.35)"
  }
}
```

## 3. Change fonts

Edit:

```js
theme: {
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
    script: "'Great Vibes', cursive",
    accent: "'Cormorant Garamond', serif"
  }
}
```

If you change to new Google Fonts, also update the import in `index.html`.

## 4. Change event date, time, venue, and section text

Edit:

- `event.isoDate`
- `event.weekday`
- `event.month`
- `event.day`
- `event.time`
- `event.venue`
- `event.*` for all titles, descriptions, RSVP copy, reminders, gift notes, and closing copy

The countdown automatically uses `event.isoDate`.

## 5. Show or hide whole sections

Edit:

```js
sections: {
  hero: true,
  music: true,
  countdown: true,
  guidelines: true,
  gallery: true,
  rsvp: true,
  closing: true
}
```

Set any section to `false` to remove it.

## 6. Show or hide sub-elements

Edit:

```js
visibility: {
  openingScreen: true,
  sceneDecor: true,
  floatingAudioToggle: true,
  posterTopLines: true,
  posterBottomLines: true,
  heroPrimaryButton: true,
  heroSecondaryButton: true,
  recordVisual: true,
  musicMeta: true,
  musicProgress: true,
  countdownWave: true,
  countdownDays: true,
  countdownHours: true,
  countdownMinutes: true,
  countdownSeconds: true,
  venuePanel: true,
  dressCodePanel: true,
  giftGuidePanel: true,
  reminderPanel: true,
  rsvpSecondaryButton: true,
  closingImage: true
}
```

## 7. Add or remove photos

Edit:

```js
gallery: {
  items: [
    { label: "Portrait one", src: "assets/images/gallery-01.svg", ratio: "portrait", enabled: true },
    { label: "Portrait two", src: "assets/images/gallery-02.svg", ratio: "portrait", enabled: true },
    { label: "Detail photo", src: "assets/images/gallery-03.svg", ratio: "square", enabled: true }
  ]
}
```

To hide a single photo, set `enabled: false`.

## 8. Add the closing image

Edit:

```js
assets: {
  closingImage: "assets/images/closing-photo.svg"
}
```

## 9. Add music

Place your audio file in `assets/audio/` and edit:

```js
music: {
  trackTitle: "Your song title",
  trackArtist: "Artist name",
  src: "assets/audio/song.mp3"
}
```

If `src` is empty, playback controls stay visible as a template but will be disabled.

## 10. RSVP popup form

The RSVP button opens a popup form instead of linking away immediately.

Edit:

```js
rsvpForm: {
  eyebrow: "RSVP Form",
  title: "Save your seat",
  intro: "Fill in your details below.",
  submitLabel: "Send RSVP",
  successMessage: "Your RSVP details are ready.",
  action: "",
  method: "GET",
  fields: [
    {
      id: "guestName",
      name: "guestName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      required: true
    }
  ]
}
```

If `action` is empty, the form stays local and shows the success message.
Later, you can connect `action` and `method` to your Google Form flow on your side.

Supported field types:

- `text`
- `tel`
- `email`
- `select`
- `textarea`

## 11. Change links

Edit:

- `brand.heroPrimaryUrl`
- `brand.heroSecondaryUrl`
- `event.venueButtonUrl`
- `event.rsvpSecondaryUrl`

## Notes

- This template lives in its own folder and does not affect the wedding template.
- The design direction is inspired by your screenshots, but rebuilt as an original layout.
- The configuration file is the main control center for reuse across multiple birthday clients.
