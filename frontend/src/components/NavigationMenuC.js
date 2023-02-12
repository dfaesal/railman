import React from "react";
import { Link } from "react-router-dom";
import { removeUserSession } from './Common';

class NavigationMenuC extends React.Component {
  handleLogout = (e) => {
    removeUserSession();
    this.props.history.push('/');
    e.preventDefault();
  }
  render() {
    return (
      <header>
      <nav className="user-menu">
        <ul>
          <li><Link to="/restaurants">Search for Available Restaurant</Link></li>
          <li><Link to="/previous-orders">Previous Orders</Link></li>
        </ul>
        <input type="button" onClick={this.handleLogout} value="Logout" />
      </nav>
      </header>
    );
  }
}
export default NavigationMenuC;