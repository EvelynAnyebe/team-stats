import "./App.css";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import MapChart from "./Dashboard/MapChart";
import HomePage from "./Dashboard/HomePage";

import ReactTooltip from "react-tooltip";

function App() {
   const [content, setContent] = useState("");
   return (
      <div className="App">
         <HomePage />
         {/* <MapChart setTooltipContent={setContent} /> */}
         {/* <ReactTooltip>{content}</ReactTooltip> */}
      </div>
   );
}

export default App;
