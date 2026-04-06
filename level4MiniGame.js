document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "level4ClonePhishingAuthPassed";
  const SCORE_KEY = "level4ClonePhishingAuthScore";
  const PASS_SCORE = 4;

  const roundCounter = document.getElementById("roundCounter");
  const scoreCounter = document.getElementById("scoreCounter");
  const promptText = document.getElementById("promptText");
  const optionGrid = document.getElementById("optionGrid");
  const feedbackText = document.getElementById("feedbackText");

  const resultPanel = document.getElementById("resultPanel");
  const resultTitle = document.getElementById("resultTitle");
  const resultBody = document.getElementById("resultBody");
  const retryBtn = document.getElementById("retryBtn");
  const returnBtn = document.getElementById("returnBtn");

  /*
    Replace only the img paths below with your real GitHub image files later.
    Keep 1 correct logo and 2 clone/fake logos in each round.
  */
  const rounds = [
    {
      company: "Microsoft",
      prompt: "Choose the authentic official Microsoft icon.",
      options: [
        { img: "./icons/level4-auth/microsoft-real.png", correct: true },
        { img: "./icons/level4-auth/microsoft-fake-1.png", correct: false },
        { img: "./icons/level4-auth/microsoft-fake-2.png", correct: false }
      ]
    },
    {
      company: "Google",
      prompt: "Choose the authentic official Google icon.",
      options: [
        { img: "./icons/level4-auth/google-fake-1.png", correct: false },
        { img: "./icons/level4-auth/google-real.png", correct: true },
        { img: "./icons/level4-auth/google-fake-2.png", correct: false }
      ]
    },
    {
      company: "Apple",
      prompt: "Choose the authentic official Apple icon.",
      options: [
        { img: "./icons/level4-auth/apple-fake-1.png", correct: false },
        { img: "./icons/level4-auth/apple-fake-2.png", correct: false },
        { img: "./icons/level4-auth/apple-real.png", correct: true }
      ]
    },
    {
      company: "Amazon",
      prompt: "Choose the authentic official Amazon icon.",
      options: [
        { img: "./icons/level4-auth/amazon-real.png", correct: true },
        { img: "./icons/level4-auth/amazon-fake-1.png", correct: false },
        { img: "./icons/level4-auth/amazon-fake-2.png", correct: false }
      ]
    },
    {
      company: "PayPal",
      prompt: "Choose the authentic official PayPal icon.",
      options: [
        { img: "./icons/level4-auth/paypal-fake-1.png", correct: false },
        { img: "./icons/level4-auth/paypal-real.png", correct: true },
        { img: "./icons/level4-auth/paypal-fake-2.png", correct: false }
      ]
    }
  ];

  let currentRoundIndex = 0;
  let score = 0;
  let locked = false;

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function updateHeader() {
    roundCounter.textContent = `Round ${currentRoundIndex + 1} / ${rounds.length}`;
    scoreCounter.textContent = `Score: ${score}`;
  }

  function clearFeedback() {
    feedbackText.textContent = "";
    feedbackText.className = "feedback-text";
  }

  function renderRound() {
    locked = false;
    clearFeedback();
    resultPanel.classList.add("hidden");

    const round = rounds[currentRoundIndex];
    const shuffledOptions = shuffle(round.options);

    updateHeader();
    promptText.textContent = round.prompt;
    optionGrid.innerHTML = "";

    shuffledOptions.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "logo-option";
      button.setAttribute("aria-label", `Option ${index + 1}`);

      const img = document.createElement("img");
      img.src = option.img;
      img.alt = "";
      img.draggable = false;

      button.appendChild(img);

      button.addEventListener("click", () => handleChoice(button, option.correct));

      optionGrid.appendChild(button);
    });
  }

  function handleChoice(clickedButton, isCorrect) {
    if (locked) return;
    locked = true;

    const buttons = Array.from(optionGrid.querySelectorAll(".logo-option"));

    buttons.forEach((btn) => {
      btn.disabled = true;
    });

    if (isCorrect) {
      score += 1;
      clickedButton.classList.add("correct");
      feedbackText.textContent = "Correct.";
      feedbackText.className = "feedback-text good";
    } else {
      clickedButton.classList.add("wrong");
      feedbackText.textContent = "Wrong.";
      feedbackText.className = "feedback-text bad";

      const correctButton = buttons.find((btn) => {
        const img = btn.querySelector("img");
        const currentRound = rounds[currentRoundIndex];
        const correctOption = currentRound.options.find((item) => item.correct);
        return img && correctOption && img.getAttribute("src") === correctOption.img;
      });

      if (correctButton) {
        correctButton.classList.add("correct");
      }
    }

    scoreCounter.textContent = `Score: ${score}`;

    setTimeout(() => {
      currentRoundIndex += 1;

      if (currentRoundIndex < rounds.length) {
        renderRound();
      } else {
        showResult();
      }
    }, 850);
  }

  function showResult() {
    optionGrid.innerHTML = "";
    promptText.textContent = "Authentication complete.";
    roundCounter.textContent = `Finished`;
    scoreCounter.textContent = `Score: ${score}/${rounds.length}`;
    clearFeedback();

    const passed = score >= PASS_SCORE;

    if (passed) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      sessionStorage.setItem(SCORE_KEY, String(score));

      resultTitle.textContent = "Authentication Passed";
      resultBody.textContent =
        `You scored ${score}/${rounds.length}. Level 4 is now unlocked. Return to Level 4 and begin the mission.`;

      retryBtn.classList.add("hidden");
      returnBtn.textContent = "Return to Level 4";
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(SCORE_KEY);

      resultTitle.textContent = "Authentication Failed";
      resultBody.textContent =
        `You scored ${score}/${rounds.length}. You need at least ${PASS_SCORE}/${rounds.length} to unlock Level 4.`;

      retryBtn.classList.remove("hidden");
      returnBtn.textContent = "Back to Level 4";
    }

    resultPanel.classList.remove("hidden");
  }

  function resetGame() {
    currentRoundIndex = 0;
    score = 0;
    renderRound();
  }

  retryBtn.addEventListener("click", resetGame);

  returnBtn.addEventListener("click", () => {
    window.location.href = "./level4.html";
  });

  resetGame();
});
