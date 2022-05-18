const nodemailer = require('nodemailer')
const html = require('./assets/PasswordResetHTML')
require('dotenv').config()

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
})

function sendEmail(email, password) {
  message = {
    from: `"Soporte Flymagine" <${process.env.USER}>`,
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
