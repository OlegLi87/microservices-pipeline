const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let initializing = false;

class User {
    constructor(userName, password) {
        if (!initializing) throw new Error('Use createUser method to create User instance')
        this.userName = userName
        this.password = password
        initializing = false
    }

    static async createUser(userName, password) {
        initializing = true
        const hashedPassword = await bcrypt.hash(password, 8)
        return new User(userName, hashedPassword)
    }

    static generateAuthToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET)
    }

    static async comparePasswords(plainPassword, hashedPassword) {
        const isMatched = await bcrypt.compare(plainPassword, hashedPassword)
        return isMatched
    }
}

module.exports = User