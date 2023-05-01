const nodemailer = require('nodemailer')

module.exports.send = async function send(text, html, recipients) {
    return new Promise(async resolve => {
        const subject = process.env.EMAIL_SUBJECT
        const userName = process.env.GOOGLE_USER_NAME
        const emailUser = process.env.GOOGLE_EMAIL
        const emailPass = process.env.GOOGLE_PASSWORD

        for (const recipient of recipients) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: `"${userName}" <${emailUser}>`,
                to: recipient,
                subject: `${subject}`,
                text: text,
                html: html,
            })
        }

        resolve("Success")
    })
}
