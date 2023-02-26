import React from 'react';
import { withRouter } from 'react-router-dom';
import NavigationMenuC from './NavigationMenuC.js'
import ActiveOrders from './ActiveOrders.js'
import "./dashboard.css"
import { getUser } from './Common.js';

class CustomerDashboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        activeOrders: [],
      };
    }
    componentDidMount() {
      // Make API call to fetch active orders
      const user = getUser().id;
      fetch(`http://localhost:8000/api/core/orders/${user}/`)
        .then((res) => res.json())
        .then((data) => {
          this.setState({ activeOrders: data });
        });
    }
    render() {
      const { activeOrders } = this.state;
      return (
        <div className="dashboard-container">
          <NavigationMenuC history={this.props.history} />
          {activeOrders.length > 0 ? (
            <ActiveOrders orders={activeOrders} />
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
export default withRouter(CustomerDashboard);