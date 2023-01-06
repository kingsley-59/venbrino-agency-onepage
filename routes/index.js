const express = require('express')
const router = express.Router()
const MailService = require('../service/MailService')
const mailService = new MailService()
require('dotenv').config()


router.get('/', (req, res) => {
    res.status(200).json({message: 'Server is still under construction.'})
})

router.get('/sendmail', async function (req, res) {
    console.log('sendmail request processing...')

    try {
        const info = await mailService.sendMail({
            from: 'VenbrinoDevs <hello@venbrinodevs.com>',
            sender: 'kingsleyakahibe@gmail.com',
            to: 'divine10646@gmail.com',
            bcc: 'kingsleyakahibe@gmail.com',
            replyTo: 'kingsleyakahibe@gmail.com',
            subject: 'Test project subject',
            html: '<h2>The project is still in test mode./n Stay tuned!<h2/>',
        })
        console.log('Info: ', info)
        res.send('Email sent!')
    } catch (error) {
        console.log('Error', error)
        res.send('An error occurred!')
    }
})

router.post('/contact', async(req, res) => {
    console.log(req.body)
    console.log('sendmail request processing...')
    const { name, email, phone, whatsapp, subject, interest, message} = req.body ?? {}
    if (!name || !email || !interest) {
        return res.status(400).json({message: 'Name, email and interest are required.'})
    }

    try {
        const info = await mailService.sendMail({
            from: `${process.env.CONTACT_NAME} <${process.env.CONTACT_EMAIL}>`,
            sender: email,
            to: process.env.CONTACT_EMAIL ?? 'ifeanyiagalaba6@gmail.com',
            bcc: email,
            replyTo: email,
            subject: subject,
            html: `
                <h3 style="margin-bottom: 20px;">You just received a message from ${name}</h3>
                <ul>
                    <li>Name: ${name}</li>
                    <li>Phone: ${phone}</li>
                    <li>Email: ${email}</li>
                    <li>Whatsapp: ${whatsapp}</li>
                    <li>Interest: ${interest}</li>
                    <li>Subject: ${subject}</li>
                </ul>
                <p>${message}</p>
            `,
            text: message,
        })
        console.log(info)
        res.status(200).json({status: 'success', message: 'Message sent successfully. We will get back to you shortly'})
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 'failed', error, message: 'Something went wrong. Please try again.'})
    }

})

module.exports = router