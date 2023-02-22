import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './Common'

const OrderList = ({ orders }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Total</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>
              <Link to={`/active-order/${getUser().name}/${order.id}`}>{order.id}</Link>
            </td>
            <td>{order.total_cost}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;