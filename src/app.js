const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chidalu A'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chidalu A'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide a valid address'
        });
    }
    const address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }


            // console.log(location);
            // console.log(forecastData);
            res.send({
                forecast: forecastData,
                location,
                address
            })
        });
    });

});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For more help go to my github repository @A-Chidalu',
        title: 'Help',
        name: 'Chidalu A'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chidalu A',
        errorMessage: 'Help article not found.'
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);

    res.send({
        products: []
    })
});



// * is a wild-card that matches anything that hasnt been matched before
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Chidalu A',
        errorMessage: 'Page not found'
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});