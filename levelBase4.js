document.addEventListener("DOMContentLoaded", () => {
  const data = window.LEVEL4_EMAIL;
  if (!data || !Array.isArray(data.messages) || data.messages.length === 0) {
    console.error("LEVEL4_EMAIL is missing or has no messages.");
    return;
  }

  const scenarioOverlay = document.getElementById("scenarioOverlay");
  const beginMissionBtn = document.getElementById("beginMissionBtn");
  const openDossierBtn = document.getElementById("openDossierBtn");
  const openMiniGameBtn = document.getElementById("openMiniGameBtn");
  const authStatusBadge = document.getElementById("authStatusBadge");
  const authStatusText = document.getElementById("authStatusText");
  const beginMissionNote = document.getElementById("beginMissionNote");

  const scenarioName = document.getElementById("scenarioName");
  const scenarioTitle = document.getElementById("scenarioTitle");
  const scenarioDescription = document.getElementById("scenarioDescription");
  const scenarioProfile = document.getElementById("scenarioProfile");
  const scenarioHabits = document.getElementById("scenarioHabits");
  const scenarioContext = document.getElementById("scenarioContext");
  const scenarioPhotoImg = document.getElementById("scenarioPhotoImg");

  const messageList = document.getElementById("messageList");
  const clueLog = document.getElementById("clueLog");
  const hintList = document.getElementById("hintList");
  const revealHintBtn = document.getElementById("revealHintBtn");
  const decisionFeedback = document.getElementById("decisionFeedback");

  const fromNameEl = document.getElementById("fromName");
  const fromEmailEl = document.getElementById("fromEmail");
  const toEmailEl = document.getElementById("toEmail");
  const emailTimeEl = document.getElementById("emailTime");
  const readingSubjectEl = document.getElementById("readingSubject");
  const senderAvatarEl = document.getElementById("senderAvatar");
  const emailBodyEl = document.getElementById("emailBody");

  const proofBox = document.getElementById("proofBox");
  const verificationPrompt = document.getElementById("verificationPrompt");
  const verificationInput = document.getElementById("verificationInput");
  const verificationHelp = document.getElementById("verificationHelp");
  const verificationResult = document.getElementById("verificationResult");
  const verifySubmitBtn = document.getElementById("verifySubmitBtn");
  const goldenRodStars = ensureGoldenRodStarsContainer();

  const inspectorValues = document.querySelectorAll(".inspector-value");

  const inboxFolder = document.getElementById("inboxFolder");
  const junkFolder = document.getElementById("junkFolder");
  const inboxCount = document.getElementById("inboxCount");
  const junkCount = document.getElementById("junkCount");
  const listTitle = document.getElementById("listTitle");
  const accountEmailLabel = document.getElementById("accountEmailLabel");
  const mailboxInboxCount = document.getElementById("mailboxInboxCount");

  const bgMusic = document.getElementById("bgMusic");
  const levelCompleteSfx = document.getElementById("levelCompleteSfx");
  const levelFailSfx = document.getElementById("levelFailSfx");
  const correctAnswerSfx = document.getElementById("correctAnswerSfx");
  const wrongAnswerSfx = document.getElementById("wrongAnswerSfx");

  const inboxMessages = data.messages.filter((msg) => (msg.folder || "Inbox") === "Inbox");

  const clueSet = new Set();
  const inboxResults = new Map();

  let currentFolder = "Inbox";
  let activeMessage = null;
  let revealedHintCount = 0;
  let retryCount = 0;
  let waitingForProof = false;
  let missionCompleted = false;
  let musicStarted = false;
  let authPassed = false;

  init();

  function init() {
    renderScenario();

    if (accountEmailLabel && data.accountEmail) {
      accountEmailLabel.textContent = data.accountEmail;
    }

    refreshFolderCounts();
    renderFolder("Inbox");
    bindScenarioButtons();
    bindFolderButtons();
    bindActions();
    bindProof();

    updateAuthGate(false);

    window.unlockLevel4Mission = () => {
      updateAuthGate(true);
    };

    window.lockLevel4Mission = () => {
      updateAuthGate(false);
    };
  }

  function ensureGoldenRodStarsContainer() {
    let el = document.getElementById("goldenRodStars");
    if (el) return el;

    if (!proofBox || !verificationPrompt) return null;

    el = document.createElement("div");
    el.id = "goldenRodStars";
    el.className = "golden-rod-stars hidden";
    verificationPrompt.insertAdjacentElement("afterend", el);
    return el;
  }

  function updateAuthGate(unlocked) {
    authPassed = !!unlocked;

    if (authStatusBadge) {
      authStatusBadge.textContent = unlocked ? "Unlocked" : "Locked";
      authStatusBadge.className = `auth-status-badge ${unlocked ? "unlocked" : "locked"}`;
    }

    if (authStatusText) {
      authStatusText.textContent = unlocked
        ? "Authentication complete. Level 4 is unlocked."
        : "Before entering Level 4, complete the logo authentication mini game and get at least 4 out of 5 correct.";
    }

    if (beginMissionBtn) {
      beginMissionBtn.disabled = !unlocked;
    }

    if (beginMissionNote) {
      beginMissionNote.textContent = unlocked
        ? "Authentication cleared. You can start the mission now."
        : "Complete authentication first to unlock this mission.";
    }
  }

  function renderScenario() {
    if (!data.scenario) return;

    if (scenarioName) scenarioName.textContent = data.scenario.codename || "";
    if (scenarioTitle) scenarioTitle.textContent = data.scenario.title || "";
    if (scenarioDescription) scenarioDescription.textContent = data.scenario.description || "";
    if (scenarioContext) scenarioContext.textContent = data.scenario.context || "";

    if (scenarioPhotoImg && data.scenario.photo) {
      scenarioPhotoImg.src = data.scenario.photo;
      scenarioPhotoImg.alt = data.scenario.codename || "Scenario Photo";
    }

    if (scenarioProfile) {
      scenarioProfile.innerHTML = "";
      (data.scenario.profile || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioProfile.appendChild(li);
      });
    }

    if (scenarioHabits) {
      scenarioHabits.innerHTML = "";
      (data.scenario.habits || []).forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioHabits.appendChild(li);
      });
    }
  }

  function bindScenarioButtons() {
    if (beginMissionBtn) {
      beginMissionBtn.type = "button";
      beginMissionBtn.addEventListener("click", () => {
        if (!authPassed) return;
        startBackgroundMusic();
      });
    }

    if (openDossierBtn && scenarioOverlay) {
      openDossierBtn.addEventListener("click", () => {
        scenarioOverlay.style.display = "grid";
        scenarioOverlay.style.opacity = "1";
        scenarioOverlay.setAttribute("aria-hidden", "false");
      });
    }

    if (openMiniGameBtn) {
      openMiniGameBtn.addEventListener("click", () => {
        if (typeof window.startLevel4MiniGame === "function") {
          window.startLevel4MiniGame();
          return;
        }

        if (typeof window.openLevel4MiniGame === "function") {
          window.openLevel4MiniGame();
          return;
        }

        updateAuthGate(true);
      });
    }
  }

  function bindFolderButtons() {
    if (inboxFolder) {
      inboxFolder.addEventListener("click", () => renderFolder("Inbox"));
    }

    if (junkFolder) {
      junkFolder.addEventListener("click", () => renderFolder("Junk Email"));
    }
  }

  function refreshFolderCounts() {
    const junkMessages = data.messages.filter((msg) => (msg.folder || "Inbox") === "Junk Email");

    if (inboxCount) inboxCount.textContent = String(inboxMessages.length);
    if (junkCount) junkCount.textContent = String(junkMessages.length);
    if (mailboxInboxCount) mailboxInboxCount.textContent = String(inboxMessages.length);
  }

  function renderFolder(folderName, preferredMessageId = null) {
    currentFolder = folderName;

    if (listTitle) listTitle.textContent = folderName;
    if (inboxFolder) inboxFolder.classList.toggle("active", folderName === "Inbox");
    if (junkFolder) junkFolder.classList.toggle("active", folderName === "Junk Email");

    const folderMessages = data.messages.filter((msg) => (msg.folder || "Inbox") === folderName);

    if (!folderMessages.length) {
      if (messageList) {
        messageList.innerHTML = `<div class="message-item"><div class="message-preview">No messages in ${escapeHtml(folderName)}.</div></div>`;
      }
      activeMessage = null;
      clearReadingPane();
      return;
    }

    const preferred = preferredMessageId
      ? folderMessages.find((msg) => msg.id === preferredMessageId)
      : null;

    const keepCurrent = activeMessage
      ? folderMessages.find((msg) => msg.id === activeMessage.id)
      : null;

    activeMessage = preferred || keepCurrent || folderMessages[0];

    renderMessageList(folderMessages);
    renderReadingPane(activeMessage);
    resetStateForMessage();
  }

  function renderMessageList(folderMessages) {
    if (!messageList) return;
    messageList.innerHTML = "";

    folderMessages.forEach((msg) => {
      const status = inboxResults.get(msg.id) || "";
      const activeClass = activeMessage && msg.id === activeMessage.id ? " active" : "";
      const resolvedClass = status ? ` resolved-${status}` : "";

      const item = document.createElement("div");
      item.className = `message-item${activeClass}${resolvedClass}`;
      item.dataset.id = msg.id;

      item.innerHTML = `
        <div class="message-sender">${escapeHtml(msg.sender)}</div>
        <div class="message-time">${escapeHtml(shortTime(msg.time))}</div>
        <div class="message-subject">${escapeHtml(msg.previewTop)}</div>
        <div class="message-preview ${msg.external ? "external-preview" : ""}">
          ${escapeHtml(msg.previewBottom)}
        </div>
        ${renderStatusBadge(status)}
      `;

      item.addEventListener("click", () => {
        activeMessage = msg;
        renderMessageList(folderMessages);
        renderReadingPane(msg);
        resetStateForMessage();
      });

      messageList.appendChild(item);
    });
  }

  function renderStatusBadge(status) {
    if (status === "good") {
      return `<div class="message-status-badge result-good">All Good</div>`;
    }
    if (status === "warn") {
      return `<div class="message-status-badge result-warn">Not Good</div>`;
    }
    if (status === "bad") {
      return `<div class="message-status-badge result-bad">Worst</div>`;
    }
    return "";
  }

  function renderReadingPane(msg) {
    if (!msg) return;

    if (readingSubjectEl) readingSubjectEl.textContent = msg.subject || "";
    if (fromNameEl) fromNameEl.textContent = msg.fromName || "";
    if (fromEmailEl) fromEmailEl.textContent = msg.fromEmail || "";
    if (toEmailEl) toEmailEl.textContent = msg.toEmail || "";
    if (emailTimeEl) emailTimeEl.textContent = msg.time || "";
    if (senderAvatarEl) senderAvatarEl.textContent = msg.senderInitials || "??";

    if (inspectorValues.length >= 3) {
      inspectorValues[0].textContent = msg.inspector?.returnPath || "";
      inspectorValues[1].textContent = msg.inspector?.replyTo || "";
      inspectorValues[2].textContent = msg.inspector?.linkPreview || "";
    }

    if (emailBodyEl) {
      emailBodyEl.innerHTML = msg.bodyHtml || "<p>No message body.</p>";
    }
  }

  function clearReadingPane() {
    if (readingSubjectEl) readingSubjectEl.textContent = "No message selected";
    if (fromNameEl) fromNameEl.textContent = "";
    if (fromEmailEl) fromEmailEl.textContent = "";
    if (toEmailEl) toEmailEl.textContent = "";
    if (emailTimeEl) emailTimeEl.textContent = "";
    if (senderAvatarEl) senderAvatarEl.textContent = "--";
    if (emailBodyEl) emailBodyEl.innerHTML = "<p>No message selected.</p>";

    if (inspectorValues.length >= 3) {
      inspectorValues[0].textContent = "";
      inspectorValues[1].textContent = "";
      inspectorValues[2].textContent = "";
    }

    if (hintList) hintList.innerHTML = "";
    clearDecisionFeedback();
    hideProofBox();
  }

  function resetStateForMessage() {
    revealedHintCount = 0;
    retryCount = 0;
    waitingForProof = false;

    clearDecisionFeedback();
    hideProofBox();
    renderHints();

    if (window.setFishCoachCloseHandler) {
      window.setFishCoachCloseHandler(() => {
        if (waitingForProof) return;
        if (window.closeFishCoachCustom) {
          window.closeFishCoachCustom();
        }
      });
    }
  }

  function renderHints() {
    if (!hintList || !revealHintBtn || !activeMessage) return;

    hintList.innerHTML = "";
    const hints = activeMessage.orderedHints || [];

    hints.forEach((hint, index) => {
      const unlocked = index < revealedHintCount;
      const card = document.createElement("div");
      card.className = "hint-card" + (unlocked ? "" : " locked");
      card.innerHTML = `
        <div class="hint-step">Hint ${index + 1}</div>
        <div class="hint-body">${unlocked ? escapeHtml(hint) : "Locked. Reveal this hint if you need more help."}</div>
      `;
      hintList.appendChild(card);
    });

    if (revealedHintCount >= hints.length) {
      revealHintBtn.disabled = true;
      revealHintBtn.textContent = "All hints revealed";
    } else {
      revealHintBtn.disabled = false;
      revealHintBtn.textContent = "Reveal next hint";
    }
  }

  function bindActions() {
    if (revealHintBtn) {
      revealHintBtn.addEventListener("click", () => {
        if (!activeMessage) return;
        const hints = activeMessage.orderedHints || [];
        if (revealedHintCount < hints.length) {
          const nextHint = hints[revealedHintCount];
          revealedHintCount += 1;
          renderHints();
          addClue(`Hint ${revealedHintCount} revealed: ${nextHint}`);
        }
      });
    }

    document.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!activeMessage || missionCompleted) return;
        handleAction(btn.dataset.action);
      });
    });
  }

  function bindProof() {
    if (verifySubmitBtn) {
      verifySubmitBtn.addEventListener("click", submitVerificationAnswer);
    }

    if (verificationInput) {
      verificationInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          submitVerificationAnswer();
        }
      });
    }
  }

  function currentMessageNeedsVerification() {
    return !!(
      activeMessage &&
      activeMessage.verification &&
      activeMessage.verification.prompt &&
      Array.isArray(activeMessage.verification.acceptedAnswers)
    );
  }

  function handleAction(action) {
    if (!activeMessage || missionCompleted) return;

    if ((activeMessage.folder || "Inbox") !== "Inbox") {
      setDecisionFeedback("warn", "Junk Email is only for comparison. Finish the 4 Inbox emails.");
      return;
    }

    if (inboxResults.has(activeMessage.id)) {
      setDecisionFeedback("warn", "This email is already done. Open another Inbox email.");
      return;
    }

    const isCorrect = action === activeMessage.correctAction;
    const isPartial = action === activeMessage.partialAction;

    if (isCorrect) {
      playCorrectAnswerSfx();
      addClue("Best action chosen for this Inbox email.");
      setDecisionFeedback("good", "Correct. That is the safest action here.");

      const needsProof = currentMessageNeedsVerification();
      showCoach("perfect", needsProof);

      if (!needsProof) {
        configureCoachContinue(activeMessage.id, "good");
      }
      return;
    }

    if (isPartial) {
      playWrongAnswerSfx();
      addClue("Not the worst move, but still not the best response.");
      setDecisionFeedback("warn", "Not the best answer. Safer than the worst choice, but still not ideal.");
      showCoach("good", false);
      configureCoachContinue(activeMessage.id, "warn");
      return;
    }

    playWrongAnswerSfx();
    addClue("Worst action chosen. Re-check sender details, urgency, and link preview.");
    setDecisionFeedback("bad", "That was the riskiest action for this email.");
    showCoach("bad", false);
    configureCoachContinue(activeMessage.id, "bad");
  }

  function showCoach(mode, withProof) {
    if (!window.showFishCoachCustom || !activeMessage?.coach?.[mode]) return;

    const coachPayload = activeMessage.coach[mode];
    window.showFishCoachCustom(coachPayload);

    if (withProof) {
      waitingForProof = true;
      showProofBox();
    } else {
      waitingForProof = false;
      hideProofBox();
    }
  }

  function configureCoachContinue(messageId, outcome) {
    if (!window.setFishCoachCloseHandler) return;

    window.setFishCoachCloseHandler(() => {
      if (waitingForProof) return;

      if (window.closeFishCoachCustom) {
        window.closeFishCoachCustom();
      }

      finalizeInboxMessage(messageId, outcome);
    });
  }

  function finalizeInboxMessage(messageId, outcome) {
    if (missionCompleted || inboxResults.has(messageId)) return;

    inboxResults.set(messageId, outcome);

    if (allInboxMessagesResolved()) {
      renderFolder("Inbox", messageId);
      showMissionResult();
      return;
    }

    const nextMessage = getNextUnresolvedInboxMessage();
    renderFolder("Inbox", nextMessage ? nextMessage.id : messageId);
  }

  function allInboxMessagesResolved() {
    return inboxMessages.every((msg) => inboxResults.has(msg.id));
  }

  function getNextUnresolvedInboxMessage() {
    return inboxMessages.find((msg) => !inboxResults.has(msg.id)) || null;
  }

  function getMissionStars() {
    const outcomes = inboxMessages.map((msg) => inboxResults.get(msg.id));
    const allGood = outcomes.every((x) => x === "good");
    const allBad = outcomes.every((x) => x === "bad");

    if (allGood) return 3;
    if (allBad) return 0;
    return 1;
  }

  function showMissionResult() {
    missionCompleted = true;
    waitingForProof = false;

    pauseBackgroundMusic();
    hideProofBox();

    const stars = getMissionStars();

    if (stars === 3) {
      playLevelCompleteSfx();
    } else {
      playLevelFailSfx();
    }

    if (window.closeFishCoachCustom) {
      window.closeFishCoachCustom();
    }

    if (window.showFishCoachCustom) {
      window.showFishCoachCustom({
        title: "Mission Result",
        bubble: " ",
        lessons: []
      });
    }

    setTimeout(() => {
      if (proofBox) {
        proofBox.classList.remove("hidden");
        proofBox.classList.add("level-result-box");
      }

      if (verificationPrompt) {
        verificationPrompt.textContent = stars === 3 ? "Excellent job." : stars === 0 ? "Mission failed." : "Mission complete.";
      }

      renderGoldenRodStars(stars);

      if (verificationInput) {
        verificationInput.style.display = "none";
        verificationInput.value = "";
      }

      if (verificationHelp) {
        verificationHelp.textContent = "";
      }

      if (verifySubmitBtn) {
        verifySubmitBtn.style.display = "none";
      }

      if (verificationResult) {
        if (stars === 3) {
          verificationResult.textContent = "You chose the safest action and earned 3 stars.";
        } else if (stars === 0) {
          verificationResult.textContent = "You chose the worst action on all scored emails and earned 0 stars.";
        } else {
          verificationResult.textContent = "You finished the mission and earned 1 star.";
        }
        verificationResult.className = "proof-result";
      }

      if (window.setFishCoachCloseHandler) {
        window.setFishCoachCloseHandler(() => {
          window.location.href = "./levelMap.html";
        });
      }
    }, 40);
  }

  function renderGoldenRodStars(score) {
    if (!goldenRodStars) return;

    goldenRodStars.innerHTML = "";
    goldenRodStars.classList.remove("hidden");

    for (let i = 1; i <= 3; i += 1) {
      const star = document.createElement("img");
      star.src = i <= score ? "./star-filled.png" : "./star-empty.png";
      star.alt = i <= score ? "Filled star" : "Empty star";
      star.className = "golden-rod-star-icon";
      goldenRodStars.appendChild(star);
    }
  }

  function showProofBox() {
    if (!proofBox || !activeMessage?.verification) return;

    proofBox.classList.remove("hidden");
    proofBox.classList.remove("level-result-box");

    if (goldenRodStars) {
      goldenRodStars.classList.add("hidden");
      goldenRodStars.innerHTML = "";
    }

    if (verificationPrompt) {
      verificationPrompt.textContent = activeMessage.verification.prompt || "";
    }

    if (verificationInput) {
      verificationInput.style.display = "block";
      verificationInput.value = "";
    }

    if (verificationHelp) {
      verificationHelp.textContent = "Type the real official domain only.";
    }

    if (verifySubmitBtn) {
      verifySubmitBtn.style.display = "inline-flex";
    }

    if (verificationResult) {
      verificationResult.textContent = "";
      verificationResult.className = "proof-result";
    }

    setTimeout(() => {
      if (verificationInput) verificationInput.focus();
    }, 60);
  }

  function hideProofBox() {
    if (proofBox) {
      proofBox.classList.add("hidden");
      proofBox.classList.remove("level-result-box");
    }

    if (goldenRodStars) {
      goldenRodStars.classList.add("hidden");
      goldenRodStars.innerHTML = "";
    }

    if (verificationInput) {
      verificationInput.style.display = "block";
    }

    if (verifySubmitBtn) {
      verifySubmitBtn.style.display = "inline-flex";
    }

    waitingForProof = false;
  }

  function submitVerificationAnswer() {
    if (!activeMessage?.verification) return;

    const raw = verificationInput ? verificationInput.value : "";
    const answer = normalizeAnswer(raw);
    const accepted = (activeMessage.verification.acceptedAnswers || []).map(normalizeAnswer);

    if (accepted.includes(answer)) {
      if (verificationResult) {
        verificationResult.textContent = "Correct. Use the official site manually instead of the email link.";
        verificationResult.className = "proof-result good";
      }

      if (verificationHelp) {
        verificationHelp.textContent = "Nice work. Click Continue to move to the next Inbox email.";
      }

      addClue("Player correctly identified the official domain to visit manually.");
      waitingForProof = false;
      setDecisionFeedback("good", "Excellent. You chose the safest action and identified the correct official website.");

      configureCoachContinue(activeMessage.id, "good");
      return;
    }

    const guidanceList = activeMessage.verification.retryGuidance || [];
    const guidance = guidanceList[Math.min(retryCount, Math.max(guidanceList.length - 1, 0))] || "Try again.";
    retryCount += 1;

    if (verificationResult) {
      verificationResult.textContent = "Not correct yet. Try again.";
      verificationResult.className = "proof-result bad";
    }

    if (verificationHelp) {
      verificationHelp.textContent = guidance;
    }

    if (verificationInput) {
      verificationInput.focus();
      verificationInput.select();
    }
  }

  function setDecisionFeedback(type, text) {
    if (!decisionFeedback) return;
    decisionFeedback.className = `decision-feedback ${type}`;
    decisionFeedback.textContent = text;
    decisionFeedback.classList.remove("hidden");
  }

  function clearDecisionFeedback() {
    if (!decisionFeedback) return;
    decisionFeedback.textContent = "";
    decisionFeedback.className = "decision-feedback hidden";
  }

  function addClue(text) {
    if (!clueLog || clueSet.has(text)) return;

    clueSet.add(text);

    const empty = clueLog.querySelector(".clue-empty");
    if (empty) {
      clueLog.innerHTML = "";
    }

    const chip = document.createElement("div");
    chip.className = "clue-chip";
    chip.textContent = text;
    clueLog.appendChild(chip);
  }

  function startBackgroundMusic() {
    if (!bgMusic || musicStarted) return;

    bgMusic.volume = 0.35;
    bgMusic.loop = true;

    bgMusic.play().then(() => {
      musicStarted = true;
    }).catch(() => {});
  }

  function pauseBackgroundMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
  }

  function playLevelCompleteSfx() {
    if (!levelCompleteSfx) return;
    levelCompleteSfx.pause();
    levelCompleteSfx.currentTime = 0;
    levelCompleteSfx.play().catch(() => {});
  }

  function playLevelFailSfx() {
    if (!levelFailSfx) return;
    levelFailSfx.pause();
    levelFailSfx.currentTime = 0;
    levelFailSfx.play().catch(() => {});
  }

  function playCorrectAnswerSfx() {
    if (!correctAnswerSfx) return;
    correctAnswerSfx.pause();
    correctAnswerSfx.currentTime = 0;
    correctAnswerSfx.play().catch(() => {});
  }

  function playWrongAnswerSfx() {
    if (!wrongAnswerSfx) return;
    wrongAnswerSfx.pause();
    wrongAnswerSfx.currentTime = 0;
    wrongAnswerSfx.play().catch(() => {});
  }

  function shortTime(fullTime) {
    const parts = String(fullTime).split(" ");
    return parts.slice(-2).join(" ");
  }

  function normalizeAnswer(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "www.")
      .replace(/\/+$/, "");
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
});
