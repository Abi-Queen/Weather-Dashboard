var apiKey = '7fc857720d5a4ee4808c383429e02f26'

// display current date in current current weather area html
const d = new Date()
let day = d.getDate()
let month = d.getMonth()
let year = d.getFullYear()
document.getElementById('day').innerHTML = day
document.getElementById('month').innerHTML = month
document.getElementById('year').innerHTML = year

// display forecast dates in card headers: HOW??
function addOneDay(date) {
  date.setDatae(date.getDate() + 1)
  return date
}

let day1 = date.addOneDay()
let month1 = date.getMonth()

// capture search input, display current search, save to localStorage as array
$('.btn').on("click", function (event) {
  //display current search city name
  event.preventDefault()
  var currentSearch = $('input[name=city]').val()
  localStorage.setItem('currentSearch', currentSearch)
  var data = JSON.parse(localStorage.getItem('data')) || []
  data.push(currentSearch)
  localStorage.setItem('currentSearch', JSON.stringify(data))

  //call coord function to return lat and lon vars of city's coordinates
  listSearches(data)

  coord(currentSearch)

  //display current search city name in main dashboard
  $('#current-city').text(currentSearch)
})

//display saved searches as list up to 8
const listSearches = function (data) {

  for (var i = 0; i < data.length; i++) {
    var li = '<li id=list-previous></li>'
    $('#list-searches').append(li)
    $('li').text([data[i].currentSearch])
    $('#list-previous').addClass('btn btn-secondary')
    //for loop to give id to each btn up to 8 searches?
  }
}

listSearches()

//add onclick to display previous search data again by pass value of btn to coord function
$()

//use api to find lat and lon of city, send to currentWeatherData function and forecastWeatherData functions
function coord(city) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`).then(function (res) {
    return res.json()
  })
    .then(function (data) {
      console.log(JSON.stringify(data))
      var lat = data[0].lat
      var lon = data[0].lon

      currentWeatherData(lat, lon)
      forecastWeatherData(lat, lon)
    })
}

// use api to get current weather data for current search's lat and lon
function currentWeatherData(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
    .then(function (res) {
      return res.json()
    })
    // display data from api in current weather div in html
    .then(function (currentWeatherData) {
      console.log(currentWeatherData)
      //save current weather data as vars
      let currentTemp = currentWeatherData.main.temp
      let currentWind = currentWeatherData.wind.speed
      let currentHum = currentWeatherData.main.humidity
      let currentIcon = currentWeatherData.weather[0].icon

      //display vars in html by id
      $('#currentTemp').text(currentTemp)
      $('#currentWind').text(currentWind)
      $('#currentHum').text(currentHum)
      $('#current-icon').attr('src', `http://openweathermap.org/img/wn/${currentIcon}@2x.png`)
    })
  console.log(JSON.stringify(currentWeatherData))
}

//use api to get forecast weather data for current search's lat and and lon
function forecastWeatherData(lat, lon) {
  fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function (res) {
      return res.json()
    })
  //save forecast weather data as vars ... no no no no no they'll all be the same 
  let forecastTemp1 = res.list.main.temp
  let forecastWind1 = res.list.main.wind.speed
  let forecastHum1 = res.main.humidity
  let forecastTemp2 = res.list.main.temp
  let forecastWind2 = res.list.main.wind.speed
  let forecastHum2 = res.main.humidity
  let forecastTemp3 = res.list.main.temp
  let forecastWind3 = res.list.main.wind.speed
  let forecastHum3 = res.main.humidity
  let forecastTemp4 = res.list.main.temp
  let forecastWind4 = res.list.main.wind.speed
  let forecastHum4 = res.main.humidity
  let forecastTemp5 = res.list.main.temp
  let forecastWind5 = res.list.main.wind.speed
  let forecastHum5 = res.main.humidity
    //display data from api in forecast div in html ... I know this isn't the right way...
    .then(function (res) {
      $('#forecastTemp1').text(forecastTemp1)
      $('#forecastWind1').text(forecastWind1)
      $('#forecastHum1').text(forecastHum1)
    })
  console.log(JSON.stringify(data))
}

//how to re-submit saved city name to search field again on click? 