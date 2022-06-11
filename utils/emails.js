const nodemailer = require('nodemailer')
const html = require('./assets/PasswordResetHTML')
require('dotenv').config()

const user = process.env.USER.toString()
const pass = process.env.PASS.toString()

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: user,
    pass: pass
  },
  tls: {
    rejectUnauthorized: false
  }
})

function sendEmail(email, password) {
  console.log(email, pass)
  message = {
    from: `"Soporte Flymagine" <${user}>`,
    to: email,
    subject: "¡Hey! Hemos recibido una solicitud de restablecimiento de contraseña. - Flymagine",
    html: html(password)
  }
  transporter.sendMail(message, (err, info) => {
    if (err) return err
    else return info
  })
}

module.exports = {
  sendEmail
}
