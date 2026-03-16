window.LEVEL1_EMAIL = {
  folderName: "Inbox",
  messages: [
    {
      id: "msg-1",
      sender: "Amazon Rewards Center",
      senderInitials: "AM",
      fromName: "Amazon Rewards Center",
      fromEmail: "<offers@amazon-reward-center-mail.com>",
      toEmail: "Bach Tran",
      time: "Sun 3/15/2026 9:52 PM",
      subject: "Congratulations! Claim your Amazon gift card reward today",
      previewTop: "Congratulations! Claim your Amazon reward",
      previewBottom: "External email offering a gift card and asking the user to act quickly...",
      external: true,
      suspicious: true,
      body: {
        greeting: "Hello Bach,",
        paragraphs: [
          "Congratulations! You have been selected as one of today’s lucky Amazon customers. You are eligible to claim a $100 gift card if you confirm your account now.",
          "We only have a few claim spots left today, so please act quickly before your reward expires.",
          "To confirm your eligibility, click Claim Reward."
        ],
        closing: "Thank you,\nAmazon Rewards Team"
      },
      inspector: {
        returnPath: "bounce-4801@mailer.amazon-claim-notice.net",
        replyTo: "support@amazon-prize-claims-help.com",
        linkPreview: "https://amazon-gift-claim-center.com/reward/confirm"
      },
      correctAction: "report",
      partialAction: "callit",
      orderedHints: [
        "This email came from outside the organization. That does not automatically make it malicious, but it should make you more careful.",
        "The message uses reward language and urgency together: 'selected', '$100 gift card', and 'act quickly'. That combination is a common phishing tactic.",
        "The sender details are inconsistent. The visible sender, reply-to, and return-path do not match a trusted main Amazon domain pattern.",
        "The previewed link does not use Amazon’s real primary domain. A safer choice would be to type the official Amazon website manually in your browser."
      ],
      hoverClues: [
        "Free reward language is commonly used to attract a fast click.",
        "The visible link label sounds normal, but the true destination matters more than the label.",
        "Return-Path does not match a normal trusted Amazon sender pattern.",
        "Reply-To is different from the visible sender. That can be a phishing sign.",
        "The previewed URL does not use Amazon’s real main domain."
      ],
      verification: {
        prompt: "In this email, what official website/domain should you manually type in your browser instead of clicking the email link?",
        acceptedAnswers: [
          "amazon.com",
          "www.amazon.com",
          "amazon.ca",
          "www.amazon.ca"
        ],
        retryGuidance: [
          "Not quite. Do not copy the suspicious domain from the email. Think of Amazon’s real official website.",
          "Still not right. Try the main official Amazon domain only.",
          "Use the official base domain, for example: amazon.com"
        ]
      }
    }
  ]
};
