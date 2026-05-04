const config = window.invitationConfig;
const app = document.getElementById("app");
const root = document.documentElement;
const visibility = config.visibility || {};

applyTheme(config.theme);
hydrateStaticBindings();
setupOpeningScreen();
setupRsvpModal();
renderPage();
setupRevealAnimations();

function applyTheme(theme) {
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${toKebab(key)}`, value);
    const channels = colorToChannels(value);
    if (channels) {
      root.style.setProperty(`--color-${toKebab(key)}-rgb`, channels);
    }
  });

  Object.entries(theme.fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${toKebab(key)}`, value);
  });
}

function hydrateStaticBindings() {
  fillBindings(document.body, {
    ...config.brand
  });

  toggleDisplay(document.getElementById("sceneDecor"), visibility.sceneDecor !== false);
}

function setupOpeningScreen() {
  const screen = document.getElementById("openingScreen");
  const openButton = document.getElementById("openInvitationButton");
  const shell = document.getElementById("pageShell");

  if (!screen || !openButton || !shell) {
    return;
  }

  if (visibility.openingScreen === false) {
    screen.hidden = true;
    shell.classList.add("is-visible");
    document.body.classList.add("invitation-open");
    return;
  }

  openButton.addEventListener("click", () => {
    screen.classList.add("is-opening");
    shell.classList.add("is-visible");
    document.body.classList.add("invitation-open");
    window.setTimeout(() => {
      screen.hidden = true;
    }, 900);
  });
}

function setupRsvpModal() {
  const modal = document.getElementById("rsvpModal");
  const closeButton = document.getElementById("closeRsvpModal");
  const form = document.getElementById("rsvpForm");
  const fieldsContainer = document.getElementById("rsvpFormFields");
  const feedback = document.getElementById("rsvpFormFeedback");

  if (!modal || !closeButton || !form || !fieldsContainer || !feedback) {
    return;
  }

  const formConfig = config.rsvpForm || {};

  fillBindings(modal, {
    formEyebrow: formConfig.eyebrow || "RSVP Form",
    formTitle: formConfig.title || "Save your seat",
    formIntro: formConfig.intro || "",
    formSubmitLabel: formConfig.submitLabel || "Send RSVP",
    formSuccessMessage: formConfig.successMessage || "RSVP received."
  });

  fieldsContainer.replaceChildren();
  (formConfig.fields || []).forEach((field) => {
    const fieldWrap = document.createElement("label");
    fieldWrap.className = `form-field form-field--${field.type || "text"}`;

    const caption = document.createElement("span");
    caption.className = "form-field__label";
    caption.textContent = field.label || "";
    fieldWrap.appendChild(caption);

    let input;
    if (field.type === "textarea") {
      input = document.createElement("textarea");
      input.rows = 4;
    } else if (field.type === "select") {
      input = document.createElement("select");
      (field.options || []).forEach((optionValue) => {
        const option = document.createElement("option");
        option.value = optionValue;
        option.textContent = optionValue;
        input.appendChild(option);
      });
    } else {
      input = document.createElement("input");
      input.type = field.type || "text";
    }

    input.name = field.name || field.id || "";
    input.id = field.id || field.name || "";
    input.placeholder = field.placeholder || "";
    input.required = Boolean(field.required);
    fieldWrap.appendChild(input);
    fieldsContainer.appendChild(fieldWrap);
  });

  if (formConfig.action) {
    form.action = formConfig.action;
    form.method = formConfig.method || "GET";
  } else {
    form.removeAttribute("action");
    form.removeAttribute("method");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest('[data-action="open-rsvp-modal"]');

    if (!trigger) return;

    // 🚫 Prevent opening if invitation is not opened yet
    if (!document.body.classList.contains("invitation-open")) {
      return;
    }

    event.preventDefault();
    feedback.hidden = true;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  });

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  form.addEventListener("submit", (event) => {
    if (!formConfig.action) {
      event.preventDefault();
      feedback.hidden = false;
    }
  });

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }
}

function renderPage() {
  const { sections } = config;

  toggleDisplay(
    document.getElementById("floatingAudioToggle"),
    sections.music && visibility.floatingAudioToggle !== false
  );

  if (sections.hero) {
    const node = cloneTemplate("hero-template");
    fillBindings(node, {
      heroKicker: config.brand.heroKicker,
      celebrantName: config.brand.celebrantName,
      heroAgeLine: config.brand.ageLabel,
      heroWeekday: config.event.weekday,
      heroMonth: config.event.month,
      heroDay: config.event.day,
      heroTime: config.event.time,
      heroVenue: `${config.event.heroVenuePrefix} • ${config.event.venue}`,
      heroPrimaryLabel: config.brand.heroPrimaryLabel,
      heroPrimaryUrl: config.brand.heroPrimaryUrl,
      heroSecondaryLabel: config.brand.heroSecondaryLabel,
      heroSecondaryUrl: config.brand.heroSecondaryUrl
    });
    toggleDecor(node);
    toggleDisplay(node.querySelector('[data-bind="heroPrimaryLabel"]'), visibility.heroPrimaryButton !== false);
    toggleDisplay(node.querySelector('[data-bind="heroSecondaryLabel"]'), visibility.heroSecondaryButton !== false);
    toggleDisplay(
      node.querySelector(".hero-actions"),
      visibility.heroPrimaryButton !== false || visibility.heroSecondaryButton !== false
    );
    app.appendChild(node);
  }

  if (sections.music) {
    const node = cloneTemplate("music-template");
    fillBindings(node, {
      musicEyebrow: config.music.eyebrow,
      musicTitle: config.music.title,
      musicMessage: config.music.message,
      musicTrackTitle: config.music.trackTitle,
      musicTrackArtist: config.music.trackArtist
    });
    toggleDecor(node);
    toggleDisplay(node.querySelector(".music-meta"), visibility.musicMeta !== false);
    toggleDisplay(node.querySelector(".music-progress"), visibility.musicProgress !== false);
    app.appendChild(node);
    setupAudio();
  }

  if (sections.countdown) {
    const node = cloneTemplate("countdown-template");
    fillBindings(node, {
      countdownEyebrow: config.event.countdownEyebrow,
      countdownTitle: config.event.countdownTitle
    });
    toggleDecor(node);
    renderCountdown(node.querySelector("#countdownGrid"));
    app.appendChild(node);
  }

  if (sections.guidelines) {
    const node = cloneTemplate("guidelines-template");
    node.id = "guidelines";
    fillBindings(node, {
      guidelinesEyebrow: config.event.guidelinesEyebrow,
      guidelinesTitle: config.event.guidelinesTitle,
      guidelinesText: config.event.guidelinesText,
      venueTitle: config.event.venueTitle,
      venueText: config.event.venueText,
      venueButtonLabel: config.event.venueButtonLabel,
      venueButtonUrl: config.event.venueButtonUrl,
      dressCodeTitle: config.event.dressCodeTitle,
      dressCodeText: config.event.dressCodeText,
      giftGuideTitle: config.event.giftGuideTitle,
      giftGuideText: config.event.giftGuideText,
      reminderTitle: config.event.reminderTitle,
      reminderText: config.event.reminderText
    });
    togglePanel(node.querySelector('[data-panel="venue"]'), visibility.venuePanel !== false);
    togglePanel(node.querySelector('[data-panel="dressCode"]'), visibility.dressCodePanel !== false);
    togglePanel(node.querySelector('[data-panel="giftGuide"]'), visibility.giftGuidePanel !== false);
    togglePanel(node.querySelector('[data-panel="reminder"]'), visibility.reminderPanel !== false);
    app.appendChild(node);
  }

  if (sections.gallery) {
    const node = cloneTemplate("gallery-template");
    fillBindings(node, {
      galleryEyebrow: config.event.galleryEyebrow,
      galleryTitle: config.event.galleryTitle
    });
    renderGallery(node.querySelector("#galleryGrid"), config.gallery.items);
    app.appendChild(node);
  }

  if (sections.rsvp) {
    const node = cloneTemplate("rsvp-template");
    node.id = "rsvp";
    fillBindings(node, {
      rsvpEyebrow: config.event.rsvpEyebrow,
      rsvpTitle: config.event.rsvpTitle,
      rsvpText: config.event.rsvpText,
      rsvpPrimaryLabel: config.event.rsvpPrimaryLabel,
      rsvpSecondaryLabel: config.event.rsvpSecondaryLabel,
      rsvpSecondaryUrl: config.event.rsvpSecondaryUrl
    });
    toggleDisplay(node.querySelector('[data-bind="rsvpSecondaryLabel"]'), visibility.rsvpSecondaryButton !== false);
    app.appendChild(node);
  }

  if (sections.closing) {
    const node = cloneTemplate("closing-template");
    fillBindings(node, {
      closingEyebrow: config.event.closingEyebrow,
      closingTitle: config.event.closingTitle,
      closingText: config.event.closingText
    });
    const image = node.querySelector('[data-image="closingImage"]');
    toggleDisplay(image, visibility.closingImage !== false);
    setImage(image, config.assets.closingImage, "Closing image");
    app.appendChild(node);
  }
}

function renderCountdown(container) {
  const units = [
    { key: "days", label: "Days", visible: visibility.countdownDays !== false },
    { key: "hours", label: "Hours", visible: visibility.countdownHours !== false },
    { key: "minutes", label: "Minutes", visible: visibility.countdownMinutes !== false },
    { key: "seconds", label: "Seconds", visible: visibility.countdownSeconds !== false }
  ].filter((unit) => unit.visible);

  units.forEach((unit) => {
    const item = document.createElement("article");
    item.className = "countdown-item";
    item.innerHTML = `
      <strong data-countdown="${unit.key}">00</strong>
      <span>${unit.label}</span>
    `;
    container.appendChild(item);
  });

  const update = () => {
    const distance = new Date(config.event.isoDate).getTime() - Date.now();
    const safeDistance = Math.max(distance, 0);
    const time = {
      days: Math.floor(safeDistance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((safeDistance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((safeDistance / (1000 * 60)) % 60),
      seconds: Math.floor((safeDistance / 1000) % 60)
    };

    container.querySelectorAll("[data-countdown]").forEach((element) => {
      const key = element.dataset.countdown;
      element.textContent = String(time[key]).padStart(2, "0");
    });
  };

  update();
  window.setInterval(update, 1000);
}

function renderGallery(container, items) {
  const enabledItems = items.filter((item) => item.enabled !== false);
  container.dataset.count = String(enabledItems.length);

  if (enabledItems.length === 0) {
    const placeholder = document.createElement("article");
    placeholder.className = "gallery-card";
    setImage(placeholder, "", "Gallery image");
    container.appendChild(placeholder);
    return;
  }

  enabledItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = `gallery-card gallery-card--${item.ratio}`;
    setImage(card, item.src, item.label);
    container.appendChild(card);
  });
}

function setupAudio() {
  const audio = document.getElementById("invitationAudio");
  const playButton = document.getElementById("playButton");
  const floatingButton = document.getElementById("floatingAudioToggle");
  const floatingLabel = floatingButton?.querySelector(".audio-pill__label");
  const progressBar = document.getElementById("progressBar");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");

  if (!audio || !playButton || !progressBar || !currentTime || !duration || !floatingButton || !floatingLabel) {
    return;
  }

  if (!config.music.src) {
    playButton.disabled = true;
    floatingButton.disabled = true;
    playButton.textContent = "Add Song";
    floatingLabel.textContent = "No Song";
    return;
  }

  audio.src = config.music.src;

  const sync = () => {
    const playing = !audio.paused;
    playButton.textContent = playing ? "Pause" : "Play";
    floatingLabel.textContent = playing ? "Sound On" : "Sound Off";
  };

  const toggle = async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error("Audio playback failed.", error);
      }
    } else {
      audio.pause();
    }
    sync();
  };

  playButton.addEventListener("click", toggle);
  floatingButton.addEventListener("click", toggle);

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const progress = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progressBar.value = String(progress);
    currentTime.textContent = formatTime(audio.currentTime);
  });

  progressBar.addEventListener("input", () => {
    if (!audio.duration) {
      return;
    }
    audio.currentTime = (Number(progressBar.value) / 100) * audio.duration;
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setImage(element, src, label) {
  if (!element) {
    return;
  }

  element.classList.remove("has-image", "is-placeholder");
  element.style.backgroundImage = "";
  element.replaceChildren();

  if (src) {
    element.style.backgroundImage = `linear-gradient(rgb(var(--color-gold-rgb) / 0.08), rgb(var(--color-background-rgb) / 0.14)), url("${src}")`;
    element.classList.add("has-image");
  } else {
    element.classList.add("is-placeholder");
    const tag = document.createElement("span");
    tag.className = "placeholder-label";
    tag.textContent = label;
    element.appendChild(tag);
  }
}

function fillBindings(scope, values) {
  scope.querySelectorAll("[data-bind]").forEach((element) => {
    const key = element.dataset.bind;
    if (values[key] !== undefined) {
      element.textContent = values[key];
    }
  });

  scope.querySelectorAll("[data-bind-href]").forEach((element) => {
    const key = element.dataset.bindHref;
    if (values[key] !== undefined) {
      element.setAttribute("href", values[key]);
    }
  });
}

function cloneTemplate(id) {
  return document.getElementById(id).content.firstElementChild.cloneNode(true);
}

function toggleDecor(scope) {
  scope.querySelectorAll("[data-decor]").forEach((element) => {
    toggleDisplay(element, visibility[element.dataset.decor] !== false);
  });
}

function togglePanel(element, shouldShow) {
  if (!element) {
    return;
  }
  element.hidden = !shouldShow;
}

function toggleDisplay(element, shouldShow) {
  if (!element) {
    return;
  }
  element.hidden = !shouldShow;
}

function formatTime(value) {
  if (!Number.isFinite(value)) {
    return "0:00";
  }
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function toKebab(value) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function colorToChannels(value) {
  if (!value) {
    return "";
  }

  const hex = value.trim();
  if (hex.startsWith("#")) {
    let clean = hex.slice(1);
    if (clean.length === 3) {
      clean = clean.split("").map((char) => char + char).join("");
    }
    if (clean.length >= 6) {
      const r = parseInt(clean.slice(0, 2), 16);
      const g = parseInt(clean.slice(2, 4), 16);
      const b = parseInt(clean.slice(4, 6), 16);
      return `${r} ${g} ${b}`;
    }
  }

  const rgbMatch = value.match(/rgba?\(([^)]+)\)/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(",").map((part) => part.trim());
    return parts.slice(0, 3).join(" ");
  }

  return "";
}
