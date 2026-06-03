const input = document.getElementById("input");
const result = document.getElementById("result");
const errMsg = document.getElementById("errMsg");

function checkWeather() {
  let city = input.value;
  fetchWeather(city);
}

async function fetchWeather(city) {
  if (city === "") {
    return (errMsg.innerHTML = "Nigga put a city");
  }
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cc056fc6b5dff2a421aa4c8102a0e10`,
    );
    if (!res.ok) {
      throw new Error(res.status);
    }
    const data = await res.json();
    const temp = data.main.temp;
    let realTemp = Math.floor(temp) - 273;
    mainTemp = `${realTemp}°C`;

    displayResult(mainTemp, city);
  } catch (err) {
    if (err.message === "404") {
      errMsg.innerHTML = "City doesn't exist / wrong api";
    } else if (err.message === "401") {
      errMsg.innerHTML = "Invalid Api key, call the developer";
    } else if (err.message === "500") {
      errMsg.innerHTML = "API down";
    } else {
      errMsg.innerHTML = "Check your network";
    }
    // errMsg.innerHTML = `Check your internet and the city you searched for`;
    result.innerHTML = "";
  }
}

async function displayResult(mainTemp, city) {
  result.innerHTML = `The temperature in ${city} is ${mainTemp}`;
  errMsg.innerHTML = "";
}
