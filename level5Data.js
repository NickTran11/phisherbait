window.LEVEL5_EMAIL = {
  scenario: {
    codename: "CRISTIANA BLUM",
    title: "Senior Project Manager, Westwood Web",
    description: "You are Cristiana Blum, a senior project manager at Westwood Web. Throughout the day, you receive internal updates, vendor emails, and targeted messages that appear connected to real work activity.",
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
    context: "This final level tests everything learned so far. Some messages are legitimate. Some are regular phishing attempts. Others are more advanced and reference real emails you received earlier. Compare messages carefully before acting.",
    initials: "CB"
  },

  folderName: "Inbox",

  messages: [
    {
      id: "msg-1",
      sender: "IT Help Desk",
      senderInitials: "IT",
      fromName: "IT Help Desk",
      fromEmail: "<helpdesk@westwoodweb.com>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 8:05 AM",
      subject: "Scheduled VPN maintenance tonight",
      previewTop: "Scheduled VPN maintenance tonight",
      previewBottom: "No action is required at this time.",
      external: false,
      suspicious: false,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>This is a reminder that scheduled VPN maintenance will take place tonight from 10:00 PM to 10:30 PM.</p>
        <p>No action is required from staff at this time.</p>
        <p>If any user verification becomes necessary, communication will come directly from the Westwood Web IT Help Desk.</p>
        <p>Thank you,<br>IT Help Desk<br>Westwood Web</p>
      `,

      inspector: {
        returnPath: "helpdesk@westwoodweb.com",
        replyTo: "helpdesk@westwoodweb.com",
        linkPreview: "https://support.westwoodweb.com/vpn-status"
      },

      correctAction: "callit",
      partialAction: "report",

      orderedHints: [
        "The sender domain matches Westwood Web.",
        "The message is informational and does not pressure you to act immediately.",
        "This email becomes important later because another message references this maintenance."
      ],

      coach: {
        perfect: {
          title: "Correct!",
          bubble: "Looks legitimate.\nNot every email is phishing.",
          lessons: [
            "Legitimate internal messages often use calm and routine language.",
            "Matching sender domains are a good sign, though not the only thing to check.",
            "This email provides context that can help you judge later messages."
          ]
        },
        good: {
          title: "Cautious choice",
          bubble: "Safe instinct.\nBut this one looks legitimate.",
          lessons: [
            "Reporting is safer than clicking, but not always the best answer.",
            "Players should learn to recognize both suspicious and legitimate communication.",
            "This message may serve as a comparison point later."
          ]
        },
        bad: {
          title: "Not ideal",
          bubble: "Too risky.\nRead first, then act.",
          lessons: [
            "Even harmless messages should be reviewed before interacting with them.",
            "This email did not contain strong red flags.",
            "The main value here is remembering the details for later comparison."
          ]
        }
      }
    },

    {
      id: "msg-2",
      sender: "IT Security Team",
      senderInitials: "IS",
      fromName: "IT Security Team",
      fromEmail: "<security@westwoodweb-vpnsecure.com>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 8:19 AM",
      subject: "Action Required: Verify VPN access before maintenance",
      previewTop: "Follow-up on VPN maintenance",
      previewBottom: "Verify access before 10 PM to avoid interruption.",
      external: true,
      suspicious: true,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>Following the VPN maintenance notice sent earlier this morning, your account must be verified before the scheduled maintenance window.</p>
        <p>Please complete the verification process below before 10:00 PM to avoid interruption to your remote access.</p>
        <p><a href="#">Verify VPN Access</a></p>
        <p>If you do not complete verification today, your account may be temporarily suspended during maintenance.</p>
        <p>IT Security Team</p>
      `,

      inspector: {
        returnPath: "verify@vpn-alert-system.net",
        replyTo: "support@westwoodweb-vpnsecure.com",
        linkPreview: "https://westwoodweb-vpnsecure.com/login"
      },

      correctAction: "report",
      partialAction: "callit",

      orderedHints: [
        "This email references the real IT email you saw earlier.",
        "The domain here does not match the legitimate Westwood Web IT domain.",
        "Spear phishing often reuses real business context to seem trustworthy."
      ],

      verification: {
        prompt: `Which domain belongs to the legitimate Westwood Web IT email you saw earlier?
Type A, B, or C.
A) westwoodweb-vpnsecure.com
B) westwoodweb.com
C) westwoodweb-helpdesk-alert.net`,
        acceptedAnswers: ["b"],
        retryGuidance: [
          "Compare this domain to the real IT message from earlier.",
          "The correct answer is the real Westwood Web company domain.",
          "Choose the option that matches the legitimate internal sender."
        ]
      },

      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Targeted spear phish.\nGood catch.",
          lessons: [
            "This attacker reused a real earlier email to make the message believable.",
            "Context does not make a message legitimate.",
            "Comparing the domain against the earlier real email reveals the fake."
          ]
        },
        good: {
          title: "Safer move",
          bubble: "Good instinct.\nStill report it.",
          lessons: [
            "Independent verification is safer than trusting the email.",
            "Because this is a phishing attempt, reporting it is the best answer.",
            "Security teams need these reports to protect other staff."
          ]
        },
        bad: {
          title: "Trap detected",
          bubble: "That was bait.\nLook closer next time.",
          lessons: [
            "Urgent verification requests are common phishing lures.",
            "This message leaned on a real earlier email to lower your guard.",
            "Always compare sender domains carefully."
          ]
        }
      }
    },

    {
      id: "msg-3",
      sender: "HR Benefits",
      senderInitials: "HR",
      fromName: "HR Benefits",
      fromEmail: "<benefits@westwoodweb.com>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 8:42 AM",
      subject: "Benefits enrollment reminder",
      previewTop: "Benefits enrollment reminder",
      previewBottom: "Use the employee portal if updates are needed.",
      external: false,
      suspicious: false,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>This is a reminder that benefits enrollment changes remain open through Friday.</p>
        <p>If you need to review or update your selections, please use the employee portal directly.</p>
        <p>No immediate action is required if your benefits are already up to date.</p>
        <p>Thank you,<br>HR Benefits<br>Westwood Web</p>
      `,

      inspector: {
        returnPath: "benefits@westwoodweb.com",
        replyTo: "benefits@westwoodweb.com",
        linkPreview: "https://portal.westwoodweb.com/benefits"
      },

      correctAction: "callit",
      partialAction: "report",

      orderedHints: [
        "The sender domain matches Westwood Web.",
        "The tone is routine and not manipulative.",
        "This message becomes useful when judging another HR-themed email later."
      ],

      coach: {
        perfect: {
          title: "Correct!",
          bubble: "Looks normal.\nKeep it in mind.",
          lessons: [
            "Routine messages help establish a baseline for legitimate communication.",
            "This email gives you a real HR sender to compare against later.",
            "Not every message with a link or portal reference is malicious."
          ]
        },
        good: {
          title: "Overly cautious",
          bubble: "Safe, but unnecessary.",
          lessons: [
            "Reporting every email is not mastery.",
            "This message looked consistent with normal internal HR communication.",
            "Later messages may rely on your ability to compare against this one."
          ]
        },
        bad: {
          title: "Not the best choice",
          bubble: "Slow down.\nRead the details.",
          lessons: [
            "The domain and tone here were consistent with a legitimate HR reminder.",
            "This message did not use strong urgency or suspicious wording.",
            "You will need this baseline for comparison later."
          ]
        }
      }
    },

    {
      id: "msg-4",
      sender: "HR Benefits",
      senderInitials: "HR",
      fromName: "HR Benefits",
      fromEmail: "<benefits@westwoodweb-benefits.org>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 9:04 AM",
      subject: "Follow-up on missed call about benefits update",
      previewTop: "Missed call earlier",
      previewBottom: "Please confirm benefits details now.",
      external: true,
      suspicious: true,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>We attempted to reach you earlier by phone regarding your benefits update but were unable to connect.</p>
        <p>Please confirm your current benefits information immediately so we can finalize your record before today's review cutoff.</p>
        <p><a href="#">Confirm Benefits</a></p>
        <p>If you do not complete the form today, your benefits record may remain incomplete.</p>
        <p>HR Benefits</p>
      `,

      inspector: {
        returnPath: "benefits@external-hr-system.net",
        replyTo: "support@westwoodweb-benefits.org",
        linkPreview: "https://westwoodweb-benefits.org/update"
      },

      correctAction: "report",
      partialAction: "callit",

      orderedHints: [
        "This email uses the same display name as the earlier HR message, but not the same domain.",
        "It references a phone call you cannot independently verify.",
        "This combines social engineering with context from legitimate internal business activity."
      ],

      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Multi-channel attack detected.",
          lessons: [
            "This is a spear phishing email using HR context and a claimed phone call.",
            "The display name imitates the legitimate HR sender from earlier.",
            "Comparing the real and fake sender domains is the fastest clue."
          ]
        },
        good: {
          title: "Safer move",
          bubble: "Reasonable caution.\nReporting is better.",
          lessons: [
            "Independent verification is still safer than trusting the email.",
            "Because this is a phishing attempt, reporting is the strongest action.",
            "Attackers often combine call references with email pressure."
          ]
        },
        bad: {
          title: "Too risky",
          bubble: "That was social engineering.",
          lessons: [
            "The attacker used HR authority plus a fake missed-call scenario.",
            "The sender domain did not match the legitimate HR email from earlier.",
            "Always compare similar emails before acting."
          ]
        }
      }
    },

    {
      id: "msg-5",
      sender: "VantageVerify Documents",
      senderInitials: "VV",
      fromName: "VantageVerify Documents",
      fromEmail: "<notifications@vantageverify.com>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 9:26 AM",
      subject: "Document shared with you by Westwood Web Legal",
      previewTop: "Document shared with you",
      previewBottom: "Review available from VantageVerify.",
      external: true,
      suspicious: false,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>Westwood Web Legal has shared a document with you for review through VantageVerify.</p>
        <p>You may review the document at your convenience using the VantageVerify portal.</p>
        <p>If you were not expecting a document, you may confirm with Legal directly before opening it.</p>
        <p>Regards,<br>VantageVerify Notifications</p>
      `,

      inspector: {
        returnPath: "notifications@vantageverify.com",
        replyTo: "notifications@vantageverify.com",
        linkPreview: "https://portal.vantageverify.com/document-review"
      },

      correctAction: "callit",
      partialAction: "report",

      orderedHints: [
        "This message is external, but external does not automatically mean phishing.",
        "The sender domain is consistent throughout the message.",
        "This email becomes important because a later clone phishing message imitates it."
      ],

      verification: {
        prompt: `Should this email be reported as phishing?
Type Yes or No.`,
        acceptedAnswers: ["no"],
        retryGuidance: [
          "Look carefully: external does not always mean malicious.",
          "The safest judgment here is that this is not automatically phishing.",
          "Answer Yes or No only."
        ]
      },

      coach: {
        perfect: {
          title: "Correct!",
          bubble: "Good judgment.\nExternal can still be legit.",
          lessons: [
            "A strong defender does not treat every external sender as malicious.",
            "This message looks plausible and gives you a useful baseline for a later clone phish.",
            "The wording encourages verification instead of pressure."
          ]
        },
        good: {
          title: "Very cautious",
          bubble: "Understandable.\nBut not the best call.",
          lessons: [
            "Over-reporting can create noise and reduce signal.",
            "This message did not show strong phishing indicators on its own.",
            "It becomes especially useful later as a comparison point."
          ]
        },
        bad: {
          title: "Too risky",
          bubble: "Not ideal.\nReview before acting.",
          lessons: [
            "Even legitimate vendor emails should be assessed carefully.",
            "This one did not show the same warning signs as the clone phish that follows later.",
            "The correct skill here is thoughtful review, not fast action."
          ]
        }
      }
    },

    {
      id: "msg-6",
      sender: "VantageVerify Documents",
      senderInitials: "VV",
      fromName: "VantageVerify Documents",
      fromEmail: "<noreply@vantageverify-docs.co>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 9:41 AM",
      subject: "Document resent: Signature required today",
      previewTop: "Document resent",
      previewBottom: "Urgent signature required before access expires.",
      external: true,
      suspicious: true,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>Your document has been resent because our system shows it was not completed.</p>
        <p>Please review and sign the document immediately to prevent expiration of your access.</p>
        <p><a href="#">Open Document</a></p>
        <p>This link expires today.</p>
        <p>VantageVerify Documents</p>
      `,

      inspector: {
        returnPath: "mailer@vv-notify-alerts.net",
        replyTo: "support@vantageverify-docs.co",
        linkPreview: "https://vantageverify-docs.co/review"
      },

      correctAction: "report",
      partialAction: "callit",

      orderedHints: [
        "This email imitates the legitimate VantageVerify email you saw earlier.",
        "The domain is not the same as the earlier legitimate vendor domain.",
        "Clone phishing often copies trusted services, with slightly changed sender details and stronger urgency."
      ],

      verification: {
        prompt: `Which is the safest action for this email?
Type A, B, or C.
A) Open the resent document link
B) Report phishing
C) Reply and ask if it is real`,
        acceptedAnswers: ["b"],
        retryGuidance: [
          "This message is imitating the earlier vendor email.",
          "Think about clone phishing and the safest workplace response.",
          "Choose A, B, or C only."
        ]
      },

      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Classic clone phishing.",
          lessons: [
            "This email copied the theme of a legitimate vendor email but changed the sender details.",
            "Clone phishing works best when a real earlier email lowers your guard.",
            "Comparing the two vendor emails reveals the fraud."
          ]
        },
        good: {
          title: "Safer move",
          bubble: "Good instinct.\nStill report it.",
          lessons: [
            "Verification helps, but this is clearly suspicious enough to report.",
            "The sender and reply-to details no longer match the legitimate vendor baseline.",
            "Strong urgency is a common giveaway."
          ]
        },
        bad: {
          title: "Caught by the clone",
          bubble: "That resend was fake.",
          lessons: [
            "Attackers often reuse familiar branding and recent topics.",
            "This is why comparing related messages matters.",
            "Urgent 'resent' emails deserve extra scrutiny."
          ]
        }
      }
    },

    {
      id: "msg-7",
      sender: "Finance Department",
      senderInitials: "FD",
      fromName: "Finance Department",
      fromEmail: "<finance@westwoodweb.com>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 10:02 AM",
      subject: "Expense report reminder",
      previewTop: "Expense report reminder",
      previewBottom: "Use the employee portal if updates are needed.",
      external: false,
      suspicious: false,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>This is a reminder to submit your current expense report before Friday.</p>
        <p>You may use the employee portal whenever convenient. No action is needed if your report has already been submitted.</p>
        <p>Thank you,<br>Finance Department<br>Westwood Web</p>
      `,

      inspector: {
        returnPath: "finance@westwoodweb.com",
        replyTo: "finance@westwoodweb.com",
        linkPreview: "https://portal.westwoodweb.com/expenses"
      },

      correctAction: "callit",
      partialAction: "report",

      orderedHints: [
        "This looks like a routine internal reminder.",
        "The sender domain matches Westwood Web.",
        "This gives you another example of how normal internal email usually sounds."
      ],

      coach: {
        perfect: {
          title: "Correct!",
          bubble: "Routine internal email.",
          lessons: [
            "Legitimate messages often avoid panic and pressure.",
            "This email matches the company's normal domain and tone.",
            "Recognizing normal messages is a key phishing defense skill."
          ]
        },
        good: {
          title: "Too cautious",
          bubble: "Safe, but not ideal.",
          lessons: [
            "There were no strong phishing indicators here.",
            "Reporting everything is not the same as analyzing carefully.",
            "The strongest players can tell good from bad."
          ]
        },
        bad: {
          title: "Not the best call",
          bubble: "Review the signs first.",
          lessons: [
            "This message had the characteristics of a routine internal reminder.",
            "The sender matched the company domain.",
            "This is another baseline message to compare against more suspicious ones."
          ]
        }
      }
    },

    {
      id: "msg-8",
      sender: "Amazon Rewards Center",
      senderInitials: "AM",
      fromName: "Amazon Rewards Center",
      fromEmail: "<offers@amazon-reward-center-mail.com>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 10:18 AM",
      subject: "Congratulations! Claim your Amazon gift card reward today",
      previewTop: "Congratulations! Claim your Amazon reward",
      previewBottom: "Limited claim spots remain today.",
      external: true,
      suspicious: true,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>Congratulations! You have been selected as one of today's lucky Amazon customers.</p>
        <p>You are eligible to claim a <strong>$100 Amazon gift card</strong> if you confirm your account now.</p>
        <p>We only have a few claim spots left today, so please act quickly before your reward expires.</p>
        <p><a href="#">Claim Reward</a></p>
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
        "This is a classic reward-bait phishing email.",
        "Urgency plus a prize is a very common phishing tactic.",
        "The sender, reply-to, and link do not match trusted Amazon domain patterns."
      ],

      coach: {
        perfect: {
          title: "Perfect!",
          bubble: "Classic phishing bait.",
          lessons: [
            "Reward lures try to trigger excitement before careful thinking.",
            "The sender details and domain patterns do not match a trusted brand.",
            "This is a straightforward phishing example compared with the more contextual attacks in this level."
          ]
        },
        good: {
          title: "Safer move",
          bubble: "Good instinct.\nStill report it.",
          lessons: [
            "Independent verification is safer than clicking.",
            "In a workplace environment, phishing should also be reported.",
            "Classic phishing still matters, even in a spear-phishing-heavy level."
          ]
        },
        bad: {
          title: "Too tempting",
          bubble: "That reward was bait.",
          lessons: [
            "Prize language and urgency are common phishing hallmarks.",
            "Brand names do not guarantee legitimacy.",
            "Always inspect sender and destination details."
          ]
        }
      }
    },

    {
      id: "msg-9",
      sender: "Microsoft Account Team",
      senderInitials: "MS",
      fromName: "Microsoft Account Team",
      fromEmail: "<no-reply@micros0ft-account-alert.com>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 10:33 AM",
      subject: "Your mailbox will be locked in 30 minutes",
      previewTop: "Mailbox warning",
      previewBottom: "Verify your account immediately.",
      external: true,
      suspicious: true,

      bodyHtml: `
        <p>Hello,</p>
        <p>We detected irregular activity associated with your mailbox and your account will be locked in 30 minutes unless verified.</p>
        <p>Please confirm your login information below to restore normal service.</p>
        <p><a href="#">Verify Mailbox</a></p>
        <p>Microsoft Account Team</p>
      `,

      inspector: {
        returnPath: "alert@account-security-reset.net",
        replyTo: "support@micros0ft-account-alert.com",
        linkPreview: "https://micros0ft-account-alert.com/verify"
      },

      correctAction: "report",
      partialAction: "callit",

      orderedHints: [
        "This is a classic account-lockout phishing tactic.",
        "The domain uses a lookalike spelling with a zero in place of an 'o'.",
        "Urgency around account access is meant to trigger panic."
      ],

      coach: {
        perfect: {
          title: "Correct!",
          bubble: "Another classic phish.",
          lessons: [
            "Account lockout threats are a common credential theft tactic.",
            "Lookalike domains are designed to fool quick readers.",
            "This is more direct than the spear phishing emails, but still dangerous."
          ]
        },
        good: {
          title: "Safer move",
          bubble: "Reasonable instinct.\nReport is best.",
          lessons: [
            "Checking through a trusted source is better than clicking.",
            "Because this is a phishing email, reporting is still the strongest answer.",
            "Urgency is often used to override good judgment."
          ]
        },
        bad: {
          title: "Risky choice",
          bubble: "That warning was fake.",
          lessons: [
            "Lookalike domains rely on users missing small spelling changes.",
            "Threatening account lockout is a classic panic lure.",
            "Never trust the link in an email like this."
          ]
        }
      }
    },

    {
      id: "msg-10",
      sender: "Calgary Web Summit",
      senderInitials: "CW",
      fromName: "Calgary Web Summit",
      fromEmail: "<events@calgarywebsummit.org>",
      toEmail: "Cristiana Blum",
      time: "Mon 3/16/2026 10:51 AM",
      subject: "Updated registration details for Thursday session",
      previewTop: "Updated registration details",
      previewBottom: "External event notice with revised room details.",
      external: true,
      suspicious: false,

      bodyHtml: `
        <p>Hello Cristiana,</p>
        <p>We're sending a quick update for Thursday's Calgary Web Summit leadership session.</p>
        <p>The room assignment has changed, and the updated registration details are now available through the event site.</p>
        <p>If you have already reviewed your registration, no additional action is required.</p>
        <p>Thanks,<br>Calgary Web Summit Events Team</p>
      `,

      inspector: {
        returnPath: "events@calgarywebsummit.org",
        replyTo: "events@calgarywebsummit.org",
        linkPreview: "https://calgarywebsummit.org/registration"
      },

      correctAction: "callit",
      partialAction: "report",

      orderedHints: [
        "This email is external, but nothing here strongly indicates phishing.",
        "The domain is consistent throughout the message.",
        "This final check tests whether you can avoid reporting every external message automatically."
      ],

      verification: {
        prompt: `Should this message be reported as phishing?
Type Yes or No.`,
        acceptedAnswers: ["no"],
        retryGuidance: [
          "Carefully review whether there are actual red flags here.",
          "This question tests whether you can avoid over-reporting.",
          "Answer Yes or No only."
        ]
      },

      coach: {
        perfect: {
          title: "Correct!",
          bubble: "Good judgment.\nNot everything is bait.",
          lessons: [
            "This message looks like a legitimate external event update.",
            "Good defenders avoid both false negatives and false positives.",
            "The final level is about judgment, not just suspicion."
          ]
        },
        good: {
          title: "Overly cautious",
          bubble: "Understandable.\nBut not the best answer.",
          lessons: [
            "Not every external message should be treated as phishing.",
            "Over-reporting can create unnecessary noise.",
            "This level rewards careful comparison and context."
          ]
        },
        bad: {
          title: "Not ideal",
          bubble: "Read carefully first.",
          lessons: [
            "This message did not contain the warning signs used by the phishing emails in this level.",
            "The sender and domain were consistent.",
            "The challenge here was to avoid mindless reporting."
          ]
        }
      }
    },

    {
  id: "msg-11",
  sender: "Alyssa Grant",
  senderInitials: "AG",
  fromName: "Alyssa Grant",
  fromEmail: "<alyssa.grant@westvvoodvveb.com>",
  toEmail: "Cristiana Blum",
  time: "Mon 3/16/2026 11:07 AM",
  subject: "Need the updated Q2 client brief before noon",
  previewTop: "Need the updated client brief",
  previewBottom: "Please send the latest file before noon.",
  external: true,
  suspicious: true,

  bodyHtml: `
    <p>Hi Cristiana,</p>
    <p>Can you send me the latest version of the Q2 client brief before noon?</p>
    <p>I want to review it before the leadership check-in and make sure we are using the updated version.</p>
    <p>Please reply with the file attached as soon as possible.</p>
    <p>Thanks,<br>Alyssa</p>
  `,

  inspector: {
    returnPath: "alyssa.grant@westvvoodvveb.com",
    replyTo: "alyssa.grant@westvvoodvveb.com",
    linkPreview: "No link in this message"
  },

  correctAction: "report",
  partialAction: "callit",

  orderedHints: [
    "The message sounds completely normal for a workplace request.",
    "The display name looks internal, but the sender domain is not the real Westwood Web domain.",
    "Look closely: the domain uses 'vv' in place of 'w' to imitate Westwood Web."
  ],

  verification: {
    prompt: `Which phishing type is used in this email?
Type A, B, C, or D.
A) Spear Phishing
B) Clone Phishing
C) Whaling
D) Smishing`,
    acceptedAnswers: ["b"],
    retryGuidance: [
      "Look for the real company spelling, not the lookalike version.",
      "The fake domain swaps letters to imitate the real one.",
      "Choose the legitimate Westwood Web domain."
    ]
  },

  coach: {
    perfect: {
      title: "Perfect!",
      bubble: "Yup thats right.",
      lessons: [
        "This message is dangerous because it looks like a normal coworker request.",
        "The biggest clue is the lookalike sender domain: 'westvvoodvveb.com' instead of 'westwoodweb.com'.",
        "Clone and impersonation attacks often rely on users trusting the display name without checking the full address."
      ]
    },
    good: {
      title: "Safer move",
      bubble: "Good instinct.\nStill report it.",
      lessons: [
        "Verifying through another channel is safer than trusting the email.",
        "Because the sender is impersonating a coworker, reporting is the strongest action.",
        "Internal-looking emails should still be checked carefully."
      ]
    },
    bad: {
      title: "Easy to miss",
      bubble: "That sender was fake.",
      lessons: [
        "This attack did not rely on rewards or panic.",
        "It used a routine workplace request and a lookalike domain instead.",
        "Always inspect the full sender address, even when the request seems normal."
      ]
    }
  }
},

{
  id: "msg-12",
  sender: "Alyssa Grant",
  senderInitials: "AG",
  fromName: "Alyssa Grant",
  fromEmail: "<alyssa.grant@westwoodweb.com>",
  toEmail: "Cristiana Blum",
  time: "Mon 3/16/2026 11:18 AM",
  subject: "Quick check - which client brief did legal get?",
  previewTop: "Quick check on client brief",
  previewBottom: "Need a quick reply before the meeting.",
  external: false,
  suspicious: false,

  bodyHtml: `
    <p>Hi Cristiana,</p>
    <p>Quick check before the leadership meeting — did Legal get the revised Q2 client brief or the earlier draft?</p>
    <p>If you know, just reply here so I can reference the right version in my notes.</p>
    <p>Thanks,<br>Alyssa</p>
  `,

  inspector: {
    returnPath: "alyssa.grant@westwoodweb.com",
    replyTo: "alyssa.grant@westwoodweb.com",
    linkPreview: "No link in this message"
  },

  correctAction: "reply",
  partialAction: "callit",

  orderedHints: [
    "The sender domain matches Westwood Web.",
    "This is a normal workplace question and does not ask for credentials, money, or unusual access.",
    "Some legitimate emails are brief or informal, especially between coworkers."
  ],

  verification: {
    prompt: `What is the best action for this email?
Type A, B, or C.
A) Report phishing
B) Reply to Alyssa
C) Delete the email`,
    acceptedAnswers: ["b"],
    retryGuidance: [
      "This message is a normal internal work question.",
      "Think about the action that best matches a legitimate coworker request.",
      "Choose A, B, or C only."
    ]
  },

  coach: {
    perfect: {
      title: "Correct!",
      bubble: "Legit coworker email.",
      lessons: [
        "Not every slightly informal email is suspicious.",
        "The sender domain matches Westwood Web and the request is normal for work.",
        "A strong defender knows when normal business communication should simply be answered."
      ]
    },
    good: {
      title: "Reasonable caution",
      bubble: "Safe instinct.\nBut reply is better.",
      lessons: [
        "Independent verification is safer than trusting unknown messages.",
        "Here, though, the email is legitimate and a normal reply is the best response.",
        "Level 5 tests judgment, not just suspicion."
      ]
    },
    bad: {
      title: "Too suspicious",
      bubble: "This one was real.",
      lessons: [
        "This email did not use phishing pressure tactics or suspicious domains.",
        "The request was work-related and appropriate for a coworker.",
        "Defenders need to avoid both missed phishing and unnecessary false alarms."
      ]
    }
  }
}
  ]
};