import React, { useState, useEffect } from 'react';
import "./card.css"
function Card({forecast,forecastData}) {
  return (
    //Hangi gündeysek o günün hava durumu kartını belirgin yapıyoruz
    <div className={`weatherCards ${forecast.dayOfWeek == forecastData.day ? ' activeCards' : ''}`} key={forecast.dayOfWeek}>
    <strong>{forecast.dayOfWeek}</strong>
    <img className='weatherImage' src={forecast.weatherIconUrl} alt={forecast.description} />
    <div className='weatherValue'>
      <div>{forecast.min}</div>
      <div>{forecast.max}</div>
    </div>
  </div>
  );
}

export default Card;

