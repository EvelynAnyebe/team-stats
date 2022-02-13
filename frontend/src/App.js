import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//App state
import AppState from "./store/AppState";

//Pages
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import MapChart from "./Dashboard/MapChart";
import Dashboard from "./pages/Dashboard";
import HomePage from "./Dashboard/HomePage";

import ReactTooltip from "react-tooltip";

function App() {
  const [content, setContent] = useState("");
  return (
    <Router>
      <AppState>
        <Switch>
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
            <Dashboard />
          </Route>
        </Switch>
        </AppState>
    </Router>
  );
}

export default App;