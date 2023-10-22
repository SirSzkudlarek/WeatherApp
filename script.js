const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=00d34ab08fdfae26d6d316eb3c30018a';
const API_UNITS = '&units=metric';

const getWeather = () => {
  const city = input.value || 'Wrocław';
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios.get(URL)
  .then(res => {
    console.log(res.data);
    const name = res.data.name;
    const temp = res.data.main.temp;
    const weatherData = res.data.weather[0].main;
    const weatherId = res.data.weather[0].id;
    const hum = res.data.main.humidity;
    warning.textContent = '';
    cityName.textContent = `${name}`;
    temperature.textContent = `${temp} ℃`;
    weather.textContent = `${weatherData}`;
    humidity.textContent = `${hum} %`;
    console.log(res.data.weather[0].id)
    if (weatherId === 800) {
      photo.setAttribute('src', './img/Sun.png');
    } else if (weatherId >= 801 && weatherId <= 804) {
      photo.setAttribute('src', './img/cloud.png');
    } else if (weatherId >= 300 && weatherId <= 321) {
      photo.setAttribute('src', './img/drizzle.png');
    } else if (weatherId >= 500 && weatherId <= 531) {
      photo.setAttribute('src', './img/rain.png');
    } else if(weatherId >= 200 && weatherId <= 232) {
      photo.setAttribute('src', './img/thunderstorm.png');
    } else if(weatherId >= 600 && weatherId <= 622) {
      photo.setAttribute('src', './img/ice.png');
    } else if(weatherId >= 701 && weatherId <= 781) {
      photo.setAttribute('src', './img/fog.png');
    } else {
      photo.setAttribute('src', './img/unknown.png');
    }
  })
  .catch(err => {
    console.error('Nie ma takiego miasta albo go nie podałeś.');
    input.value === '' ? warning.textContent = 'Musisz podać nazwę miasta!' : warning.textContent = 'Podano błędną nazwę miasta!';
  })
}

const inputEmpty = () => {
  if(input.value === '') {
    warning.textContent = 'Musisz wpisać nazwę miasta!';
  }
}

const enterKeyCheck = (e) => {
  if(e.key === 'Enter' && e.target.closest('input')) {
    getWeather()
  }
}

button.addEventListener('click', getWeather);
input.addEventListener('keydown', enterKeyCheck);
getWeather();