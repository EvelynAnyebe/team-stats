import "./App.css";

import "./styles.css";

import React, { useState } from "react";
import MapChart from "./Dashboard/MapChart";
import ReactTooltip from "react-tooltip";

function App() {
   const activateLasers = () => {
      setTomato(tomato + 1);
   };

   const [tomato, setTomato] = useState(1);
   const [content, setContent] = useState("");
   return (
      <div className="App">
         {tomato}
         <button onClick={activateLasers}>Activate Lasers</button>
         {/* <div>
            <div>byeee</div>
            <div>okkk</div>
         </div> */}
         <MapChart setTooltipContent={setContent} />
         <ReactTooltip>{content}</ReactTooltip>{" "}
      </div>
   );
}

export default App;
