window.LEVEL5_EMAIL = {
  scenario: {
    codename: "CRISTIANA BLUM",
    title: "Project Manager",
    description: "You are Cristiana Blum, you manage multiple internal projects and coordinate with IT, HR, and external vendors.",
    profile: [
      "Work closely with IT, HR, and external services",
      "Review documents and internal update",
      "Receives high volume of emails daily"
    ],
    habits: [
      "Quickly scans emails due to busy schedule",
      "Trusts emails that reference recent work activity",
      "Occasionally click links directly instead of navigating manually"
    ],
    context: "Your goal is is to determine which messages are legitimate and which are phishing attempts.",
    initials: "CB"
  },

  folderName: "Inbox",
  messages: [
    {
      id: "msg-1",
      sender: "Amazon Rewards Center",
      senderInitials: "AM",
      fromName: "Amazon Rewards Center",
      fromEmail: "<offers@amazon-reward-center-mail.com>",
      toEmail: "Cristiana Blum",
      time: "Sun 3/15/2026 9:52 PM",
      subject: "Congratulations! Claim your Amazon gift card reward today",
      previewTop: "Congratulations! Claim your Amazon reward",
      previewBottom: "Check This!",
      external: true,
      suspicious: true,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>Congratulations! You have been selected as one of today’s lucky Amazon customers.</p>
        <p>You are eligible to claim a <strong>$100 Amazon gift card</strong> if you confirm your account now.</p>
        <p>We only have a few claim spots left today, so please act quickly before your reward expires.</p>
        <p>To confirm your eligibility, click <a href="#">Claim Reward</a>.</p>
        <p>Thank you,<br>Amazon Rewards Team</p>
      `,

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
      verification: {
        prompt: "In this email, Amazon is the company presented. What is the official website/domain of Amazon?",
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
      },
      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Well done.\nYou passed this level.",
          lessons: [
            "Urgency + reward bait is a classic phishing tactic.",
            "The sender, reply-to, and link domain do not match trusted Amazon patterns.",
            "Safest move: report it and use the official website manually."
          ]
        },
        good: {
          title: "Good choice!",
          bubble: "Nice.\nYou reduced risk.",
          lessons: [
            "Verifying through an official channel is much safer than clicking.",
            "Still, workplace security policy usually expects phishing to be reported.",
            "Good instinct — but there is an even better answer here."
          ]
        },
        bad: {
          title: "Got baited 😬",
          bubble: "Oof…\nThat link was bait.",
          lessons: [
            "Attackers want a fast click, not careful thinking.",
            "Never trust reward emails just because they look exciting.",
            "Check the real domain before you click anything."
          ]
        }
      }
    },

    {
  id: "msg-2",
  sender: "IT Help Desk",
  senderInitials: "IT",
  fromName: "IT Help Desk",
  fromEmail: "<helpdesk@company.com>",
  toEmail: "Cristiana Blum",
  time: "Mon 3/16/2026 8:05 AM",
  subject: "VPN maintenance scheduled today",
  previewTop: "Reminder: VPN maintenance",
  previewBottom: "No action required at this time.",
  external: false,
  suspicious: false,

  bodyHtml: `
    <p>Hello Cristiana,</p>
    <p>This is a reminder that VPN maintenance will occur today at 6PM.</p>
    <p>You do not need to take any action unless contacted by IT directly.</p>
    <p>Thanks,<br>IT Help Desk</p>
  `,

  inspector: {
    returnPath: "helpdesk@company.com",
    replyTo: "helpdesk@company.com",
    linkPreview: "https://support.company.com/vpn"
  },

  correctAction: "callit",
  partialAction: "report",

  orderedHints: [
    "Sender domain matches the company domain.",
    "The message is informational and not urgent.",
    "No request for credentials or sensitive actions."
  ],

  

  coach: {
    perfect: {
      title: "Correct!",
      bubble: "Nice.\nNot everything is phishing.",
      lessons: [
        "Legitimate emails usually don’t pressure you.",
        "They use official domains.",
        "Understanding normal emails helps spot abnormal ones."
      ]
    },
    good: {
      title: "Okay",
      bubble: "Safe, but cautious.",
      lessons: [
        "Over-reporting is safer than clicking.",
        "But learning to recognize legitimate emails is important."
      ]
    },
    bad: {
      title: "Careful",
      bubble: "That wasn’t necessary.",
      lessons: [
        "Clicking without thinking is risky.",
        "Even safe emails should be evaluated."
      ]
    }
  }
},

{
  id: "msg-3",
  sender: "IT Security Team",
  senderInitials: "IS",
  fromName: "IT Security Team",
  fromEmail: "<security@company-vpnsecure.com>",
  toEmail: "Cristiana Blum",
  time: "Mon 3/16/2026 8:18 AM",
  subject: "Action Required: VPN verification",
  previewTop: "Follow up on VPN update",
  previewBottom: "Verify access before 6PM.",
  external: true,
  suspicious: true,

  bodyHtml: `
    <p>Hello Cristiana,</p>
    <p>Following the VPN maintenance email sent earlier today, your account requires verification.</p>
    <p>Please confirm your credentials before the update window.</p>
    <p><a href="#">Verify VPN Access</a></p>
    <p>Failure to complete this may result in access suspension.</p>
    <p>IT Security</p>
  `,

  inspector: {
    returnPath: "verify@vpn-alert-system.net",
    replyTo: "support@company-vpnsecure.com",
    linkPreview: "https://company-vpnsecure.com/login"
  },

  correctAction: "report",
  partialAction: "callit",

  orderedHints: [
    "This email references a real earlier message.",
    "The sender domain is not the company domain.",
    "Spear phishing often uses real context to gain trust."
  ],

  verification: {
    prompt: "What domain should you use instead of this email link?",
    acceptedAnswers: ["company.com", "support.company.com"],
    retryGuidance: [
      "Do not use the fake VPN domain.",
      "Use the official company domain."
    ]
  },

  coach: {
    perfect: {
      title: "Perfect!",
      bubble: "Nice catch.\nThat was targeted.",
      lessons: [
        "Spear phishing uses real context.",
        "Always verify domains.",
        "Context ≠ legitimacy."
      ]
    },
    good: {
      title: "Good",
      bubble: "Safer move.",
      lessons: [
        "Verification helps.",
        "Reporting is still better."
      ]
    },
    bad: {
      title: "Uh oh",
      bubble: "That was a trap.",
      lessons: [
        "Attackers rely on urgency + context.",
        "Always check domains carefully."
      ]
    }
  }
},

{
  id: "msg-4",
  sender: "DocuSign",
  senderInitials: "DS",
  fromName: "DocuSign",
  fromEmail: "<noreply@docusign-secure-docs.co>",
  toEmail: "Cristiana Blum",
  time: "Mon 3/16/2026 9:10 AM",
  subject: "Document Resent: Signature Required",
  previewTop: "Resending document",
  previewBottom: "Please review again.",
  external: true,
  suspicious: true,

  bodyHtml: `
    <p>Hello,</p>
    <p>Your document was not completed earlier.</p>
    <p>Please review and sign it below.</p>
    <p><a href="#">Open Document</a></p>
    <p>DocuSign Team</p>
  `,

  inspector: {
    returnPath: "mailer@docusign-alerts.net",
    replyTo: "support@docusign-secure-docs.co",
    linkPreview: "https://docusign-secure-docs.co/review"
  },

  correctAction: "report",
  partialAction: "callit",

  orderedHints: [
    "Brand name looks trusted.",
    "Domain is NOT official DocuSign.",
    "Clone phishing resends fake documents."
  ],



  coach: {
    perfect: {
      title: "Correct!",
      bubble: "Classic clone phishing.",
      lessons: [
        "Attackers copy trusted brands.",
        "Always verify domains.",
        "Do not trust logos."
      ]
    },
    good: {
      title: "Good",
      bubble: "Safer choice.",
      lessons: [
        "Verification helps.",
        "Still report suspicious emails."
      ]
    },
    bad: {
      title: "Risky",
      bubble: "That link was fake.",
      lessons: [
        "Brand impersonation is common.",
        "Always inspect links."
      ]
    }
  }
},

{
  id: "msg-5",
  sender: "HR Benefits",
  senderInitials: "HR",
  fromName: "HR Benefits",
  fromEmail: "<benefits@company-benefits.org>",
  toEmail: "Cristiana Blum",
  time: "Mon 3/16/2026 9:40 AM",
  subject: "Follow-up on missed call",
  previewTop: "Missed call earlier",
  previewBottom: "Confirm benefits now.",
  external: true,
  suspicious: true,

  bodyHtml: `
    <p>Hello Cristiana,</p>
    <p>We tried reaching you earlier today regarding your benefits update.</p>
    <p>Please confirm your information below.</p>
    <p><a href="#">Confirm Benefits</a></p>
    <p>HR Team</p>
  `,

  inspector: {
    returnPath: "benefits@external-hr-system.net",
    replyTo: "support@company-benefits.org",
    linkPreview: "https://company-benefits.org/update"
  },

  correctAction: "report",
  partialAction: "callit",

  orderedHints: [
    "The email references a phone call.",
    "You cannot verify that call happened.",
    "Multi-channel attacks create urgency and trust."
  ],


  coach: {
    perfect: {
      title: "Perfect!",
      bubble: "Multi-channel attack detected.",
      lessons: [
        "Attackers combine phone + email.",
        "Always verify independently.",
        "Do not trust unverified calls."
      ]
    },
    good: {
      title: "Good",
      bubble: "Safer move.",
      lessons: [
        "Verification is key.",
        "Reporting is still best."
      ]
    },
    bad: {
      title: "Oops",
      bubble: "That was social engineering.",
      lessons: [
        "Attackers use multiple channels.",
        "Always verify independently."
      ]
    }
  }
}

  ]
};