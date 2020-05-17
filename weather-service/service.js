const getForecast = require('./utils/forecast')
const query_manager = require('./db/query-manager')

const getweather = async req => {
    const location = req.query.location
    if (!location) throw new Error('Location must be provided')
    const weather = await getForecast(location)
    if (weather) await query_manager.storeWeatherData(weather, req.userId)
    return weather
}

const getweatherhistory = async req => {
    const history = await query_manager.getWeatherHistory(req.userId)
    if (history.length === 0) return "There is no weather history to display"
    return history
}

const postrealfeeling = async req => {
    const location = req.body.location
    const realFeeling = req.body.realFeeling
    if (!location || !realFeeling) throw new Error('Provided data is unsufficient')
    await query_manager.storeRealFeeling(req.userId, location, realFeeling)
}

getweather.httpMethod = getweatherhistory.httpMethod = 'GET'
postrealfeeling.httpMethod = 'POST'

module.exports = {
    getweather,
    getweatherhistory,
    postrealfeeling
}