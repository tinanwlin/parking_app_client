import React, { Component } from "react";
import Map from "./components/Map";

export default class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper teal lighten-1">
            <a href="/" className="brand-logo center">FREE Parking Spots</a>
          </div>
        </nav>
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