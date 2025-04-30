const nodemailer = require("nodemailer")
const emailManager = async (to,subject,html, text ) => {
    // Looking to send emails in production? Check out our Email API/SMTP product!
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ea9f630d55a164",
      pass: process.env.nodeMailer_key,
    },
  });

  transport.sendMail({
    to: to,
    from: "info@expenso.com",
    subject:subject,
    html:html,
    text: text,
  })

}

module.exports = emailManager