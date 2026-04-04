        const messages = [
            { 
                id: 1, 
                sender: "+44 7700 900077", 
                text: "Hey! I dropped my phone in the toilet. This is my new number. Can you please pay this urgent bill for me? I'll pay you back tomorrow! <a href='#'>http://urgent-bill-pay.com/pay</a>", 
                isSmish: true, 
                choices: [
                    { 
                        text: "Reply: Who is this?", 
                        action: "reply",
                        followUp: {
                            sender: "+44 7700 900077",
                            text: "It's your oldest child! Please, I'm at the store and my card is declining. Just click the link and pay it, I'll explain later!",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: I don't have kids", 
                                    action: "reply",
                                    followUp: {
                                        sender: "+44 7700 900077",
                                        text: "Wait, what? I mean... I'm your nephew! Just help me out please! <a href='#'>http://urgent-bill-pay.com/pay</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Fine, let me check.", action: "reply" }
                                        ],
                                        consequenceType: 'contact_leak',
                                        consequenceText: "You kept engaging! The link installed malware in the background. The hacker is now sending this exact scam text to everyone in your contact list: Mom, Boss, Crush...",
                                        preview: {
                                            title: "Urgent Bill Payment Portal",
                                            domain: "urgent-bill-pay.com",
                                            image: "https://picsum.photos/seed/bill/400/200"
                                        }
                                    }
                                },
                                { 
                                    text: "Reply: Which child?", 
                                    action: "reply",
                                    followUp: {
                                        sender: "+44 7700 900077",
                                        text: "Your favorite one! Stop joking around, this is an emergency! The cashier is waiting. Please just pay it: <a href='#'>http://urgent-bill-pay.com/pay</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Fine, let me check.", action: "reply" }
                                        ],
                                        consequenceType: 'contact_leak',
                                        consequenceText: "You kept engaging! The link installed malware in the background. The hacker is now sending this exact scam text to everyone in your contact list: Mom, Boss, Crush...",
                                        preview: {
                                            title: "Urgent Bill Payment Portal",
                                            domain: "urgent-bill-pay.com",
                                            image: "https://picsum.photos/seed/bill/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    { 
                        text: "Reply: Nice try", 
                        action: "reply",
                        followUp: {
                            sender: "+44 7700 900077",
                            text: "What do you mean nice try? This is serious! I'm stuck at the register, please just help me out: <a href='#'>http://urgent-bill-pay.com/pay</a>",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: I'm calling the police", 
                                    action: "reply",
                                    followUp: {
                                        sender: "+44 7700 900077",
                                        text: "Please don't! Just click the link, I promise I'll pay you back double! <a href='#'>http://urgent-bill-pay.com/pay</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Fine, let me check.", action: "reply" }
                                        ],
                                        consequenceType: 'contact_leak',
                                        consequenceText: "You kept engaging! The link installed malware in the background. The hacker is now sending this exact scam text to everyone in your contact list: Mom, Boss, Crush...",
                                        preview: {
                                            title: "Urgent Bill Payment Portal",
                                            domain: "urgent-bill-pay.com",
                                            image: "https://picsum.photos/seed/bill/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            { 
                id: 2, 
                sender: "Domino's", 
                text: "Your pizza is out for delivery! Track your driver here: <a href='#'>https://dominos.com/track/xyz</a>", 
                isSmish: false,
                choices: [
                    { 
                        text: "Reply: Thanks!", 
                        action: "reply",
                        followUp: {
                            sender: "Domino's",
                            text: "You're welcome! Your driver, Dave, is 2 minutes away. Enjoy your meal!",
                            isSmish: false,
                            choices: [
                                { 
                                    text: "Reply: Great!", 
                                    action: "reply",
                                    followUp: {
                                        sender: "Domino's",
                                        text: "If you need anything else, just call the store. Have a great day!",
                                        isSmish: false,
                                        choices: [
                                            { text: "Reply: Will do.", action: "reply" }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    { 
                        text: "Reply: How long?", 
                        action: "reply",
                        followUp: {
                            sender: "Domino's",
                            text: "Your driver, Dave, is just pulling into your neighborhood now. Should be there in 2 minutes!",
                            isSmish: false,
                            choices: [
                                { 
                                    text: "Reply: Awesome, I'm starving.", 
                                    action: "reply",
                                    followUp: {
                                        sender: "Domino's",
                                        text: "Get ready! He's walking up to your door now.",
                                        isSmish: false,
                                        choices: [
                                            { text: "Reply: Thanks!", action: "reply" }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ],
                preview: {
                    title: "Domino's Pizza Tracker",
                    domain: "dominos.com",
                    image: "https://picsum.photos/seed/pizza/400/200"
                }
            },
            { 
                id: 3, 
                sender: "USPS", 
                text: "USPS: Your package was diverted due to an incorrect address. Please update your details within 2 hours or it will be returned: <a href='#'>usps-delivery-verify.top</a>", 
                isSmish: true, 
                choices: [
                    { 
                        text: "Reply: What package?", 
                        action: "reply",
                        followUp: {
                            sender: "USPS",
                            text: "Your recent online order #89210. We cannot disclose the contents for security reasons. Update your address now to avoid return shipping fees.",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: Can I pick it up?", 
                                    action: "reply",
                                    followUp: {
                                        sender: "USPS",
                                        text: "In-person pickup is unavailable. A redelivery fee of $1.99 is required. Please process it here immediately: <a href='#'>usps-delivery-verify.top/fee</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Okay, I'll pay it.", action: "reply" }
                                        ],
                                        consequenceType: 'glitch',
                                        consequenceText: "You kept engaging! A virus is taking over your display...",
                                        preview: {
                                            title: "USPS Tracking Update",
                                            domain: "usps-delivery-verify.top",
                                            image: "https://picsum.photos/seed/usps/400/200"
                                        }
                                    }
                                },
                                { 
                                    text: "Reply: How much is the fee?", 
                                    action: "reply",
                                    followUp: {
                                        sender: "USPS",
                                        text: "The redelivery fee is $1.99. Please process it here immediately to release your package: <a href='#'>usps-delivery-verify.top/fee</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Okay, I'll pay it.", action: "reply" }
                                        ],
                                        consequenceType: 'glitch',
                                        consequenceText: "You kept engaging! A virus is taking over your display...",
                                        preview: {
                                            title: "USPS Tracking Update",
                                            domain: "usps-delivery-verify.top",
                                            image: "https://picsum.photos/seed/usps/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    { 
                        text: "Reply: I didn't order anything", 
                        action: "reply",
                        followUp: {
                            sender: "USPS",
                            text: "Our records show a package addressed to you. If you believe this is an error, you must cancel the delivery fee here: <a href='#'>usps-delivery-verify.top/cancel</a>",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: Cancel it then.", 
                                    action: "reply",
                                    followUp: {
                                        sender: "USPS",
                                        text: "To cancel, a processing fee of $1.99 is required. Please process it here immediately: <a href='#'>usps-delivery-verify.top/fee</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Okay, I'll pay it.", action: "reply" }
                                        ],
                                        consequenceType: 'glitch',
                                        consequenceText: "You kept engaging! A virus is taking over your display...",
                                        preview: {
                                            title: "USPS Tracking Update",
                                            domain: "usps-delivery-verify.top",
                                            image: "https://picsum.photos/seed/usps/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            { 
                id: 4, 
                sender: "Sarah", 
                text: "Happy Birthday! See you at 7pm? - Sarah", 
                isSmish: false,
                choices: [
                    { 
                        text: "Reply: Thanks! See you then.", 
                        action: "reply",
                        followUp: {
                            sender: "Sarah",
                            text: "Awesome! I got you a little something 😉 We're meeting at The Rusty Spoon.",
                            isSmish: false,
                            choices: [
                                { 
                                    text: "Reply: Can't wait!", 
                                    action: "reply",
                                    followUp: {
                                        sender: "Sarah",
                                        text: "See ya! Don't be late!",
                                        isSmish: false,
                                        choices: [
                                            { text: "Reply: I won't be!", action: "reply" }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    { 
                        text: "Reply: Where are we meeting?", 
                        action: "reply",
                        followUp: {
                            sender: "Sarah",
                            text: "We're meeting at The Rusty Spoon at 7pm! Did you forget already? 😂",
                            isSmish: false,
                            choices: [
                                { 
                                    text: "Reply: Oh right, sorry!", 
                                    action: "reply",
                                    followUp: {
                                        sender: "Sarah",
                                        text: "No worries! See you there!",
                                        isSmish: false,
                                        choices: [
                                            { text: "Reply: See ya!", action: "reply" }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            { 
                id: 5, 
                sender: "BAnk-Alert", 
                text: "A login from [Strange City] was detected. If this wasn't you, secure your account NOW: <a href='#'>bit.ly/secure-bank-99</a>", 
                isSmish: true, 
                choices: [
                    { 
                        text: "Reply: It wasn't me!", 
                        action: "reply",
                        followUp: {
                            sender: "BAnk-Alert",
                            text: "WARNING: Unauthorized transfer of $450.00 initiated. To cancel this transaction, reply 'CANCEL'.",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: CANCEL", 
                                    action: "reply",
                                    followUp: {
                                        sender: "BAnk-Alert",
                                        text: "Cancellation request received. Please verify your identity by clicking the secure link to complete the cancellation: <a href='#'>bit.ly/secure-bank-99/cancel</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Okay", action: "reply" }
                                        ],
                                        consequenceType: 'auto_reply',
                                        consequenceText: "Your phone was hijacked! It just sent an embarrassing auto-reply to your Boss.",
                                        preview: {
                                            title: "Secure Your Account",
                                            domain: "bit.ly",
                                            image: "https://picsum.photos/seed/bank/400/200"
                                        }
                                    }
                                },
                                { 
                                    text: "Reply: Stop", 
                                    action: "reply",
                                    followUp: {
                                        sender: "BAnk-Alert",
                                        text: "Command not recognized. To cancel the $450.00 transfer, you MUST click the secure link: <a href='#'>bit.ly/secure-bank-99/cancel</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Okay", action: "reply" }
                                        ],
                                        consequenceType: 'auto_reply',
                                        consequenceText: "Your phone was hijacked! It just sent an embarrassing auto-reply to your Boss.",
                                        preview: {
                                            title: "Secure Your Account",
                                            domain: "bit.ly",
                                            image: "https://picsum.photos/seed/bank/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    { 
                        text: "Reply: Which bank?", 
                        action: "reply",
                        followUp: {
                            sender: "BAnk-Alert",
                            text: "This is the Fraud Prevention Department for your primary checking account. A transfer of $450.00 is pending. Reply 'CANCEL' to stop it.",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: CANCEL", 
                                    action: "reply",
                                    followUp: {
                                        sender: "BAnk-Alert",
                                        text: "Cancellation request received. Please verify your identity by clicking the secure link to complete the cancellation: <a href='#'>bit.ly/secure-bank-99/cancel</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Okay", action: "reply" }
                                        ],
                                        consequenceType: 'auto_reply',
                                        consequenceText: "Your phone was hijacked! It just sent an embarrassing auto-reply to your Boss.",
                                        preview: {
                                            title: "Secure Your Account",
                                            domain: "bit.ly",
                                            image: "https://picsum.photos/seed/bank/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            { 
                id: 6, 
                sender: "Chase Bank", 
                text: "Your 2-step verification code is 123-456. DO NOT share this with anyone. We will never call you to ask for this code.", 
                isSmish: false,
                choices: [
                    { 
                        text: "Reply: Thanks", 
                        action: "reply",
                        followUp: {
                            sender: "Chase Bank",
                            text: "This is an automated message. Replies are not monitored.",
                            isSmish: false,
                            choices: [
                                { 
                                    text: "Reply: OK", 
                                    action: "reply",
                                    followUp: {
                                        sender: "Chase Bank",
                                        text: "For customer service, please call the number on the back of your card.",
                                        isSmish: false,
                                        choices: [
                                            { text: "Reply: Got it.", action: "reply" }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            { 
                id: 7, 
                sender: "+1 (555) 019-8372", 
                text: "Hi Sarah, it was so nice meeting you at the networking event last night! Let's get coffee soon?", 
                isSmish: true, 
                choices: [
                    { 
                        text: "Reply: Wrong number", 
                        action: "reply",
                        followUp: {
                            sender: "+1 (555) 019-8372",
                            text: "Oh, I'm so sorry! My assistant must have saved it wrong. I'm Alex, by the way. Since we bumped into each other, maybe it's fate. Are you from around here?",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: Yes, I live in the city.", 
                                    action: "reply",
                                    followUp: {
                                        sender: "+1 (555) 019-8372",
                                        text: "Nice! I'm an investor from New York, just moved here. I'm trying to expand my professional network. Are you on LinkedIn? Let's connect: <a href='#'>linkedin-connect-profile.com/alex-invest</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Sure, I'll add you.", action: "reply" },
                                            { text: "Reply: That link looks weird.", action: "reply" }
                                        ],
                                        consequenceType: 'pig_butchering',
                                        consequenceText: "You kept engaging! This is a 'Pig Butchering' scam. They build trust over time to steal your money through fake crypto investments.",
                                        preview: {
                                            title: "LinkedIn: Alex Investor",
                                            domain: "linkedin-connect-profile.com",
                                            image: "https://picsum.photos/seed/linkedin/400/200"
                                        }
                                    }
                                },
                                { 
                                    text: "Reply: Who is this again?", 
                                    action: "reply",
                                    followUp: {
                                        sender: "+1 (555) 019-8372",
                                        text: "I'm Alex! I just moved here from New York. I'm an investor and always looking to meet new people. Let's connect on LinkedIn: <a href='#'>linkedin-connect-profile.com/alex-invest</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Sure, I'll add you.", action: "reply" },
                                            { text: "Reply: That link looks weird.", action: "reply" }
                                        ],
                                        consequenceType: 'pig_butchering',
                                        consequenceText: "You kept engaging! This is a 'Pig Butchering' scam. They build trust over time to steal your money through fake crypto investments.",
                                        preview: {
                                            title: "LinkedIn: Alex Investor",
                                            domain: "linkedin-connect-profile.com",
                                            image: "https://picsum.photos/seed/linkedin/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    { 
                        text: "Reply: Who is this?", 
                        action: "reply",
                        followUp: {
                            sender: "+1 (555) 019-8372",
                            text: "It's Alex! We met at the networking event. My assistant must have mixed up the numbers. But honestly, you seem cool. Are you from around here?",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: No, I'm not.", 
                                    action: "reply",
                                    followUp: {
                                        sender: "+1 (555) 019-8372",
                                        text: "Oh, well I travel a lot for my investing business anyway! Let's connect on LinkedIn, maybe we can do business: <a href='#'>linkedin-connect-profile.com/alex-invest</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Sure, I'll add you.", action: "reply" },
                                            { text: "Reply: That link looks weird.", action: "reply" }
                                        ],
                                        consequenceType: 'pig_butchering',
                                        consequenceText: "You kept engaging! This is a 'Pig Butchering' scam. They build trust over time to steal your money through fake crypto investments.",
                                        preview: {
                                            title: "LinkedIn: Alex Investor",
                                            domain: "linkedin-connect-profile.com",
                                            image: "https://picsum.photos/seed/linkedin/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            { 
                id: 8, 
                sender: "GOOGLE SECURITY", 
                text: "Someone just attempted to log in to your account from Moscow. If this wasn't you, reply 'STOP' to block the attempt.", 
                isSmish: true, 
                choices: [
                    { 
                        text: "Reply: STOP", 
                        action: "reply",
                        followUp: {
                            sender: "GOOGLE SECURITY",
                            text: "Understood. To confirm your identity and secure the account, we are sending a 6-digit code to your device.",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: Okay, waiting.", 
                                    action: "reply",
                                    followUp: {
                                        sender: "GOOGLE SECURITY",
                                        text: "Please reply with the 6-digit code you just received to finalize the block.",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: 123456", action: "reply" }
                                        ],
                                        consequenceType: '2fa_fatigue',
                                        consequenceText: "You fell for it! The hacker triggered a real 2FA reset and tricked you into handing over the code. They now have access to your account."
                                    }
                                }
                            ]
                        }
                    },
                    { 
                        text: "Reply: I didn't log in", 
                        action: "reply",
                        followUp: {
                            sender: "GOOGLE SECURITY",
                            text: "Security alert confirmed. We are sending a 6-digit verification code to your device to block the hacker.",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: Send it.", 
                                    action: "reply",
                                    followUp: {
                                        sender: "GOOGLE SECURITY",
                                        text: "Please reply with the 6-digit code you just received to finalize the block.",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: 123456", action: "reply" }
                                        ],
                                        consequenceType: '2fa_fatigue',
                                        consequenceText: "You fell for it! The hacker triggered a real 2FA reset and tricked you into handing over the code. They now have access to your account."
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            { 
                id: 9, 
                sender: "Amazon Recruitment", 
                text: "We are looking for remote product reviewers. Earn $200-$500/day. No experience needed. Start today by clicking your onboarding link: <a href='#'>work-at-amzn-portal.io</a>", 
                isSmish: true, 
                choices: [
                    { 
                        text: "Reply: I'm interested", 
                        action: "reply",
                        followUp: {
                            sender: "Amazon Recruitment",
                            text: "Yes, this is the official Amazon Remote Task program. You just rate products and get paid daily. We have 3 spots left. Can you start today?",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: Yes, I can start.", 
                                    action: "reply",
                                    followUp: {
                                        sender: "Amazon Recruitment",
                                        text: "Great! To set up your payroll account, we just need a fully refundable $50 verification deposit. Click here to pay and start earning: <a href='#'>work-at-amzn-portal.io/pay</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Seems sketchy", action: "reply" }
                                        ],
                                        consequenceType: 'task_scam',
                                        consequenceText: "You kept engaging! This is a Task Scam. You'll see a fake dashboard where your balance grows, but they'll demand a $50 'verification fee' to withdraw your earnings.",
                                        preview: {
                                            title: "Amazon Remote Onboarding",
                                            domain: "work-at-amzn-portal.io",
                                            image: "https://picsum.photos/seed/amazon/400/200"
                                        }
                                    }
                                },
                                { 
                                    text: "Reply: What do I need to do?", 
                                    action: "reply",
                                    followUp: {
                                        sender: "Amazon Recruitment",
                                        text: "It's simple! You just click links and rate products. But first, to set up your payroll, we need a $50 verification deposit. Click here: <a href='#'>work-at-amzn-portal.io/pay</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Seems sketchy", action: "reply" }
                                        ],
                                        consequenceType: 'task_scam',
                                        consequenceText: "You kept engaging! This is a Task Scam. You'll see a fake dashboard where your balance grows, but they'll demand a $50 'verification fee' to withdraw your earnings.",
                                        preview: {
                                            title: "Amazon Remote Onboarding",
                                            domain: "work-at-amzn-portal.io",
                                            image: "https://picsum.photos/seed/amazon/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    { 
                        text: "Reply: Is this real?", 
                        action: "reply",
                        followUp: {
                            sender: "Amazon Recruitment",
                            text: "100% real! We are an authorized Amazon partner. Our top earners make $1000/week. We only have 1 spot left, do you want it?",
                            isSmish: true,
                            choices: [
                                { 
                                    text: "Reply: Yes, I want it.", 
                                    action: "reply",
                                    followUp: {
                                        sender: "Amazon Recruitment",
                                        text: "Perfect! To secure your spot and set up payroll, we require a fully refundable $50 deposit. Click here to pay: <a href='#'>work-at-amzn-portal.io/pay</a>",
                                        isSmish: true,
                                        choices: [
                                            { text: "Reply: Seems sketchy", action: "reply" }
                                        ],
                                        consequenceType: 'task_scam',
                                        consequenceText: "You kept engaging! This is a Task Scam. You'll see a fake dashboard where your balance grows, but they'll demand a $50 'verification fee' to withdraw your earnings.",
                                        preview: {
                                            title: "Amazon Remote Onboarding",
                                            domain: "work-at-amzn-portal.io",
                                            image: "https://picsum.photos/seed/amazon/400/200"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ];

        // Shuffle messages
        messages.sort(() => Math.random() - 0.5);

        let currentCardIndex = 0;
        let batteryLevel = 100;
        let mistakes = 0;
        const maxMistakes = 3;
        let timerSeconds = 300; // 5 minutes
        let timerInterval;

        const stackEl = document.getElementById('card-stack');
        const batteryFill = document.getElementById('battery-fill');
        const clockEl = document.getElementById('clock');
        const phoneEl = document.getElementById('phone');
        
        const consequenceOverlay = document.getElementById('consequence-overlay');
        const consequenceTitle = document.getElementById('consequence-title');
        const consequenceText = document.getElementById('consequence-text');
        const btnContinue = document.getElementById('btn-continue');

        const endOverlay = document.getElementById('end-overlay');
        const endIcon = document.getElementById('end-icon');
        const endTitle = document.getElementById('end-title');
        const endMessage = document.getElementById('end-message');

        function initGame() {
            renderCards();
            startTimer();
            updateBattery();
        }

        function renderCards() {
            stackEl.innerHTML = '';
            // Render in reverse so the first is on top
            for (let i = messages.length - 1; i >= currentCardIndex; i--) {
                const msg = messages[i];
                const isTop = i === currentCardIndex;
                
                const card = document.createElement('div');
                card.className = 'swipe-card';
                card.dataset.index = i;
                
                // Stacking effect
                const offset = (i - currentCardIndex) * 4;
                const scale = 1 - ((i - currentCardIndex) * 0.05);
                card.style.transform = `translateY(${offset}px) scale(${scale})`;
                card.style.zIndex = messages.length - i;
                
                if (!isTop) {
                    card.style.pointerEvents = 'none';
                }

                const chatHistory = msg.history || [{ sender: msg.sender, text: msg.text }];
                
                let chatHTML = '';
                chatHistory.forEach(chat => {
                    if (chat.sender === 'Me') {
                        chatHTML += `
                            <div style="display: flex; width: 100%; margin-bottom: 12px; justify-content: flex-end;">
                                <div class="message-bubble" style="background-color: #007aff; color: white; border-bottom-right-radius: 4px; border-bottom-left-radius: 18px; transform-origin: bottom right;">${chat.text}</div>
                            </div>
                        `;
                    } else {
                        chatHTML += `
                            <div style="display: flex; width: 100%; margin-bottom: 12px; justify-content: flex-start;">
                                <div class="message-bubble" style="background-color: #e5e5ea; color: black; border-bottom-left-radius: 4px; border-bottom-right-radius: 18px;">${chat.text}</div>
                            </div>
                        `;
                    }
                });

                if (msg.isTyping) {
                    chatHTML += `
                        <div style="display: flex; width: 100%; margin-bottom: 12px; justify-content: flex-start;">
                            <div class="message-bubble typing-indicator" style="background-color: #e5e5ea; border-bottom-left-radius: 4px; border-bottom-right-radius: 18px;">
                                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                            </div>
                        </div>
                    `;
                }

                card.innerHTML = `
                    <div class="swipe-badge badge-keep">LEGIT</div>
                    <div class="swipe-badge badge-report">SCAM</div>
                    <div class="card-header">
                        <div class="card-header-avatar">${msg.sender.charAt(0).toUpperCase()}</div>
                        <div class="card-sender">${msg.sender}</div>
                    </div>
                    <div class="card-body">
                        ${chatHTML}
                        ${msg.choices ? `
                        <div class="dialogue-choices">
                            ${msg.choices.map(c => `
                                <button class="dialogue-btn" onclick="window.handleDialogueChoice('${c.action}', '${c.text.replace(/'/g, "\\'")}')">${c.text}</button>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                `;

                if (isTop) {
                    setupDragEvents(card);
                }

                stackEl.appendChild(card);
            }
        }

        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let isScrolling = false;
        let activeCard = null;

        window.handleDialogueChoice = function(action, choiceText) {
            if (activeCard && !isDragging) {
                if (action === 'reply') {
                    processReply(choiceText);
                } else {
                    currentX = action === 'keep' ? 150 : -150;
                    handleSwipe(action === 'keep' ? 'right' : 'left');
                }
            }
        };

        function processReply(choiceText) {
            const msg = messages[currentCardIndex];
            
            // 1. Prevent double-clicks while the "bot" is typing
            if (msg.isTyping) return;

            // 2. Initialize history if it's the first reply
            if (!msg.history) {
                msg.history = [{ sender: msg.sender, text: msg.text }];
            }
            
            // 3. Add user's selected reply to the chat history
            const cleanReply = choiceText.replace(/^Reply:\s*/i, '');
            msg.history.push({ sender: 'Me', text: cleanReply });
            
            // 4. Identify which choice was clicked to find its specific follow-up
            const originalChoices = msg.choices;
            const selectedChoice = originalChoices ? originalChoices.find(c => 
                c.text === choiceText || c.text.replace(/'/g, "\\'") === choiceText
            ) : null;
            
            // 5. Determine the next step
            const nextFollowUp = (selectedChoice && selectedChoice.followUp) ? selectedChoice.followUp : null;

            // 6. Logic for a Follow-Up Message
            if (nextFollowUp) {
                msg.isTyping = true;
                msg.choices = null; // Hide buttons while "typing"
                renderCards();
                scrollToBottom();

                msg.typingTimeout = setTimeout(() => {
                    msg.isTyping = false;
                    
                    // Push the new message into history
                    msg.history.push({ sender: nextFollowUp.sender, text: nextFollowUp.text });
                    
                    // Update the card's properties with the new data from the follow-up
                    msg.choices = nextFollowUp.choices;
                    if (nextFollowUp.isSmish !== undefined) msg.isSmish = nextFollowUp.isSmish;
                    if (nextFollowUp.consequenceType) msg.consequenceType = nextFollowUp.consequenceType;
                    if (nextFollowUp.consequenceText) msg.consequenceText = nextFollowUp.consequenceText;
                    
                    // Update preview if it exists
                    if (nextFollowUp.preview) {
                        msg.preview = nextFollowUp.preview;
                    }

                    renderCards();
                    scrollToBottom();
                }, 2000); // Reduced to 2s for better gameplay feel
            } 
            // 7. Logic for the END of a thread (where the bug was)
            else {
                msg.choices = null; // Remove buttons because the conversation is over
                renderCards();
                
                // If the conversation ends on a scam link/message, trigger the consequence
                if (msg.isSmish && msg.consequenceType) {
                    // Small delay so the user can read the last message before the "Game Over" screen
                    setTimeout(() => {
                        evaluateChoice('right', msg); // 'right' simulates "keeping" or "falling for" the message
                    }, 1000);
                } else {
                    // If it's a safe message (like Sarah's), just let it sit so the user can swipe right
                    scrollToBottom();
                }
            }
        }
        function scrollToBottom() {
            const cardBody = document.querySelector('.swipe-card[data-index="' + currentCardIndex + '"] .card-body');
            if (cardBody) {
                cardBody.scrollTop = cardBody.scrollHeight;
            }
        }

        function setupDragEvents(card) {
            activeCard = card;
            
            // REMOVE OR COMMENT OUT THESE LINES:
            //card.addEventListener('mousedown', dragStart);
            //card.addEventListener('touchstart', dragStart, {passive: true});
            
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('touchmove', dragMove, {passive: false});
            
            document.addEventListener('mouseup', dragEnd);
            document.addEventListener('touchend', dragEnd);
        }

        function dragStart(e) {
            if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') return; // Let links and buttons be clickable
            isDragging = true;
            isScrolling = false;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            startY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
            activeCard.classList.add('dragging');
        }

        function dragMove(e) {
            if (!isDragging) return;
            
            const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            const y = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
            const deltaX = x - startX;
            const deltaY = y - startY;
            
            if (!isScrolling) {
                // If moving vertically more than horizontally, treat as scroll
                if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 5) {
                    isScrolling = true;
                }
            }
            
            if (isScrolling) {
                return; // Let browser handle vertical scrolling
            }
            
            if (e.cancelable) {
                e.preventDefault(); // Prevent scrolling on touch when swiping horizontally
            }
            
            currentX = deltaX;
            
            const rotate = currentX * 0.05;
            activeCard.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
            
            const keepBadge = activeCard.querySelector('.badge-keep');
            const reportBadge = activeCard.querySelector('.badge-report');
            
            if (currentX > 50) {
                keepBadge.style.opacity = Math.min(1, currentX / 100);
                reportBadge.style.opacity = 0;
            } else if (currentX < -50) {
                reportBadge.style.opacity = Math.min(1, Math.abs(currentX) / 100);
                keepBadge.style.opacity = 0;
            } else {
                keepBadge.style.opacity = 0;
                reportBadge.style.opacity = 0;
            }
        }

        function dragEnd() {
            if (!isDragging) return;
            isDragging = false;
            activeCard.classList.remove('dragging');
            
            if (isScrolling) {
                activeCard.style.transform = '';
                const keepBadge = activeCard.querySelector('.badge-keep');
                const reportBadge = activeCard.querySelector('.badge-report');
                if (keepBadge) keepBadge.style.opacity = 0;
                if (reportBadge) reportBadge.style.opacity = 0;
                currentX = 0;
                return;
            }
            
            if (currentX > 100) {
                handleSwipe('right');
            } else if (currentX < -100) {
                handleSwipe('left');
            } else {
                // Reset
                activeCard.style.transform = '';
                const keepBadge = activeCard.querySelector('.badge-keep');
                const reportBadge = activeCard.querySelector('.badge-report');
                if (keepBadge) keepBadge.style.opacity = 0;
                if (reportBadge) reportBadge.style.opacity = 0;
            }
            currentX = 0;
        }

        function handleSwipe(direction) {
            const msg = messages[currentCardIndex];
            
            if (msg.typingTimeout) {
                clearTimeout(msg.typingTimeout);
            }
            
            // Animate card out
            activeCard.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            if (direction === 'reply') {
                activeCard.style.transform = `translateY(-1000px)`;
            } else {
                activeCard.style.transform = `translateX(${direction === 'right' ? 1000 : -1000}px) rotate(${direction === 'right' ? 30 : -30}deg)`;
            }
            activeCard.style.opacity = 0;
            
            // Cleanup listeners
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('touchmove', dragMove);
            document.removeEventListener('mouseup', dragEnd);
            document.removeEventListener('touchend', dragEnd);

            setTimeout(() => {
                evaluateChoice(direction, msg);
            }, 300);
        }

        // Button controls
        document.getElementById('btn-swipe-left').addEventListener('click', () => {
            if (activeCard && !isDragging) {
                currentX = -150;
                handleSwipe('left');
            }
        });
        document.getElementById('btn-swipe-right').addEventListener('click', () => {
            if (activeCard && !isDragging) {
                currentX = 150;
                handleSwipe('right');
            }
        });

        function evaluateChoice(direction, msg) {
            let isMistake = false;
            
            if (direction === 'right') { // Kept
                if (msg.isSmish) {
                    isMistake = true;
                    triggerConsequence(msg);
                }
            } else if (direction === 'left') { // Reported
                if (!msg.isSmish) {
                    isMistake = true;
                    // Minor penalty for blocking a safe message
                    triggerMinorPenalty();
                }
            }

            if (!isMistake) {
                nextCard();
            }
        }

        function triggerConsequence(msg) {
            mistakes++;
            updateBattery();
            
            consequenceTitle.innerText = "YOU GOT BAITED!";
            let extraHtml = '';

            if (msg.consequenceType === 'auto_reply') {
                extraHtml = `
                    <div class="imessage-fake">
                        <div class="imessage-header">To: Boss</div>
                        <div class="imessage-bubble">I'm quitting to become a professional kazoo player!</div>
                    </div>
                `;
            }

            consequenceText.innerHTML = msg.consequenceText + extraHtml;
            consequenceOverlay.classList.add('active');

            if (msg.consequenceType === 'glitch') {
                phoneEl.classList.add('glitch');
            }
        }

        function triggerMinorPenalty() {
            mistakes++;
            updateBattery();
            consequenceTitle.innerText = "OOPS!";
            consequenceText.innerHTML = "You just marked a safe message as a scam! Your friend/service might be blocked now.";
            consequenceOverlay.classList.add('active');
        }

        btnContinue.addEventListener('click', () => {
            consequenceOverlay.classList.remove('active');
            phoneEl.classList.remove('glitch');
            
            if (mistakes >= maxMistakes) {
                endGame(false);
            } else {
                nextCard();
            }
        });

        function nextCard() {
            currentCardIndex++;
            if (currentCardIndex >= messages.length) {
                endGame(true);
            } else {
                renderCards();
            }
        }

        function updateBattery() {
            batteryLevel = Math.max(0, 100 - (mistakes * 33.33));
            batteryFill.style.width = `${batteryLevel}%`;
            
            if (batteryLevel <= 35) {
                batteryFill.style.backgroundColor = '#ef4444'; // Red
            } else if (batteryLevel <= 70) {
                batteryFill.style.backgroundColor = '#eab308'; // Yellow
            } else {
                batteryFill.style.backgroundColor = '#22c55e'; // Green
            }
        }

        const trainTimerDisplay = document.getElementById('train-timer-display');

        function startTimer() {
            timerInterval = setInterval(() => {
                timerSeconds--;
                
                // Train board countdown (05:00 -> 00:00)
                const mDown = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
                const sDown = (timerSeconds % 60).toString().padStart(2, '0');
                if (trainTimerDisplay) {
                    trainTimerDisplay.innerText = `${mDown}:${sDown}`;
                }

                // Phone clock count up (08:00 -> 08:05)
                const elapsed = 300 - timerSeconds;
                const hUp = '08';
                const mUp = Math.floor(elapsed / 60).toString().padStart(2, '0');
                clockEl.innerText = `${hUp}:${mUp}`;
                
                if (timerSeconds <= 0) {
                    clearInterval(timerInterval);
                    endGame(false, "Time's up! You missed your train while sorting through messages.");
                }
            }, 1000);
        }

        function endGame(isWin, customMessage = null) {
            clearInterval(timerInterval);
            endOverlay.classList.add('active');
            
            const endStars = document.getElementById('end-stars');
            let earnedStars = 0;
            
            if (isWin) {
                endIcon.innerHTML = '🏆';
                endTitle.innerText = 'Commute Survived!';
                endTitle.style.color = '#4ade80';
                endMessage.innerHTML = 'You successfully sorted through the noise, avoided the smishing traps, and caught your train!';
                
                if (mistakes === 0) earnedStars = 3;
                else if (mistakes === 1) earnedStars = 2;
                else if (mistakes === 2) earnedStars = 1;
            } else {
                endIcon.innerHTML = '🪫';
                endTitle.innerText = 'Phone Compromised!';
                endTitle.style.color = '#ef4444';
                endMessage.innerHTML = customMessage || 'You fell for too many traps. Your battery died, your contacts are leaked, and your boss thinks you play the kazoo.';
                earnedStars = 0;
            }
            
            if (endStars) {
                let starsHtml = '';
                for (let i = 0; i < 3; i++) {
                    const isEarned = i < earnedStars;
                    const dimClass = isEarned ? '' : 'star-dim';
                    const delay = (i * 0.2) + 0.3; // Stagger animation
                    starsHtml += `<span class="star-anim ${dimClass}" style="animation-delay: ${delay}s;">⭐</span>`;
                }
                endStars.innerHTML = starsHtml;
            }
        }

        // Intercept link clicks inside cards
        document.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'a' && e.target.closest('.swipe-card')) {
                e.preventDefault();
                // Treat clicking a link as "Keeping" the message (swiping right)
                if (activeCard && !isDragging) {
                    currentX = 150;
                    handleSwipe('right');
                }
            }
        });

        // iOS Preview Logic
        const iosPreviewOverlay = document.getElementById('ios-preview-overlay');
        const iosPreviewImg = document.getElementById('ios-preview-img');
        const iosPreviewTitle = document.getElementById('ios-preview-title');
        const iosPreviewDomain = document.getElementById('ios-preview-domain');
        const iosPreviewBtnOpen = document.getElementById('ios-preview-btn-open');
        const iosPreviewBtnClose = document.getElementById('ios-preview-btn-close');

        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName.toLowerCase() === 'a' && e.target.closest('.swipe-card')) {
                e.preventDefault(); // Prevent default right-click menu
                
                const msg = messages[currentCardIndex];
                if (msg && msg.preview) {
                    iosPreviewImg.src = msg.preview.image;
                    iosPreviewTitle.innerText = msg.preview.title;
                    iosPreviewDomain.innerText = msg.preview.domain;
                } else {
                    // Fallback if no preview data
                    iosPreviewImg.src = "https://picsum.photos/seed/unknown/400/200";
                    iosPreviewTitle.innerText = "Unknown Link";
                    iosPreviewDomain.innerText = e.target.innerText || "unknown.com";
                }
                
                iosPreviewOverlay.classList.add('active');
            }
        });

        // Long press for touch devices
        let pressTimer;
        document.addEventListener('touchstart', (e) => {
            if (e.target.tagName.toLowerCase() === 'a' && e.target.closest('.swipe-card')) {
                pressTimer = window.setTimeout(() => {
                    const event = new MouseEvent('contextmenu', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    e.target.dispatchEvent(event);
                }, 500); // 500ms long press
            }
        }, {passive: true});

        document.addEventListener('touchend', () => clearTimeout(pressTimer));
        document.addEventListener('touchmove', () => clearTimeout(pressTimer), {passive: true});

        iosPreviewBtnClose.addEventListener('click', () => {
            iosPreviewOverlay.classList.remove('active');
        });

        iosPreviewBtnOpen.addEventListener('click', () => {
            iosPreviewOverlay.classList.remove('active');
            if (activeCard && !isDragging) {
                currentX = 150;
                handleSwipe('right');
            }
        });

        // Close preview when clicking outside
        iosPreviewOverlay.addEventListener('click', (e) => {
            if (e.target === iosPreviewOverlay) {
                iosPreviewOverlay.classList.remove('active');
            }
        });

        const startOverlay = document.getElementById('start-overlay');
        const btnStart = document.getElementById('btn-start');
        const learnOverlay = document.getElementById('learn-overlay');
        const btnLearn = document.getElementById('btn-learn');

        btnStart.addEventListener('click', () => {
            startOverlay.classList.remove('active');
            initGame();
            if (musicToggle.checked) {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
            }
        });

        btnLearn.addEventListener('click', () => {
            endOverlay.classList.remove('active');
            learnOverlay.classList.add('active');
        });

        // Settings logic
        const settingsOverlay = document.getElementById('settings-overlay');
        const bgMusic = document.getElementById('bg-music');
        const musicToggle = document.getElementById('music-toggle');

        window.toggleSettings = function() {
            settingsOverlay.classList.toggle('active');
        };

        window.updateVolume = function() {
            const volumeSlider = document.getElementById('volume-slider');
            if (bgMusic && volumeSlider) {
                bgMusic.volume = volumeSlider.value / 100;
            }
        };

        // Initialize volume
        window.updateVolume();

        window.toggleMusic = function() {
            if (musicToggle.checked) {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
            } else {
                bgMusic.pause();
            }
        };

        window.logout = function() {
            // Simple logout behavior
            window.location.href = 'level3.html';
        };
