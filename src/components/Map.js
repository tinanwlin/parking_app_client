import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  InfoWindow
} from "react-google-maps";

import axios from "axios";
import PinLocation from "./PinLocation";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoWindowIsOpen: false,
      infoWindowLocation: {},
      markers: [],
      place: {
        name: "",
        latitude: null,
        longitude: null
      }
    };
  }

  componentDidMount() {
    this.getMarkers();
    this.getCurrentLocation();
  }

  onMarkerClick = (event, place) => {
    /* 
    place - interface
    {
      name: [string],
      lat: [string],
      lng: [string],
      (note: [string] future)
    }
    Will be used in the future for setting place in state
    */

    this.setState({
      infoWindowIsOpen: true,
      infoWindowLocation: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    });
  };

  onClose = () => {
    if (this.state.infoWindowIsOpen) {
      this.setState({
        infoWindowIsOpen: false
      });
    }
  };

  getMarkers = () => {
    axios.get(`http://localhost:3000/api/v1/places`).then(res => {
      const markers = res.data;
      this.setState({
        markers: markers
      });
    });
  };

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          place: {
            name: "Current Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      });
    } else {
      return "Geolocation is not supported by this browser.";
    }
  };

  render() {

    const markers = this.state.markers.map(place => {
      return (
        <Marker
          key={place.id}
          position={{
            lat: Number(place.latitude),
            lng: Number(place.longitude)
          }}
          onClick={event => {
            this.onMarkerClick(event, place);
          }}
        />
      );
    });

    return (
      <div>
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 49.283764, lng: -122.793205 }}
        >
          <Circle
            strokeColor="#FF0000"
            strokeOpacity={0.8}
            strokeWeight={1}
            fillColor="#FF0000"
            fillOpacity={0.35}
            center={{
              lat: Number(this.state.place.latitude),
              lng: Number(this.state.place.longitude)
            }}
            radius={100}
          />

          {markers}

          {this.state.infoWindowIsOpen && (
            <InfoWindow
              onCloseClick={this.onClose}
              position={this.state.infoWindowLocation}
            >
              <div>This is the Info Window</div>
            </InfoWindow>
          )}
        </GoogleMap>
        <PinLocation 
          currentLocation={this.state.place}
          onFinish={this.getMarkers}
        />
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(MapContainer));
