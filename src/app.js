const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.Port||3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//  Setup handlebars engine and use location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
 


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lee Varney'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lee'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lee',
        helpText: 'THis is to hlep you'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provider an address'
        })
    }

    // get geo code
//    geocode(req.query.address, (error, data) => {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })         
    })
    

    // res.send({
    //     location: 'phoenix',
    //     forecast: 'hot!',
    //     address: req.query.address

    // })

})

app.get('/products', (req, res) => {
        if (!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
            })            

        } else {

            res.send({
                products: [req.query]
            })
        }


    })


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Lee'
    })
    
})


app.get('*', (req, res) => {

    res.render('error', {
        title: '404',
        errorMsg: '404 Page not found',
        name: 'Lee'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server started on port ' + port)
})