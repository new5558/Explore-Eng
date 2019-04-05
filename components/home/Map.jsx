import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from '../../util/map';
import Marker from './Marker';
import CircleBtn from '../../components/home/CircleBtn';
import { LocationIcon } from '../../components/shared-components/Icons';
import CurrentLocation from './CurrentLocation';
import firebase from '../../util/firebase'

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
      isClickedCircleBtn: false,
      marker: null,
    }
  }

  getLocation = (success, failure) => {
    navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition(
      position => success(position),
      error => failure(error)
    );
  }

  setCurrentLocation = (latitude, longitude, accuracy) => {
    this.setState({ currentAccuracy: accuracy }, this.props.setCurrentLocation(latitude, longitude))
  }

  setCenterLocation = (latitude, longitude, callBack) => {
    this.props.setCenterLocation(latitude, longitude, callBack)
  }

  getAndSetCurrentLocation = () => {
    this.getLocation((position) => {
      this.setCurrentLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy)
    }, console.log);
  }

  componentWillMount() {
    this.getDataFromFireBase('place', 'marker')
      .then((marker) => this.setState({ marker }));
  }

  componentDidMount() {
    this.getLocation(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log("prepare to set center location")
        // this.setCenterLocation(latitude, longitude);
        this.setCenterLocation(latitude, longitude,
          () => this.props.setCurrentLocation(latitude, longitude)
        )
      },
      () => {
        this.setCenterLocation(13.75398, 100.50144)
      }
    );
    this.getAndSetCurrentLocation();
    setInterval(() => {
      this.getAndSetCurrentLocation();
    }, 5000);
  }

  getDataFromFireBase = (col, doc) => {
    const db = firebase.firestore();
    const marker = db.collection(col).doc(doc);
    return marker.get()
      .then(result => result.data());
  }

  generateMarker = () => {
    const marker = this.state.marker
    let setOfmarkerComponent = [];
    for (const key in marker) {
      setOfmarkerComponent.push(
        <Marker
          key={key}
          lat={marker[key].latitude}
          lng={marker[key].longitude}
          text={key}
        />
      )
    }
    return setOfmarkerComponent
  }

  render() {
    const { apiIsLoaded, isHidden, currentLongtitude, currentLatitude, centerLattitude, centerLongtitude, currentMarkerLatitude, currentMarkerLongtitude } = this.props;
    console.log(currentMarkerLatitude, currentMarkerLongtitude, 'current Marker')
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }} className={isHidden ? "hidden" : ""} >
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey, libraries: 'places' }}
          defaultZoom={this.props.zoom}
          zoom={this.props.currentZoom}
          options={this.props.createMapOptions}
          center={{ lat: centerLattitude, lng: centerLongtitude }}
          onChange={({ zoom }) => {
            this.props.setZoom(zoom)
          }}
          onDrag={() => {
            this.setState({
              isClickedCircleBtn: false,
            })
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        >
          {this.generateMarker()}
          <CurrentLocation
            zoom={this.props.currentZoom}
            lat={currentLatitude}
            lng={currentLongtitude}
            acc={this.state.currentAccuracy}
          />
          <Marker
            lat={currentMarkerLatitude}
            lng={currentMarkerLongtitude}
          />
        </GoogleMapReact>
        <div className="fixed z-50 pin-b pin-r mr-4 mb-8" onClick={() => {
          this.getLocation(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.setState({
              isClickedCircleBtn: true,
            }, () => this.setCenterLocation(latitude * ((latitude === this.props.centerLattitude && longitude === this.props.centerLongtitude) ? 1.00001 : 1), longitude))
          }, console.log)
        }}>
          <CircleBtn isClicked={this.state.isClickedCircleBtn}>
            <div className="w-8 h-8" >
              <LocationIcon fill="white" />
            </div>
          </CircleBtn>
        </div>
      </div >
    );
  }
}