import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "@fontsource/roboto";
import ProductsPage from "./containers/ProductsPage";
import Header from "./components/Header";
import AdminPage from "./containers/AdminPage";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
function App() {
  return (
    <div>
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/" component={ProductsPage}/>
          <Route path="/dashboard" component={AdminPage}/>
          <Route path="/add" component={AddProduct}/>
          <Route path="/edit/:id" component={EditProduct}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
