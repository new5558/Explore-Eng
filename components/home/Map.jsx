import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyle from '../../util/map';
import Marker from './Marker';
import CircleBtn from '../../components/home/CircleBtn';
import { LocationIcon } from '../../components/shared-components/Icons';
import CurrentLocation from './CurrentLocation';
import { firestore } from '../../util/firebase'

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
        clickableIcons: false,
      };
    }

  };

  constructor(props) {
    super(props);
    this.state = {
      marker: null,
    }
  }

  getNewCoordinate = (currentLatitude, currentLongitude, currentAccuracy) => {
    if(currentLatitude == null || currentLongitude == null) return {
      newLatitude: null,
      newLongitude: null,
    }
    const r_earth = 6371000.0;
    const pi = Math.PI;
    const newLatitude = currentLatitude + ((1) * (currentAccuracy) / r_earth) * (180 / pi);
    const newLongitude = currentLongitude + ((-1) * (currentAccuracy) / r_earth) * (180 / pi) / Math.cos(currentLatitude * pi / 180);
    return({
      newLatitude: newLatitude ? newLatitude : null,
      newLongitude: newLongitude ? newLongitude : null,
    })
  }

  getLocation = (success, failure, highAccuracy = true) => {
    navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition(
      position => success(position),
      error => failure(error),
      {enableHighAccuracy: highAccuracy,}
    );
  }

  setCurrentLocation = (latitude, longitude, accuracy) => {
    this.props.setCurrentLocation(latitude, longitude, accuracy)
  }

  setCenterLocation = (latitude, longitude, callBack) => {
    this.props.setCenterLocation(latitude, longitude, callBack)
  }

  getAndSetCurrentLocation = (highAccuracy) => {
    this.getLocation((position) => {
      this.setCurrentLocation(position.coords.latitude, position.coords.longitude, position.coords.accuracy)
    }, console.log, highAccuracy);
  }

  // componentWillMount() {
  //   this.getDataFromFireBase('place', 'marker')
  //     .then((marker) => this.setState({ marker }));
  // }

  componentDidMount() {
    if (this.props.showIosInstallMessage) return;

    this.getDataFromFireBase('place', 'marker')
    .then((marker) => this.setState({ marker }));
    
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
      },
      false
    );

    this.getAndSetCurrentLocation(false);
    
    setInterval(() => {
      this.getAndSetCurrentLocation();
      this.props.isClickedCircleBtn && this.getLocation(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const accuracy = position.coords.accuracy;
          // console.log("prepare to set center location")
          // this.setCenterLocation(latitude, longitude);
          this.setCenterLocation(latitude, longitude,
            () => this.props.setCurrentLocation(latitude, longitude, accuracy)
          )
        },
        () => {
          // this.setCenterLocation(13.75398, 100.50144)
        }
      );
    }, 5000);
  }

  getDataFromFireBase = (col, doc) => {
    const marker = firestore.collection(col).doc(doc);
    return marker.get()
      .then(result => result.data());
  }

  generateMarker = (openPopup) => {
    const marker = this.state.marker
    let setOfmarkerComponent = [];
    for (const key in marker) {
      setOfmarkerComponent.push(
        <Marker
          key={key}
          lat={marker[key].latitude}
          lng={marker[key].longitude}
          name={key}
          picture={marker[key].picture}
          onClick={openPopup}
        />
      )
    }
    return setOfmarkerComponent
  }

  render() {
    const { apiIsLoaded, isHidden, currentLongitude, currentLatitude, currentAccuracy, centerLattitude, centerLongitude, currentMarkerLatitude, currentMarkerLongitude, clickCircleBtn, openPopup } = this.props;
    // console.log(currentMarkerLatitude, currentMarkerlongitude, 'current Marker')
    const newCoordinate = this.getNewCoordinate(currentLatitude, currentLongitude, currentAccuracy)
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }} className={isHidden ? "hidden" : ""} >
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.apiKey, libraries: 'places' }}
          defaultZoom={this.props.zoom}
          zoom={this.props.currentZoom}
          options={this.props.createMapOptions}
          center={{ lat: centerLattitude, lng: centerLongitude }}
          onChange={({ zoom }) => {
            this.props.setZoom(zoom)
          }}
          onDrag={() => {
            clickCircleBtn(false);
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
        >
          <CurrentLocation
            zoom={this.props.currentZoom}
            lat={newCoordinate.newLatitude}
            lng={newCoordinate.newLongitude}
            acc={currentAccuracy}
          />
          {this.generateMarker(openPopup)}
          {
            currentMarkerLatitude
              ?
              (
                <Marker
                  type={1}
                  lat={currentMarkerLatitude}
                  lng={currentMarkerLongitude}
                />
              )
              :
              null
          }
        </GoogleMapReact>
        <div className="fixed z-40 pin-b pin-r mr-4 mb-24 pb-6" onClick={() => {
          this.setCenterLocation(currentLatitude * ((currentLatitude === this.props.centerLattitude && currentLongitude === this.props.centerLongitude) ? 1.000001 : 1), currentLongitude, clickCircleBtn)
        }}>
          <CircleBtn isClicked={this.props.isClickedCircleBtn}>
            <div className="w-8 h-8" >
              <LocationIcon fill="white" />
            </div>
          </CircleBtn>
        </div>
      </div >
    );
  }
}