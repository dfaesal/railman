import React from "react";

class Menu extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event, item) {
      // get the selected quantity from the event target
      const quantity = event.target.value;
      // pass the selected item and quantity to the parent component
      this.props.handleItemSelection(item, quantity);
    }
  
    render() {
      const { items } = this.props;
      const menuItems = items.map((item) => {
        return (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
              <select onChange={(e) => this.handleChange(e, item)}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </td>
          </tr>
        );
      });
      return (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {menuItems}
          </tbody>
        </table>
      );
    }
}
export default Menu;  