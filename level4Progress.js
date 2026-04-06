document.addEventListener("DOMContentLoaded", () => {
  const data = window.LEVEL4_EMAIL;
  if (!data || !Array.isArray(data.messages)) return;

  const overlay = document.getElementById("fishCoachOverlay");
  const verificationResult = document.getElementById("verificationResult");
  const verificationHelp = document.getElementById("verificationHelp");
  const proofBox = document.getElementById("proofBox");
  const messageList = document.getElementById("messageList");
  const inboxFolder = document.getElementById("inboxFolder");
  const listTitle = document.getElementById("listTitle");
  const beginMissionBtn = document.getElementById("beginMissionBtn");
  const starsOverlay = document.getElementById("starsOverlay");
  const starsResultRow = document.getElementById("starsResultRow");
  const starsResultText = document.getElementById("starsResultText");
  const starsContinueBtn = document.getElementById("starsContinueBtn");
  const bgMusic = document.getElementById("bgMusic");
  const levelCompleteSfx = document.getElementById("levelCompleteSfx");
  const levelFailSfx = document.getElementById("levelFailSfx");
  const correctAnswerSfx = document.getElementById("correctAnswerSfx");
  const wrongAnswerSfx = document.getElementById("wrongAnswerSfx");

  const messageMap = new Map(data.messages.map(message => [message.id, message]));
  const inboxMessages = data.messages.filter(message => (message.folder || "Inbox") === "Inbox");
  const inboxIds = new Set(inboxMessages.map(message => message.id));

  const resolutionMap = new Map();
  const pendingMap = new Map();

  const musicVolume = 0.35;
  let musicStarted = false;

  function getActiveMessageId() {
    const activeItem = document.querySelector("#messageList .message-item.active");
    return activeItem ? activeItem.dataset.id || null : null;
  }

  function getActiveMessage() {
    const id = getActiveMessageId();
    return id ? messageMap.get(id) || null : null;
  }

  function isInboxMessage(id) {
    return inboxIds.has(id);
  }

  function startBackgroundMusic() {
    if (!bgMusic || musicStarted) return;

    bgMusic.volume = musicVolume;
    bgMusic.loop = true;
    bgMusic.play().then(() => {
      musicStarted = true;
    }).catch(() => {});
  }

  function pauseBackgroundMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
  }

  function playSfx(audioEl) {
    if (!audioEl) return;
    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  }

  function applyStatusMarks() {
    const rows = messageList ? Array.from(messageList.querySelectorAll(".message-item")) : [];
    rows.forEach(row => {
      const id = row.dataset.id;
      const status = resolutionMap.get(id);

      row.classList.remove("has-status", "resolved-good", "resolved-warn", "resolved-bad");

      const existingDot = row.querySelector(".message-status-dot");
      if (existingDot) existingDot.remove();

      if (!status) return;

      row.classList.add("has-status", `resolved-${status}`);

      const dot = document.createElement("span");
      dot.className = "message-status-dot";
      dot.setAttribute("aria-hidden", "true");
      row.appendChild(dot);
    });

    updateActionAvailability();
  }

  function updateActionAvailability() {
    const activeId = getActiveMessageId();
    const resolved = activeId ? resolutionMap.has(activeId) : false;
    const inboxPlayable = activeId ? isInboxMessage(activeId) : false;

    document.querySelectorAll("[data-action]").forEach(button => {
      button.disabled = resolved || !inboxPlayable;
    });
  }

  function chooseNextInboxMessage() {
    const nextMessage = inboxMessages.find(message => !resolutionMap.has(message.id));
    if (!nextMessage) return;

    const selectNext = () => {
      const row = document.querySelector(`#messageList .message-item[data-id="${nextMessage.id}"]`);
      if (row) {
        row.click();
        return true;
      }
      return false;
    };

    if ((listTitle && listTitle.textContent.trim() !== "Inbox") && inboxFolder) {
      inboxFolder.click();
      setTimeout(selectNext, 30);
      return;
    }

    setTimeout(selectNext, 30);
  }

  function allInboxDone() {
    return resolutionMap.size === inboxMessages.length;
  }

  function getStarCount() {
    const correctCount = Array.from(resolutionMap.values()).filter(value => value === "good").length;

    if (correctCount === inboxMessages.length) return 3;
    if (correctCount === 0) return 0;
    return 1;
  }

  function renderResultStars(stars) {
    if (!starsResultRow) return;

    starsResultRow.innerHTML = "";
    for (let i = 1; i <= 3; i += 1) {
      const img = document.createElement("img");
      img.src = i <= stars ? "./star-filled.png" : "./star-empty.png";
      img.alt = i <= stars ? "Filled star" : "Empty star";
      img.className = "star-result-icon";
      starsResultRow.appendChild(img);
    }
  }

  function showFinalResult() {
    const stars = getStarCount();
    renderResultStars(stars);

    if (starsResultText) {
      if (stars === 3) {
        starsResultText.textContent = "Excellent job. You chose the safest action on all 4 inbox emails and earned 3 stars.";
      } else if (stars === 0) {
        starsResultText.textContent = "Mission failed. All 4 inbox emails were handled unsafely, so you earned 0 stars.";
      } else {
        starsResultText.textContent = "Mission completed. You got a mix of correct and incorrect choices, so you earned 1 star.";
      }
    }

    pauseBackgroundMusic();

    if (stars === 3) {
      playSfx(levelCompleteSfx);
    } else {
      playSfx(levelFailSfx);
    }

    if (starsOverlay) {
      starsOverlay.classList.remove("hidden");
      starsOverlay.setAttribute("aria-hidden", "false");
    }
  }

  function closeCoachOnly() {
    if (window.clearFishCoachCloseHandler) {
      window.clearFishCoachCloseHandler();
    }
    if (window.closeFishCoachCustom) {
      window.closeFishCoachCustom();
    }
  }

  function finalizeInboxMessage(id, status) {
    if (!id || !isInboxMessage(id) || resolutionMap.has(id)) {
      closeCoachOnly();
      return;
    }

    resolutionMap.set(id, status);

    if (status === "good") {
      playSfx(correctAnswerSfx);
    } else {
      playSfx(wrongAnswerSfx);
    }

    closeCoachOnly();
    applyStatusMarks();

    if (allInboxDone()) {
      setTimeout(showFinalResult, 80);
      return;
    }

    chooseNextInboxMessage();
  }

  function markPendingAction(action) {
    const activeMessage = getActiveMessage();
    if (!activeMessage || !isInboxMessage(activeMessage.id) || resolutionMap.has(activeMessage.id)) return;

    if (action === activeMessage.correctAction) {
      pendingMap.set(activeMessage.id, "good-await-proof");
      return;
    }

    if (action === activeMessage.partialAction) {
      pendingMap.set(activeMessage.id, "warn");
      return;
    }

    pendingMap.set(activeMessage.id, "bad");
  }

  function isVerificationApproved() {
    if (!verificationResult) return false;
    return verificationResult.classList.contains("good") || /correct\./i.test(verificationResult.textContent);
  }

  function onCoachContinue(event) {
    const activeMessage = getActiveMessage();
    if (!activeMessage) return;

    const id = activeMessage.id;
    if (!isInboxMessage(id)) {
      event.preventDefault();
      closeCoachOnly();
      return;
    }

    if (resolutionMap.has(id)) {
      event.preventDefault();
      closeCoachOnly();
      chooseNextInboxMessage();
      return;
    }

    const pending = pendingMap.get(id);
    if (!pending) {
      event.preventDefault();
      closeCoachOnly();
      return;
    }

    if (pending === "good-await-proof") {
      if (!isVerificationApproved()) {
        event.preventDefault();
        if (verificationHelp && proofBox && !proofBox.classList.contains("hidden")) {
          verificationHelp.textContent = "Enter the real official domain before you continue.";
        }
        return;
      }

      event.preventDefault();
      pendingMap.set(id, "good");
      finalizeInboxMessage(id, "good");
      return;
    }

    event.preventDefault();
    finalizeInboxMessage(id, pending);
  }

  function bindActionTracking() {
    document.querySelectorAll("[data-action]").forEach(button => {
      button.addEventListener("click", () => {
        markPendingAction(button.dataset.action || "");
      });
    });
  }

  function bindSelectionRefresh() {
    if (!messageList) return;

    messageList.addEventListener("click", () => {
      setTimeout(() => {
        applyStatusMarks();
      }, 0);
    });

    const observer = new MutationObserver(() => {
      applyStatusMarks();
    });

    observer.observe(messageList, {
      childList: true,
      subtree: true
    });
  }

  if (overlay) {
    overlay.addEventListener("fishcoach4:continue", onCoachContinue);
  }

  if (beginMissionBtn) {
    beginMissionBtn.addEventListener("click", startBackgroundMusic);
  }

  if (starsContinueBtn) {
    starsContinueBtn.addEventListener("click", () => {
      window.location.href = "./levelMap.html";
    });
  }

  bindActionTracking();
  bindSelectionRefresh();
  applyStatusMarks();
});