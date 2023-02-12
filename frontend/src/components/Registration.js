import React from 'react';
import './Registration.css'
import axios from 'axios';

class Registration extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      phone: '',
      role: '',
      name: '',
      address: '',
      city: '',
      pincode: '',
      errors: {},
      passwordCriteria: false,
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateForm() {
    let errors = {};
    const {email, password, phone, role} = this.state;

    // check for email
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = 'Invalid email address';
    }

    // check for password
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    } else if (!/\d/.test(password) || !/[a-z]/i.test(password)) {
      errors.password = 'Password should contain at least one number and one letter';
    }

    //check for phone number
    if(!phone) {
      errors.phone = 'Phone Number is required';
    } else if (/^[0-9]{11}$/i.test(phone)) {
      errors.phone = 'Phone Number should be 10 digits';
    }

    // check for role
    if (!role) {
      errors.role = 'Role is required';
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handlePasswordCriteriaToggle = () => {
    this.setState(prevState => ({passwordCriteria: !prevState.passwordCriteria}));
  }

  handleSubmit = (e) => {
    // check if there is any error
    if (!this.validateForm()) {
      return;
    }
    var apiBaseUrl = "http://localhost:8000/api/authentication/";
    var props = this.props
    var payload = {
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password,
      "phone": this.state.phone,
      "address": this.state.address,
      "city": this.state.city,
      "role": this.state.role,
      "pincode": this.state.pincode,
    }

    axios.post(apiBaseUrl + 'register', payload)
    .then(function (response) {
      console.log(response);
      if (response.status === 201) {
        console.log("Registration successfull");
        alert("Account created successfully. Redirecting to login page...");
        props.history.push('/login');
      }
      else if (response.data.code === 204) {
        console.log("invalid data");
        alert("invalid data")
      }
      else {
        console.log("User  exists");
        alert("User  exist");
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    e.preventDefault();
  }

  render() {
    const { errors } = this.state;
      return (
        <div className="registrationContainer">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend>Signup Form</legend>
              <div >
                <select name="role" onChange={this.handleChange}>
                  <option value="">Select Role</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="customer">Customer</option>
                </select>
                {errors.role && <div className='error-message'>{errors.role}</div>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter your name *"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter email *"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {errors.email && <div className='error-message'>{errors.email}</div>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter Password *"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  onClick={this.handlePasswordCriteriaToggle}
                />
                {errors.password && <div className='error-message'>{errors.password}</div>}
                {this.state.passwordCriteria && <div className='error-message'>Password must contain at least 8 characters, including a number and a special character</div>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  name="pincode"
                  value={this.state.pincode}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Phonenumber *"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  maxLength="10"
                />
                {errors.phone && <div className='error-message'>{errors.phone}</div>}
              </div>
              <input type='submit' value='Submit' />

            </fieldset>
          </form>
        </div>
      );
    }
}

export default Registration;