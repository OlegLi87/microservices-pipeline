require('./mongoose')
const Weather = require('./models/weather')
const RealFeeling = require('./models/real-feeling')

const storeWeatherData = async(weather, userId) => {
    const location = weather.city + "," + weather.country
    const weatherData = new Weather({
        userId,
        location,
        temperature: weather.temperature,
        humidity: weather.humidity,
        pressure: weather.pressure
    })
    await weatherData.save()
}

const getWeatherHistory = async userId => {
    return await Weather.find({ userId })
}

const storeRealFeeling = async(userId, location, realFeeling) => {
    const real_feeling = new RealFeeling({
        userId,
        location,
        realFeeling
    })

    await real_feeling.save()
}

module.exports = {
    storeWeatherData,
    getWeatherHistory,
    storeRealFeeling
}