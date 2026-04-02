const quizData = [
    {
        question: "What is the primary goal of a phishing attack?",
        options: [
            "To improve network speed",
            "To steal sensitive information like passwords and credit card numbers",
            "To upgrade your software automatically",
            "To test your email provider's spam filter"
        ],
        correctAnswer: 1,
        explanation: "Phishing attacks are designed to trick victims into revealing sensitive information, such as login credentials or financial details."
    },
    {
        question: "Which of the following is a common red flag in a phishing email?",
        options: [
            "A personalized greeting with your full name",
            "A sense of urgency or threat (e.g., 'Your account will be closed in 24 hours')",
            "An email from a known contact that matches their usual writing style",
            "A link that points exactly to the official website when hovered over"
        ],
        correctAnswer: 1,
        explanation: "Attackers often use urgent or threatening language to panic the victim into acting quickly without thinking."
    },
    {
        question: "What is 'Spear Phishing'?",
        options: [
            "A phishing attack that targets a specific individual or organization using personalized information",
            "A phishing attack sent to millions of random email addresses",
            "A phishing attack conducted over the phone",
            "A phishing attack targeting only mobile devices"
        ],
        correctAnswer: 0,
        explanation: "Spear phishing is highly targeted. Attackers research their victims to make the emails appear highly credible and personalized."
    },
    {
        question: "You receive an email from your bank asking you to click a link to verify your account details. What should you do?",
        options: [
            "Click the link and provide the details immediately",
            "Reply to the email asking if it's legitimate",
            "Forward the email to your friends to warn them",
            "Do not click the link; instead, log in to your bank's website directly by typing the URL into your browser"
        ],
        correctAnswer: 3,
        explanation: "Never click links in suspicious emails. Always navigate to the official website independently to check your account status."
    },
    {
        question: "What does 'hovering' over a link in an email help you do?",
        options: [
            "It automatically scans the link for viruses",
            "It reveals the actual URL destination before you click it",
            "It deletes the email if it's a phishing attempt",
            "It translates the link into your native language"
        ],
        correctAnswer: 1,
        explanation: "Hovering over a link (without clicking) shows the true destination URL, which often reveals if it's pointing to a malicious site."
    },
    {
        question: "What is 'Whaling'?",
        options: [
            "A phishing attack targeting marine biologists",
            "A phishing attack targeting high-profile individuals like CEOs or executives",
            "A phishing attack that uses massive attachments",
            "A phishing attack that only occurs on social media"
        ],
        correctAnswer: 1,
        explanation: "Whaling is a specific type of spear phishing aimed at high-level executives (the 'whales') who have access to highly valuable information."
    },
    {
        question: "Which of these sender addresses is most likely a phishing attempt pretending to be PayPal?",
        options: [
            "service@paypal.com",
            "support@paypal.com",
            "security-alert@paypa1-update.com",
            "receipts@paypal.com"
        ],
        correctAnswer: 2,
        explanation: "Phishers often use look-alike domains (like 'paypa1' instead of 'paypal') to trick users who aren't looking closely."
    },
    {
        question: "What is 'Smishing'?",
        options: [
            "Phishing conducted via SMS (text messages)",
            "Phishing conducted via social media",
            "Phishing that installs malware",
            "Phishing that targets smart TVs"
        ],
        correctAnswer: 0,
        explanation: "Smishing is a portmanteau of SMS and Phishing. It involves sending malicious links or requests via text message."
    },
    {
        question: "True or False: Legitimate organizations will frequently ask for your password via email to verify your identity.",
        options: [
            "True",
            "False"
        ],
        correctAnswer: 1,
        explanation: "False. Legitimate organizations will NEVER ask you to send your password via email."
    },
    {
        question: "You receive an unexpected email with an attachment named 'Invoice_Overdue.zip'. What is the safest action?",
        options: [
            "Open it immediately to see what you owe",
            "Save it to your desktop and open it later",
            "Do not open it; contact the supposed sender via a known, trusted method to verify",
            "Forward it to your IT department and then open it"
        ],
        correctAnswer: 2,
        explanation: "Unexpected attachments, especially .zip or .exe files, are a common way to distribute malware. Always verify before opening."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const educationalContent = document.getElementById('educational-content');
    const quizSection = document.getElementById('quiz-section');
    const quizContainer = document.getElementById('quiz-questions-container');
    const submitBtn = document.getElementById('submit-quiz-btn');
    const scoreDisplay = document.getElementById('quiz-score');
    const retakeBtn = document.getElementById('retake-quiz-btn');
    const quitBtn = document.getElementById('quit-quiz-btn');
    const quizActions = document.getElementById('quiz-actions');

    let userAnswers = new Array(quizData.length).fill(null);

    startQuizBtn.addEventListener('click', () => {
        educationalContent.style.display = 'none';
        quizSection.style.display = 'block';
        renderQuiz();
        // Scroll to top
        document.getElementById('tutorial-container').scrollTop = 0;
    });

    function renderQuiz() {
        quizContainer.innerHTML = '';
        quizData.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            
            const questionTitle = document.createElement('h4');
            questionTitle.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionTitle);

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';

            q.options.forEach((opt, optIndex) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'quiz-option';
                optionDiv.innerHTML = `
                    <input type="radio" name="q${index}" id="q${index}o${optIndex}" value="${optIndex}">
                    <label for="q${index}o${optIndex}" style="cursor: pointer; width: 100%;">${opt}</label>
                `;
                
                optionDiv.addEventListener('click', () => {
                    if (submitBtn.disabled) return; // Prevent changing answers after submission
                    
                    // Deselect others
                    const siblings = optionsDiv.querySelectorAll('.quiz-option');
                    siblings.forEach(sib => sib.classList.remove('selected'));
                    
                    // Select this one
                    optionDiv.classList.add('selected');
                    optionDiv.querySelector('input').checked = true;
                    userAnswers[index] = optIndex;
                });

                optionsDiv.appendChild(optionDiv);
            });

            questionDiv.appendChild(optionsDiv);

            const feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'quiz-feedback';
            feedbackDiv.id = `feedback-${index}`;
            questionDiv.appendChild(feedbackDiv);

            quizContainer.appendChild(questionDiv);
        });
    }

    submitBtn.addEventListener('click', () => {
        // Check if all answered
        if (userAnswers.includes(null)) {
            alert("Please answer all questions before submitting.");
            return;
        }

        let score = 0;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.textContent = 'Quiz Completed';

        quizData.forEach((q, index) => {
            const optionsDiv = quizContainer.children[index].querySelector('.quiz-options');
            const selectedOptionDiv = optionsDiv.children[userAnswers[index]];
            const correctOptionDiv = optionsDiv.children[q.correctAnswer];
            const feedbackDiv = document.getElementById(`feedback-${index}`);

            if (userAnswers[index] === q.correctAnswer) {
                score++;
                selectedOptionDiv.classList.add('correct');
                feedbackDiv.textContent = "Correct! " + q.explanation;
                feedbackDiv.className = 'quiz-feedback correct';
            } else {
                selectedOptionDiv.classList.add('incorrect');
                correctOptionDiv.classList.add('correct');
                feedbackDiv.textContent = "Incorrect. " + q.explanation;
                feedbackDiv.className = 'quiz-feedback incorrect';
            }
        });

        scoreDisplay.textContent = `You scored ${score} out of ${quizData.length}!`;
        scoreDisplay.style.display = 'block';
        
        submitBtn.style.display = 'none';
        quizActions.style.display = 'flex';
        
        // Scroll to score
        scoreDisplay.scrollIntoView({ behavior: 'smooth' });
    });

    retakeBtn.addEventListener('click', () => {
        userAnswers.fill(null);
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.textContent = 'Submit Answers';
        submitBtn.style.display = 'block';
        scoreDisplay.style.display = 'none';
        quizActions.style.display = 'none';
        renderQuiz();
        document.getElementById('tutorial-container').scrollTop = 0;
    });

    quitBtn.addEventListener('click', () => {
        window.location.href = 'levelMap.html';
    });
});
