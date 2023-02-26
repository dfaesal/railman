import React from "react";

class ActiveOrders extends React.Component {
    render() {
      const { orders } = this.props;
      return (
        <article className="maincontent">
        <fieldset>
        <legend>Active Orders</legend>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Restaurant</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              order.status !== 'rejected' && order.status !== 'delivered' &&
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>{order.restaurantName}</td>
                <td>{order.total_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
      </article>
      );
    }
  }
export default ActiveOrders;