const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const serNameProvider = require('./middleware/service-name-provider')
const verifyAuth = require('../authentication-service/middleware/verifyAuth')

const port = process.env.PORT
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/:service_name/:service_function', serNameProvider, verifyAuth, async(req, res) => {
    try {
        const response = await req.service_function(req)
        if (response) res.send({ response })
        else res.send()
    } catch (error) {
        let resCode = 400
        if (error.message.indexOf('not found') != -1) resCode = 404
        res.status(resCode).send({ error: error.message })
    }
})

app.get('/:service_name/:service_function', serNameProvider, verifyAuth, async(req, res) => {
    try {
        const response = await req.service_function(req)
        res.send(response)
    } catch (error) {
        if (error.message.indexOf('find') != -1) return res.status(404).send({ error: error.message })
        res.status(400).send({ error: error.message })
    }

})

app.all('*', (req, res) => {
    res.status(400).send({
        error: "Path doesnt conform to \"service_name\\service_function\" pattern"
    })
})

app.listen(port, () => {
    console.log(chalk.blue(`Listening on port ${port}...`))
})