import React from 'react';
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import './App.css';
import Login from './components/Login.js';
import Registration from "./components/Registration";
import CustomerDashboard from './components/CustomerDashboard.js';
import RestaurantDashboard from './components/RestaurantDashboard.js';
import UnderConstruction from './components/UnderConstruction.js'
import OrderDetailsPage from './components/OrderDetailsPage.js'
import RestaurantSearch from './components/RestaurantSearch.js';
import PreviousOrders from './components/PreviousOrders.js';
import Order from './components/Order.js';

class App extends React.Component { 
  render() {
    return (
      <div className="container">
        <div className='App-body'>
          <BrowserRouter>
              <Route path="/" exact render={() => <Redirect to='/login' />} />
              <Route path="/login" exact component={() => <Login />} />
              <Route path="/registration" exact component={Registration} />
              <Route path="/customer-dashboard" exact component={() => <CustomerDashboard />} />
              <Route path="/restaurant-dashboard" exact component={() => <RestaurantDashboard />} />
              <Route path="/menu-item" exact component={UnderConstruction} />
              <Route path="/time" exact component={UnderConstruction} />
              <Route path="/availability" exact component={UnderConstruction} />
              <Route path="/active-order/:restaurant/:orderId" component={OrderDetailsPage} />
              <Route exact path="/restaurants" component={RestaurantSearch} />
              <Route path="/previous-orders" component={PreviousOrders} />
              <Route exact path="/restaurant/:name/menu" component={Order} />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}


export default App;
