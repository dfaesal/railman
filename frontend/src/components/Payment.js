import React from "react";

class Payment extends React.Component {  
    handleSubmit = (event) => {
      event.preventDefault();
      // gather the form data
      const formData = {
        cardNumber: this.cardNumber.value,
        expirationDate: this.expirationDate.value,
        cvv: this.cvv.value,
        paymentMethod: this.paymentMethod.value,
      };
      this.props.handlePayment(formData);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Card Number:
            <input type="text" ref={(input) => (this.cardNumber = input)} />
          </label>
          <br />
          <label>
            Expiration Date:
            <input type="text" ref={(input) => (this.expirationDate = input)} />
          </label>
          <br />
          <label>
            CVV:
            <input type="text" ref={(input) => (this.cvv = input)} />
          </label>
          <br />
          <label>
            Payment Method:
            <select ref={(input) => (this.paymentMethod = input)}>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="netBanking">Net Banking</option>
              <option value="upi">UPI</option>
            </select>
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
}
export default Payment;  