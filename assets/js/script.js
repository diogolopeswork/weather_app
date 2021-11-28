/*
function setBackground(time) {
    if (time > 7 && time < 19) {
        $('section.hero').css('background-image', 'url(./assets/img/day.jpg')
        $('body').css('color', 'black')
        $('a').css('color', 'black')
        $('.glass-container').css('background', 'linear-gradient(to right bottom, var(--lighterglass), var(--lightglass))')
    }
} 
*/

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
}

function getTime() {
    const time = new Date()
    const hour = time.getHours()
    const min = time.getMinutes()
    const sec = time.getSeconds()
    $('.time-text').text(`${formatTime(hour) + ':' + formatTime(min) + ':' + formatTime(sec)}`)
}

function getWeatherData() {
    $.get('https://api.weatherapi.com/v1/forecast.json?key=6a0c143f81ec4ec7a5b173316212111&q=Ilhavo&days=1&aqi=no&alerts=no')
        .done(response => displayWeather(response))
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time
}

function displayWeather(data) {
    console.log('data', data)
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
}

function formatUnits(unit) {
    return Math.floor(unit)
}

function initSlick() {
    $('.slick-slider').on('init', function (event, slick) {
        $('.slick-slider').removeClass('overflow');
    });
    $('.forecast-slider').slick({
        slidesToShow: 2,
        draggable: true,
        lazyLoad: true,
        slidesToScroll: 2,
        autoplay: true,
        mobileFirst: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        }]
    })
}