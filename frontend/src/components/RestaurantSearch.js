import React from "react";
import RestaurantTable from "./RestaurantTable.js";
import axios from 'axios';
import "./dashboard.css"

class RestaurantSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        location: '',
        pnr: '',
        restaurants: [],
        currentPage: 1,
        restaurantsPerPage: 2,
        ratingFilter: '',
        type: 'pnr',
      };
    }
  
    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    }

    handleRadioChange = event => {
      this.setState({ type: event.target.value });
    };

    handleRatingFilterChange = (event) => {
      this.setState({ ratingFilter: event.target.value });
    }

    handlePageChange = (pageNumber) => {
      this.setState({ currentPage: pageNumber });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const { location, pnr } = this.state;
      // make API call to retrieve list of restaurants based on location or PNR
      if( location )
      {
        axios.get(`http://localhost:8000/api/core/restaurants/?location=${location}`)
        .then((response) => {
          this.setState({ restaurants: response.data });
          if(response.data.length === 0){
            alert('Location not found');
          }
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        axios.get(`http://localhost:8000/api/core/restaurants/?pnr=${pnr}`)
        .then((response) => {
          if(response.data.length === 0){
            alert('PNR not found');
          }
          this.setState({ restaurants: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  
    render() {
      const { location, pnr, restaurants, currentPage, restaurantsPerPage, ratingFilter } = this.state;

      let filteredRestaurants = restaurants;
      if (ratingFilter) {
        filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.rating.toString() === ratingFilter);
      }
      const indexOfLastRestaurant = currentPage * restaurantsPerPage;
      const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
      const currentRestaurants = filteredRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(filteredRestaurants.length / restaurantsPerPage); i++) {
        pageNumbers.push(i);
      }
  
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend> Search </legend>
              <label>
                <input
                  type="radio"
                  value="location"
                  checked={this.state.type === "location"}
                  onChange={this.handleRadioChange}
                />
                Location
              </label>
              <label>
                <input
                  type="radio"
                  value="pnr"
                  checked={this.state.type === "pnr"}
                  onChange={this.handleRadioChange}
                />
                PNR
              </label>
              <br />
              { this.state.type === "location" &&
                <label>
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={this.handleChange}
                  />
                </label>
              }
              { this.state.type === "pnr" &&
                <label>
                  PNR:
                  <input
                    type="text"
                    name="pnr"
                    value={pnr}
                    onChange={this.handleChange}
                  />
                </label>
              }
              <button type="submit">Search</button>
            </fieldset>
          </form>
          <div>
            <fieldset>
              <legend>Filter</legend>
              <label>Rating:
                <input type="text" value={ratingFilter} onChange={this.handleRatingFilterChange} />
              </label>
            </fieldset>
          </div>
          {currentRestaurants.length > 0 &&
            <RestaurantTable restaurants={currentRestaurants} />
          }
          <div>
            {pageNumbers.map(number => (
              <button 
              style={{
                textDecoration: number === this.state.currentPage ? "underline" : "none"
              }}
              key={number} onClick={() => this.handlePageChange(number)}>{number}</button>
            ))}
          </div>
        </div>
      );
    }
}
export default RestaurantSearch;