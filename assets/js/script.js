// Pointers
var searchButton = document.getElementById('button-search');

// Card Image Function
function imageWeather (icon) {
    if (icon == "01d" || icon == "01n") {
        return "./assets/images/clear_sky.jpeg";
    } else if (icon == "02d" || icon == "02n") {
        return "./assets/images/few_clouds.jpeg";
    } else if (icon == "03d" || icon == "03n") {
        return "./assets/images/scattered_clouds.jpeg";
    } else if (icon == "04d" || icon == "04n") {
        return "./assets/images/broken_clouds.jpeg";
    } else if (icon == "09d" || icon == "09n") {
        return "./assets/images/light_rain.jpeg";
    } else if (icon == "10d" || icon == "10n") {
        return "./assets/images/rain.jpeg";
    } else if (icon == "11d" || icon == "11n") {
        return "./assets/images/thunderstorm.jpeg";
    } else if (icon == "13d" || icon == "13n") {
        return "./assets/images/snow.jpeg";
    } else if (icon == "50d" || icon == "50n") {
        return "./assets/images/mist.jpeg";
    };
};

// Initialize
function init() {
    document.getElementById("selected-city").style.setProperty("visibility", "hidden");
};
init();

// WORK
searchButton.addEventListener('click', function getCity() {

    // Pointers (locally)
    var cityTitle = document.getElementById('city-date');
    var currentImg = document.getElementById('current-weather-image');
    var inputField = document.getElementById('input-field').value;

    // Fetch Sequence for Main Weather
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputField + "&units=imperial&appid=22bb6e2db366aab8539ac22df7b32d3a";

    fetch(requestUrl)
    .then(function(response) {

        // Status check for inputed city
        if (response.status == 200) {
            document.getElementById("selected-city").style.setProperty("visibility", "initial");
            return response.json();
        } else {
            document.getElementById("selected-city").style.setProperty("visibility", "hidden");
            return;
        };
    })
    .then(function(data) {
        // Weather Variables
        var currentLat = data.coord.lat;
        var currentLon = data.coord.lon;
        var currentTime = moment().utcOffset(data.timezone / 60).format("M/D/YYYY");
        var mainImg = data.weather[0].icon;
        var mainTemp = data.main.temp;
        var mainHumidity = data.main.humidity;
        var mainWind = data.wind.speed;

        // Fetch sequence for UV Index
        var UVUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&appid=22bb6e2db366aab8539ac22df7b32d3a";
        
        fetch(UVUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Update UVI Related Information
            var mainUV = data.current.uvi;
            document.getElementById("main-uv").innerHTML = mainUV;

            // Update UVI color block
            if (mainUV <= 2) {
                document.getElementById("main-uv").style.setProperty("background-color", "rgb(67,185,30)");

            } else if (mainUV <= 5) {
                document.getElementById("main-uv").style.setProperty("background-color", "rgb(252,199,33)");

            } else if (mainUV <= 7) {
                document.getElementById("main-uv").style.setProperty("background-color", "rgb(251,116,27)");

            } else if (mainUV <= 10) {
                document.getElementById("main-uv").style.setProperty("background-color", "rgb(248,17,22)");

            } else {
                document.getElementById("main-uv").style.setProperty("background-color", "rgb(134,111,255)");

            };

            // Update Html Elements
            cityTitle.innerHTML = inputField.toUpperCase() + " (" + currentTime + ")";
            currentImg.setAttribute("src", imageWeather(mainImg));
            document.getElementById("main-temp").innerHTML = mainTemp;
            document.getElementById("main-humidity").innerHTML = mainHumidity;
            document.getElementById("main-wind").innerHTML = mainWind;

        });

        // Fetch Sequence for 5-Day Forecast
        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + inputField + "&units=imperial&appid=22bb6e2db366aab8539ac22df7b32d3a";

        fetch(forecastUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Forecast Variables
            var day1Time = moment().utcOffset(data.timezone / 60).add(1,"d").format("M/D/YY");
            var day2Time = moment().utcOffset(data.timezone / 60).add(2,"d").format("M/D/YY");
            var day3Time = moment().utcOffset(data.timezone / 60).add(3,"d").format("M/D/YY");
            var day4Time = moment().utcOffset(data.timezone / 60).add(4,"d").format("M/D/YY");
            var day5Time = moment().utcOffset(data.timezone / 60).add(5,"d").format("M/D/YY");
            var day1Temp = data.list[7].main.temp;
            var day2Temp = data.list[15].main.temp;
            var day3Temp = data.list[23].main.temp;
            var day4Temp = data.list[31].main.temp;
            var day5Temp = data.list[39].main.temp;
            var day1Humi = data.list[7].main.humidity;
            var day2Humi = data.list[15].main.humidity;
            var day3Humi = data.list[23].main.humidity;
            var day4Humi = data.list[31].main.humidity;
            var day5Humi = data.list[39].main.humidity;
            var day1Icon = data.list[7].weather[0].icon;
            var day2Icon = data.list[15].weather[0].icon;
            var day3Icon = data.list[23].weather[0].icon;
            var day4Icon = data.list[31].weather[0].icon;
            var day5Icon = data.list[39].weather[0].icon;

            // Insert HTML
            document.getElementById("day1-date").innerHTML = day1Time;
            document.getElementById("day2-date").innerHTML = day2Time;
            document.getElementById("day3-date").innerHTML = day3Time;
            document.getElementById("day4-date").innerHTML = day4Time;
            document.getElementById("day5-date").innerHTML = day5Time;
            document.getElementById("day1-temp").innerHTML = day1Temp;
            document.getElementById("day2-temp").innerHTML = day2Temp;
            document.getElementById("day3-temp").innerHTML = day3Temp;
            document.getElementById("day4-temp").innerHTML = day4Temp;
            document.getElementById("day5-temp").innerHTML = day5Temp;
            document.getElementById("day1-humi").innerHTML = day1Humi;
            document.getElementById("day2-humi").innerHTML = day2Humi;
            document.getElementById("day3-humi").innerHTML = day3Humi;
            document.getElementById("day4-humi").innerHTML = day4Humi;
            document.getElementById("day5-humi").innerHTML = day5Humi;
            document.getElementById("day1-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + day1Icon + "@2x.png");
            document.getElementById("day2-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + day2Icon + "@2x.png");
            document.getElementById("day3-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + day3Icon + "@2x.png");
            document.getElementById("day4-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + day4Icon + "@2x.png");
            document.getElementById("day5-icon").setAttribute("src", "http://openweathermap.org/img/wn/" + day5Icon + "@2x.png");
        });
    });
});


