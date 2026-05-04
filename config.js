window.invitationConfig = {
  brand: {
    brandingTag: "Birthday Invitation",
    openingEyebrow: "A special birthday invite awaits",
    openingTitle: "Open Invitation",
    openingSubtitle: "For Omar's 18th Birthday",
    openingHint: "Tap the envelope to open",
    celebrantName: "Omar",
    ageLabel: "26th Birthday Celebration",
    heroKicker: "Come and lift more weights",
    heroPrimaryLabel: "View Venue",
    heroPrimaryUrl: "#guidelines",
    heroSecondaryLabel: "RSVP",
    heroSecondaryUrl: "#rsvp"
  },
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
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
      script: "'Great Vibes', cursive",
      accent: "'Cormorant Garamond', serif"
    }
  },
  sections: {
    hero: true,
    music: true,
    countdown: true,
    guidelines: true,
    gallery: true,
    rsvp: true,
    closing: true
  },
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
  },
  event: {
    isoDate: "2027-04-06T16:30:00+02:00",
    weekday: "Saturday",
    month: "May",
    day: "02",
    time: "4:30 PM",
    venue: "The Grand Hall",
    heroVenuePrefix: "Venue",
    countdownEyebrow: "Days before the celebration",
    countdownTitle: "Omar's Special Day",
    guidelinesEyebrow: "Guest Guidelines",
    guidelinesTitle: "A few lovely notes before the party",
    guidelinesText: "We would love for you to be part of this milestone celebration. Kindly take a moment to read through the details below.",
    venueTitle: "Venue",
    venueText: "The Grand Hall, with doors opening at 4:00 PM for a warm welcome before the program begins.",
    venueButtonLabel: "View Map",
    venueButtonUrl: "https://maps.google.com",
    dressCodeTitle: "Dress Code",
    dressCodeText: "Elegant evening attire in black, champagne, gold, blush, or soft neutrals.",
    giftGuideTitle: "Gift Guide",
    giftGuideText: "Your presence and prayers are already the greatest gift. If you'd still like to bring one, keepsakes in soft pink or gold would be treasured.",
    reminderTitle: "Reminder",
    reminderText: "Please arrive at least 15 minutes early so we can start the celebration beautifully and on time.",
    galleryEyebrow: "Moments",
    galleryTitle: "Birthday Moodboard",
    rsvpEyebrow: "RSVP",
    rsvpTitle: "We reserved a seat just for you",
    rsvpText: "Kindly submit your response on or before April 25, 2026.",
    rsvpPrimaryLabel: "RSVP Here",
    rsvpSecondaryLabel: "Send Greeting",
    rsvpSecondaryUrl: "https://wa.me/",
    closingEyebrow: "See you soon",
    closingTitle: "Let's make this birthday unforgettable",
    closingText: "Thank you for celebrating this milestone with us. We cannot wait to share laughter, music, and beautiful memories together."
  },
  rsvpForm: {
    eyebrow: "RSVP Form",
    title: "Save your seat",
    intro: "Fill in your details below. You can later connect this form to your Google Form flow on your side.",
    submitLabel: "Send RSVP",
    successMessage: "Your RSVP details are ready. Connect this form action to your Google Form when you are ready.",
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
      },
      {
        id: "guestPhone",
        name: "guestPhone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter your phone number",
        required: true
      },
      {
        id: "guestAttendance",
        name: "guestAttendance",
        label: "Will you attend?",
        type: "select",
        required: true,
        options: ["Yes, I'll be there", "Sorry, I can't make it"]
      },
      {
        id: "guestNote",
        name: "guestNote",
        label: "Message",
        type: "textarea",
        placeholder: "Leave a lovely note",
        required: false
      }
    ]
  },
  music: {
    eyebrow: "Play this while you scroll",
    title: "Set the mood",
    message: "A little music makes the invitation feel even more magical.",
    trackTitle: "Add your song title",
    trackArtist: "Add artist name",
    src: "assets/audio/Taylor Swift - I Think He Knows (Official Audio).mp3"
  },
  gallery: {
    items: [
      { label: "Portrait one", src: "assets/images/gallery-01.svg", ratio: "portrait", enabled: true },
      { label: "Portrait two", src: "assets/images/gallery-02.svg", ratio: "portrait", enabled: true },
      { label: "Detail photo", src: "assets/images/gallery-03.svg", ratio: "square", enabled: true }
    ]
  },
  assets: {
    closingImage: "assets/images/closing-photo.svg"
  }
};
