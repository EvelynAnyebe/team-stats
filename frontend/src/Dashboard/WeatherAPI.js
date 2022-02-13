import React, { useEffect, useState, useRef } from "react";
import "../styles.css";
import Weather from "./Weather.js";

const WeatherAPI = ({ coordinates }) => {
   const [data, setData] = useState([]);

   const lat = coordinates[0];
   const long = coordinates[1];

   const isMounted = useRef(true);

   useEffect(() => {
      const fetchWeather = async () => {
         await fetch(
            `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
         )
            .then((res) => res.json())
            .then((result) => {
               if (isMounted) {
                  setData(result);
               }
            });
      };

      fetchWeather();
      return () => {
         isMounted.current = false;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lat, long]);

   return (
      <div className="App">
         {typeof data.main != "undefined" ? <Weather weatherData={data} /> : <div></div>}
      </div>
   );
};

export default WeatherAPI;
