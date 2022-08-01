/**For router */
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import { Route, HashRouter as Router, Switch } from "react-router-dom";

/**Get some screens */
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

/**Get some components */
import Header from "./Components/Header";
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
    <BrowserRouter basename={"https://Briley0205.github.io/Biflix-movie-app"}>
      <Header />
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/tv">
          <Tv />
        </Route>
        <Route path={["/", "/:part/:sliderPart/:id"]}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
