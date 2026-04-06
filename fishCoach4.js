(function () {
  const overlay = document.getElementById("fishCoachOverlay");
  const fishText = document.getElementById("fishText");
  const fishTitle = document.getElementById("fishTitle");
  const fishLessons = document.getElementById("fishLessons");
  const fishCloseBtn = document.getElementById("fishCloseBtn");

  if (!overlay || !fishText || !fishTitle || !fishLessons || !fishCloseBtn) return;

  let closeHandler = null;

  async function typeText(text) {
    fishText.textContent = "";
    for (let i = 0; i < text.length; i += 1) {
      fishText.textContent += text[i];
      await new Promise(resolve => setTimeout(resolve, 16));
    }
  }

  async function showFishCoachCustom(payload) {
    if (!payload) return;

    fishTitle.textContent = payload.title || "Feedback";
    fishLessons.innerHTML = Array.isArray(payload.lessons)
      ? payload.lessons.map(item => `• ${escapeHtml(item)}`).join("<br>")
      : "";

    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");

    await typeText(payload.bubble || "...");
  }

  function closeFishCoachCustom() {
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  function setFishCoachCloseHandler(fn) {
    closeHandler = typeof fn === "function" ? fn : null;
  }

  function clearFishCoachCloseHandler() {
    closeHandler = null;
  }

  fishCloseBtn.addEventListener("click", () => {
    const evt = new CustomEvent("fishcoach4:continue", {
      bubbles: true,
      cancelable: true
    });

    const notCancelled = overlay.dispatchEvent(evt);
    if (!notCancelled) return;

    if (typeof closeHandler === "function") {
      closeHandler();
      return;
    }

    closeFishCoachCustom();
  });

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  window.showFishCoachCustom = showFishCoachCustom;
  window.closeFishCoachCustom = closeFishCoachCustom;
  window.setFishCoachCloseHandler = setFishCoachCloseHandler;
  window.clearFishCoachCloseHandler = clearFishCoachCloseHandler;
})();