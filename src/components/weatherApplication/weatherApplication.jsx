import React, { useRef, useState } from "react";
import "./weatherApplication.css";
import high_temp_icon from "../assets/high-temperature-icon.png";
import sun_cloud from '../assets/weer-icoon-dag.png';
import yellow_sun from '../assets/yellow-sun-with-rays.png';
import sun_cloud_rain from '../assets/day-with-rain.png';
import sun_cloud_rain_tunder from '../assets/day-with-rain_tunder.png';
import sun_cloud_snow from '../assets/day-with-snow.png';
import sun_cloud_rain_two from '../assets/day-with-rain_two.png';
import cloud from '../assets/cloud.png';
import night_one from '../assets/01n.png';
import night_three from '../assets/03n.png';
import night_four from '../assets/04n.png';
import night_nine from '../assets/09n.png';
import night_ten from '../assets/10n.png';
import night_eleven from '../assets/11n.png';
import night_thirteen from '../assets/13n.png';

function WeatherApp() {
    
    const inputRef = useRef(null);
    const currentDate = new Date().toDateString();
    const currentTime = new Date().toLocaleTimeString();
    const[wicon,setWicon] = useState(sun_cloud);
    const [weatherData, setWeatherData] = useState({
        location: '-------',
        temperature: '°C',
        feelsLike:"°C",
        sunrise:"",
        sunset:"",
        discription:"-------------------",
        humidity: '%',
        windSpeed: 'km/hr',
        windDegree:"°",
        visibility:"",
        latitude:"",
        longitude:"",
        pressure:"pa",
        country:"",
        tempMin:"°C",
        tempMax:"°C"

    });
    const [containerColor, setContainerColor] = useState("hsla(209, 88%, 42%, 1)");
    const search = async ()=>{
        const textValue = inputRef.current.value.trim()
        if (textValue === ""){
            alert('search bar cannot be blank')
        }
        try{
            const apiKey = process.env.REACT_APP_API_KEY;
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${textValue}&units=Metric&appid=${apiKey}`;
            const response = await fetch(url);

            function showAlertError(message) {
                alert(message);
                return false;
            }
            if (!response.ok){
                throw showAlertError('an error occured');
            }
            const data = await response.json();
            const icon = data.weather[0].icon;
            const sunsetdate = new Date((data.sys.sunset) * 1000);
            const optionsone = {  
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit', 
              };
            const formattedSunsetDate = sunsetdate.toLocaleString('en-US', optionsone);

            const sunrisedate = new Date((data.sys.sunrise) * 1000);
            const optionstwo = {  
                  day: '2-digit', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                };
            const formattedSunriseDate = sunrisedate.toLocaleString('en-US', optionstwo);
            setWeatherData({
                temperature: Math.floor(data.main.temp) + "°C",
                location: data.name,
                feelsLike:data.main.feels_like + "°C",
                sunrise:formattedSunriseDate,
                sunset:formattedSunsetDate,
                discription:data.weather[0].description,
                windDegree:data.wind.deg  + "°",
                visibility:data.visibility,
                latitude:data.coord.lat,
                longitude:data.coord.lon,
                pressure:((data.main.pressure)*100)+"Pa",
                country:data.sys.country,
                tempMin:data.main.temp_min  + "°C",
                tempMax:data.main.temp_max  + "°C",
                humidity: data.main.humidity + "%",
                windSpeed: data.wind.speed + " km/hr"
            });
            if (icon && icon.length > 0) {
                console.log(icon);
                switch (icon) {
                    case '01d':
                        setWicon(yellow_sun);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '02d':
                        setWicon(sun_cloud);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '03d':
                    case '04d':
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        setWicon(cloud);
                        break;
                    case '09d':
                        setWicon(sun_cloud_rain);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '10d':
                        setWicon(sun_cloud_rain_two);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '11d':
                        setWicon(sun_cloud_rain_tunder);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '13d':
                        setWicon(sun_cloud_snow);
                        setContainerColor('hsla(217, 100%, 50%, 1)');
                        break;
                    case '01n':
                    case '02n':
                        setWicon(night_one);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '03n':
                        setWicon(night_three);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '04n':
                        setWicon(night_four);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '09n':
                        setWicon(night_nine);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '10n':
                        setWicon(night_ten);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '11n':
                        setWicon(night_eleven);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    case '13n':
                        setWicon(night_thirteen);
                        setContainerColor('hsla(205, 46%, 10%, 1)')
                        break;
                    default:
                        setWicon(yellow_sun);
                        break;
                }
            }
            
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
        }

    }



    return (
    <div className="container" style={{ background : containerColor }}>
        <div className="navbar">
            <div className="searchbar">
                    <input type="text" ref={inputRef} placeholder="search" />
                    <button onClick={search} className="material-symbols-outlined">search</button>
            </div>        
        </div>
        <div className="location">
            <div className="location-icon"><span class="material-symbols-outlined location-material-icon">location_on</span></div>
            <div className="location-name">{weatherData.location}</div>
        </div>
        <div className="main-details">
            <div className="middle-details">
                    <div className="left-side">
                        <div className="date-day">
                            <h3 className="current-date">{currentDate}</h3>
                            <h4 className="current-time">{currentTime}</h4>
                        </div>
                        <div className="temperature">
                            <div className="temp-details">
                                <div className="temp-icon">
                                    <img src={high_temp_icon} alt="temp icon" />
                                </div>
                                <div className="current-temp">{weatherData.temperature}</div>
                            </div>
                            <div className="feels-like">
                                <h3 className="current-feels-like">feels like <span className="feels-like-temp">{weatherData.feelsLike}</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className="middle">
                        <div className="icon">
                            <img src={wicon} alt="weathericon" />
                        </div>
                        <div className="icon-status">
                            <h4 className="icon-current-status">{weatherData.discription}</h4>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="sunrise">
                           <span class="material-symbols-outlined">water_lux</span>
                            <h4 className="current-sunrise">{weatherData.sunrise}</h4>
                        </div>
                        <div className="sunset">
                            <span class="material-symbols-outlined">wb_twilight</span>
                            <h4 className="current-sunset">{weatherData.sunset}</h4>
                        </div>
                        <div className="humidity">
                           <span class="material-symbols-outlined">humidity_percentage</span>
                            <h4 className="current-humidity">{weatherData.humidity}</h4>
                        </div>
                        <div className="wind-speed">
                           <span class="material-symbols-outlined">cyclone</span>
                            <h4 className="current-windspeed">{weatherData.windSpeed}r</h4>
                        </div>
                        <div className="wind-degree">
                            <span class="material-symbols-outlined">wind_power</span>
                            <h4 className="current-wind-degree">{weatherData.windDegree}</h4>
                        </div>
                        <div className="visiblity">
                        <span class="material-symbols-outlined">visibility</span>
                            <h4 className="cuurent-visiblity">{weatherData.visibility}</h4>
                        </div>
                    </div>
                </div>
                    <div className="footerbox">
                         <div className="box-left">
                                <div className="longitude">
                                    <h4 className="current-longitude">Longitude : {weatherData.longitude}</h4>
                                </div>
                                <div className="latitude">
                                    <h4 className="current-latitude">Latitude : {weatherData.latitude} </h4>
                                </div>
                                <div className="pressure">
                                    <h4 className="current-pressure">Pressure : {weatherData.pressure}</h4>
                                </div>
                         </div>
                         <div className="box-right">
                            <div className="ground-level">
                                <h4 className="current-ground-level">Country : {weatherData.country}</h4>
                            </div>
                            <div className="temp-min">
                                <h4 className="current-temp-min">Minimum Temp : {weatherData.tempMin}</h4>
                            </div>
                            <div className="temp-max">
                                <h4 className="current-temp-max">Maximum Temp : {weatherData.tempMax}</h4>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
    );
  }
  
  export default WeatherApp ;
  
