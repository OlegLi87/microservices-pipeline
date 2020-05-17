const mongoose = require('mongoose')

const realFeelingSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        validate(val) {
            if (val < 0) throw new Error('Id number must be positive')
        }
    },
    location: {
        type: String,
        required: true
    },
    realFeeling: {
        type: String,
        required: true
    },

}, { timestamps: true })

const RealFeeling = mongoose.model('real_feeling_logs', realFeelingSchema)

module.exports = RealFeeling