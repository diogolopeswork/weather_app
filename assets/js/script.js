$(function () {
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


    switch (wCondition) {
        case "Clear":
            $('.condition-text').text(wCondition)
            break
        case "Partly cloudy":
            $('.condition-text').text(wCondition)
            break
        case "Cloudy":
            $('.condition-text').text(wCondition)
            break
        case "Sunny":
            $('.condition-text').text(wCondition)
            break
        case "Fog":
            $('.condition-text').text(wCondition)
            break
        case "Overcast":
            $('.condition-text').text(wCondition)
            break
        case "Mist":
            $('.condition-text').text(wCondition)
            break
        case "Patchy light rain":
            $('.condition-text').text(wCondition)
            break
        case "Light rain":
            $('.condition-text').text(wCondition)
            break
        case "Moderate rain at times":
            $('.condition-text').text(wCondition)
            break
        case "Moderate rain":
            $('.condition-text').text(wCondition)
            break
        case "Heavy rain at times":
            $('.condition-text').text(wCondition)
            break
        case "Heavy rain":
            $('.condition-text').text(wCondition)
            break
        case "Patchy light snow":
            $('.condition-text').text(wCondition)
            break
        case "Light snow":
            $('.condition-text').text(wCondition)
            break
        case "Patchy moderate snow":
            $('.condition-text').text(wCondition)
            break
        case "Moderate snow":
            $('.condition-text').text(wCondition)
            break
        case "Patchy heavy snow":
            $('.condition-text').text(wCondition)
            break
        case "Heavy snow":
            $('.condition-text').text(wCondition)
            break
        case "Light rain shower":
            $('.condition-text').text(wCondition)
            break
        case "Moderate or heavy rain shower":
            $('.condition-text').text(wCondition)
            break
        case "Torrential rain shower":
            $('.condition-text').text(wCondition)
            break
        case "Light snow showers":
            $('.condition-text').text(wCondition)
            break
        case "Moderate or heavy snow showers":
            $('.condition-text').text(wCondition)
            break
        case "Patchy light rain with thunder":
            $('.condition-text').text(wCondition)
            break
        case "Moderate or heavy rain with thunder":
            $('.condition-text').text(wCondition)
            break
        default:
            $('.condition-text').text('No idea of the weather, take a look outside')
    }
}

function getDate() {
    const date = new Date()
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    const weekDay = weekDays[date.getDay()]
    $('.date-text').text(weekDay + ',' + ' ' + day + ' ' + month + ' ' + year)

    setInterval(() => {
        getTime()
    }, 1000)
}

function getTime() {
    const date = new Date()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    $('.time-text').text(hour + ':' + formatTime(min) + ':' + formatTime(sec))
    setBackground(date)
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time
}

function setBackground(time) {
    console.log('Time ->', time)
    if(time > 7 && time < 19) {
        $('section.hero').css('background-image', 'url(./assets/img/day.jpg')
    } else {
        $('section.hero').css('background-image', 'url(./assets/img/night.jpg')
    }
    /* let wCondition = weather.current.condition.text
    console.log('background ---->', wCondition)

    if (wCondition === 'Clear') {
        $('section.hero').css('background-image', 'url(./assets/img/clear.jpg')
    } else if (wCondition === 'Partly cloudy' || wCondition === 'Cloudy') {
        $('section.hero').css('background-image', 'url(./assets/img/cloudy.jpg')
    } else if (wCondition === 'Fog') {
        $('section.hero').css('background-image', 'url(./assets/img/fog.jpg')
    } else if (wCondition === 'Sunny') {
        $('section.hero').css('background-image', 'url(./assets/img/sunny.jpg')
    } else if (wCondition === 'Overcast') {
        $('section.hero').css('background-image', 'url(./assets/img/overcast.jpg')
    } else if (wCondition === 'Mist') {
        $('section.hero').css('background-image', 'url(./assets/img/mist.jpg')
    } else if (wCondition === 'Patchy light rain with thunder' || wCondition === 'Moderate or heavy rain with thunder') {
        $('section.hero').css('background-image', 'url(./assets/img/thunder.jpg')
    } else if (wCondition === 'Light snow showers' || wCondition === 'Moderate or heavy snow showers' || wCondition === 'Patchy light snow' || wCondition === 'Light snow' || wCondition === 'Patchy moderate snow' || wCondition === 'Moderate snow' || wCondition === 'Patchy heavy snow' || wCondition === 'Heavy snow') {
        $('section.hero').css('background-image', 'url(./assets/img/snow.jpg')
    } else if (wCondition === 'Light rain shower' || wCondition === 'Moderate or heavy rain shower' || wCondition === 'Torrential rain shower' || wCondition === 'Patchy light rain' || wCondition === 'Light rain' || wCondition === 'Moderate rain at times' || wCondition === 'Moderate rain' || wCondition === 'Heavy rain at times' || wCondition === 'Heavy rain') {
        $('section.hero').css('background-image', 'url(./assets/img/rain.jpg')
    } */
}