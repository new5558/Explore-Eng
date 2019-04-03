import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import Icons from '../../static/icons/pin.svg'

const Marker = ({ text, color }) => (
  <div className={"w-5 h-5 bg-"}>
  <img className="w-5 h-5" src="../../static/icons/pin.svg"/>
  </div>
);

export default class extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={createMapOptions}a2
        >
          <Marker
            lat={59.975413}
            lng={30.337844}
            text="Waste 1"
            color="red"
          />
          <Marker
            lat={59.905509}
            lng={30.397940}
            text="Waste 2"
            color="green"
          />
          <Marker
            lat={59.905217}
            lng={30.337849}
            text="Waste 3"
            color="yellow"
          />
        </GoogleMapReact>
      </div>
    );
  }
}