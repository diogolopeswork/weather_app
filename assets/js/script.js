$(function () {
    getWeatherData()
    getDate()
})

$(document).on('click', '.hamburger', function (e) {
    $('.hamburger').hide('slow')
    $('.c-hamburger').removeClass('d-none')
    $('.hero-left').hide('slide', {
        direction: 'left'
    }, 300)
    $('.hero-right').show('slide', {
        direction: 'right'
    }, 300)
})

$(document).on('click', '.c-hamburger', function (e) {
    $('.hamburger').show('slow')
    $('.c-hamburger').addClass('d-none')
    $('.hero-right').hide('slide', {
        direction: 'right'
    }, 300)
    $('.hero-left').show('slide', {
        direction: 'left'
    }, 300)
})

function getWeatherData() {
    $.get('https://api.weatherapi.com/v1/forecast.json?key=6a0c143f81ec4ec7a5b173316212111&q=Ilhavo&days=1&aqi=no&alerts=no')
        .done(response => displayWeather(response))
}

function getDate() {
    const date = new Date()
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    const weekDay = weekDays[date.getDay()]
    $('.date-text').text(`${weekDay + ',' + ' ' + day + ' ' + month + ' ' + year}`)
    setInterval(() => {
        getTime()
    }, 1000);

    const hour = date.getHours()
    setBackground('', hour)
}

function getTime() {
    const time = new Date()
    const hour = time.getHours()
    const min = time.getMinutes()
    const sec = time.getSeconds()
    $('.time-text').text(`${formatTime(hour) + ':' + formatTime(min) + ':' + formatTime(sec)}`)
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time
}

function displayWeather(data) {
    for (let wCat of Object.keys(data.forecast.forecastday)) {
        let container = $(`
            <div class="slick-slider forecast-slider"></div>
        `)
        $('.forecast-container').append(container)
        for (let wHour of data.forecast.forecastday[wCat].hour) {
            let hour = wHour
            let temp = hour.temp_c
            let rainPercent = hour.chance_of_rain
            let hourCondText = hour.condition.text
            let hourIcon = hour.condition.icon
            let elem = $(`
                <div class="slick-slide forecast-card">
                    <span class="fw-lighter">${wHour.time.slice(10)}</span>
                    <img class="forecast-card-icon" src="${hourIcon}">
                    <span class="fw-lighter">${hourCondText}</span>
                    <div class="details-text-container">
                        <span class="fw-lighter">${formatUnits(temp) + 'º'}</span>
                    </div>
                    <div class="details-text-container">
                        <img src="./assets/img/weather_icons/day/302.png"> 
                        <span class="fw-lighter">${formatUnits(rainPercent) + '%'}</span>
                    </div>
                </div>
            `)
            $('.forecast-slider').append(elem)
        }
        initSlick()
    }

    let currCondition = $(`
        <br><span class="curr-condition fw-lighter">${data.current.condition.text}</span>
        <img class="curr-condition-icon m-auto" src="${data.current.condition.icon}"></img>
    `)
    $('.date-text').append(currCondition)

    let currTempAndLoc = $(`
        <div class="temp-n-loc-container">
            <span class="curr-temp">${formatUnits(data.current.temp_c) + 'º'}</span>
            <span class="curr-loc ml-3 fw-lighter">${data.location.name}</span>
        </div>
    `)
    $('.hour-n-date-container').append(currTempAndLoc)
    $('#location-input').val(`${data.location.name}`)

    let weatherDetails = $(`
        <div class="weather-details glass-container mt-5">
            <div class="col-12 mt-2 fw-lighter">Cloudy: ${formatUnits(data.current.cloud) + '%'}</div>
            <div class="col-12 mt-2 fw-lighter">Humidity: ${formatUnits(data.current.humidity) + '%'}</div>
            <div class="col-12 mt-2 fw-lighter">Wind: ${formatUnits(data.current.wind_kph) + 'km/h'}</div>
            <div class="col-12 mt-2 fw-lighter">Wind direction: ${data.current.wind_dir}</div>
            <div class="col-12 mt-2 fw-lighter">Rain: ${data.current.precip_mm + 'mm'}</div>
        </div>
    `)
    $('.curr-weather-details span').append(weatherDetails)
    setBackground(data.current.condition.code, '')
}

function formatUnits(unit) {
    return Math.floor(unit)
}

function initSlick() {
    $('.forecast-slider').on('init', function (event, slick) {
        $('.forecast-slider').removeClass('overflow');
    });
    $('.forecast-slider').slick({
        slidesToShow: 1,
        draggable: true,
        lazyLoad: true,
        slidesToScroll: 1,
        autoplay: true,
        mobileFirst: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }]
    })
}

function setBackground(weather, time) {
    if (time > 7 && time < 19) {
        switch (weather) {
            case '1000':
                $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/day/clear.jpg)')
                break
            case '1006':
                $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/day/cloudy.jpg)')
                break
            case '1003':
                $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/day/cloudy.jpg)')
                break
            default:
                $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/day/day.jpg)')
                break
        }
        if (weather === 1063 || weather === 1180 || weather === 1183 || weather === 1186 || weather === 1189 || weather === 1192 || weather === 1195 || weather === 1240 || weather === 1243 || weather === 1246 || weather === 1150 || weather === 1153) {
            $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/day/rain.jpg)')
        } else if (weather === 1255 || weather === 1258 || weather === 1066 || weather === 1210 || weather === 1213 || weather === 1216 || weather === 1219 || weather === 1222 || weather === 1255) {
            $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/day/snow.jpg)')
        }
    } else {
        switch (weather) {
            default:
                $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/night/night.jpg)')
                break
        }
        if (weather === 1063 || weather === 1180 || weather === 1183 || weather === 1186 || weather === 1189 || weather === 1192 || weather === 1195 || weather === 1240 || weather === 1243 || weather === 1246 || weather === 1150 || weather === 1153) {
            $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/night/rain.jpg)')
        } else if (weather === 1255 || weather === 1258 || weather === 1066 || weather === 1210 || weather === 1213 || weather === 1216 || weather === 1219 || weather === 1222 || weather === 1255) {
            $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/night/snow.jpg)')
        } else if (weather === 1000 || weather === 1006 || weather === 1003) {
            $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/night/night.jpg)')
        }
    }
    if (weather === 1135) {
        $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/fog.jpg)')
    } else if (weather === 1009) {
        $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/overcast.jpg)')
    } else if (weather === 1030) {
        $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/mist.jpg)')
    } else if (weather === 1276) {
        $('section.hero').css('background', 'center/cover no-repeat url(/assets/img/night/thunder.jpg)')
    }
}