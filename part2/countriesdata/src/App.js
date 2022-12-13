import { useState, useEffect } from 'react'

function Weather({ weather, city }) {
  if (!weather.weather) return null

  const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
  return (
    <>
      <h3>Weather in {city}</h3>
      <p><strong>temperature:</strong> {weather.main.temp} Celcius</p>
      <img src={icon} alt={weather?.weather[0].main} />
      <p><strong>wind:</strong> {weather.wind.speed} m/s</p>
    </>
  )
}

function Country({ country }) {

  // states
  const [weather, setWeather] = useState({})

  // effects 
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setWeather(data)
      })
  }, [country.capital])

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} width="100" />
      
      <Weather weather={weather} city={country.capital} />
    </>
  )
}

function CountryList({ countries, setFilter }) {
  if (countries.length === 0) {
    return <p>No matches</p>
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <ul>
      {countries.map((country, index) => (
        <li key={index}>
          {country.name.common}
          <button onClick={() => setFilter(country.name.common)}>show</button>
        </li>
      ))}
    </ul>
  )
}

function App() {
  // states
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  // effects
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data)
      })
  }, [])

  // pure variables
  const filterd = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <p>
        find countries
        <input 
          value={filter} 
          onChange={({target}) => setFilter(target.value)} />
      </p>
      
      {filter && <CountryList countries={filterd} setFilter={setFilter} />}
    </div>
  )
}

export default App
