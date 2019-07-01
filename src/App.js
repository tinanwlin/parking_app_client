import React, { Component } from "react";
import Map from "./components/Map";

export default class App extends Component {
  render() {
    return (
      <div>
        <h3>FREE Parking</h3>
        <Map
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCpNE5hHJizB6IsropfpbdFKjTXWK1z5Hs&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}