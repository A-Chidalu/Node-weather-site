const request = require('request');

const forecast = (lati, longi, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=76bc2dc5cdc08a4f3fbaebe49075abe6&query=${lati},${longi}&units=f`;
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
                feelsLike: body.current.feelslike
            };
            callback(undefined, data);
            // console.log(response.body.current.weather_descriptions[0] + 
            //     `. It is currently ${response.body.current.temperature} degrees out. 
            //     It feels like ${response.body.current.feelslike} degrees out.`);
        }
    });

};

module.exports = forecast;