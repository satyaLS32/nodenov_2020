const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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'
sgMail.setApiKey(sendgridAPIKey)
sgMail.send({
  to: 'shivam.shrivastava@edureka.co',
  from: 'manprith.singh@edureka.co',
  subject: 'Hii Manprit',
  text: 'How much module have u completed?',
  html: '<strong>How much module have u completed?</strong>',
})