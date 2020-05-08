const request = require('request');
const API_KEYS = require('config');

const forecast = (lati, longi, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${API_KEYS.weatherKey}&query=${lati},${longi}&units=f`;
    request({ url, json: true }, (error, { body }) => {
        if (error) { //error's usually happen on lower level os issues like lack of internet connection
            //console.log('Unable to connect to weather service!');
            callback('Unable to connect to weather service!', undefined);
        } 
        else if(body.error) { //This is if the reponse is some kind of 400 error
            console.log('Unable to find location');
            callback(undefined, 'Unable to find location');
        } 
        else {
            const data = {
                weather_description: body.current.weather_descriptions[0],
                curr_temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                windSpeed: body.current.wind_speed,
                uv_index: body.current.uv_index,
            };

            const forecastString = 'It is currently ' + data.weather_description
            + ' The current temperature is: ' + data.curr_temp + ' but it feels like: ' + data.feelsLike + ' the current windspeed is: ' + data.windSpeed 
            + ' and the UV index is: ' + data.uv_index;
            callback(undefined, forecastString);
            // console.log(response.body.current.weather_descriptions[0] + 
            //     `. It is currently ${response.body.current.temperature} degrees out. 
            //     It feels like ${response.body.current.feelslike} degrees out.`);
        }
    });

};

module.exports = forecast;