/**For router */
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/**Get some screens */
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

/**Get some components */
import Header from "./Routes/Components/Header";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "./atom";

function App() {
  const [isModalActive, setIsActive] = useRecoilState(modalState);
  useEffect(() => {
    isModalActive
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "scroll");
  }, [isModalActive]);
  return (
    <Router>
      <Header />
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
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
