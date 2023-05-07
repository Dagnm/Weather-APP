const apiKey = "64f1247822f52f3fef0fc64551ed70dc";

const weatherDataE = document.getElementById("weather-data");

const inputCity = document.getElementById("city-input");

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = inputCity.value;

  getWeatherData(city);
});

async function getWeatherData(city) {
  try {
    const respond = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!respond.ok) {
      throw new Error("Network response was not Ok");
    }
    const data = await respond.json();

    const temprature = Math.round(data.main.temp);
    const description = data.weather[0].descrrption;
    const icon = data.weather[0].icon;
    const detail = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity} %`,
      `Wind Speed: ${data.wind.speed} m/s`,
    ];
    weatherDataE.querySelector(".icon").innerHTML = `<img
    src="http://openweathermap.org/img/wn/${icon}.png"
    alt="weather ICON"
  >`;
    weatherDataE.querySelector(
      ".temprature"
    ).textContent = `${temprature} &#8451`;
    weatherDataE.querySelector(".description").textContent = description;
    weatherDataE.querySelector(".details").innerHTML = details
      .map(
        (detail) => `
    <div>Feels Like: ${detail} &#8451 </div>`
      )
      .join("");
  } catch (error) {
    weatherDataE.querySelector(".icon").innerHTML = "";
    weatherDataE.querySelector(".temprature").textContent = "";
    weatherDataE.querySelector(".description").textContent =
      "An error  Happened, please try again latter";
    weatherDataE.querySelector(".details").innerHTML = "";
  }
}
