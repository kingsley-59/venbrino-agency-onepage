const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
require('dotenv').config()


class MailService {
    constructor() {
        const smtpConfig = smtpTransport({
            host: process.env.SMTP_HOST,
            secure: false,
            tls: {
                rejectUnauthorized: false
            },
            port: 587,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
        
        this.transporter = nodemailer.createTransport(smtpConfig)
    }

    async sendMail(mailOptions = {}) {
        try {
            const info = await this.transporter.sendMail(mailOptions)
            console.log(info)
            return info
        } catch (error) {
            console.log('Error: ', error)
            throw new Error(error?.message)
        }
    }
}


module.exports = MailService