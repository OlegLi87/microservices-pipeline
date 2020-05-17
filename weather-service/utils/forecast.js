const request = require('request-promise')

const getForecast = async location => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&q=${location}&units=metric&APPID=${process.env.WEATHER_MAP_API_KEY}`
    const json = true
    try {
        const weather = await request({ url, json })
        return {
            city: weather.city.name,
            country: weather.city.country,
            temperature: weather.list[0].main.temp + ' celsius',
            humidity: weather.list[0].main.humidity,
            pressure: weather.list[0].main.pressure
        }
    } catch (error) {
        throw new Error('Couldnt find weather forecast for this location')
    }
}

module.exports = getForecast