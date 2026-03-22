window.LEVEL4_EMAIL = {
  accountEmail: "theobuch@email.com",

  scenario: {
    codename: "THEO BUCH",
    title: "Microsoft Employee",
    description: "You are Theo Buch. Earlier, you received a normal invoice update email. Later, you receive clone phishing emails that copy the same style but use slightly changed sender domains and malicious links.",
    profile: [
      "Works in a Microsoft office environment",
      "Receives vendor invoices and update emails",
      "Checks email quickly during busy work hours"
    ],
    habits: [
      "Often opens email updates immediately",
      "May trust familiar-looking invoice messages",
      "Can overlook tiny sender-domain changes when rushed"
    ],
    context: "Level 4 introduces clone phishing. One email is legitimate, while two emails imitate the same style with slightly changed domains or malicious links. Compare the sender domain, link destination, and message context carefully before acting.",
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
        <p>
          Open the file here:
          <a href="#" class="email-link hintable suspicious" id="accountLink">View Updated Invoice</a>
        </p>
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
        "This email looks like a normal invoice update, which is why clone phishing is effective.",
        "Look closely at the sender domain. 'rnicrosoft' is pretending to look like 'microsoft'.",
        "The message pushes you to act quickly on a billing document.",
        "The link preview is not an official Microsoft domain."
      ],
      verification: {
        prompt: "What is the real official Microsoft base domain?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Look for Microsoft's real official base domain.",
          "Do not copy the fake domain from the email.",
          "Use the real company domain only, like microsoft.com."
        ]
      },
      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Nice catch.\nThat was clone phishing.",
          lessons: [
            "Clone phishing often copies a normal business email style.",
            "A tiny sender-domain change can hide a fake email.",
            "Always verify invoice links through the official site."
          ]
        },
        good: {
          title: "Good choice!",
          bubble: "Safer move.\nStill be careful.",
          lessons: [
            "Official verification reduces risk.",
            "Reporting is even better in a workplace environment.",
            "Small domain changes are a major warning sign."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "That invoice was fake.",
          lessons: [
            "Attackers rely on familiar formatting.",
            "A cloned invoice can still be phishing.",
            "Check the sender and link before acting."
          ]
        }
      }
    },

    {
      id: "msg-2",
      folder: "Junk Email",
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
        <p>
          Portal:
          <a href="#" class="email-link" id="accountLink">Open Microsoft Billing</a>
        </p>
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
        "This email is in Junk Email, but folder placement is not proof by itself.",
        "Compare this message to the phishing ones.",
        "The sender domain and link both match the real company domain.",
        "The message tone is calm and does not pressure immediate action."
      ],
      verification: {
        prompt: "What is the real official Microsoft base domain?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Use the real official Microsoft domain.",
          "Do not enter the fake one from the phishing emails.",
          "Try again with the base domain only."
        ]
      },
      coach: {
        perfect: {
          title: "Correct!",
          bubble: "This one looks legitimate.",
          lessons: [
            "Not every message in Junk Email is malicious.",
            "You still verify using the official channel.",
            "Calm wording and matching domains are good signs."
          ]
        },
        good: {
          title: "Acceptable.",
          bubble: "Reporting is cautious.",
          lessons: [
            "This one appears legitimate.",
            "Verification through the official site is the best fit here.",
            "Use multiple clues, not just folder location."
          ]
        },
        bad: {
          title: "Too risky.",
          bubble: "Do not trust blindly.",
          lessons: [
            "Even legitimate-looking email should be checked.",
            "Do not use email position alone as proof.",
            "Official verification is safer than blind trust."
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
        <p>
          Confirm here:
          <a href="#" class="email-link hintable suspicious" id="accountLink">Confirm Invoice Access</a>
        </p>
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
        "This one uses a reply-style subject to look like part of a normal thread.",
        "The domain 'micosoft' is not the official Microsoft domain.",
        "The email creates urgency with account restriction language.",
        "This is a clone phishing pattern: similar format, different malicious domain."
      ],
      verification: {
        prompt: "What is the real official Microsoft base domain?",
        acceptedAnswers: ["microsoft.com", "www.microsoft.com"],
        retryGuidance: [
          "Use the real Microsoft domain only.",
          "Not the fake reply-to or fake sender domain.",
          "Try microsoft.com."
        ]
      },
      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Exactly right.\nThis was clone phishing.",
          lessons: [
            "Reply-style clone phishing abuses familiarity.",
            "Tiny spelling changes are a major warning sign.",
            "Urgency plus a fake domain is a strong phishing indicator."
          ]
        },
        good: {
          title: "Good choice!",
          bubble: "Safer than clicking.",
          lessons: [
            "Official verification helps avoid cloned messages.",
            "Reporting is still the best workplace action.",
            "The sender domain is the main giveaway here."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "That cloned reply was fake.",
          lessons: [
            "Attackers copy real email style to lower suspicion.",
            "Do not trust a subject line just because it looks familiar.",
            "Always inspect the actual domain."
          ]
        }
      }
    }
  ]
};
