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
  const goldenRodStars = document.getElementById("goldenRodStars");

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
  let brandChallengePassed = false;

  let challengeRoundIndex = 0;
  let challengeScoreValue = 0;
  let challengeLocked = false;

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

    refreshFolderCounts();
    updateAuthGate(false);
    bindScenarioButtons();
    bindFolderButtons();
    bindActions();
    bindProof();
    bindBrandChallenge();
    renderFolder("Inbox");
  }

  function updateAuthGate(isUnlocked) {
    brandChallengePassed = isUnlocked;

    if (authStatusBadge) {
      authStatusBadge.textContent = isUnlocked ? "Unlocked" : "Locked";
      authStatusBadge.className = `auth-status-badge ${isUnlocked ? "unlocked" : "locked"}`;
    }

    if (authStatusText) {
      authStatusText.textContent = isUnlocked
        ? "Authentication complete. Level 4 is unlocked. Review the inbox carefully and finish all 4 scored emails."
        : "Before entering Level 4, complete the logo authentication mini game and get at least 4 out of 5 correct.";
    }

    if (beginMissionBtn) {
      beginMissionBtn.disabled = !isUnlocked;
    }

    if (beginMissionNote) {
      beginMissionNote.textContent = isUnlocked
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
        startLevel4MiniGame();
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
    const totalInbox = inboxMessages.length;
    const junkMessages = data.messages.filter((msg) => (msg.folder || "Inbox") === "Junk Email");

    if (inboxCount) inboxCount.textContent = String(totalInbox);
    if (junkCount) junkCount.textContent = String(junkMessages.length);
    if (mailboxInboxCount) mailboxInboxCount.textContent = String(totalInbox);
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
      const status = inboxResults.get(msg.id) || null;
      const activeClass = activeMessage && msg.id === activeMessage.id ? " active" : "";
      const statusClass = status ? ` resolved-${status}` : "";
      const statusMarkup = getMessageStatusMarkup(status);

      const item = document.createElement("div");
      item.className = `message-item${activeClass}${statusClass}`;
      item.dataset.id = msg.id;

      item.innerHTML = `
        <div class="message-sender">${escapeHtml(msg.sender)}</div>
        <div class="message-time">${escapeHtml(shortTime(msg.time))}</div>
        <div class="message-subject">${escapeHtml(msg.previewTop)}</div>
        <div class="message-preview ${msg.external ? "external-preview" : ""}">
          ${escapeHtml(msg.previewBottom)}
        </div>
        ${statusMarkup}
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

  function getMessageStatusMarkup(status) {
    if (!status) return "";

    const map = {
      good: { label: "All Good", className: "result-good" },
      warn: { label: "Not Good", className: "result-warn" },
      bad: { label: "Worst", className: "result-bad" }
    };

    const meta = map[status];
    if (!meta) return "";

    return `<div class="message-status-badge ${meta.className}">${meta.label}</div>`;
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
    if (window.setFishCoachCloseHandler) {
      window.setFishCoachCloseHandler(() => {
        if (waitingForProof) return;
        if (window.closeFishCoachCustom) window.closeFishCoachCustom();
      });
    }

    renderHints();
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

    document.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!activeMessage) return;
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
      setDecisionFeedback("warn", "Junk Email is for comparison only. Use it as a clue for the 4 Inbox emails.");
      return;
    }

    if (inboxResults.has(activeMessage.id)) {
      setDecisionFeedback("warn", "This Inbox email is already completed. Open another one to continue.");
      return;
    }

    const isCorrect = action === activeMessage.correctAction;
    const isPartial = action === activeMessage.partialAction;

    if (isCorrect) {
      playCorrectAnswerSfx();
      addClue("Best action chosen for this Inbox email.");
      setDecisionFeedback("good", "Correct. That is the safest action here.");
      showCoach("perfect", currentMessageNeedsVerification());

      if (!currentMessageNeedsVerification()) {
        configureCoachContinue(activeMessage.id, "good");
      }
      return;
    }

    if (isPartial) {
      playWrongAnswerSfx();
      addClue("Not the worst move, but still not the safest response.");
      setDecisionFeedback("warn", "Not the best answer. It is safer than the worst choice, but still not ideal.");
      showCoach("good", false);
      configureCoachContinue(activeMessage.id, "warn");
      return;
    }

    playWrongAnswerSfx();
    addClue("Worst action chosen. Slow down and inspect the sender, domain, and link preview more carefully.");
    setDecisionFeedback("bad", "That was the riskiest action for this email.");
    showCoach("bad", false);
    configureCoachContinue(activeMessage.id, "bad");
  }

  function showCoach(mode, withProof) {
    if (!window.showFishCoachCustom) return;

    const coachPayload = activeMessage?.coach?.[mode];
    if (!coachPayload) return;

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
      if (window.closeFishCoachCustom) window.closeFishCoachCustom();
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
    const allGood = outcomes.every((result) => result === "good");
    const allBad = outcomes.every((result) => result === "bad");

    if (allGood) return 3;
    if (allBad) return 0;
    return 1;
  }

  function showMissionResult() {
    missionCompleted = true;
    waitingForProof = false;
    hideProofBox();
    pauseBackgroundMusic();

    const stars = getMissionStars();
    if (stars === 3) {
      playLevelCompleteSfx();
    } else {
      playLevelFailSfx();
    }

    if (window.showFishCoachCustom) {
      window.showFishCoachCustom({
        title: "Mission Result",
        bubble: "",
        lessons: []
      });
    }

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
        verificationResult.textContent = "You chose the safest action on all 4 scored emails and earned 3 stars.";
      } else if (stars === 0) {
        verificationResult.textContent = "You picked the worst action on all 4 scored emails and earned 0 stars.";
      } else {
        verificationResult.textContent = "You made a mix of strong and weak choices, so you earned 1 star.";
      }
      verificationResult.className = "proof-result";
    }

    if (window.setFishCoachCloseHandler) {
      window.setFishCoachCloseHandler(() => {
        window.location.href = "./levelMap.html";
      });
    }
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

    if (verificationPrompt) verificationPrompt.textContent = activeMessage.verification.prompt || "";
    if (verificationInput) {
      verificationInput.style.display = "block";
      verificationInput.value = "";
    }
    if (verificationHelp) verificationHelp.textContent = "Type the real official domain only.";
    if (verifySubmitBtn) verifySubmitBtn.style.display = "inline-flex";

    if (verificationResult) {
      verificationResult.textContent = "";
      verificationResult.className = "proof-result";
    }

    setTimeout(() => {
      if (verificationInput) verificationInput.focus();
    }, 50);
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

    if (verificationInput) verificationInput.style.display = "block";
    if (verifySubmitBtn) verifySubmitBtn.style.display = "inline-flex";
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
    challengeLocked = false;
    brandChallengePassed = false;
    updateAuthGate(false);

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
    updateAuthGate(true);

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
    if (challengeRoundIndex >= BRAND_CHALLENGE_ROUNDS.length - 1) return;
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

  function startBackgroundMusic() {
    if (!bgMusic || musicStarted) return;

    bgMusic.volume = 0.35;
    bgMusic.loop = true;
    bgMusic.play().then(() => {
      musicStarted = true;
    }).catch(() => {
      // Browser may block autoplay until user interaction.
    });
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
});
