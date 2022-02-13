import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//App state
import AppState from "./store/AppState";

//Pages
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./Dashboard/MapChart";
import ReactTooltip from "react-tooltip";
import HomePage from "./Dashboard/HomePage";

function App() {
   const [content, setContent] = useState("");
   return (
      <Router>
         <AppState>
            <Switch>
               <Route exact path="/">
                  <HomePage />
               </Route>
               <Route exact path="/">
                  <SignUp />
               </Route>
               <Route exact path="/signup">
                  <SignUp />
               </Route>
               <Route exact path="/login">
                  <Login />
               </Route>
               <Route exact path="/dashboard">
                  <Dashboard setTooltipContent={setContent} />
                  <ReactTooltip>{content}</ReactTooltip>
               </Route>
            </Switch>
         </AppState>
      </Router>
   );
}

export default App;
