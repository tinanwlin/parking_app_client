import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props)
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markers: []
      };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3000/api/v1/places`)
      .then(res => {
        const markers = res.data;
        this.setState({ 
          ...this.state,
          markers: [ ...this.state.markers, ...markers ]
        })
      })
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props
    });
  }

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  
  render() {
    const markers = this.state.markers.map((place) => {
      return (
        <Marker 
          key={place.id}
          onClick={this.onMarkerClick}
          position={{lat: place.latitude, lng: place.longitude}}
          name={place.name}
        />
      )
    })
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: 49.283764,
         lng: -122.793205
        }}
      >
        {markers}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCpNE5hHJizB6IsropfpbdFKjTXWK1z5Hs'
})(MapContainer);