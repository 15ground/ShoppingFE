import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "@fontsource/roboto";
import ProductsPage from "./containers/ProductsPage";
import Header from "./components/Header";
import AdminPage from "./containers/AdminPage";
function App() {
  return (
    <div>
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/" component={ProductsPage}/>
          <Route path="/dashboard" component={AdminPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
