import React, { Component } from 'react';
import axios from 'axios';

class PinLocation extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { currentLocation } = this.props;
    axios
      .post(`http://localhost:3000/api/v1/places`, currentLocation)
      .then(() => {
        this.props.onFinish();
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Click Here To Pin My Location</button>
        </form>
      </div>
    )
  }
}

export default PinLocation;
