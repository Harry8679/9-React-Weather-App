import React, { useState } from 'react';
import './Weather.scss';

const Weather = () => {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const api = {
    url: 'https://api.openweathermap.org/data/2.5/',
    key: '51253f9dc2b503e4582c22828c3ad670'
  };

  const iconUrl = 'https://api.openweathermap.org/img/w/'

  const getInput = e => {
    setInput(e.target.value);
  }

  const getWeatherData = e => {
    if (e.key === 'Enter' && input === '') {
        setErrorMsg('Input cannot be empty');
        setError(true);
    }

    if (e.key === 'Enter' && input !== '') {
        fetch(`${api.url}weather?q=${input}&unit=metrics&APPID=${api.key}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setWeather(data);
            setInput('');
            setError(false);
        });
    }
  }

  return (
    <section className='-100vh --center-all'>
        <div className="container weather --flex-center">
            <div className="weather-app --text-light">
                <h1>Weather App</h1>
                <p>22-01-2024</p>
                <div className="--form-control --my2">
                    <input type="text" placeholder='Search city name' onChange={getInput} value={input} onKeyDown={getWeatherData} />
                </div>
                {error ? (
                    <p>{errorMsg}</p>
                ):(
                    <div className="result --card --my2">
                        <h2>{weather.name}, {weather.sys.country}</h2>
                        <img src={iconUrl + weather.weather[0].icon+'.png'} alt={weather.weather[0].main} />
                        <p>Temperature : {Math.round(weather.main.temp)}°C</p>
                        <p>Weather : {weather.weather[0].main}</p>
                        <p>Temperature range : {Math.round(weather.main.temp_min)}°C - {Math.round(weather.main.temp_max)}°C</p>
                    </div>
                )}
            </div>
        </div>
    </section>
  )
}

export default Weather;
