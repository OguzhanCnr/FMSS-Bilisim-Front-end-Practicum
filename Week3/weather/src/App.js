import Select from 'react-select'
import React, { useState, useEffect } from 'react';
import { useWeather } from "./context/WeatherContext"
import { cities } from './data/cities';
import './App.css'
import Card from './components/card';
function App() {
  const [forecastData, setForecastData] = useState([]);
  const [selectCity, setSelectCity] = useState("Şehir Seçiniz");
  //Context kısmımızdan gelen değerler
  const { getWeather, loading } = useWeather()

  const handleCityChange = (selectedOption) => {
    //Seçilen şehri alıyoruz ve hem selectin placeholder kısmına yazıyoruz 
    //hem de seçtiğimiz şehir ile Api ye sorgu gönderiyoruz
    let city = selectedOption.value
    setSelectCity(selectedOption.label)
    getWeather({ setForecastData, city })
  }

  return (
    <div>

      <div className='Select-button' >
        <Select
          id="city-select"
          name="city"
          options={cities}
          onChange={handleCityChange}
          placeholder={selectCity}
        />
      </div>
      {forecastData.weather &&
        <div className='weatherBox'>
          {forecastData.weather.map((forecast) => (
           <Card forecast={forecast} forecastData={forecastData}></Card>
          ))}
        </div>
      }

    </div>
  );
}

export default App;

