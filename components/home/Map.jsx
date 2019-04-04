import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from '../../util/map';
import Marker from './Marker';
import CircleBtn from '../../components/home/CircleBtn';
import { LocationIcon } from '../../components/shared-components/Icons';
import CurrentLocation from './CurrentLocation';

export default class extends Component {
  static defaultProps = {
    zoom: 15,
    createMapOptions: function (maps) {
      // next props are exposed at maps
      // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
      // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
      // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
      // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
      // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
      return {
        styles: mapStyle,
        zoomControl: false,
        fullscreenControl: false,
      };
    }

  };

  constructor(props) {
    super(props);
    this.state = {
      currentLattitude: null,
      currentLongtitude: null,
      centerLattitude: 13.75398,
      centerLongtitude: 100.50144,
      currentZoom: 15,
    }
  }

  getLocation = (success, failure) => {
    navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition(
      position => success(position),
      error => failure(error)
    );
  }

  setCurrentLocation = (latitude, longitude, accuracy) => {
    this.setState({ currentLattitude: latitude, currentLongtitude: longitude, currentAccuracy: accuracy })
  }

  setCenterLocation = (latitude, longitude) => {
    this.setState({ centerLattitude: latitude, centerLongtitude: longitude })
    this.setState({
      currentZoom: 15,
    });
  }

  getAndSetCurrentLocation = () => {
    this.getLocation((position) => {
      this.setCurrentLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy)
    }, console.log);
  }

  getAndSetCenterLocation = () => {
    this.getLocation((position) => this.setCenterLocation(position.coords.latitude, position.coords.longitude), console.log);
  }

  componentDidMount() {
    this.getLocation(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.setState(prevState => ({
              centerLattitude: prevState.centerLattitude * 1.00001,
            }), this.setCenterLocation(latitude, longitude))
          }, console.log)
    this.getAndSetCurrentLocation();
    setInterval(() => {
      this.getAndSetCurrentLocation();
    }, 5000);
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey }}
          defaultZoom={this.state.currentZoom}
          zoom={this.state.currentZoom}
          options={this.props.createMapOptions}
          center={{ lat: this.state.centerLattitude, lng: this.state.centerLongtitude }}
          onChange={({ zoom }) => this.setState({ currentZoom: zoom })}
        >
          <Marker
            lat={13.741528}
            lng={100.5333099}
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
          <CurrentLocation
            zoom={this.state.currentZoom}
            lat={this.state.currentLattitude}
            lng={this.state.currentLongtitude}
            acc={this.state.currentAccuracy}
          />
        </GoogleMapReact>
        <div className="fixed z-50 pin-b pin-r mr-4 mb-8" onClick={() => {
          this.getLocation(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.setState(prevState => ({
              centerLattitude: prevState.centerLattitude * 1.00001,
            }), this.setCenterLocation(latitude, longitude))
          }, console.log)
        }}>
          <CircleBtn>
            <div className="w-8 h-8" >
              <LocationIcon fill="white" />
            </div>
          </CircleBtn>
        </div>
      </div >
    );
  }
}
