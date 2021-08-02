//  API key = a6f827095f4e99ba5e1440ece560aa62
// Base address = api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// http://openweathermap.org/img/wn/10d@2x.png

import React, { useState } from "react";
const api = {
  key: "a6f827095f4e99ba5e1440ece560aa62",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {


  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units-metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }



  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    
    <div className={(typeof weather.main != "undefined") ? (((weather.main.temp - 273) > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
      <h1 className="heading">Weather Lens</h1>
        <div className="searchBox">
          <input type="text" className="searchBar" placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="allContent">
            <div>
              <div className="loactionBox">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
            </div>
            <div className="weatherBox">
              <div className="temp">
                {Math.round(weather.main.temp - 273)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <img
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt="weather status icon"
              className="weather-icon"
            />
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
