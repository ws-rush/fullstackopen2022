import { useState, useEffect } from 'react'

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
      {weather.main && (
        <>
          <img src={country.flags.png} alt={country.name.common} width="200" />
          <h3>Weather in {country.capital}</h3>
          <p><strong>temperature:</strong> {weather.main.temp} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather?.weather[0].main} />
          <p><strong>wind:</strong> {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  )
}

function CountryLine({ country }) {
  const [show, setShow] = useState(false)
  return (
    <>
      <p>
        <span>{country.name.common}</span>
        <button onClick={() => setShow(!show)}>{show? 'hide' : 'show'}</button>
      </p>
      {show && <Country country={country} />}
    </>
  )
}

function App() {
  // states
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  // effects
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data)
      })
  }, [])

  // handlers
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  // pure variables
  const countriesToShow = search 
    ? countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    : ''

  return (
    <div>
      <p>
        find countries
        <input value={search} onChange={handleSearchChange} />
      </p>
      {
        (countriesToShow.length > 10) && 
        <p>Too many matches, specify another filter</p>
      }
      {
        (countriesToShow.length <= 10 && countriesToShow.length > 1) && 
        countriesToShow.map(country => <CountryLine key={country.cca3} country={country} />)
      }
      {
        (countriesToShow.length === 1) && 
        countriesToShow.map(country => <Country key={country.cca3} country={country} />)
      }
    </div>
  )
}

export default App
