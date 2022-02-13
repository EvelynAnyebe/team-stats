import React, { memo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import "../styles.css";
import WeatherAPI from "./WeatherAPI";
import NewsAPI from "./NewsAPI";
import Modal from "./Modal";

const geoUrl =
   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
   { markerOffset: 15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
   { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
   { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
   { markerOffset: 15, name: "Potato", coordinates: [0.6693, 10.4489] },
];

const newsAndWeather = (specificCooridnates) => (
   <div>
      <NewsAPI coordinates={specificCooridnates} />
      <WeatherAPI coordinates={specificCooridnates} />
   </div>
);

const MapChart = ({ setTooltipContent }) => {
   const [show, setShow] = useState(false);

   return (
      <>
         <Modal onClose={() => setShow(false)} show={show} />
         <div style={{ width: "100%" }}>
            <button
               className="button"
               style={{
                  marginTop: "2%",
                  position: "absolute",
               }}
               onClick={() => setShow(true)}
            >
               Add Employee
            </button>
         </div>
         <ComposableMap
            data-tip=""
            projectionConfig={{ scale: 200 }}
            style={{ default: { fill: "#D6D6DA", outline: "none" } }}
         >
            <Geographies
               geography={geoUrl}
               style={{ default: { fill: "#D6D6DA", outline: "none" } }}
            >
               {({ geographies }) =>
                  geographies.map((geo) => (
                     <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#EAEAEC"
                        style={{
                           default: {
                              fill: "#D6D6DA",
                              outline: "none",
                           },
                           hover: {
                              fill: "#D6D6DA",
                              outline: "none",
                           },
                           pressed: {
                              fill: "#D6D6DA",
                              outline: "none",
                           },
                        }}
                     />
                  ))
               }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
               <Marker
                  key={name}
                  coordinates={coordinates}
                  style={{
                     default: { outline: "none" },
                     hover: { fill: "#FFFFFF", outline: "none" },
                     pressed: { fill: "#FFFFFF", outline: "none" },
                  }}
                  onMouseEnter={() => {
                     setTooltipContent(() => newsAndWeather(coordinates));
                  }}
                  onMouseLeave={() => {
                     setTooltipContent("");
                  }}
               >
                  <g
                     fill="transparent"
                     stroke="#FF5533"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     transform="translate(-12, -24)"
                  >
                     <circle cx="12" cy="10" r="3" />
                     <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                  </g>
                  <text
                     textAnchor="middle"
                     y={markerOffset}
                     style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                  >
                     {name}
                  </text>
               </Marker>
            ))}
         </ComposableMap>
      </>
   );
};

export default memo(MapChart);
