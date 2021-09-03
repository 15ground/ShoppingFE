import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "@fontsource/roboto";
import ProductsPage from "./containers/ProductsPage";
import Header from "./components/Header";
function App() {
  return (
    <div>
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/" component={ProductsPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
