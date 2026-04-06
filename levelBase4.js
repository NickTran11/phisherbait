document.addEventListener("DOMContentLoaded", () => {
  const data = window.LEVEL4_EMAIL;
  if (!data || !Array.isArray(data.messages) || data.messages.length === 0) {
    console.error("LEVEL4_EMAIL is missing or has no messages.");
    return;
  }

  const scenarioOverlay = document.getElementById("scenarioOverlay");
  const beginMissionBtn = document.getElementById("beginMissionBtn");
  const openDossierBtn = document.getElementById("openDossierBtn");

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

  const starsOverlay = document.getElementById("starsOverlay");
  const starsRow = document.getElementById("starsRow");
  const starsText = document.getElementById("starsText");
  const starsContinueBtn = document.getElementById("starsContinueBtn");

  const bgMusic = document.getElementById("bgMusic");
  const levelCompleteSfx = document.getElementById("levelCompleteSfx");
  const levelFailSfx = document.getElementById("levelFailSfx");
  const correctAnswerSfx = document.getElementById("correctAnswerSfx");
  const wrongAnswerSfx = document.getElementById("wrongAnswerSfx");

  const inspectorValues = document.querySelectorAll(".inspector-value");

  const inboxFolder = document.getElementById("inboxFolder");
  const junkFolder = document.getElementById("junkFolder");
  const inboxCount = document.getElementById("inboxCount");
  const junkCount = document.getElementById("junkCount");
  const listTitle = document.getElementById("listTitle");
  const accountEmailLabel = document.getElementById("accountEmailLabel");
  const mailboxInboxCount = document.getElementById("mailboxInboxCount");

  const brandChallengeOverlay = document.getElementById("brandChallengeOverlay");
  const brandChallengeProgress = document.getElementById("brandChallengeProgress");
  const brandChallengeScore = document.getElementById("brandChallengeScore");
  const brandChallengePrompt = document.getElementById("brandChallengePrompt");
  const brandChallengeChoices = document.getElementById("brandChallengeChoices");
  const brandChallengeFeedback = document.getElementById("brandChallengeFeedback");
  const brandChallengeContinueBtn = document.getElementById("brandChallengeContinueBtn");
  const brandChallengeRestartBtn = document.getElementById("brandChallengeRestartBtn");
  const brandChallengeUnlockBtn = document.getElementById("brandChallengeUnlockBtn");

  const clueSet = new Set();
  let currentFolder = "Inbox";
  let activeMessage = null;
  let revealedHintCount = 0;
  let retryCount = 0;
  let waitingForProof = false;

  let challengeRoundIndex = 0;
  let challengeScoreValue = 0;
  let challengeLocked = false;
  let brandChallengePassed = false;

  const inboxMissionMessages = data.messages.filter(msg => (msg.folder || "Inbox") === "Inbox");
  const scoredMessageIds = new Set();
  const messageRatings = new Map();

  let musicStarted = false;
  const musicVolume = 0.35;

  const BRAND_CHALLENGE_ROUNDS = [
    {
      company: "Microsoft",
      prompt: "Choose the official Microsoft brand card.",
      explanation: "The real Microsoft mark keeps the correct spelling and the clean four-square window.",
      options: [
        { displayName: "Microsoft", logoType: "microsoft", domain: "microsoft.com", isReal: true },
        { displayName: "Micr0soft", logoType: "microsoft-fake-zero", domain: "micr0soft-login.com", isReal: false },
        { displayName: "Microsofft", logoType: "microsoft-fake-double", domain: "microsoft-secure-check.co", isReal: false }
      ]
    },
    {
      company: "PayPal",
      prompt: "Pick the real PayPal sign-in brand.",
      explanation: "Clone phishing often swaps a lowercase l with an uppercase I, like PayPaI.",
      options: [
        { displayName: "PayPal", logoType: "paypal", domain: "paypal.com", isReal: true },
        { displayName: "PayPaI", logoType: "paypal-fake-i", domain: "paypaI-security.net", isReal: false },
        { displayName: "PayPal Secure", logoType: "paypal-fake-secure", domain: "paypal-alerts-pay.com", isReal: false }
      ]
    },
    {
      company: "Google",
      prompt: "Which card matches the official Google look?",
      explanation: "A fake can keep similar colors but still change the spelling or add a suspicious support domain.",
      options: [
        { displayName: "Google", logoType: "google", domain: "google.com", isReal: true },
        { displayName: "Go0gle", logoType: "google-fake-zero", domain: "go0gle-support.org", isReal: false },
        { displayName: "Goggle", logoType: "google-fake-goggle", domain: "goggle-accounts.net", isReal: false }
      ]
    },
    {
      company: "Netflix",
      prompt: "Select the official Netflix identity.",
      explanation: "Fake landing pages often keep the red theme but hide a letter swap like NetfIix.",
      options: [
        { displayName: "Netflix", logoType: "netflix", domain: "netflix.com", isReal: true },
        { displayName: "NetfIix", logoType: "netflix-fake-i", domain: "netfIix-billing.help", isReal: false },
        { displayName: "Neflix", logoType: "netflix-fake-neflix", domain: "neflix-reset.co", isReal: false }
      ]
    },
    {
      company: "Adobe",
      prompt: "Choose the real Adobe brand card.",
      explanation: "Attackers often keep the same red box but change one letter or add a fake creative portal.",
      options: [
        { displayName: "Adobe", logoType: "adobe", domain: "adobe.com", isReal: true },
        { displayName: "Ad0be", logoType: "adobe-fake-zero", domain: "ad0be-cloud-login.com", isReal: false },
        { displayName: "Abode Creative", logoType: "adobe-fake-abode", domain: "abode-creative-suite.net", isReal: false }
      ]
    }
  ];

  init();

  function init() {
    renderScenario();

    if (accountEmailLabel && data.accountEmail) {
      accountEmailLabel.textContent = data.accountEmail;
    }

    bindScenarioButtons();
    bindFolderButtons();
    bindActions();
    bindProof();
    bindBrandChallenge();
    bindMissionResultOverlay();
    bindGlobalMusicStart();

    refreshFolderCounts();
    renderFolder("Inbox");
    lockMissionUntilMiniGameStarts();
  }

  function lockMissionUntilMiniGameStarts() {
    brandChallengePassed = false;
    if (brandChallengeOverlay) {
      brandChallengeOverlay.classList.add("hidden");
      brandChallengeOverlay.setAttribute("aria-hidden", "true");
    }
  }

  function bindMissionResultOverlay() {
    if (starsContinueBtn) {
      starsContinueBtn.addEventListener("click", () => {
        window.location.href = "./levelMap.html";
      });
    }
  }

  function bindGlobalMusicStart() {
    document.addEventListener("pointerdown", startBackgroundMusic, { once: true });
  }

  function isInboxMessage(msg) {
    return !!msg && (msg.folder || "Inbox") === "Inbox";
  }

  function isMessageResolved(messageId) {
    return scoredMessageIds.has(messageId);
  }

  function getMessageRating(messageId) {
    return messageRatings.get(messageId) || "";
  }

  function getRatingLabel(rating) {
    if (rating === "good") return "All Good";
    if (rating === "warn") return "Not good";
    if (rating === "bad") return "Worst";
    return "";
  }

  function allInboxMessagesResolved() {
    return scoredMessageIds.size === inboxMissionMessages.length;
  }

  function getNextUnresolvedInboxMessage(excludeId = "") {
    return inboxMissionMessages.find(msg => !scoredMessageIds.has(msg.id) && msg.id !== excludeId) || null;
  }

  function updateActionAvailability() {
    const disableActions = !activeMessage || (isInboxMessage(activeMessage) && isMessageResolved(activeMessage.id));
    document.querySelectorAll("[data-action]").forEach(btn => {
      btn.disabled = disableActions;
    });
  }

  function startBackgroundMusic() {
    if (!bgMusic || musicStarted) return;

    bgMusic.volume = musicVolume;
    bgMusic.loop = true;

    bgMusic.play().then(() => {
      musicStarted = true;
    }).catch(() => {
      // Browser autoplay policies may require another interaction.
    });
  }

  function stopBackgroundMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
  }

  function playSound(audioEl) {
    if (!audioEl) return;
    audioEl.pause();
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  }

  function playCorrectAnswerSfx() {
    playSound(correctAnswerSfx);
  }

  function playWrongAnswerSfx() {
    playSound(wrongAnswerSfx);
  }

  function playLevelCompleteSfx() {
    playSound(levelCompleteSfx);
  }

  function playLevelFailSfx() {
    playSound(levelFailSfx);
  }

  function setCoachContinueHandler(message, resultType, requiresProof) {
    if (!window.setFishCoachCloseHandler) return;

    const messageId = message?.id || "";
    const shouldFinalize = isInboxMessage(message);

    window.setFishCoachCloseHandler(() => {
      if (requiresProof && waitingForProof) {
        if (verificationHelp) {
          verificationHelp.textContent = "Finish the proof of understanding first.";
        }
        if (verificationInput) {
          verificationInput.focus();
          verificationInput.select();
        }
        return;
      }

      if (window.closeFishCoachCustom) {
        window.closeFishCoachCustom();
      }

      if (shouldFinalize && messageId && resultType && !isMessageResolved(messageId)) {
        finalizeInboxMessage(messageId, resultType);
      }
    });
  }

  function finalizeInboxMessage(messageId, resultType) {
    if (!messageId || isMessageResolved(messageId)) return;

    scoredMessageIds.add(messageId);
    messageRatings.set(messageId, resultType);

    const nextInboxMessage = getNextUnresolvedInboxMessage(messageId);
    renderFolder("Inbox", nextInboxMessage ? nextInboxMessage.id : messageId);

    if (allInboxMessagesResolved()) {
      setTimeout(() => {
        showMissionResult();
      }, 120);
    }
  }

  function getMissionStarCount() {
    const ratings = inboxMissionMessages.map(msg => getMessageRating(msg.id));

    const allGood = ratings.length === inboxMissionMessages.length && ratings.every(rating => rating === "good");
    const allBad = ratings.length === inboxMissionMessages.length && ratings.every(rating => rating === "bad");

    if (allGood) return 3;
    if (allBad) return 0;
    return 1;
  }

  function renderMissionStars(score) {
    if (!starsRow) return;

    starsRow.innerHTML = "";

    for (let i = 1; i <= 3; i += 1) {
      const star = document.createElement("img");
      star.src = i <= score ? "./star-filled.png" : "./star-empty.png";
      star.alt = i <= score ? "Filled star" : "Empty star";
      star.className = "star-result-icon";
      starsRow.appendChild(star);
    }
  }

  function showMissionResult() {
    if (!starsOverlay) return;

    const starCount = getMissionStarCount();

    hideProofBox();
    if (window.closeFishCoachCustom) {
      window.closeFishCoachCustom();
    }

    stopBackgroundMusic();

    if (starCount === 0) {
      playLevelFailSfx();
    } else {
      playLevelCompleteSfx();
    }

    renderMissionStars(starCount);

    if (starsText) {
      if (starCount === 3) {
        starsText.textContent = "Excellent job. You chose the safest action and earned 3 stars.";
      } else if (starCount === 0) {
        starsText.textContent = "Mission failed. Every inbox email was handled with the riskiest action, so you earned 0 stars.";
      } else {
        starsText.textContent = "You completed the mission and earned 1 star. Slow down and verify more carefully next time.";
      }
    }

    starsOverlay.classList.remove("hidden");
    starsOverlay.setAttribute("aria-hidden", "false");
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
      (data.scenario.profile || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        scenarioProfile.appendChild(li);
      });
    }

    if (scenarioHabits) {
      scenarioHabits.innerHTML = "";
      (data.scenario.habits || []).forEach(item => {
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
    const inboxMessages = data.messages.filter(msg => (msg.folder || "Inbox") === "Inbox");
    const junkMessages = data.messages.filter(msg => (msg.folder || "Inbox") === "Junk Email");

    if (inboxCount) inboxCount.textContent = String(inboxMessages.length);
    if (junkCount) junkCount.textContent = String(junkMessages.length);
    if (mailboxInboxCount) mailboxInboxCount.textContent = String(inboxMessages.length);
  }

  function renderFolder(folderName, preferredMessageId = "") {
    currentFolder = folderName;
    if (listTitle) listTitle.textContent = folderName;

    if (inboxFolder) inboxFolder.classList.toggle("active", folderName === "Inbox");
    if (junkFolder) junkFolder.classList.toggle("active", folderName === "Junk Email");

    const folderMessages = data.messages.filter(msg => (msg.folder || "Inbox") === folderName);

    if (!folderMessages.length) {
      messageList.innerHTML = `<div class="message-item"><div class="message-preview">No messages in ${escapeHtml(folderName)}.</div></div>`;
      activeMessage = null;
      clearReadingPane();
      updateActionAvailability();
      return;
    }

    const preferredMessage = preferredMessageId
      ? folderMessages.find(msg => msg.id === preferredMessageId) || null
      : null;

    const firstUnresolvedInboxMessage = folderName === "Inbox"
      ? folderMessages.find(msg => !isMessageResolved(msg.id)) || null
      : null;

    const currentFolderActiveMessage = activeMessage
      ? folderMessages.find(msg => msg.id === activeMessage.id) || null
      : null;

    activeMessage =
      preferredMessage ||
      firstUnresolvedInboxMessage ||
      currentFolderActiveMessage ||
      folderMessages[0];

    renderMessageList(folderMessages);
    renderReadingPane(activeMessage);
    resetStateForMessage();
  }

  function renderMessageList(folderMessages) {
    if (!messageList) return;
    messageList.innerHTML = "";

    folderMessages.forEach(msg => {
      const isActive = !!activeMessage && activeMessage.id === msg.id;
      const rating = getMessageRating(msg.id);
      const ratingLabel = getRatingLabel(rating);

      const item = document.createElement("div");
      item.className = "message-item"
        + (isActive ? " active" : "")
        + (rating ? ` resolved-${rating}` : "")
        + (rating ? " resolved" : "");
      item.dataset.id = msg.id;

      item.innerHTML = `
        <div class="message-sender-row">
          <div class="message-sender">${escapeHtml(msg.sender)}</div>
          ${ratingLabel ? `<span class="message-status-badge ${rating}">${escapeHtml(ratingLabel)}</span>` : ""}
        </div>
        <div class="message-time">${escapeHtml(shortTime(msg.time))}</div>
        <div class="message-subject">${escapeHtml(msg.previewTop)}</div>
        <div class="message-preview ${msg.external ? "external-preview" : ""}">
          ${escapeHtml(msg.previewBottom)}
        </div>
      `;

      item.addEventListener("click", () => {
        document.querySelectorAll(".message-item").forEach(el => el.classList.remove("active"));
        item.classList.add("active");
        activeMessage = msg;
        renderReadingPane(msg);
        resetStateForMessage();
      });

      messageList.appendChild(item);
    });
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

    if (window.closeFishCoachCustom) window.closeFishCoachCustom();
    renderHints();
    updateActionAvailability();
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
        <div class="hint-body">
          ${unlocked ? escapeHtml(hint) : "Locked. Reveal this hint if you need more help."}
        </div>
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

        if (revealedHintCount < activeMessage.orderedHints.length) {
          const nextHint = activeMessage.orderedHints[revealedHintCount];
          revealedHintCount += 1;
          renderHints();
          addClue(`Hint ${revealedHintCount} revealed: ${nextHint}`);
        }
      });
    }

    document.querySelectorAll("[data-action]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!activeMessage) return;
        startBackgroundMusic();
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
        if (e.key === "Enter") submitVerificationAnswer();
      });
    }
  }

  function handleAction(action) {
    if (!activeMessage) return;

    if (isInboxMessage(activeMessage) && isMessageResolved(activeMessage.id)) {
      setDecisionFeedback("warn", "This inbox email is already marked.");
      return;
    }

    const isCorrect = action === activeMessage.correctAction;
    const isPartial = action === activeMessage.partialAction;
    const resultType = isCorrect ? "good" : isPartial ? "warn" : "bad";

    if (isCorrect) {
      playCorrectAnswerSfx();
      addClue("Correct action chosen.");
      setDecisionFeedback("good", "Correct. That is the best action here.");
      showCoach("perfect", true, resultType);
      return;
    }

    if (isPartial) {
      playWrongAnswerSfx();
      addClue("Partial credit: safer than clicking, but not the best answer.");
      setDecisionFeedback("warn", "Safer than clicking, but not the best answer for this scenario.");
      showCoach("good", false, resultType);
      return;
    }

    playWrongAnswerSfx();
    addClue("Incorrect action chosen. Re-check sender details, urgency language, and the previewed link.");
    setDecisionFeedback("bad", "That action is risky. Reveal another hint and try again.");
    showCoach("bad", false, resultType);
  }

  function showCoach(mode, withProof, resultType) {
    if (!window.showFishCoachCustom) return;

    const coachPayload = activeMessage.coach?.[mode];
    if (!coachPayload) return;

    window.showFishCoachCustom(coachPayload);

    if (withProof) {
      waitingForProof = true;
      showProofBox();
    } else {
      waitingForProof = false;
      hideProofBox();
    }

    setCoachContinueHandler(activeMessage, resultType, withProof);
  }

  function showProofBox() {
    if (!proofBox || !activeMessage?.verification) return;

    proofBox.classList.remove("hidden");

    if (verificationPrompt) verificationPrompt.textContent = activeMessage.verification.prompt || "";
    if (verificationInput) verificationInput.value = "";
    if (verificationHelp) verificationHelp.textContent = "Type the real official domain only.";

    if (verificationResult) {
      verificationResult.textContent = "";
      verificationResult.className = "proof-result";
    }

    setTimeout(() => {
      if (verificationInput) verificationInput.focus();
    }, 50);
  }

  function hideProofBox() {
    if (proofBox) proofBox.classList.add("hidden");
    waitingForProof = false;
  }

  function submitVerificationAnswer() {
    if (!activeMessage?.verification) return;

    startBackgroundMusic();

    const raw = verificationInput ? verificationInput.value : "";
    const answer = normalizeAnswer(raw);
    const accepted = (activeMessage.verification.acceptedAnswers || []).map(normalizeAnswer);

    if (accepted.includes(answer)) {
      if (verificationResult) {
        verificationResult.textContent = "Correct. Use the official site manually instead of the email link.";
        verificationResult.className = "proof-result good";
      }

      if (verificationHelp) {
        verificationHelp.textContent = "Correct. Press Continue to mark this email.";
      }

      addClue("Player correctly identified the official domain to visit manually.");
      waitingForProof = false;
      setDecisionFeedback("good", "Excellent. You chose the safest action and identified the correct official website.");
      return;
    }

    playWrongAnswerSfx();

    const guidanceList = activeMessage.verification.retryGuidance || [];
    const guidance = guidanceList[Math.min(retryCount, guidanceList.length - 1)] || "Try again.";
    retryCount += 1;

    if (verificationResult) {
      verificationResult.textContent = "Not correct yet. Try again.";
      verificationResult.className = "proof-result bad";
    }

    if (verificationHelp) verificationHelp.textContent = guidance;

    if (verificationInput) {
      verificationInput.focus();
      verificationInput.select();
    }
  }

  function bindBrandChallenge() {
    if (brandChallengeContinueBtn) {
      brandChallengeContinueBtn.addEventListener("click", () => {
        if (challengeLocked) return;
        goToNextBrandRound();
      });
    }

    if (brandChallengeRestartBtn) {
      brandChallengeRestartBtn.addEventListener("click", () => {
        restartBrandChallenge();
      });
    }

    if (brandChallengeUnlockBtn) {
      brandChallengeUnlockBtn.addEventListener("click", () => {
        hideBrandChallenge();
      });
    }

    window.startLevel4MiniGame = startLevel4MiniGame;
  }

  function startLevel4MiniGame() {
    hideScenarioOverlay();
    restartBrandChallenge();
  }

  function restartBrandChallenge() {
    challengeRoundIndex = 0;
    challengeScoreValue = 0;
    brandChallengePassed = false;
    challengeLocked = false;

    if (brandChallengeOverlay) {
      brandChallengeOverlay.classList.remove("hidden");
      brandChallengeOverlay.setAttribute("aria-hidden", "false");
    }

    renderBrandRound();
  }

  function hideScenarioOverlay() {
    if (!scenarioOverlay) return;

    scenarioOverlay.style.opacity = "0";
    scenarioOverlay.style.transition = "opacity 0.25s ease";

    setTimeout(() => {
      scenarioOverlay.style.display = "none";
      scenarioOverlay.setAttribute("aria-hidden", "true");
    }, 250);
  }

  function hideBrandChallenge() {
    brandChallengePassed = true;

    if (brandChallengeOverlay) {
      brandChallengeOverlay.classList.add("hidden");
      brandChallengeOverlay.setAttribute("aria-hidden", "true");
    }

    addClue("Mini game cleared: player recognized official brand identities before opening Level 4 email.");
    clearDecisionFeedback();
  }

  function renderBrandRound() {
    const round = BRAND_CHALLENGE_ROUNDS[challengeRoundIndex];
    if (!round || !brandChallengeChoices) return;

    challengeLocked = false;

    if (brandChallengeProgress) {
      brandChallengeProgress.textContent = `Round ${challengeRoundIndex + 1} / ${BRAND_CHALLENGE_ROUNDS.length}`;
    }

    if (brandChallengeScore) {
      brandChallengeScore.textContent = `Score: ${challengeScoreValue}`;
    }

    if (brandChallengePrompt) {
      brandChallengePrompt.textContent = round.prompt;
    }

    if (brandChallengeFeedback) {
      brandChallengeFeedback.textContent = "";
      brandChallengeFeedback.className = "brand-challenge-feedback hidden";
    }

    if (brandChallengeContinueBtn) brandChallengeContinueBtn.classList.add("hidden");
    if (brandChallengeRestartBtn) brandChallengeRestartBtn.classList.add("hidden");
    if (brandChallengeUnlockBtn) brandChallengeUnlockBtn.classList.add("hidden");

    brandChallengeChoices.innerHTML = "";

    round.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "brand-option-card";
      button.dataset.index = String(index);

      button.innerHTML = `
        <div class="brand-logo-shell ${escapeHtml(option.logoType)}">
          ${createBrandVisual(option)}
        </div>
        <div class="brand-option-name">${escapeHtml(option.displayName)}</div>
        <div class="brand-option-domain">${escapeHtml(option.domain)}</div>
      `;

      button.addEventListener("click", () => {
        chooseBrandOption(index);
      });

      brandChallengeChoices.appendChild(button);
    });
  }

  function chooseBrandOption(optionIndex) {
    if (challengeLocked) return;

    const round = BRAND_CHALLENGE_ROUNDS[challengeRoundIndex];
    if (!round) return;

    challengeLocked = true;
    const selected = round.options[optionIndex];
    const allButtons = Array.from(document.querySelectorAll(".brand-option-card"));

    allButtons.forEach((button, idx) => {
      const option = round.options[idx];
      button.disabled = true;

      if (option.isReal) {
        button.classList.add("correct");
      }

      if (idx === optionIndex && !selected.isReal) {
        button.classList.add("wrong");
      }
    });

    if (selected.isReal) {
      challengeScoreValue += 1;
      if (brandChallengeScore) {
        brandChallengeScore.textContent = `Score: ${challengeScoreValue}`;
      }

      if (brandChallengeFeedback) {
        brandChallengeFeedback.textContent = `Correct. ${round.explanation}`;
        brandChallengeFeedback.className = "brand-challenge-feedback good";
      }
    } else {
      if (brandChallengeFeedback) {
        brandChallengeFeedback.textContent = `Not quite. ${round.explanation}`;
        brandChallengeFeedback.className = "brand-challenge-feedback bad";
      }
    }

    const isLastRound = challengeRoundIndex === BRAND_CHALLENGE_ROUNDS.length - 1;

    if (isLastRound) {
      showBrandChallengeFinalState();
    } else if (brandChallengeContinueBtn) {
      brandChallengeContinueBtn.classList.remove("hidden");
      brandChallengeContinueBtn.textContent = "Next round";
    }
  }

  function goToNextBrandRound() {
    challengeRoundIndex += 1;
    renderBrandRound();
  }

  function showBrandChallengeFinalState() {
    const passed = challengeScoreValue >= 4;

    if (!brandChallengeFeedback) return;

    if (passed) {
      brandChallengeFeedback.textContent = `Passed. You scored ${challengeScoreValue} / ${BRAND_CHALLENGE_ROUNDS.length}. Level 4 email investigation is now unlocked.`;
      brandChallengeFeedback.className = "brand-challenge-feedback good";
      if (brandChallengeUnlockBtn) brandChallengeUnlockBtn.classList.remove("hidden");
      addClue(`Mini game passed with ${challengeScoreValue} / ${BRAND_CHALLENGE_ROUNDS.length}.`);
      return;
    }

    brandChallengeFeedback.textContent = `You scored ${challengeScoreValue} / ${BRAND_CHALLENGE_ROUNDS.length}. You need at least 4 / 5 to unlock Level 4, so try again and watch for tiny spelling swaps.`;
    brandChallengeFeedback.className = "brand-challenge-feedback bad";

    if (brandChallengeRestartBtn) brandChallengeRestartBtn.classList.remove("hidden");
    addClue(`Mini game attempt finished below the pass mark: ${challengeScoreValue} / ${BRAND_CHALLENGE_ROUNDS.length}.`);
  }

  function createBrandVisual(option) {
    switch (option.logoType) {
      case "microsoft":
      case "microsoft-fake-zero":
      case "microsoft-fake-double":
        return `
          <div class="brand-visual brand-visual-microsoft">
            <span></span><span></span><span></span><span></span>
          </div>
        `;

      case "paypal":
      case "paypal-fake-i":
      case "paypal-fake-secure":
        return `
          <div class="brand-visual brand-visual-paypal">
            <span class="brand-letter back">P</span>
            <span class="brand-letter front">P</span>
          </div>
        `;

      case "google":
      case "google-fake-zero":
      case "google-fake-goggle":
        return `
          <div class="brand-visual brand-visual-google">G</div>
        `;

      case "netflix":
      case "netflix-fake-i":
      case "netflix-fake-neflix":
        return `
          <div class="brand-visual brand-visual-netflix">N</div>
        `;

      case "adobe":
      case "adobe-fake-zero":
      case "adobe-fake-abode":
        return `
          <div class="brand-visual brand-visual-adobe">
            <span class="adobe-left"></span>
            <span class="adobe-right"></span>
          </div>
        `;

      default:
        return `<div class="brand-visual brand-visual-generic">${escapeHtml(option.displayName.charAt(0) || "?")}</div>`;
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
    if (empty) clueLog.innerHTML = "";

    const chip = document.createElement("div");
    chip.className = "clue-chip";
    chip.textContent = text;
    clueLog.appendChild(chip);
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
