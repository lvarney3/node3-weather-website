const request = require('request')


const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHZhcm5leTMiLCJhIjoiY2p2ZzU2b3EwMDQzNDQ0czJ6YWVsYmg3aSJ9.Q54u_Mc1At4rfKK9frWCuQ&limit=1'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
                callback('Unable to connection to loaction services.', undefined)
                console.log('2')
            } else if (response.body.features.length === 0) {
            callback('Unable to find location.  Try again.', undefined)
            console.log('1')
        } else {
            callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0],
                    location: response.body.features[0].place_name
            })
            
        }
    })

}


module.exports = geocode