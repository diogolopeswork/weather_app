$(function () {
    getWeatherData()
    getDate()
})

$(document).on('keypress', function(e) {
    let keyPressed = e.which
    let locInput = $('#location-input').val()
    changeLocation(keyPressed, locInput)
})

$(document).on('click', '.location-btn', function(e) {
    $('.hero-container, .forecast-container, .current-weather-container').hide().slow()
})

$(document).on('click', '.weather-btn', function(e) {
    $('.hero-container, .forecast-container, .current-weather-container').show().slow()
})

function getWeatherData() {
    $.get(`http://api.weatherapi.com/v1/forecast.json?key=6a0c143f81ec4ec7a5b173316212111&q=Ilhavo&days=1&aqi=no&alerts=no`)
        .done(response => displayWeather(response))
}

function displayWeather(data) {
    console.log('weather', data)

    for(let wCat of Object.keys(data.forecast.forecastday)) {
        // console.log('data.forecast =>', data.forecast.forecastday[wCat])
        let container = $(`
            <div class="slick-slider forecast-slider"></div>
        `)
        $('.forecast-container').append(container)
        // console.log('Day =>', data.forecast.forecastday[wCat].day)
        for(let wHour of data.forecast.forecastday[wCat].hour) {
            let hour = wHour
            // console.log('Hour', hour)
            let temp = hour.temp_c
            let rainPercent = hour.chance_of_rain
            let hourCondText = hour.condition.text
            let hourIcon = hour.condition.icon
            let elem = $(`
                <div class="slick-slide forecast-card">
                    <span class="details-text">${wHour.time.slice(10)}</span>
                    <img class="forecast-card-icon" src="${hourIcon}">
                    <span class="details-text">${hourCondText}</span>
                    <div class="details-text-container">
                        <span class="details-text">${formatUnits(temp) + 'º'}</span>
                    </div>
                    <div class="details-text-container">
                        <img src="./assets/img/weather_icons/day/302.png"> 
                        <span class="details-text">${formatUnits(rainPercent) + '%'}</span>
                    </div>
                </div>
            `)
            $('.forecast-slider').append(elem)
        }
        initSlick()
    }

    let currWeatherElem = $(`
        <div class="row">
            <div class="col-6 d-flex justify-content-start">
                <h4 class="city-text">Ílhavo</h4>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-6 d-flex flex-column text-start">
                <span class="curr-temp-text">${formatUnits(data.current.temp_c) + 'º'}</span>
                <span class="details-text">${data.current.condition.text}</span>
                <span class="details-text">${'Wind' + ' ' + formatUnits(data.current.wind_kph) + ' ' + 'km/h'}</span>
                <span class="details-text">${'Humidity' + ' ' + data.current.humidity + '%'}</span>
            </div>
            <div class="col-6 m-auto">
                <img class="current-weather-img" src="${data.current.condition.icon}">
            </div>
        </div>
    `)
    $('.current-weather-container').append(currWeatherElem)
}

function getDate() {
    const date = new Date()
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    const weekDay = weekDays[date.getDay()]
    $('.date-text').text(weekDay + ' ' + '|' + ' ' + day + ' ' + month + ' ' + year)

    setInterval(() => {
        getTime()
    }, 1000)
}

function getTime() {
    const date = new Date()
    const hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    $('.time-text').text(formatTime(hour) + ':' + formatTime(min) + ':' + formatTime(sec))
    setBackground(date)
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time
}

function setBackground(time) {
    // console.log('Time ->', time)
    if(time > 7 && time < 19) {
        $('section.hero').css('background-image', 'url(./assets/img/day.jpg')
        $('body').css('color', 'black')
        $('a').css('color', 'black')
        $('.glass-container').css('background', 'linear-gradient(to right bottom, var(--lighterglass), var(--lightglass))')
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

function initSlick() {
    $('.slick-slider').on('init', function(event, slick) {
        $('.slick-slider').removeClass('overflow');
    });
    $('.forecast-slider').slick({ slidesToShow: 3, draggable: true, lazyLoad: true, slidesToScroll: 3, autoplay: true });
}

function changeLocation(key, val) {
    if(key == 13) {
        if($(val) == ' ') {
            console.log('input vazio')
        } else {
            console.log('tudo certo')
        }
        return val
    }
}


function formatUnits(unit) {
    return Math.floor(unit)
}
