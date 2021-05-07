import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CardComponets from "./Components/CardComponent";
import CitySelectContainer from "./Components/CitySelectContainer";
import { Route, Switch } from "react-router-dom";

import twoOptions from "./Components/Screen/twoOptions";
import OxygenCylindersCanHelp from "./Components/Screen/OxygenCylindersCanHelp";
import OxygenCylindersNeedHelp from "./Components/Screen/OxygenCylindersNeedHelp";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={CitySelectContainer}></Route>

      <Route path="/:city" exact component={CardComponets}></Route>
      <Route path="/:city/:option/options" exact component={twoOptions}></Route>
      <Route
        path="/:city/:option/options/can-help"
        exact
        component={OxygenCylindersCanHelp}
      ></Route>
      <Route
        path="/:city/:option/options/need-help"
        exact
        component={OxygenCylindersNeedHelp}
      ></Route>
    </Switch>
  );
}

export default App;
