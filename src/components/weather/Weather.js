import React, { useState } from 'react';
import './Weather.scss';

const Weather = () => {
  const today = new Date();
  const month = today.getMonth() + 1
  let date = today.getDate() + '/' +(month < 10 ? (0 + '' + month): month) + '/' +today.getFullYear();
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [dateToday, setDayToday] = useState(date);

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
        setIsLoading(true);
        setError(true);
        fetch(`${api.url}weather?q=${input}&unit=metrics&APPID=${api.key}`)
        .then((res) => {
            if (!res.ok) {
                throw Error('Failed to Fetch Data');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            setWeather(data);
            setInput('');
            setError(false);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err.message);
            setError(true);
            setErrorMsg(err.message);
            setIsLoading(false);
        });
    }
  }

  return (
    <section className='-100vh --center-all'>
        <div className="container weather --flex-center">
            <div className="weather-app --text-light">
                <h1>Weather App</h1>
                <p>{dateToday}</p>
                <div className="--form-control --my2">
                    <input type="text" placeholder='Search city name' onChange={getInput} value={input} onKeyDown={getWeatherData} />
                </div>
                {error ? (
                    <p className={errorMsg !== '' && 'error'}>{errorMsg}</p>
                ):(
                    <div className="result --card --my2">
                        <h2>{weather.name}, {weather.sys.country}</h2>
                        <img src={iconUrl + weather.weather[0].icon+'.png'} alt={weather.weather[0].main} />
                        <p>Temperature : {Math.round(weather.main.temp - 273.15)}°C</p>
                        <p>Weather : {weather.weather[0].main}</p>
                        <p>Temperature range : {Math.round(weather.main.temp_min - 273.15)}°C - {Math.round(weather.main.temp_max - 273.15)}°C</p>
                    </div>
                )}
                {isLoading && <h3>Loading</h3>}
            </div>
        </div>
    </section>
  )
}

export default Weather;
