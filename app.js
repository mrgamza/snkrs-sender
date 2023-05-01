const express = require('express')
const rootController = require('./controller/root.controller');
const dateService = require('./service/date.service')
const http = require("http");

// Used to keep the server when using heroku, etc.
function startInterval() {
    setInterval(function() {
        console.log('>> Start check every minute.')
        if (process.env.PROFILE === 'prod') {
            http.get('') // Set your production server
        } else {
            http.get('http://localhost:3000/send')
        }
    }, 60000)
}

const app = express()
app.use(express.json())

app.route("/").get(rootController.get)
app.route("/send").get(rootController.getSend)
app.route("/save").post(rootController.postSave)

const port = process.env.PORT || 3000
app.listen(port, async () => {
    const text = `SNKRS-sender service start.
 _   _      _ _       
| | | | ___| | | ___  
| |_| |/ _ \\ | |/ _ \\ 
|  _  |  __/ | | (_) |
|_| |_|\\___|_|_|\\___/ 
`
    console.log(text)

    const dateTime = await dateService.utc()
    console.log(`Server time : ${dateTime}`)

    // startInterval()
})
