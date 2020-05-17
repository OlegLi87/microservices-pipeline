const User = require('../models/user')

const createUser = async user => {
    const mysqlConnection = await require('./mysql')()
    try {
        const query = `INSERT INTO User (username,password,token) VALUES (?,?,?)`
        let [rows] = await mysqlConnection.execute(query, [user.userName, user.password, 'token_placeholder'])

        const userId = rows.insertId
        return await updateToken(userId, mysqlConnection) // in real web project should be placed in clients cookies
    } catch (error) {
        throw error
    } finally {
        await mysqlConnection.end()
    }
}

const getUserByCredentials = async user_credentials => {
    const mysqlConnection = await require('./mysql')()
    try {
        const { userName, password } = user_credentials
        const query = `SELECT * FROM User WHERE username=?`

        const [rows] = await mysqlConnection.execute(query, [userName])
        if (rows.length < 1) throw new Error('User not found!')

        const hashedPassword = rows[0].Password;
        if (!(await User.comparePasswords(password, hashedPassword))) throw new Error('User not found!')
        return await updateToken(rows[0].idUser, mysqlConnection) // in real web project should be placed in clients cookies,
    } catch (error) {
        throw error
    } finally {
        await mysqlConnection.end()
    }
}

const getUserById = async userData => {
    const mysqlConnection = await require('../../authentication-service/db/mysql')()
    try {
        const { userId, token } = userData
        const query = 'select * from User where idUser=? and Token=?'
        return await mysqlConnection.execute(query, [userId, token])
    } catch (error) {
        throw error
    } finally {
        await mysqlConnection.end()
    }
}

const updateToken = async(userId, mysqlConnection) => {
    const token = User.generateAuthToken(userId)
    const updateTokenQuery = `UPDATE User SET token=? WHERE idUser=?`;
    await mysqlConnection.execute(updateTokenQuery, [token, userId])
    return token
}

module.exports = {
    createUser,
    getUserByCredentials,
    getUserById
}