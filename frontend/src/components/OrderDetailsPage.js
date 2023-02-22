import React, { Component } from 'react';
import axios from 'axios';

class OrderDetailsPage extends Component {
    state = {
        order: null
    }

    componentDidMount() {
    const { restaurant, orderId } = this.props.match.params;
    //fetch order details based on orderId
    //set order details to state
    fetch(`http://localhost:8000/api/core/orders/${restaurant}/${orderId}/`)
      .then(response => response.json())
      .then(order => {
        this.setState({ order });
    });
  }

  handleAcceptOrder = async () => {
    try {
        const { order } = this.state;
        const updatedOrder = {...order, status: 'accepted'};
        const { restaurant } = this.props.match.params;
        // send a PATCH request to the server to update the order status
        await axios.patch(`http://localhost:8000/api/core/orders/${restaurant}/${order.id}/`, updatedOrder);
        // update the local state with the updated order details
        this.setState({ order: updatedOrder });
    } catch (error) {
        console.log(error);
    }
    this.props.history.push('/restaurant-dashboard');
  }

  handleRejectOrder = async () => {
    try {
        const { order } = this.state;
        const updatedOrder = {...order, status: 'rejected'};
        const { restaurant } = this.props.match.params;
        // send a PATCH request to the server to update the order status
        await axios.patch(`http://localhost:8000/api/core/orders/${restaurant}/${order.id}/`, updatedOrder);
        // update the local state with the updated order details
        this.setState({ order: updatedOrder });
    } catch (error) {
        console.log(error);
    }
    this.props.history.push('/restaurant-dashboard');
  }


  render() {
    const { order } = this.state;
    if (!order) return <div>Loading...</div>;

    return (
      <div>
        <h2>Order Details</h2>
        <div>Order ID: {order.id}</div>
        <div>Customer Name: {order.customerName}</div>
        <div>Items: {order.orderItems.join(', ')}</div>
        <div>Total: {order.total_cost}</div>
        { order.status === 'pending' ?
        <div>
          <button onClick={this.handleAcceptOrder}>Accept</button>
          <button onClick={this.handleRejectOrder}>Reject</button>
        </div>
        : <div>Status: {order.status}</div>
        }
      </div>
    )
  }
}

export default OrderDetailsPage;