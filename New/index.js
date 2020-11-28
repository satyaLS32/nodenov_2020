const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey);

const msg = {
  to: 'satyachowdary523@gmail.com',
  from: 'satyachowdary523@outlook.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg).then(() => {
    console.log('Message sent')
}).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
})