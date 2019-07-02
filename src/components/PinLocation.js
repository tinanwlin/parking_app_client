import React, { Component } from 'react';
import axios from 'axios';

class PinLocation extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { currentLocation } = this.props;
    const placeNote = this.refs.placeNote.value;
    const requestInput = {
      ...currentLocation,
      note: placeNote
    };
    axios
      .post(`http://localhost:3000/api/v1/places`, requestInput)
      .then(() => {
        this.props.onFinish();
        this.refs.placeNote.value = "";
      })
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input id="note" type="text" className="validate" ref="placeNote"/>
              <label htmlFor="note">Make note to your pined location</label>
              <button className="btn waves-effect waves-light" type="submit">Click Here To Pin My Location</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default PinLocation;
