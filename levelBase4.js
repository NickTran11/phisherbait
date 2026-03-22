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

  const clueSet = new Set();
  let currentFolder = "Inbox";
  let activeMessage = null;
  let revealedHintCount = 0;
  let retryCount = 0;
  let waitingForProof = false;

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
    refreshFolderCounts();
    renderFolder("Inbox");
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
    if (beginMissionBtn && scenarioOverlay) {
      beginMissionBtn.addEventListener("click", () => {
        scenarioOverlay.style.opacity = "0";
        scenarioOverlay.style.transition = "opacity 0.25s ease";
        setTimeout(() => {
          scenarioOverlay.style.display = "none";
          scenarioOverlay.setAttribute("aria-hidden", "true");
        }, 250);
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

  function renderFolder(folderName) {
    currentFolder = folderName;
    if (listTitle) listTitle.textContent = folderName;

    if (inboxFolder) inboxFolder.classList.toggle("active", folderName === "Inbox");
    if (junkFolder) junkFolder.classList.toggle("active", folderName === "Junk Email");

    const folderMessages = data.messages.filter(msg => (msg.folder || "Inbox") === folderName);

    if (!folderMessages.length) {
      messageList.innerHTML = `<div class="message-item"><div class="message-preview">No messages in ${escapeHtml(folderName)}.</div></div>`;
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

    if (window.setFishCoachCloseHandler) {
      window.setFishCoachCloseHandler(() => {
        if (waitingForProof) return;
        if (window.closeFishCoachCustom) window.closeFishCoachCustom();
        window.location.href = "./levelMap.html";
      });
    }

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
    setTimeout(() => verificationInput && verificationInput.focus(), 50);
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
      if (verificationHelp) verificationHelp.textContent = "Nice work. You identified the trusted domain.";
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
