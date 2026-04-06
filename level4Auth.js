document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "level4ClonePhishingAuthPassed";
  const SCORE_KEY = "level4ClonePhishingAuthScore";

  const beginMissionBtn = document.getElementById("beginMissionBtn");
  const beginMissionNote = document.getElementById("beginMissionNote");
  const authStatusBadge = document.getElementById("authStatusBadge");
  const authStatusText = document.getElementById("authStatusText");
  const openMiniGameBtn = document.getElementById("openMiniGameBtn");

  function isAuthenticated() {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  }

  function getSavedScore() {
    const raw = sessionStorage.getItem(SCORE_KEY);
    const score = Number(raw);
    return Number.isFinite(score) ? score : 0;
  }

  function updateAuthUi() {
    const passed = isAuthenticated();
    const score = getSavedScore();

    if (!beginMissionBtn || !authStatusBadge || !authStatusText || !openMiniGameBtn) {
      return;
    }

    if (passed) {
      beginMissionBtn.disabled = false;

      authStatusBadge.textContent = "Unlocked";
      authStatusBadge.classList.remove("locked");
      authStatusBadge.classList.add("unlocked");

      authStatusText.textContent =
        `Authentication passed. You scored ${score}/5 in the mini game. Level 4 is now unlocked.`;

      openMiniGameBtn.textContent = "Replay Authentication Mini Game";

      if (beginMissionNote) {
        beginMissionNote.textContent = "Authentication complete. You can begin the mission.";
      }
    } else {
      beginMissionBtn.disabled = true;

      authStatusBadge.textContent = "Locked";
      authStatusBadge.classList.remove("unlocked");
      authStatusBadge.classList.add("locked");

      authStatusText.textContent =
        "Before entering Level 4, complete the logo authentication mini game and get at least 4 out of 5 correct.";

      openMiniGameBtn.textContent = "Open Authentication Mini Game";

      if (beginMissionNote) {
        beginMissionNote.textContent = "Complete authentication first to unlock this mission.";
      }
    }
  }

  if (openMiniGameBtn) {
    openMiniGameBtn.addEventListener("click", () => {
      window.location.href = "./level4MiniGame.html";
    });
  }

  updateAuthUi();
});
