import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@fontsource/roboto';
import ProductsPage from './containers/ProductsPage';
import Header from './components/Header';
import AdminPage from './containers/AdminPage';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={ProductsPage} />
            <Route path="/dashboard" component={AdminPage} />
            <Route path="/add" component={AddProduct} />
            <Route path="/edit/:id" component={EditProduct} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
