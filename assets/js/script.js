// Pointers
var searchButton = document.getElementById('button-search');



searchButton.addEventListener('click', function getCity() {

    var inputField = document.getElementById('input-field').value;

    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + inputField + "&units=imperial&appid=22bb6e2db366aab8539ac22df7b32d3a";

    fetch(requestUrl)
    .then(function(response) {
        // console.log(response);
        return response.json();
    })
    .then(function(data) {
        // Weather Variables
        var currentLat = data.coord.lat;
        var currentLon = data.coord.lon;
        var mainTemp = data.main.temp;
        var mainHumidity = data.main.humidity;
        var mainWind = data.wind.speed;

        console.log(mainTemp + " °F");
        console.log(mainHumidity + "%");
        console.log(mainWind + " MPH");

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

    });

});


