const mongoose = require('mongoose')

const weatherSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error('Id number must be positive')
        }
    },
    location: {
        type: String,
        required: true
    },
    temperature: {
        type: String,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    pressure: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Weather = mongoose.model('weather_logs', weatherSchema)

module.exports = Weather