const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.darksky.net/forecast/773fbd0672c0fa0ca7b048b238e9c163/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude) + '?units=si&lang=nb'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find weather for location, try new location!')
        } else {
            callback(undefined, body.daily.data[0].summary + ' Det er ' + body.currently.temperature + ' grader nå (i dag: høyeste temperatur - ' + body.daily.data[0].temperatureHigh + ' og laveste temperatur - ' + body.daily.data[0].temperatureLow + ' grader). Det er ' + body.currently.precipProbability * 100 + '% sannsynlighet for regn nå. UV indeks: ' + body.daily.data[0].uvIndex)
        }
    })
}

module.exports = forecast