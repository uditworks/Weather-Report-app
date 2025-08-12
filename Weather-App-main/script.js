async function getWeather() {
  const city = document.getElementById('city-input').value;
  const apiKey = '5a65201ae4b3921175ee60d174371b4a'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();

    const weather = data.weather[0].main.toLowerCase(); 

    setWeatherBackground(weather);

    const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" />
      <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬️ Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    document.getElementById('weather').innerHTML = `<p style="color: pink;">❌ ${error.message}</p>`;
  }
}

function setWeatherBackground(condition) {
  const weatherTypes = ['clear', 'rain', 'clouds', 'snow', 'thunderstorm', 'mist'];
  document.body.className = ''; 
  if (weatherTypes.includes(condition)) {
    document.body.classList.add(condition);
  }
}

