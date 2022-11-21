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

    //get coordinates of currentSearch city
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

function currentWeatherData(lat, lon){
 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(function(res) {
    return res.json()
 })
 .then(function(data){})
 console.log(JSON.stringify(data))
}

function forecastWeatherData(lat, lon){
fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(function(res) {
    return res.json()
})
.then(function(data) {
    
})
console.log(JSON.stringify(data))
}



