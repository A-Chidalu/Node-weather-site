const request = require('request');
require('dotenv').config();

const geocode = (address, callback) => {
   // console.log(typeof process.env.GEOCODE_KEY)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + `.json?access_token=${process.env.GEOCODE_KEY}&limit=1`;

    request({ url: url, json: true}, (error, { body }) => {
        if(error) {
            //Instead of logging the error to the console, we send it through the callback
            //to make sure geocode is as flexible as possible.
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;