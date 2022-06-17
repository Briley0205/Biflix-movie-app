/**For router */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/**Get some screens */
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

/**Get some components */

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
      <Switch>
        <Route path="/tv">
          <Tv />
        </Route>
      </Switch>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
