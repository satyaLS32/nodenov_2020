const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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'
sgMail.setApiKey(sendgridAPIKey)
sgMail.send({
  to: 'abca7033@gmail.com',
  from: 'satyachowdary523@gmail.com',
  subject: 'Hii Manprit',
  text: 'How much module have u completed?',
  html: '<strong>How much module have u completed?</strong>',
})