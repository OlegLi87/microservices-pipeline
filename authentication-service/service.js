const query_manager = require('./db/query-manager')
const User = require('./models/user')

const signup = async req => {
    const { userName, password } = await checkQueryString(req.query)
    const user = await User.createUser(userName, password)
    const userToken = await query_manager.createUser(user)
    return userToken
}

const login = async req => {
    const { userName, password } = await checkQueryString(req.query)
    const userToken = await query_manager.getUserByCredentials({ userName, password })
    return userToken
}

const checkQueryString = async queryString => {
    const userName = queryString.username
    const password = queryString.password
    if (!userName || !password) throw new Error('Data is missing')
    return { userName, password }
}

signup.httpMethod = 'POST'
login.httpMethod = 'POST'

module.exports = {
    signup,
    login
}