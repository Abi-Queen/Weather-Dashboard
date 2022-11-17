// display current date, time in current forecast area
const d = new Date()
let day = d.getDate()
let month = d.getMonth()
let year = d.getFullYear()
document.getElementById('day').innerHTML = day 
document.getElementById('month').innerHTML = month 
document.getElementById('year').innerHTML = year

// capture search input, display current search, save to localStorage as array, display as list
$('#search').click(function() {
    //display current search city name
    var currentSearch = $('input[name=search]').val()
    $('#current-city').text(currentSearch)
    //save to localStorage as array
    localStorage.setItem('search', currentSearch)
    var data = JSON.parse(localStorage.getItem('data')) || []
    data.push({
        search: currentSearch
    })
    localStorage.setItem('data', JSON.stringify(data))
    //display searches as list
    for(var i=0; i<data.length; i++)
    {
        var li = $('<li>')
        $('li').addClass('.searches')
        $('li').text(data[i].currentSearch)
        $('#list-searches').append(li)
    }
})

// reference api data
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

// where to display api data in html
var currentData = document.querySelector("#current-data")

// fetch API
fetch(apiUrl)
.then(function(response) {
    //convert to JSON object
    if (response.ok) {
        return response.json()
        .then(function(data) {
            //display in html
            var forecastArray = data.forecasts
            for(var i=0; i<forecastArray.length; i++) {
                var listItem = document.createElement('li')
                listItem.textContent = forecastArray[i].strForecast
                listEl.appendChild(listItem)
            }
        })
    }
    else {
        alert(error + 'Something went wrong. Please try again.')
    }
    })
    .catch(function(error) {
        alert(error + 'Something went wrong. Please try again.')
    })

