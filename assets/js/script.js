var apiKey = '7fc857720d5a4ee4808c383429e02f26'

// display current date, time in current forecast area html
const d = new Date()
let day = d.getDate()
let month = d.getMonth()
let year = d.getFullYear()
document.getElementById('day').innerHTML = day 
document.getElementById('month').innerHTML = month 
document.getElementById('year').innerHTML = year


// capture search input, display current search, save to localStorage as array, display as list
$('#search').on("click", function() {
    //display current search city name
    var currentSearch = $('#search').val()
    $('#current-city').text(currentSearch)
    //save to localStorage as array
    //localStorage.setItem('search', currentSearch)
    var data = JSON.parse(localStorage.getItem('data')) || []
    data.push(currentSearch)
    localStorage.setItem('data', JSON.stringify(data))

    //call coord function to return lat and lon vars of city's coordinates
    coord(currentSearch)

    //display saved searches as list
    for(var i=0; i<data.length; i++)
    {
        var li = $('<li>')
        $('li').addClass('.searches')
        $('li').text(data[i].currentSearch)
        $('#list-searches').append(li)
    }
})

//use api to find lat and lon of city, send to currentWeatherData function and forecastWeatherData functions
function coord(city){
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`).then(function(res) {
    return res.json()
  })
  .then(function(data){
    console.log(JSON.stringify(data))
    var lat = data[0].lat
    var lon = data[0].lon

    currentWeatherData(lat, lon)
    forecastWeatherData(lat, lon)
  })
}

// use api to get current weather data for current search's lat and lon
function currentWeatherData(lat, lon){
 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(function(res) {
    return res.json()
 })
 // display data from api in current weather div in html
 .then(function(data){})
 console.log(JSON.stringify(data))
}

//use api to get forecast weather data for current search's lat and and lon
function forecastWeatherData(lat, lon){
fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
.then(function(res) {
    return res.json()
})
//display data from api in forecast div in html
.then(function(data) {
    $('#currentTemp').text(forecastWeatherData.temperature.value)
    $('#currentWind').text(forecastWeatherData.wind.speed.value)
    $('#currentHum').text(forecastWeatherData.humidity.value)
    $('#currentUV').text(forecastWeatherData.)
})
console.log(JSON.stringify(data))
}



