const mysql = require('mysql2/promise')
const chalk = require('chalk')

const getMySQlConnection = async() => {
    const mysqlConnection = await mysql.createConnection({
        host: process.env.MYSQL_HOST_NAME,
        user: process.env.MYSQL_USER_NAME,
        database: process.env.MYSQL_DATABASE_NAME,
        password: process.env.MYSQL_DATABASE_PASSWORD
    })
    return mysqlConnection
}

module.exports = getMySQlConnection