const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7b7aa597876045257bc621be625f3534&query='+ latitude + ',' + longitude

    request({url, json: true }, (err, { body } = {}) => {
        if(err){
            callback('Unable to connect to weather services')
        } else if(body.error){
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature +' degrees out, It feels like '+ body.current.feelslike +' degrees. The humidity is ' + body.current.humidity +' %.')
        }
    })
}

module.exports = forecast