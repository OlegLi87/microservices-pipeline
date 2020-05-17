const services = {}
services.authentication_service = require('../../authentication-service/service')
services.weather_service = require('../../weather-service/service')

const serNameProvider = (req, res, next) => {
    const serviceName = req.params.service_name.toLowerCase()
    const serviceFunction = req.params.service_function.toLowerCase()

    if (!(serviceName in services)) return res.status(404).send({
        error: 'Service not found'
    })
    if (!(serviceFunction in services[serviceName])) return res.status(404).send({
        error: 'Operation not found for this service'
    })

    req.service_function = services[serviceName][serviceFunction]

    if (req.service_function.httpMethod != req.method) return res.status(405).send({
        error: `Use ${req.service_function.httpMethod} method instead`
    })
    next()
}

module.exports = serNameProvider