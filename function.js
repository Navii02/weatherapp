
const apiKey = '5fe36b192ffd1c36dffb6752bc1722b2';

function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const feelsLike = data.main.feels_like;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const pressure = data.main.pressure;
            const seaLevel = data.main.sea_level || 'N/A'; // If sea level is not available
            const description = data.weather[0].description;
            const country = data.sys.country;
            const city = data.name;
            const datetime = new Date().toLocaleString();

            document.getElementById('temperature').innerText = `${temperature}°C, feels like ${feelsLike}°C`;
            document.getElementById('location').innerText = city;
            document.getElementById('description').innerText = description;
            document.getElementById('datetime').innerText = datetime;

            document.getElementById('country').innerText = country;
            document.getElementById('humidity').innerText = humidity;
            document.getElementById('wind').innerText = wind;
            document.getElementById('pressure').innerText = pressure;
            document.getElementById('sea-level').innerText = seaLevel;

            updateBackground(description);
        })
        .catch(error => {
            resetData();
            document.getElementById('temperature').innerText = "Error: " + error.message;
        });
}

function updateBackground(description) {
    const leftBox = document.getElementById('left-box');

    if (description.includes("clear")) {
        leftBox.style.backgroundImage = "url('https://i.gifer.com/origin/45/454ba38b4ce5b3fdc8796ed710769e69.gif')";
    } else if (description.includes("clouds")) {
        leftBox.style.backgroundImage = "url('https://media1.tenor.com/images/b23f915c31644887826484de65b80f3d/tenor.gif?itemid=16382192')";
    } else if (description.includes("rain")) {
        leftBox.style.backgroundImage = "url('https://i.pinimg.com/originals/32/81/cd/3281cde8840b5d5bdea9cb6a02d851b1.gif')";
    } else if (description.includes("snow")) {
        leftBox.style.backgroundImage = "url('https://media.giphy.com/media/7Bgpw7PwdxoDC/giphy.gif')";
    } else if (description.includes("haze") || description.includes("fog") ) {
        leftBox.style.backgroundImage = "url('https://media.giphy.com/media/xT9GEpwYcYtwrqjdQc/giphy.gif')";
    } else if (description.includes("smoke"))
    {
      leftBox.style.backgroundImage = "url('https://media.giphy.com/media/xMPdlWMxIkLpS/giphy.gif')";
    }else {
        leftBox.style.backgroundImage = "url('https://media.giphy.com/media/9PxKiEoxZNgHK/giphy.gif')";
    }
}

function resetData() {
    document.getElementById('city-input').value = ''; // Clear the input field
    document.getElementById('temperature').innerText = '';
    document.getElementById('location').innerText = '';
    document.getElementById('description').innerText = '';
    document.getElementById('datetime').innerText = '';
    document.getElementById('country').innerText = '';
    document.getElementById('humidity').innerText = '';
    document.getElementById('wind').innerText = '';
    document.getElementById('pressure').innerText = '';
    document.getElementById('sea-level').innerText = '';
    document.getElementById('left-box').style.backgroundImage = "url('https://media3.giphy.com/media/G1T5M0qT6ZJlu/giphy.gif')";
}
