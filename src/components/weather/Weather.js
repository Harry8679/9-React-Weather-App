import React from 'react';
import './Weather.scss';

const Weather = () => {
  return (
    <section className='-100vh --center-all'>
        <div className="container weather --flex-center">
            <div className="weather-app --text-light">
                <h1>Weather App</h1>
                <p>22-01-2024</p>
                <div className="--form-control --my2">
                    <input type="text" placeholder='Search city name' />
                </div>
                <div className="result --card --my2">
                    <h2>Libreville</h2>
                    <img src="" alt="Clouds" />
                    <p>Temperature : 23°C</p>
                    <p>Weather : Clouds</p>
                    <p>Temperature range : 18°C - 25°C</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Weather;
