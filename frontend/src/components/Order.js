import React from "react";
import Menu from "./Menu.js";
import Payment from "./Payment.js"
import axios from "axios";
import { getUser } from "./Common.js";

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderItems: [],
      orderTotal: 0,
      lastIndex: 0
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8000/api/core/orders")
      .then((response) => {
        this.setState({ lastIndex: response.data.length + 1 });
      })
      .catch((error) => {
        console.log(error);
    });
  }
  handleItemSelection = (item) => {
    this.setState(prevState => ({
      orderItems: [...prevState.orderItems, item],
      orderTotal: prevState.orderTotal + item.price,
    }));
  }

  handlePayment = (paymentInfo) => {
    //send paymentInfo to server
    console.log(paymentInfo);
    const url = window.location.href.split("/");
    const restaurant = url[url.length - 2];
    const orderItems = this.state.orderItems.map(item => item.name);
    const customerName = getUser().name;
    const orders = {
      "id": this.state.lastIndex,
      "customerName": customerName,
      "restaurant": restaurant,
      "total": this.state.orderTotal,
      "orderItems": orderItems,
      "status": "pending"
    };
    axios.post("http://localhost:8000/api/orders", orders)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
    });
    
    this.props.history.push('/customer-dashboard');
  }

  render() {
    return (
      <div>
        <h2>Order</h2>
        <Menu items={this.props.items} handleItemSelection={this.handleItemSelection} />
        <Payment handlePayment={this.handlePayment} />
      </div>
    );
  }
}

export default Order;

  