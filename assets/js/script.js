$(function() {
    getWeatherData()
    getDate()
})

function getWeatherData() {
    $.get('http://api.weatherapi.com/v1/forecast.json?key=6a0c143f81ec4ec7a5b173316212111&q=Ilhavo&days=1&aqi=no&alerts=no')
        .done(response => displayWeather(response))
}

function displayWeather(weather) {
    console.log('weather', weather)
    let wCondition = weather.current.condition.text
    
    switch(wCondition) {
        case "Clear":
            $('.condition').text(wCondition)
            break
        case "Partly cloudy":
            $('.condition').text(wCondition)
            break
        case "Cloudy":
            $('.condition').text(wCondition)
            break
        case "Sunny":
            $('.condition').text(wCondition)
            break
        case "Fog":
            $('.condition').text(wCondition)
            break
        case "Overcast":
            $('.condition').text(wCondition)
            break
        case "Mist":
            $('.condition').text(wCondition)
            break
        case "Patchy light rain":
            $('.condition').text(wCondition)
            break
        case "Light rain":
            $('.condition').text(wCondition)
            break
        case "Moderate rain at times":
            $('.condition').text(wCondition)
            break
        case "Moderate rain":
            $('.condition').text(wCondition)
            break
        case "Heavy rain at times":
            $('.condition').text(wCondition)
            break
        case "Heavy rain":
            $('.condition').text(wCondition)
            break
        case "Patchy light snow":
            $('.condition').text(wCondition)
            break
        case "Light snow":
            $('.condition').text(wCondition)
            break
        case "Patchy moderate snow":
            $('.condition').text(wCondition)
            break
        case "Moderate snow":
            $('.condition').text(wCondition)
            break
        case "Patchy heavy snow":
            $('.condition').text(wCondition)
            break
        case "Heavy snow":
            $('.condition').text(wCondition)
            break
        case "Light rain shower":
            $('.condition').text(wCondition)
            break
        case "Moderate or heavy rain shower":
            $('.condition').text(wCondition)
            break
        case "Torrential rain shower":
            $('.condition').text(wCondition)
            break
        case "Light snow showers":
            $('.condition').text(wCondition)
            break
        case "Moderate or heavy snow showers":
            $('.condition').text(wCondition)
            break
        case "Ice pellets":
            $('.condition').text(wCondition)
            break
        case "Light showers of ice pellets":
            $('.condition').text(wCondition)
            break
        case "Moderate or heavy showers of ice pellets":
            $('.condition').text(wCondition)
            break
        case "Patchy light rain with thunder":
            $('.condition').text(wCondition)
            break
        case "Moderate or heavy rain with thunder":
            $('.condition').text(wCondition)
            break
        case "Patchy light snow with thunder":
            $('.condition').text(wCondition)
            break
        case "Moderate or heavy snow with thunder":
            $('.condition').text(wCondition)
            break
        default:
            $('.condition').text('No idea of the weather, take a look outside')
    }
}

function getDate() {
    const date = new Date()
    const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const year = date.getFullYear()
    const month =  months[date.getMonth()]
    const day =  date.getDate()
    const weekDay = weekDays[date.getDay()]
    $('.date').text(weekDay + ',' + ' ' + day + ' ' + month + ' ' + year)

    setInterval(() => {
        getTime()
    }, 1000)
}

function getTime() {
    const date = new Date()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    $('.time').text(hour + ':' + formatTime(min) + ':' + formatTime(sec))
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time
} 
