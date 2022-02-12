import React, { memo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import "../styles.css";

const geoUrl =
   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = (num) => {
   if (num > 1000000000) {
      return Math.round(num / 100000000) / 10 + "Bn";
   } else if (num > 1000000) {
      return Math.round(num / 100000) / 10 + "M";
   } else {
      return Math.round(num / 100) / 10 + "K";
   }
};

const markers = [
   {
      markerOffset: -30,
      name: "Buenos Aires",
      coordinates: [-58.3816, -34.6037],
   },
   { markerOffset: 15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
   { markerOffset: 15, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
   { markerOffset: 15, name: "Santiago", coordinates: [-70.6693, -33.4489] },
   //    { markerOffset: 15, name: "Bogota", coordinates: [-74.0721, 4.711] },
   //    { markerOffset: 15, name: "Quito", coordinates: [-78.4678, -0.1807] },
   //    { markerOffset: -30, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
   //    { markerOffset: -30, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
   //    { markerOffset: 15, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
   //    { markerOffset: 15, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
   //    { markerOffset: 15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
   //    { markerOffset: 15, name: "Lima", coordinates: [-77.0428, -12.0464] },
];

const MapChart = ({ setTooltipContent }) => {
   return (
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
         {/* <ZoomableGroup zoom={1}> */}
         <Geographies geography={geoUrl}>
            {({ geographies }) =>
               geographies.map((geo) => (
                  <Geography
                     key={geo.rsmKey}
                     geography={geo}
                     fill="#EAEAEC"
                     onMouseEnter={() => {
                        const { NAME, POP_EST } = geo.properties;
                        setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                     }}
                     onMouseLeave={() => {
                        setTooltipContent("");
                     }}
                     style={{
                        default: {
                           fill: "#D6D6DA",
                           outline: "none",
                        },
                        hover: {
                           fill: "#F53",
                           outline: "none",
                        },
                        pressed: {
                           fill: "#E42",
                           outline: "none",
                        },
                     }}
                  />
               ))
            }
         </Geographies>
         {/* </ZoomableGroup> */}
         {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
               <rectangle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />

               <text>{name}</text>
            </Marker>
         ))}
      </ComposableMap>
   );
};

export default memo(MapChart);
