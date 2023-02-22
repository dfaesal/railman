import React from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { setUserSession } from './Common';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      role: '',
      errors: {},
      passwordCriteria: false,
      users: [],
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateForm = () => {
    const { email, password, role } = this.state;
    let errors = {};
    if (!email) {
      errors.email = 'Email is required';
      alert(errors.email);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid email address';
      alert(errors.email);
    }
    if (!password) {
      errors.password = 'Password is required';
      alert(errors.password);
    } else if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    } else if (!/\d/.test(password) || !/[a-z]/i.test(password)) {
      errors.password = 'Password should contain at least one number and one letter';
    }
    if (!role) {
      errors.role = 'Role is required';
      alert(errors.role);
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleClick = (e) => {
    this.props.history.push('/registration');
    e.preventDefault();
  };
  handlePasswordCriteriaToggle = () => {
    this.setState(prevState => ({passwordCriteria: !prevState.passwordCriteria}));
  }
  handleSubmit = (e) => {
    var apiBaseUrl = "http://localhost:8000/api/authentication/";
    var self = this;
    var props = this.props;
    var payload = {
      "email": this.state.email,
      "password": this.state.password,
      "role": this.state.role
    }
    e.preventDefault();
    if (!this.validateForm()) {
      return;
    }
    axios.post(apiBaseUrl + 'login', payload)
      .then(function (response) {
        self.setState({users:response.data});
        if (response.status === 200 && response.data.length > 0) {
          if(payload.role === response.data[0].role)
          {
            setUserSession(response.data[0].user, response.data[0].name);
            alert("Login successfull");
            if (payload.role === "customer") {
              props.history.push('/customer-dashboard');          
            }
            else if (payload.role === "restaurant") {
              props.history.push('/restaurant-dashboard');
            }
          } else {
            alert('Role is not correct');
          }
        }
        else if (response.status === 204) {
          console.log("Wrong login details");
          alert("Wrong login details")
        }
        else {
          console.log("User does not exists");
          alert("User does not exist");
        }
      })
      .catch(function (error) {
              console.log(error);
      })
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="loginContainer">
        <div className="login-menu">
          <form onSubmit={this.handleSubmit}>

            <div >
              <input type="email" name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange} />
                {errors.email && <div className='error-message'>{errors.email}</div>}
            </div>

            <div >
              <input type="password" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange} 
                onClick={this.handlePasswordCriteriaToggle} />
                {errors.password && <div className='error-message'>{errors.password}</div>}
                {this.state.passwordCriteria && <div className='error-message'>Password must contain at least 8 characters, including a number and a special character</div>}
            </div>

            <div >
              <select name="role" onChange={this.handleChange}>
                <option value="">Select Role</option>
                <option value="restaurant">Restaurant</option>
                <option value="customer">Customer</option>
              </select>
              {errors.role && <div className='error-message'>{errors.role}</div>}
            </div>

            <input type='submit' name='Login' value='Login' />
          </form>
          </div>

          <div className="register-menu">
            <form onSubmit={this.handleClick}>
              <label htmlFor="Registration">New User?</label>
              <br/>
              <input type='submit' value='Register Now' />
            </form>
          </div>
      </div>
    )
  }

}
export default withRouter(Login);
