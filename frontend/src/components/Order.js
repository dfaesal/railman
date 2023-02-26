import React from "react";
import Menu from "./Menu.js";
import Payment from "./Payment.js"
import axios from "axios";
import { getUser } from "./Common.js";

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      orderItems: [],
    };
  }
  componentDidMount() {
    const url = window.location.href.split("/");
    const restaurant = url[url.length - 2];
    axios
      .get(`http://localhost:8000/api/core/${restaurant}/menuItems/`)
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(error => {
        console.error(error);
      });
  }
  handleItemSelection = (item) => {
    this.setState(prevState => ({
      orderItems: [...prevState.orderItems, item],
    }));
  }

  handlePayment = (paymentInfo) => {
    //send paymentInfo to server
    console.log(paymentInfo);
    const url = window.location.href.split("/");
    const restaurant = url[url.length - 2];
    const orderItems = this.state.orderItems.map(item => item.name);
    const user = getUser().id;
    const orders = {
      "user": user,
      "restaurant": restaurant,
      "orderItems": orderItems,
      "status": "pending"
    };
    axios.post("http://localhost:8000/api/core/orders/", orders)
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
        <Menu items={this.state.items} handleItemSelection={this.handleItemSelection} />
        <Payment handlePayment={this.handlePayment} />
      </div>
    );
  }
}

export default Order;

  