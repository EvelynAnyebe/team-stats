import "./App.css";

import "./styles.css";

import React, { useState } from "react";
import MapChart from "./Dashboard/MapChart";
import ReactTooltip from "react-tooltip";

function App() {
   const [content, setContent] = useState("");
   return (
      <div className="App">
         <MapChart setTooltipContent={setContent} />
         <ReactTooltip>{content}</ReactTooltip>{" "}
      </div>
   );
}

export default App;
