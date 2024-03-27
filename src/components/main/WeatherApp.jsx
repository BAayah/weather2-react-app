import axios from 'axios';
import React, { useState } from 'react';

export const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState('')

    const apiKey = '1f35eb9607afbf8bb30aa9e2813f6ca7';

    const getWeatherData = async () => {
        try {
            const response = await axios.get(
                ` http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            )
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setWeatherData(null);
            setError("City isn't found");
        }
    };

    const getIcon = (iconCode) => `http://openweathermap.org/img/w/${iconCode}.png`

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' });

    return (
        <div>
            <h2 className="weath">Weather Application</h2>
            <p>Date: {date}</p>
            <p>Time: {time}</p>
            <input type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} />
            <button onClick={getWeatherData}>Get weather</button>
            {
                weatherData && (
                    <div>
                        <h2>{weatherData.name}</h2>
                        <p>Temperature: {weatherData.main.temp}&deg;C</p>
                        <img src={getIcon(weatherData.weather[0].icon)} alt='' />
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind speed: {weatherData.wind.speed}m/c</p>
                    </div>
                )
            }
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
        </div>
    )
}


