import {
  Routes as Switch,
  Route,
  // Navigate as Redirect,
} from "react-router-dom";

import Home from "./components/Home";
// import NotFound from "./components/NotFound";

import "./App.css";

const App = () => (
  <Switch>
    <Route path="/" element={<Home />}></Route>
  </Switch>
);

export default App;
