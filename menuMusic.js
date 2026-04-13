const bgMusic = document.getElementById("bgMusic");

if (window.PhisherBaitSettings && bgMusic) {
  window.PhisherBaitSettings.registerBackgroundMusic(bgMusic, { baseVolume: 0.35 });
}

// Start music on first interaction
function startMusicOnce() {
  if (!bgMusic) return;

  bgMusic.play().catch(() => {});
  document.removeEventListener("click", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);

// Try autoplay if allowed
window.addEventListener("load", () => {
  if (!bgMusic) return;
  bgMusic.play().catch(() => {});
});
