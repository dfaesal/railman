import React from 'react';
import { Link } from 'react-router-dom';
import { removeUserSession } from './Common';

class NavigationMenuR extends React.Component {
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
          <li><Link to='/menu-item'>Add/Update Menu Item</Link></li>
          <li><Link to='/time'>Update Time</Link></li>
          <li><Link to='/availability'>Availability Status</Link></li>
        </ul>
        <input type="button" onClick={this.handleLogout} value="Logout" />
      </nav>
      </header>
    );
  }
}

export default NavigationMenuR;