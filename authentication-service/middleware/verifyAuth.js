const jwt = require('jsonwebtoken')
const queryManager = require('../db/query-manager')

const verifyAuth = async(req, res, next) => {
    if (req.params.service_name.toLowerCase().indexOf('weather') == -1) return next()
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id
        const queryResponse = await queryManager.getUserById({ userId, token })
        if (queryResponse.length === 0) return res.status(401).send('Must be logged in')
        req.userId = userId
        next()
    } catch (error) {
        res.status(401).send({ error })
    }
}

module.exports = verifyAuth