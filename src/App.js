import React, { useEffect } from "react"
import './App.scss'
import MovieListing from "./components/movieListing"
import MovieDetail from "./components/movieDetail"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  useEffect(() => {
    document.body.id = 'body'
  })

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Redirect to="/movie" />
            )
          }}
        />
        <Route exact path="/movie/:movieId">
          <MovieDetail />
        </Route>
        <Route exact path="/movie">
          <MovieListing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
