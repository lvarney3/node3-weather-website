const request = require('request')

//  //const WeatherUrl = 'https://api.darksky.net/forecast/cdcadad1c14a4b846410cafe51e5db8c/' + lat + ',' + long
// const WeatherUrl = 'https://api.darksky.net/forecast/cdcadad1c14a4b846410cafe51e5db8c/37.82,44'

//  request({ url: WeatherUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service.')
//     } else if (response.body.error) {   
//         console.log('Unable to find location')

//     } else {
//      console.log('High: ' + response.body.daily.data[0].summary)
//      console.log('Temp: ' + response.body.currently.temperature + ' and Chance of rain: ' + response.body.currently.precipProbability)
//     }    

//  })

const forecast = (latitude, longitude, callback) => {
    const WeatherUrl = 'https://api.darksky.net/forecast/cdcadad1c14a4b846410cafe51e5db8c/' + latitude + ',' + longitude

    request({ url: WeatherUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (response.body.error) {   
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, 'High: ' + response.body.daily.data[0].summary + 'Temp: ' + response.body.currently.temperature + ' and Chance of rain: ' + response.body.currently.precipProbability)
        }    

     })

}


module.exports = forecast