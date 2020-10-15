const express = require("express");
const https = require("https");

const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")

})

app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "4a3a677093b8456721c9a8d38fc84f33"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            const temp = weatherData.main.temp
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The weather is currently" + weatherDescription + "</h1>")
            res.write("The temperature in " + query + " is " + temp + " degree celcius.")
            res.write("<img src= " + imageURL + ">")
            res.send();
        })
    })

})


app.listen(8080, function () {
    console.log("server is running on port");
})