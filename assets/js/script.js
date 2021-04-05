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

// WORK
searchButton.addEventListener('click', function getCity() {
    // Pointers (locally)
    var cityTitle = document.getElementById('city-date');
    var currentImg = document.getElementById('current-weather-image');
    var inputField = document.getElementById('input-field').value;

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputField + "&units=imperial&appid=22bb6e2db366aab8539ac22df7b32d3a";

    fetch(requestUrl)
    .then(function(response) {
        console.log(response);
        return response.json();
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

        console.log(data);

        var UVUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&appid=22bb6e2db366aab8539ac22df7b32d3a";
        
        fetch(UVUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // UV Variable
            var mainUV = data.current.uvi;

            console.log(mainUV);
        });

        cityTitle.innerHTML = inputField.toUpperCase() + " (" + currentTime + ")";
        currentImg.setAttribute("src", imageWeather(mainImg));
        document.getElementById("main-temp").innerHTML = mainTemp;
        document.getElementById("main-humidity").innerHTML = mainHumidity;
        document.getElementById("main-wind").innerHTML = mainWind;
    });

});


