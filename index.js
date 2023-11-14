const apikey = "1d7dd9be29b78ec4f6530b53c30d82ca";
const weatherDataEl = document.getElementById("weather-data")
const cityInputEl = document.getElementById("city-input")
const formEl = document.querySelector("form")

// we need to add event listener to the form
formEl.addEventListener("submit",(e)=>{
    e.preventDefault()
    const cityValue = cityInputEl.value
    console.log(cityValue)
    //fetching data from API. we will pass the cityvalue to a function an it will fetch the value from an api
    getWeatherData(cityValue) // we need to define the function to call it


})
async function getWeatherData(cityValue){
    try {
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
            throw new Error('Network response was not ok')
        }
        const data = await response.json() //response is converted in json format so that we can read it
        console.log(data)

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details= [
            `Feels like:${Math.round(data.main.feels_like)}°C`,
            `Humidity : ${data.main.humidity}%`,
            `Wind speed :${data.wind.speed}m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">`
        weatherDataEl.querySelector(".temp").textContent= `${temperature}°C`
        weatherDataEl.querySelector(".description").textContent= `${description}`
        weatherDataEl.querySelector(".details").innerHTML = details.map((details) =>`<div>${details}</div>`).join("")

    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML=""
        weatherDataEl.querySelector(".temp").textContent= ""
        weatherDataEl.querySelector(".description").textContent= "No data found.Please enter valid city."
        weatherDataEl.querySelector(".details").innerHTML = ""

    }
}

