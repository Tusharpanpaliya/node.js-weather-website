const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tushar Panpaliya'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Tushar Panpaliya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'Some Helpful Text',
        title: 'Help Page',
        name: 'Tushar Panpaliya'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            err: 'You must provide an address'
        })
    }
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err){
            return res.send({ err })
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if(err){
                return res.send({ err })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    }) 
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            err: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Tushar Panpaliya',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tushar Panpaliya',
        errorMessage: 'Page Not Found'
    })
})

app.listen( port ,() => {
    console.log('Server is up on port : ' + port)
})  