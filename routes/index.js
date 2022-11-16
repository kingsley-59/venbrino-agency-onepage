const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
require('dotenv').config

const smtpConfig = smtpTransport({
    host: process.env.EMAIL_HOST,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    port: process.env.EMAIL_PORT ?? 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

const transporter = nodemailer.createTransport(smtpConfig)


router.get('/', (req, res) => {
    res.status(200).json({message: 'Server is still under construction.'})
})

router.post('/contact', async(req, res) => {
    const { name, email, phone, whatsapp, subject, interest, message} = req.body ?? {}
    if (!name || !email || !interest) {
        return res.status(400).json({message: 'Name, email and interest are required.'})
    }

    try {
        const info = await transporter.sendMail({
            from: `${process.env.CONTACT_NAME} <${process.env.CONTACT_NAME}>`,
            sender: email,
            to: process.env.CONTACT_EMAIL ?? 'ifeanyiagalaba6@gmail.com',
            replyTo: email,
            subject: subject,
            html: `
                <h3 style="margin-bottom: 20px;">You just received a message from ${name}</h3>
                <p>${message}</p>
            `,
            text: message,
            envelope: {
                from: email,
                to: process.env.CONTACT_EMAIL ?? 'ifeanyiagalaba6@gmail.com'
            }
        })
        console.log({mailInfo: info})
        res.status(200).send('Message send successfully. We will get back to you shortly')
    } catch (error) {
        console.log({error})
        res.status(500).send('Something went wrong. Please try again.')
    }

})

module.exports = router