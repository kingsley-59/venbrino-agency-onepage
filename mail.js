/* eslint-disable no-undef */
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
require('dotenv').config()

const smtpConfig = smtpTransport({
    host: 'mail.venbrinodevs.com',
    secure: false,
    // tls: {
    //     rejectUnauthorized: false
    // },
    port: 587,
    auth: {
        user: 'hello@venbrinodevs.com',
        pass: 'Gionee369258147@',
    }
})
const mailerConfig = {
    host: 'mail.venbrinodevs.com',
    secure: false,
    // tls: {
    //     rejectUnauthorized: false
    // },
    port: 587,
    auth: {
        user: 'hello@venbrinodevs.com',
        pass: 'Gionee369258147@',
    }
}

const transporter = nodemailer.createTransport(smtpConfig)

let mailOptions = {
    from: 'hello@venbrinodevs.com',
    sender: 'hello@venbrinodevs.com',
    to: 'kingsleyakahibe@gmail.com',
    replyTo: 'divine10646@gmail.com',
    subject: 'Here is the subject',
    html: '<h2>This is a another test email message.<h2/>',
};

(async function () {
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Info: ', info)
    } catch (error) {
        console.log({ error })
    }
})()
