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

  const BRAND_CHALLENGE_ROUNDS = [
    {
      company: "Microsoft",
      prompt: "Choose the official Microsoft brand card.",
      explanation: "The real Microsoft mark keeps the correct spelling and the clean four-square window.",
      options: [
        { displayName: "Microsoft", logoType: "microsoft", isReal: true },
        { displayName: "Micr0soft", logoType: "microsoft-fake-zero", isReal: false },
        { displayName: "Microsofft", logoType: "microsoft-fake-double", isReal: false }
      ]
    },
    {
      company: "PayPal",
      prompt: "Pick the real PayPal sign-in brand.",
      explanation: "Clone phishing often swaps a lowercase l with an uppercase I, like PayPaI.",
      options: [
        { displayName: "PayPal", logoType: "paypal", isReal: true },
        { displayName: "PayPaI", logoType: "paypal-fake-i", isReal: false },
        { displayName: "PayPal Secure", logoType: "paypal-fake-secure", isReal: false }
      ]
    },
    {
      company: "Google",
      prompt: "Which card matches the official Google look?",
      explanation: "A fake can keep a similar look but still change the color balance or shape style.",
      options: [
        { displayName: "Google", logoType: "google", isReal: true },
        { displayName: "Go0gle", logoType: "google-fake-zero", isReal: false },
        { displayName: "Goggle", logoType: "google-fake-goggle", isReal: false }
      ]
    },
    {
      company: "Netflix",
      prompt: "Select the official Netflix identity.",
      explanation: "Fake landing pages often keep the red theme but distort the brand shape or letter style.",
      options: [
        { displayName: "Netflix", logoType: "netflix", isReal: true },
        { displayName: "NetfIix", logoType: "netflix-fake-i", isReal: false },
        { displayName: "Neflix", logoType: "netflix-fake-neflix", isReal: false }
      ]
    },
    {
      company: "Adobe",
      prompt: "Choose the real Adobe brand card.",
      explanation: "Attackers often keep the same red feel but alter the shape or spacing.",
      options: [
        { displayName: "Adobe", logoType: "adobe", isReal: true },
        { displayName: "Ad0be", logoType: "adobe-fake-zero", isReal: false },
        { displayName: "Abode Creative", logoType: "adobe-fake-abode", isReal: false }
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
    const inboxMessages = data.messages.filter((msg) => (msg.folder || "Inbox") === "Inbox");
    const junkMessages = data.messages.filter((msg) => (msg.folder || "Inbox") === "Junk Email");

    if (inboxCount) inboxCount.textContent = String(inboxMessages.length);
    if (junkCount) junkCount.textContent = String(junkMessages.length);
    if (mailboxInboxCount) mailboxInboxCount.textContent = String(inboxMessages.length);
  }

  function renderFolder(folderName) {
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

    activeMessage = folderMessages[0];
    renderMessageList(folderMessages);
    renderReadingPane(activeMessage);
    resetStateForMessage();
  }

  function renderMessageList(folderMessages) {
    if (!messageList) return;
    messageList.innerHTML = "";

    folderMessages.forEach((msg, index) => {
      const item = document.createElement("div");
      item.className = "message-item" + (index === 0 ? " active" : "");
      item.dataset.id = msg.id;

      item.innerHTML = `
        <div class="message-sender">${escapeHtml(msg.sender)}</div>
        <div class="message-time">${escapeHtml(shortTime(msg.time))}</div>
        <div class="message-subject">${escapeHtml(msg.previewTop)}</div>
        <div class="message-preview ${msg.external ? "external-preview" : ""}">
          ${escapeHtml(msg.previewBottom)}
        </div>
      `;

      item.addEventListener("click", () => {
        document.querySelectorAll(".message-item").forEach((el) => el.classList.remove("active"));
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

  function handleAction(action) {
    const isCorrect = action === activeMessage.correctAction;
    const isPartial = action === activeMessage.partialAction;

    if (isCorrect) {
      addClue("Correct action chosen.");
      setDecisionFeedback("good", "Correct. That is the best action here.");
      showCoach("perfect", true);
      return;
    }

    if (isPartial) {
      addClue("Partial credit: safer than clicking, but not the best answer.");
      setDecisionFeedback("warn", "Safer than clicking, but not the best answer for this scenario.");
      showCoach("good", false);
      return;
    }

    addClue("Incorrect action chosen. Re-check sender details, urgency language, and the previewed link.");
    setDecisionFeedback("bad", "That action is risky. Reveal another hint and try again.");
    showCoach("bad", false);
  }

  function showCoach(mode, withProof) {
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

    const raw = verificationInput ? verificationInput.value : "";
    const answer = normalizeAnswer(raw);
    const accepted = (activeMessage.verification.acceptedAnswers || []).map(normalizeAnswer);

    if (accepted.includes(answer)) {
      if (verificationResult) {
        verificationResult.textContent = "Correct. Use the official site manually instead of the email link.";
        verificationResult.className = "proof-result good";
      }

      if (verificationHelp) {
        verificationHelp.textContent = "Nice work. You identified the trusted domain.";
      }

      addClue("Player correctly identified the official domain to visit manually.");
      waitingForProof = false;
      setDecisionFeedback("good", "Excellent. You chose the safest action and identified the correct official website.");

      if (window.setFishCoachCloseHandler) {
        window.setFishCoachCloseHandler(() => {
          if (window.closeFishCoachCustom) window.closeFishCoachCustom();
          window.location.href = "./levelMap.html";
        });
      }
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
        if (!challengeLocked) return;
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
      button.setAttribute("aria-label", option.displayName);

      button.innerHTML = `
        <div class="brand-logo-shell">
          ${createBrandVisual(option)}
        </div>
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

    brandChallengeFeedback.textContent = `You scored ${challengeScoreValue} / ${BRAND_CHALLENGE_ROUNDS.length}. You need at least 4 / 5 to unlock Level 4, so try again and watch for tiny phishing tricks.`;
    brandChallengeFeedback.className = "brand-challenge-feedback bad";

    if (brandChallengeRestartBtn) brandChallengeRestartBtn.classList.remove("hidden");
    addClue(`Mini game attempt finished below the pass mark: ${challengeScoreValue} / ${BRAND_CHALLENGE_ROUNDS.length}.`);
  }

  function createBrandVisual(option) {
    switch (option.logoType) {
      case "microsoft":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <rect x="8" y="8" width="38" height="38" rx="4" fill="#F25022"></rect>
            <rect x="54" y="8" width="38" height="38" rx="4" fill="#7FBA00"></rect>
            <rect x="8" y="54" width="38" height="38" rx="4" fill="#00A4EF"></rect>
            <rect x="54" y="54" width="38" height="38" rx="4" fill="#FFB900"></rect>
          </svg>
        `;

      case "microsoft-fake-zero":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <g transform="rotate(8 50 50)">
              <rect x="8" y="8" width="38" height="38" rx="10" fill="#FB7185"></rect>
              <rect x="54" y="8" width="38" height="38" rx="10" fill="#84CC16"></rect>
              <rect x="8" y="54" width="38" height="38" rx="10" fill="#38BDF8"></rect>
              <rect x="54" y="54" width="38" height="38" rx="10" fill="#FACC15"></rect>
            </g>
          </svg>
        `;

      case "microsoft-fake-double":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <circle cx="27" cy="27" r="18" fill="#F97316"></circle>
            <circle cx="73" cy="27" r="18" fill="#22C55E"></circle>
            <circle cx="27" cy="73" r="18" fill="#0EA5E9"></circle>
            <circle cx="73" cy="73" r="18" fill="#EAB308"></circle>
          </svg>
        `;

      case "paypal":
        return `
          <svg viewBox="0 0 120 100" width="96" height="96" aria-hidden="true">
            <text x="28" y="76" font-size="78" font-weight="900" fill="#0C4A8A" font-family="Arial, sans-serif">P</text>
            <text x="46" y="80" font-size="78" font-weight="900" fill="#009CDE" font-family="Arial, sans-serif">P</text>
          </svg>
        `;

      case "paypal-fake-i":
        return `
          <svg viewBox="0 0 120 100" width="96" height="96" aria-hidden="true">
            <text x="28" y="76" font-size="78" font-weight="900" fill="#1D4ED8" font-family="Arial, sans-serif">P</text>
            <text x="48" y="80" font-size="78" font-weight="900" fill="#60A5FA" font-family="Arial, sans-serif" transform="skewY(-8)">P</text>
          </svg>
        `;

      case "paypal-fake-secure":
        return `
          <svg viewBox="0 0 120 100" width="96" height="96" aria-hidden="true">
            <text x="28" y="76" font-size="78" font-weight="900" fill="#0F172A" font-family="Arial, sans-serif">P</text>
            <text x="46" y="80" font-size="78" font-weight="900" fill="#3B82F6" font-family="Arial, sans-serif">P</text>
          </svg>
        `;

      case "google":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <text x="50" y="68" text-anchor="middle" font-size="72" font-weight="900" font-family="Arial, sans-serif" fill="#4285F4">G</text>
          </svg>
        `;

      case "google-fake-zero":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <text x="50" y="68" text-anchor="middle" font-size="72" font-weight="900" font-family="Arial, sans-serif" fill="#2563EB">G</text>
          </svg>
        `;

      case "google-fake-goggle":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <text x="50" y="68" text-anchor="middle" font-size="72" font-weight="900" font-family="Arial, sans-serif" fill="#F59E0B">G</text>
          </svg>
        `;

      case "netflix":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <text x="50" y="76" text-anchor="middle" font-size="84" font-weight="900" font-family="Arial Black, Arial, sans-serif" fill="#E50914">N</text>
          </svg>
        `;

      case "netflix-fake-i":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <text x="50" y="76" text-anchor="middle" font-size="84" font-weight="900" font-family="Arial Black, Arial, sans-serif" fill="#EF4444" transform="skewY(-8)">N</text>
          </svg>
        `;

      case "netflix-fake-neflix":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <text x="50" y="76" text-anchor="middle" font-size="84" font-weight="900" font-family="Arial Black, Arial, sans-serif" fill="#B91C1C">N</text>
          </svg>
        `;

      case "adobe":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <polygon points="20,82 40,18 50,18 30,82" fill="#ED2224"></polygon>
            <polygon points="80,82 60,18 50,18 70,82" fill="#ED2224"></polygon>
          </svg>
        `;

      case "adobe-fake-zero":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <polygon points="20,82 40,18 50,18 30,82" fill="#F87171"></polygon>
            <polygon points="80,82 60,18 50,18 70,82" fill="#F87171"></polygon>
          </svg>
        `;

      case "adobe-fake-abode":
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <g transform="rotate(-5 50 50)">
              <polygon points="20,82 40,18 50,18 30,82" fill="#991B1B"></polygon>
              <polygon points="80,82 60,18 50,18 70,82" fill="#991B1B"></polygon>
            </g>
          </svg>
        `;

      default:
        return `
          <svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true">
            <circle cx="50" cy="50" r="34" fill="#94A3B8"></circle>
          </svg>
        `;
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
