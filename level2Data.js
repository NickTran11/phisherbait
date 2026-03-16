window.LEVEL2_EMAIL = {

folderName: "Inbox",

messages: [

{
id: "msg1",

sender: "Microsoft Billing",
senderInitials: "MS",

fromName: "Microsoft Billing",
fromEmail: "<billing@rnicrosoft-support.com>",

toEmail: "Bach Tran",

time: "9:05 AM",

subject: "Invoice #45822 – Payment confirmation required",

previewTop: "Please confirm your Microsoft service payment",

previewBottom: "Email asking the user to verify payment information.",

external: true,
suspicious: true,

inspector: {
returnPath: "invoice@rnicrosoft-support.com",
replyTo: "billing-help@rnicrosoft-support.com",
linkPreview: "https://rnicrosoft-billing-confirm.com/payment"
},

correctAction: "report",
partialAction: "callit",

orderedHints: [
"The sender domain looks similar to Microsoft.",
"The letter 'm' has been replaced with 'rn'.",
"This technique is commonly used in phishing attacks.",
"The link domain is not Microsoft's real website."
]
},


{
id: "msg2",

sender: "Microsoft Billing",
senderInitials: "MS",

fromName: "Microsoft Billing",
fromEmail: "<billing@microsoft.com>",

toEmail: "Bach Tran",

time: "11:30 AM",

subject: "Invoice #45822 – Microsoft subscription receipt",

previewTop: "Official Microsoft subscription invoice",

previewBottom: "Legitimate billing email.",

external: false,
suspicious: false,

inspector: {
returnPath: "billing@microsoft.com",
replyTo: "billing@microsoft.com",
linkPreview: "https://account.microsoft.com/billing"
},

correctAction: "nothing",

orderedHints: [
"The sender domain matches the official Microsoft domain.",
"The return path and reply-to address are consistent.",
"The link domain belongs to Microsoft."
]
},


{
id: "msg3",

sender: "Microsoft Billing",
senderInitials: "MS",

fromName: "Microsoft Billing",
fromEmail: "<billing@rnicrosoft.com>",

toEmail: "Bach Tran",

time: "2:45 PM",

subject: "Invoice #45822 – Updated invoice copy",

previewTop: "Updated invoice attached",

previewBottom: "This email looks identical to the earlier invoice.",

external: true,
suspicious: true,

inspector: {
returnPath: "invoice@rnicrosoft-secure-billing.com",
replyTo: "support@rnicrosoft-billing-help.com",
linkPreview: "https://rnicrosoft-secure-billing.com/invoice"
},

correctAction: "report",
partialAction: "callit",

orderedHints: [
"Compare this message with the earlier legitimate invoice.",
"The formatting and subject are identical.",
"This is a clone phishing technique.",
"The sender domain is slightly altered."
]
}

]

};