window.LEVEL4_EMAIL = {
  accountEmail: "theobuch@email.com",

  scenario: {
    codename: "THEO BUCH",
    title: "Microsoft Employee",
    description: "You are Theo Buch. Level 4 introduces clone phishing. Some emails are legitimate workplace messages, while others copy familiar formatting but use slightly changed domains, reply-style subjects, or swapped malicious links.",
    profile: [
      "Works in a Microsoft office environment",
      "Receives invoices, document shares, Teams notices, and IT alerts",
      "Often reviews email quickly during busy work hours"
    ],
    habits: [
      "Checks email between meetings",
      "May trust familiar branding and reply-style subjects",
      "Can miss tiny domain differences when rushed"
    ],
    context: "Your goal is to compare sender domain, reply-to address, link destination, urgency, and message context. Not every email in Junk is malicious, and not every email in Inbox is safe. Clone phishing works by imitating messages that look normal.",
    initials: "TB",
    photo: "./Theo%20Buch.png"
  },

  messages: [
    {
      id: "msg-1",
      folder: "Inbox",
      sender: "Microsoft Billing Center",
      senderInitials: "MB",
      fromName: "Microsoft Billing Center",
      fromEmail: "<invoice-update@rnicrosoft-billing.com>",
      toEmail: "Theo Buch",
      time: "Mon 3/16/2026 9:12 AM",
      subject: "Updated invoice available - March services",
      previewTop: "Updated invoice available - March services",
      previewBottom: "Please review the corrected invoice attachment.",
      external: true,
      suspicious: true,
      linkText: "View Updated Invoice",
      bodyHtml: `
        <div class="email-logo">Microsoft Billing Center</div>
        <p>Hello Theo Buch,</p>
        <p>We have issued a corrected version of your March services invoice.</p>
        <p>Please review the updated invoice immediately to avoid a processing delay.</p>
        <p>Open the file here: <a href="#" class="email-link hintable suspicious" id="accountLink">View Updated Invoice</a></p>
        <p>Thank you,<br>Microsoft Billing Center</p>
      `,
      inspector: {
        returnPath: "bounce@mailer.rnicrosoft-billing.com",
        replyTo: "billing@rnicrosoft-billing.com",
        linkPreview: "https://rnicrosoft-billing-secure.com/invoice/march-update"
      },
      correctAction: "report",
      partialAction: "callit",
      orderedHints: [
        "This email looks like a normal invoice update, which is why clone phishing works.",
        "The sender domain uses 'rnicrosoft' to imitate 'microsoft'.",
        "The message creates urgency around billing.",
        "The link preview is not an official Microsoft domain."
      ],
      verification: {
        prompt: "What is the real official Microsoft base domain?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Look for the official Microsoft base domain.",
          "Do not copy the fake sender domain.",
          "Use only the real company domain."
        ]
      },
      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Nice catch.\nThis was clone phishing.",
          lessons: [
            "Clone phishing copies a familiar business message.",
            "A tiny sender-domain change is a major red flag.",
            "Use the official site manually instead of the email link."
          ]
        },
        good: {
          title: "Good choice!",
          bubble: "Safer move.\nStill not the best one.",
          lessons: [
            "Official verification reduces risk.",
            "Reporting is best in a workplace setting.",
            "Domain mismatch is the key clue here."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "That invoice was fake.",
          lessons: [
            "Attackers rely on familiar formatting.",
            "Billing urgency is a common phishing tactic.",
            "Check sender and link before acting."
          ]
        }
      }
    },

    {
      id: "msg-2",
      folder: "Inbox",
      sender: "Microsoft Billing Center",
      senderInitials: "MB",
      fromName: "Microsoft Billing Center",
      fromEmail: "<invoice-update@microsoft.com>",
      toEmail: "Theo Buch",
      time: "Mon 3/16/2026 8:41 AM",
      subject: "Invoice update confirmation - March services",
      previewTop: "Invoice update confirmation - March services",
      previewBottom: "This appears to be a normal business message.",
      external: false,
      suspicious: false,
      linkText: "Open Microsoft Billing",
      bodyHtml: `
        <div class="email-logo">Microsoft Billing Center</div>
        <p>Hello Theo Buch,</p>
        <p>This is a confirmation that your March services invoice has been updated in the Microsoft billing portal.</p>
        <p>No urgent action is required. You can review it during your normal workflow using the official Microsoft billing portal.</p>
        <p>Portal: <a href="#" class="email-link" id="accountLink">Open Microsoft Billing</a></p>
        <p>Thank you,<br>Microsoft Billing Center</p>
      `,
      inspector: {
        returnPath: "billing@microsoft.com",
        replyTo: "billing@microsoft.com",
        linkPreview: "https://www.microsoft.com/"
      },
      correctAction: "callit",
      partialAction: "report",
      orderedHints: [
        "Compare this one with the phishing invoice emails.",
        "The sender domain and link both match the real company domain.",
        "The message tone is calm and does not pressure immediate action.",
        "Legitimate messages can look boring, and that is normal."
      ],
      verification: {
        prompt: "What is the official Microsoft base domain?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Use the real official Microsoft domain.",
          "Not the altered domains from the phishing emails.",
          "Try the base domain only."
        ]
      },
      coach: {
        perfect: {
          title: "Correct!",
          bubble: "This one looks legitimate.",
          lessons: [
            "Not every email is malicious.",
            "Matching sender and link domains are good signs.",
            "Official verification is still the safest habit."
          ]
        },
        good: {
          title: "Acceptable.",
          bubble: "Cautious is fine.",
          lessons: [
            "This email appears legitimate.",
            "Reporting is cautious, but official verification fits better.",
            "Use multiple clues together."
          ]
        },
        bad: {
          title: "Too risky.",
          bubble: "Do not trust blindly.",
          lessons: [
            "Even legitimate email should be checked.",
            "Do not click just because the branding looks familiar.",
            "Use trusted channels when possible."
          ]
        }
      }
    },

    {
      id: "msg-3",
      folder: "Inbox",
      sender: "Microsoft Billing Center",
      senderInitials: "MB",
      fromName: "Microsoft Billing Center",
      fromEmail: "<invoice-update@micosoft.com>",
      toEmail: "Theo Buch",
      time: "Mon 3/16/2026 10:07 AM",
      subject: "RE: Invoice update confirmation - action required",
      previewTop: "RE: Invoice update confirmation - action required",
      previewBottom: "A cloned reply-style email asking for immediate confirmation.",
      external: true,
      suspicious: true,
      linkText: "Confirm Invoice Access",
      bodyHtml: `
        <div class="email-logo">Microsoft Billing Center</div>
        <p>Hello Theo Buch,</p>
        <p>Following our earlier invoice message, we need you to confirm invoice access immediately.</p>
        <p>Your billing record may be restricted if you do not complete confirmation today.</p>
        <p>Confirm here: <a href="#" class="email-link hintable suspicious" id="accountLink">Confirm Invoice Access</a></p>
        <p>Thank you,<br>Microsoft Billing Center</p>
      `,
      inspector: {
        returnPath: "alerts@micosoft-secure.com",
        replyTo: "support@micosoft-secure.com",
        linkPreview: "https://micosoft-secure.com/confirm/invoice-access"
      },
      correctAction: "report",
      partialAction: "callit",
      orderedHints: [
        "This uses a reply-style subject to look like part of a normal thread.",
        "The domain 'micosoft' is not the official Microsoft domain.",
        "The email uses account restriction language to add pressure.",
        "This is classic clone phishing: same style, malicious domain."
      ],
      verification: {
        prompt: "What is the real official Microsoft base domain?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Use the real Microsoft domain only.",
          "Do not use the fake reply-style domain.",
          "Try the official base domain."
        ]
      },
      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Exactly right.\nThis was clone phishing.",
          lessons: [
            "Reply-style clone phishing abuses familiarity.",
            "Tiny spelling changes matter.",
            "Urgency plus a fake domain is a strong warning sign."
          ]
        },
        good: {
          title: "Good choice!",
          bubble: "Safer than clicking.",
          lessons: [
            "Official verification helps.",
            "Reporting is still the best workplace action.",
            "The sender domain is the biggest clue."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "That reply was fake.",
          lessons: [
            "Attackers copy real email style to reduce suspicion.",
            "Do not trust a familiar subject line alone.",
            "Inspect the actual domain every time."
          ]
        }
      }
    },

    {
      id: "msg-4",
      folder: "Inbox",
      sender: "SharePoint Notifications",
      senderInitials: "SP",
      fromName: "SharePoint Notifications",
      fromEmail: "<noreply@sharepointonline.com>",
      toEmail: "Theo Buch",
      time: "Mon 3/16/2026 11:18 AM",
      subject: "Theo Buch shared 'Q2 Budget Notes' with you",
      previewTop: "Theo Buch shared 'Q2 Budget Notes' with you",
      previewBottom: "A normal collaboration notice with a familiar Microsoft service.",
      external: false,
      suspicious: false,
      linkText: "Open document",
      bodyHtml: `
        <div class="email-logo">SharePoint</div>
        <p>Hello Theo Buch,</p>
        <p>A document titled <strong>Q2 Budget Notes</strong> has been shared with you for review.</p>
        <p>You can access it through your normal Microsoft 365 workspace.</p>
        <p>Open document: <a href="#" class="email-link" id="accountLink">Open document</a></p>
        <p>Regards,<br>SharePoint Notifications</p>
      `,
      inspector: {
        returnPath: "noreply@sharepointonline.com",
        replyTo: "noreply@sharepointonline.com",
        linkPreview: "https://www.microsoft.com/"
      },
      correctAction: "callit",
      partialAction: "report",
      orderedHints: [
        "This is a different type of workplace email, not billing.",
        "The sender and reply-to are consistent.",
        "There is no urgent threat or account restriction language.",
        "Legitimate business email can vary in topic and still be safe."
      ],
      verification: {
        prompt: "What is the trusted company base domain used in this level?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Use the official company base domain used throughout this level.",
          "Do not use altered domains.",
          "Try again with the real base domain."
        ]
      },
      coach: {
        perfect: {
          title: "Correct!",
          bubble: "This looks normal.",
          lessons: [
            "Safe email does not always look dramatic.",
            "Consistency across sender and link helps.",
            "Verify through your normal portal when possible."
          ]
        },
        good: {
          title: "Reasonable.",
          bubble: "Caution is okay.",
          lessons: [
            "This message appears legitimate.",
            "Official verification is the better fit here.",
            "Use context, not fear, to decide."
          ]
        },
        bad: {
          title: "Too risky.",
          bubble: "Do not click on autopilot.",
          lessons: [
            "Even normal email should be verified thoughtfully.",
            "Familiar branding alone is not enough.",
            "Use trusted workflow habits."
          ]
        }
      }
    },

    {
      id: "msg-5",
      folder: "Junk Email",
      sender: "Microsoft Account Team",
      senderInitials: "MA",
      fromName: "Microsoft Account Team",
      fromEmail: "<account-security@microsoft.com>",
      toEmail: "Theo Buch",
      time: "Mon 3/16/2026 7:22 AM",
      subject: "Weekly sign-in activity summary",
      previewTop: "Weekly sign-in activity summary",
      previewBottom: "A calm legitimate message placed in Junk as a hint.",
      external: false,
      suspicious: false,
      linkText: "Review account activity",
      bodyHtml: `
        <div class="email-logo">Microsoft Account</div>
        <p>Hello Theo Buch,</p>
        <p>Here is your weekly Microsoft account sign-in activity summary.</p>
        <p>No action is required unless you notice unfamiliar activity.</p>
        <p>Review activity: <a href="#" class="email-link" id="accountLink">Review account activity</a></p>
        <p>Thanks,<br>Microsoft Account Team</p>
      `,
      inspector: {
        returnPath: "account-security@microsoft.com",
        replyTo: "account-security@microsoft.com",
        linkPreview: "https://www.microsoft.com/"
      },
      correctAction: "callit",
      partialAction: "report",
      orderedHints: [
        "This email is in Junk, but folder placement alone is not proof.",
        "The sender domain matches the real company domain.",
        "The tone is informational, not urgent.",
        "This is here as a hint that Junk can contain legitimate email."
      ],
      verification: {
        prompt: "What is the official Microsoft base domain?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Use the official Microsoft domain.",
          "Not the fake or lookalike domains.",
          "Try the real base domain only."
        ]
      },
      coach: {
        perfect: {
          title: "Correct!",
          bubble: "Junk folder placement can be wrong.",
          lessons: [
            "Spam filters are helpful but not perfect.",
            "Always inspect sender and link details.",
            "Context matters more than folder location."
          ]
        },
        good: {
          title: "Acceptable.",
          bubble: "Careful is fine.",
          lessons: [
            "This one appears legitimate.",
            "Official verification is still preferred.",
            "Do not rely only on the folder."
          ]
        },
        bad: {
          title: "Too risky.",
          bubble: "Do not trust the folder alone.",
          lessons: [
            "Junk placement is only one signal.",
            "Use technical clues as well.",
            "Check sender and link details first."
          ]
        }
      }
    },

    {
      id: "msg-6",
      folder: "Junk Email",
      sender: "Teams Voice Mail",
      senderInitials: "TV",
      fromName: "Teams Voice Mail",
      fromEmail: "<notifications@tearnsvoice-mail.com>",
      toEmail: "Theo Buch",
      time: "Mon 3/16/2026 6:58 AM",
      subject: "New voice message received",
      previewTop: "New voice message received",
      previewBottom: "An obvious lookalike domain example placed in Junk for comparison.",
      external: true,
      suspicious: true,
      linkText: "Play voice message",
      bodyHtml: `
        <div class="email-logo">Teams Voice Mail</div>
        <p>Hello Theo Buch,</p>
        <p>You have received a new voice message from your Teams workspace.</p>
        <p>Please play the message immediately to avoid deletion.</p>
        <p>Play message: <a href="#" class="email-link hintable suspicious" id="accountLink">Play voice message</a></p>
        <p>Regards,<br>Teams Voice Mail</p>
      `,
      inspector: {
        returnPath: "notifications@tearnsvoice-mail.com",
        replyTo: "notifications@tearnsvoice-mail.com",
        linkPreview: "https://tearnsvoice-mail.com/play-message"
      },
      correctAction: "report",
      partialAction: "callit",
      orderedHints: [
        "This is a different email type: voicemail notice.",
        "The domain uses 'tearns' to imitate 'teams'.",
        "The message adds false urgency with deletion language.",
        "This is a clear phishing comparison example in Junk."
      ],
      verification: {
        prompt: "What is the real official Microsoft base domain?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Use the official Microsoft domain.",
          "Not the fake voicemail domain.",
          "Try the company base domain only."
        ]
      },
      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Nice catch.\nThat voicemail email was fake.",
          lessons: [
            "Attackers imitate common workplace notifications.",
            "Lookalike spellings are a classic trick.",
            "Urgency plus a fake domain is phishing."
          ]
        },
        good: {
          title: "Good choice!",
          bubble: "Safer than clicking.",
          lessons: [
            "Official verification helps.",
            "Reporting is still the best workplace action.",
            "The fake domain is the main clue."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "That voicemail email was fake.",
          lessons: [
            "Teams-style phishing is common.",
            "Do not trust notification branding alone.",
            "Inspect the real domain every time."
          ]
        }
      }
    }
  ]
};
