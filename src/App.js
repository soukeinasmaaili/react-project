import logo from './logo.svg';
import './App.css';
import { useRef, useState, useEffect } from 'react';
import {Clear, Clouds, Dizzle, Humidity, Mist, Rain, Search, Snow, Wind} from './assets';
import axios from 'axios';

function App() {
  const [myWeather, setWeather] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const city = useRef(null)
  const [celcius, setCelcius] = useState('')
  const [wind, setWind] = useState('')
  const [humidity, setHumidity] = useState('')
  const getWeather = async (city) => {
    try {
      axios.get(`${process.env.REACT_APP_API_URL}${city}&appid=${process.env.REACT_APP_API_KEY}`).then((response) => {
        setCelcius(response.data.main.temp)
        setWind(response.data.wind.speed)
        setHumidity(response.data.main.humidity)
        const WeatherMain = response.data.weather[0].main;
        switch (WeatherMain) {
          case 'Clouds':
            setWeather('clouds');
            setWeatherIcon(Clouds)
            break;
          case 'Rain':
            setWeather('rain');
            setWeatherIcon(Rain)
            break;
          case 'Clear':
            setWeather('clear');
            setWeatherIcon(Clear)
            break;
          case 'Mist':
            setWeather('mist');
            setWeatherIcon(Mist)
            break;
          case 'Snow':
            setWeather('snow');
            setWeatherIcon(Snow)
            break;
          case 'Drizzle':
            setWeather('drizzle');
            setWeatherIcon(Dizzle)
            break;
          default:
            setWeather('unknown');
        }
      })
      
    } catch (error) {
      console.error('Fetching weather data failed:', error);
    }
  };
  return (
    <div className="card">
      <div className="search">
        <input ref={city} type="text" placeholder="Entrez le nom du Ville" />
        <button>
          <img src={Search} alt="search" onClick={() => getWeather(city.current.value)} />
        </button>
      </div>

      {myWeather !== "" &&
          <div className="weather">
            <div className="head">
              <img src={weatherIcon} alt="Weather Icon" className="weather-icon"/>
              <div className="temprature">
                <h1 className="celsius">{celcius}</h1>
                <h3 className="city">{city.current.value}</h3>
              </div>
            </div>
            <div className="details">
              <div className="col">
                <img src={Wind} alt="Wind"/>
                <h5 className="wind">{wind}</h5>
              </div>
              <div className="col">
                <img src={Humidity} alt="Humidity"/>
                <h5 className="humidity">{humidity}</h5>
              </div>
            </div>
          </div>
      }

    </div>
  );
}

export default App;
