import React from 'react';
import { withRouter } from "react-router-dom";
import NavigationMenuR from './NavigationMenuR.js';
import OrderList from './OrderList';
import "./dashboard.css"
import { getUser } from "./Common.js";

class RestaurantDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeOrders: [],
    };
  }

  componentDidMount() {
    // Fetch active order details from the server
    // and update the state
    const user = getUser().name;
    fetch(`http://localhost:8000/api/core/orders/${user}/`)
      .then(response => response.json())
      .then(activeOrders => {
        this.setState({ activeOrders });
    });
  }
  render() {
    const { activeOrders } = this.state;
    return (
      <div className="dashboard-container">
        <NavigationMenuR history={this.props.history} />
        {activeOrders.length > 0 ? (
          <article className='maincontent'>
            <fieldset>
              <legend>Orders Pending for Confirmation</legend>
              <OrderList
                orders={activeOrders.filter(order => order.status === 'pending')}
              />
            </fieldset>
            <fieldset>
              <legend>Orders Awaiting Delivery</legend>
              <OrderList
                orders={activeOrders.filter(order => order.status === 'awaiting_delivery')}
              />
            </fieldset>
            <fieldset>
              <legend>Orders Accepted</legend>
              <OrderList
                orders={activeOrders.filter(order => order.status === 'accepted')}
              />
            </fieldset>
            <fieldset>
              <legend>Orders Rejected</legend>
              <OrderList
                orders={activeOrders.filter(order => order.status === 'rejected')}
              />
            </fieldset>
          </article>
        ) : (
          <article className='maincontent'>
          <fieldset>
            <h2>No orders</h2>
          </fieldset>
          </article>
        )}
      </div>
    );
  }
}

export default withRouter(RestaurantDashboard);