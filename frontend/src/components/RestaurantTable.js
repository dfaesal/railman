import React from "react";
import { Link } from "react-router-dom";

class RestaurantTable extends React.Component {
  render() {
    const { restaurants } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Cuisine</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>
                <Link to={{
                  pathname: "/restaurant/" + restaurant.name + "/menu"
                }}>{restaurant.name}</Link>
              </td>
              <td>{restaurant.city}</td>
              <td>{restaurant.cuisine}</td>
              <td>{restaurant.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default RestaurantTable;  