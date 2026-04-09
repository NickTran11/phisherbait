(() => {
  const STORAGE_KEY = "phisherBaitSettings";

  const DEFAULT_SETTINGS = {
    masterVolume: 50,   // 0 - 100
    musicEnabled: true,
    musicVolume: 100    // optional future use
  };

  let registeredAudio = [];
  let bgMusicEl = null;

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_SETTINGS };
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed
      };
    } catch (err) {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  function getSettings() {
    return loadSettings();
  }

  function setSettings(nextPartial) {
    const current = loadSettings();
    const next = { ...current, ...nextPartial };
    saveSettings(next);
    applySettingsToPage();
    return next;
  }

  function getMasterVolumeScalar() {
    return loadSettings().masterVolume / 100;
  }

  function getMusicVolumeScalar() {
    const settings = loadSettings();
    return (settings.masterVolume / 100) * (settings.musicVolume / 100);
  }

  function registerAudioElement(audioEl, options = {}) {
    if (!audioEl) return;

    const existing = registeredAudio.find(entry => entry.el === audioEl);
    if (existing) return;

    registeredAudio.push({
      el: audioEl,
      type: options.type || "sfx", // "music" or "sfx"
      baseVolume: typeof options.baseVolume === "number" ? options.baseVolume : 1
    });
  }

  function registerBackgroundMusic(audioEl, options = {}) {
    if (!audioEl) return;
    bgMusicEl = audioEl;
    registerAudioElement(audioEl, {
      type: "music",
      baseVolume: typeof options.baseVolume === "number" ? options.baseVolume : 1
    });
    applySettingsToPage();
  }

  function applySettingsToPage() {
    const settings = loadSettings();

    registeredAudio.forEach(entry => {
      if (!entry.el) return;

      if (entry.type === "music") {
        const finalVol = (settings.masterVolume / 100) * (settings.musicVolume / 100) * entry.baseVolume;
        entry.el.volume = Math.max(0, Math.min(1, finalVol));

        if (!settings.musicEnabled) {
          entry.el.pause();
        }
      } else {
        const finalVol = (settings.masterVolume / 100) * entry.baseVolume;
        entry.el.volume = Math.max(0, Math.min(1, finalVol));
      }
    });

    syncSettingsControls();
  }

  function syncSettingsControls() {
    const settings = loadSettings();

    const volumeSlider = document.getElementById("volume-slider");
    const musicToggle = document.getElementById("music-toggle");
    const musicVolumeSlider = document.getElementById("music-volume-slider");

    if (volumeSlider) {
      volumeSlider.value = settings.masterVolume;
    }

    if (musicToggle) {
      musicToggle.checked = settings.musicEnabled;
    }

    if (musicVolumeSlider) {
      musicVolumeSlider.value = settings.musicVolume;
    }
  }

  function tryPlayBackgroundMusic() {
    const settings = loadSettings();
    if (!bgMusicEl || !settings.musicEnabled) return;

    applySettingsToPage();
    bgMusicEl.play().catch(() => {});
  }

  function toggleSettings() {
    const overlay = document.getElementById("settings-overlay");
    if (!overlay) return;
    overlay.classList.toggle("active");
  }

  function updateVolume() {
    const volumeSlider = document.getElementById("volume-slider");
    if (!volumeSlider) return;

    setSettings({
      masterVolume: Number(volumeSlider.value)
    });
  }

  function toggleMusic() {
    const musicToggle = document.getElementById("music-toggle");
    if (!musicToggle) return;

    const next = setSettings({
      musicEnabled: !!musicToggle.checked
    });

    if (bgMusicEl) {
      if (next.musicEnabled) {
        tryPlayBackgroundMusic();
      } else {
        bgMusicEl.pause();
      }
    }
  }

  function updateMusicVolume() {
    const musicVolumeSlider = document.getElementById("music-volume-slider");
    if (!musicVolumeSlider) return;

    setSettings({
      musicVolume: Number(musicVolumeSlider.value)
    });
  }

  function initSettings() {
    syncSettingsControls();
    applySettingsToPage();

    const settingsOverlay = document.getElementById("settings-overlay");
    if (settingsOverlay) {
      settingsOverlay.addEventListener("click", (e) => {
        if (e.target === settingsOverlay) {
          settingsOverlay.classList.remove("active");
        }
      });
    }
  }

  // expose globally so your existing onclick attributes still work
  window.toggleSettings = toggleSettings;
  window.updateVolume = updateVolume;
  window.toggleMusic = toggleMusic;
  window.updateMusicVolume = updateMusicVolume;

  // expose helpers for levels/pages
  window.PhisherBaitSettings = {
    initSettings,
    getSettings,
    setSettings,
    applySettingsToPage,
    registerAudioElement,
    registerBackgroundMusic,
    tryPlayBackgroundMusic
  };

  document.addEventListener("DOMContentLoaded", initSettings);
})();
