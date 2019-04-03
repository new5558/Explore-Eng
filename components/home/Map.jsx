import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from '../../util/map';
import Marker from './Marker';

export default class extends Component {
  static defaultProps = {
    // center: {
    //   lat: 13.741528,
    //   lng: 100.5333099
    // },
    zoom: 15,
    createMapOptions: function (maps) {
      // next props are exposed at maps
      // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
      // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
      // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
      // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
      // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
      return {
        styles : mapStyle,
        // zoomControlOptions: {
        //   position: maps.ControlPosition.RIGHT_CENTER,
        //   style: maps.ZoomControlStyle.SMALL
        // },
        // mapTypeControlOptions: {
        //   position: maps.ControlPosition.TOP_RIGHT
        // },
        // mapTypeControl: true
      };
    }
    
  };

  constructor(props) {
    super(props);
    this.state= {
      currentLattitude: null,
      currentLongtitude: null,
    }
  }

  componentDidMount() {
    navigator && navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({currentLattitude: position.coords.latitude, currentLongtitude: position.coords.longitude});
      },
      error => console.log(error)
    )
  }

  render() {
    console.log(this.state)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey }}
          defaultZoom={this.props.zoom}
          options={this.props.createMapOptions}
          center={{lat: this.state.currentLattitude, lng: this.state.currentLongtitude}}
        >
          <Marker
            lat={13.741528}
            lng={100.5333099}
            text="Waste 1"
          />
          <Marker
            lat={this.state.currentLattitude}
            lng={this.state.currentLongtitude}
            text="Waste 1"
          />
          <Marker
            lat={13.741528}
            lng={100.5433099}
            text="Waste 2"
          />
          <Marker
            lat={13.751528}
            lng={100.5493099}
            text="Waste 3"
          />
        </GoogleMapReact>
      </div>
    );
  }
}