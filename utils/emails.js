const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: "9fde3a32ccf7e5",
    pass: "a6793056274f41"
  }
})

function sendEmail(email, password) {
  message = {
    from: "admin@flymagine.com",
    to: email,
    subject: "Subject",
    html: "<h1>Holi, haciendo pruebas del correo</h1>"
      + `<h2>Esta es tu nueva contrasena ${password}</h2>`
  }
  transporter.sendMail(message, (err, info) => {
    if (err) return err
    else return info
  })
}

module.exports = {
  sendEmail
}
