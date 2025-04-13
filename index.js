// This should be used for JS for home page

const openWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=e1a82f604d41c08378f9111b9b223d94&q='

//General fetch function for city weather data
const cityWeatherCard = async (cityName, targetId) => {
    const cityURL = `${openWeatherURL}${cityName},jp`
    try{
        const res = await fetch(cityURL)
        if (res.status != 200) throw new Error('Location not found')
        const cityData = await res.json()
        renderCityWeatherCard(cityData, targetId) 
    }catch(err){
        const errorSection = document.getElementById(targetId)
        errorSection.innerHTML = `<p>${err.message}</p>`
    }
}
// Function destructures city data and grabs corresponding id to render html on webpage
const renderCityWeatherCard = ({
    name,
    weather,
    main:{
        temp,
        feels_like,
    },
    dt,
}, targetId) => {
    const[{description, icon}] = weather
    const citySection = document.getElementById(targetId)
    citySection.innerHTML = `
        <div class="weather_card">
            <h3>${name.toUpperCase()}</h3>
            <img src=https://openweathermap.org/img/wn/${icon}@2x.png alt=${description}>
            <p>${description}</p>
            <p>Current: ${temp}\u00B0F</p>
            <p>Feels like: ${feels_like}\u00B0F</p>
            <p>Last Updated: ${new Date(dt*1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})}</p>
        </div>
    `
}
// Calls fetch function with specific cities first
['tokyo', 'osaka', 'kyoto'].forEach(city => cityWeatherCard (city, `weather_city_${city}`))

// Calls fetch function with city that user searches
const form = document.querySelector('form')
const searchResultsSectionId = 'weather_city_search_results'

form.onsubmit = async e => {
    e.preventDefault()
    const userQuery = form.search.value.trim().toLowerCase()
    if(!userQuery) return
    if(['tokyo', 'osaka', 'kyoto'].includes(userQuery)) return
    form.search.value =""
    cityWeatherCard(userQuery, searchResultsSectionId)
    
}

/* Update the copyright year automatically */
function copyright () {
    const date = document.getElementById("date");
    const year = new Date; 

    if (date) {
        date.textContent = year.getFullYear();
    }
}

window.onload = () => {
    copyright();
}
