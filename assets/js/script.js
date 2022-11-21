var apiKey = '7fc857720d5a4ee4808c383429e02f26'

// display current date in current current weather area html
const d = new Date()
let day = d.getDate()
let month = d.getMonth()
let year = d.getFullYear()
document.getElementById('day').innerHTML = day 
document.getElementById('month').innerHTML = month 
document.getElementById('year').innerHTML = year

// capture search input, display current search, save to localStorage as array, display as list
$('.btn').on("click", function() {
    //display current search city name
    var currentSearch = $('input[name=city]').val()
    localStorage.setItem('currentSearch', currentSearch)
    var data = JSON.parse(localStorage.getItem('data')) || []
    data.push(currentSearch)
    localStorage.setItem('currentSearch', JSON.stringify(data))
    listSearches(data)
    console.log(data)

    //call coord function to return lat and lon vars of city's coordinates
    coord(currentSearch)
})

//display saved searches as list
const listSearches = function(data) {
  for(var i=0; i<data.length; i++)
  {
      var li = $('<li>')
      $('li').addClass('.searches')
      $('li').text(data[i].currentSearch)
      $('#list-searches').append(li)
  }
}
listSearches()

//use api to find lat and lon of city, send to currentWeatherData function and forecastWeatherData functions
function coord(city){
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${currentSearch}&limit=5&appid=${apiKey}`).then(function(res) {
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
 .then(function(currentWeatherData){
  //save current weather data as vars
    let currentTemp = res.temperature.value
    let currentWind = res.wind.speed.value
    let currentHum = res.humidity.value
    //display vars in html by id
  $('#currentTemp').text(currentTemp)
  $('#currentWind').text(currentWind)
  $('#currentHum').text(currentHum)
})
 console.log(JSON.stringify(currentWeatherData))
}

//use api to get forecast weather data for current search's lat and and lon
function forecastWeatherData(lat, lon){
fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
.then(function(res) {
    return res.json()
})
//display data from api in forecast div in html
.then(function(temperature, wind, humidity){
  $('#forecastTemp1').text(forecastWeatherData.temperature.value)
  $('#forecastWind1').text(forecastWeatherData.wind.speed.value)
  $('#forecastHum1').text(forecastWeatherData.humidity.value)
})
console.log(JSON.stringify(data))
}
