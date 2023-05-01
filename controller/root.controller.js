const dateService = require("../service/date.service");
const databaseService = require("../service/database.service");
const emailService = require("../service/email.service");

exports.get = async function(request, response) {
    response.status(200).end('Hi')
}

exports.getSend = async function(request, response) {
    try {
        const utc = await dateService.utc()

        const list = await databaseService.read(utc)
        const length = list != null ? list.length : 0
        console.log(`>> SNKRS list length : ${length}`)

        let emailSendResult = false
        if (list != null) {
            console.log(`>> SNKRS list send start`)

            const snkrUrl = 'https://www.nike.com/kr/launch/?type=upcoming'
            const emailHtml = []
            let top = `<h4>SNKRS</h4>`
            top += `<a href='${snkrUrl}'>SNKRS로 이동</a>`
            emailHtml.push(top)

            for (let element of list) {
                const time = new Date(element.time)
                const kst = await dateService.kst(time)

                let inner = `<h4>${element.name}</h4>`
                inner += `Date : ${kst}`
                inner += `</br>`
                inner += `<a href='${element.link}'>Link로 이동</a>`
                emailHtml.push(inner)
            }

            const recipients = [] // Your Email Set
            emailSendResult = await emailService.send(`SNKRS 알림 : ${length}`, emailHtml.join('</br></br>'), recipients)

            console.log(`>> SNKRS list send end`)
        }

        response.status(200)
            .json({
                success: emailSendResult,
            });
        return
    } catch (error) {
        console.log(error)
    }

    response.status(200)
        .json({
            success: 'Fail',
        });
}

exports.postSave = async function(request, response) {
    try {
        const name = request.body.name;
        const time = request.body.time;
        const link = request.body.link;
        const password = request.body.password;

        if (password !== process.env.SAVE_PASSWORD) {
            response.status(400)
                .json({
                    success: 'Fail',
                })
            return
        }

        const result = await databaseService.create(name, time, link)

        response.status(200)
            .json({
                success: result
            })
        return
    } catch (exception) {
        console.log(exception)
    }

    response.status(200)
        .json({
            success: 'Fail'
        })
}