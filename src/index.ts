import type {Location} from './types.js'

const args: string[]= process.argv.slice(2) 
const[city,country] = args

if (!city || !country){
    console.log("Error: Please provide a city and country!!");
    process.exit(1)
}
const locationObject: Location = {
    city,country
};

const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json&countryCode=${country}`

const response = await fetch(url)

if (!response.ok){
    console.log("API Error");
}

const data = await response.json()

if (!data.results || data.results.length === 0){
    console.log("Error: No results found for the provided city and country!!");
    process.exit(1)
}

const[latitude, longitude] = [data.results[0].latitude, data.results[0].longitude]

const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`


const weatherResponse = await fetch(weatherUrl)

if(!weatherResponse.ok){
    console.log("No Temp found in the city and country provided!");
    process.exit(1)
}

const weatherData = await weatherResponse.json()

console.log(`Temperature in ${city} ${country} is`,weatherData.current.temperature_2m,weatherData.current_units.temperature_2m);
