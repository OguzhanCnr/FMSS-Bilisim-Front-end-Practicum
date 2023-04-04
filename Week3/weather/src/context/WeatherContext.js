import { useContext, useState, useEffect, createContext } from "react"
import PropTypes from "prop-types"
import axios from "axios"


// ** Context
const WeatherContext = createContext()

const WeatherProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  let weatherListJson=[];
  const getWeather = ({setForecastData,city}) => {
    setLoading(false)
    //Api sorgumuzu gönderiyoruz
    axios.get(`${process.env.REACT_APP_API_URL}/forecast?q=${city},TR&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then((result) => {
        //Dönen resulttan hangi şehrin durumu olduğunu görmek için city kısmını alıyoruz
        weatherListJson.city=result.data.city.name;

        //Bu kısımda da şu an hangi gündeysek onu dönderiyoruz
        //Aktif kartımızı belirlememiz için gerekiyor
        const day = new Date();
        const today =['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day.getDay()];
        weatherListJson.day=today;
        const forecastList = result.data.list;
  
        // Tarihleri gruplara ayır
        const groupedForecasts = {};
        forecastList.forEach((forecast) => {
          const date = new Date(forecast.dt_txt);
          const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
          if (!groupedForecasts[dayOfWeek]) {
            groupedForecasts[dayOfWeek] = [];
          }
          groupedForecasts[dayOfWeek].push(forecast);
        });
  
        // Her grup için ilk öğeyi al ve listeye ekle
        const firstForecasts = Object.keys(groupedForecasts).map((dayOfWeek) => {
          const firstForecast = groupedForecasts[dayOfWeek][0];
          const weatherIconUrl = `http://openweathermap.org/img/wn/${firstForecast.weather[0].icon}.png`;
         
          //İstenilen verileri döndürüyoruz
          return {
            dayOfWeek,
            dateTime: firstForecast.dt_txt,
            main: firstForecast.weather[0].main,
            min:firstForecast.main.temp_min,
            max:firstForecast.main.temp_max,
            weatherIconUrl
          };
        });
        weatherListJson.weather=firstForecasts;
        setForecastData(weatherListJson);
        setLoading(true)
      }).catch(function (error) {
        console.log(error)
      })
  }
  
  const values = { getWeather, loading }
  return <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
}

WeatherProvider.propTypes = {
  children: PropTypes.node.isRequired
}
const useWeather = () => useContext(WeatherContext)

export { WeatherProvider, useWeather }