import React, { Component } from 'react';
import Map from '../components/home/Map'
import SearchBar from '../components/home/SearchBar';
import SearchResult from '../components/home/SearchResult';
import '../util/tw.css';
import '../static/css/body.css'
import { CloseIcon } from '../components/shared-components/Icons';
import Popup from '../components/home/Popup';

const key = process.env.GOOGLEMAP_API_KEY;
let textSearch = null;
let deferredPrompt = null;

class App extends Component {
  static getInitialProps() {
    return {
      "env": key,
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      dataFromSearch: [],
      currentLocation: {
        currentLatitude: null,
        currentLongitude: null,
      },
      isSearching: false,
      centerLattitude: null,
      centerLongitude: null,
      currentZoom: 15,
      currentmarkerLocation: {
        latitude: null,
        longitude: null,
      },
      isClickedCircleBtn: false,
      showIosInstallMessage: false,
      showChromeInstallMessage: false,
      isPopupPresent: false,
      popup: {
        name: null,
        latitude: null,
        longitude: null,
      },
      isFaddingOut: false,
    }
  }

  onSearchChange = (e) => {
    const target = e.target;
    const value = target.value;
    if (value === "") {
      target.blur();
    }
    this.setState({
      searchValue: value,
      isSearching: !(value === ""),
    })
    this.searchLocation(value);
  }

  apiIsLoaded = (map, maps) => {
    const service = new maps.places.PlacesService(map);
    textSearch = (a, b) => service.textSearch(a, b);
  }

  closeSearch = () => {
    this.setState({
      searchValue: "",
      isSearching: false,
      dataFromSearch: [],
    })
  }

  goToPlace = (e) => {
    const target = e.target;
    const latitude = target.dataset.latitude - 0;
    const longitude = target.dataset.longitude - 0;
    this.setState({
      isSearching: false,
      dataFromSearch: [],
      currentmarkerLocation: {
        latitude: latitude,
        longitude: longitude,
      },
      isClickedCircleBtn: false,
    }, () => this.setCenterLocation(latitude, longitude, null, 16)
    );
  }

  componentDidMount() {
    // Detects if device is on iOS 
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    }

    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      setTimeout(() => this.setState({ showIosInstallMessage: true }), 3000);
    }

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      setTimeout(() => this.setState({ showChromeInstallMessage: true }), 3000);
    });
  }

  onSearchOpen = () => {
    this.setState(prevState => ({
      isSearching: true,
      searchValue: prevState.isSearching ? prevState.searchValue : "",
      currentmarkerLocation: {
        latitude: null,
        longitude: null,
      }
    })
    )
  }

  searchLocation = (value) => {
    textSearch(
      // {
      //   query: value,
      //   fields: ['name', 'geometry'],
      // }
      {
        query: value,
        location: new google.maps.LatLng(this.state.currentLocation.currentLatitude, this.state.currentLocation.currentLongitude),
        radius: '10000',
        // types: ['store']
      }
      , (result, status) => {
        let places = [];
        if (status === 'OK') {
          // console.log(result, 'result')
          places = result.map(place => {
            const location = place.geometry.location;
            return {
              name: place.name,
              latitude: location.lat(),
              longitude: location.lng(),
            }
          })
        }
        this.setState({ dataFromSearch: places });
      })
  }

  setCurrentLocation = (lat, lng) => {
    this.setState({
      currentLocation: { currentLatitude: lat, currentLongitude: lng },
    })
  }

  setCenterLocation = (latitude, longitude, callBack, zoom = 15) => {
    this.setState({
      currentZoom: zoom,
      centerLattitude: latitude,
      centerLongitude: longitude,
    }, callBack)
  }

  setZoom = (zoomLevel) => {
    this.setState({
      currentZoom: zoomLevel
    })
  }

  clickCircleBtn = (value = true) => {
    this.setState({
      isClickedCircleBtn: value,
    });
  }

  openPopup = (e) => {
    if (!e) return;
    const target = e.target;
    const name = target.dataset.name;
    const picture = target.dataset.picture;
    const latitude = target.dataset.latitude;
    const longitude = target.dataset.longitude;
    this.setState({
      isPopupPresent: true,
      popup: {
        picture,
        name,
        latitude,
        longitude
      },
    })
  }

  closePopup = () => {
    this.setState({
      isFaddingOut: true,
    })
    setTimeout(() => this.setState({
      popup: {
        picture: null,
        name: null,
        latitude: null,
        longitude: null,
      },
      isPopupPresent: false,
      isFaddingOut: false,
    }), 300)
  }

  openInMaps = () => {
    // window.open('https://dev.norapat.com')
    const { latitude, longitude } = this.state.popup;
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") != -1) ||
      (navigator.platform.indexOf("iPad") != -1) ||
      (navigator.platform.indexOf("iPod") != -1))
      window.open("maps://maps.google.com/maps?daddr=" + latitude + "," + longitude + "&amp;ll=");
    else /* else use Google */
      window.open("https://maps.google.com/maps?daddr=" + latitude + "," + longitude + "&amp;ll=");
  }

  chromeInstall = () => {
    deferredPrompt.prompt()
    deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        window.addEventListener('appinstalled', (event) => {
          // console.log(event, 'event')
          alert('success')
          window.open('https://dev.norapat.com');
        });
      } 
      deferredPrompt = null;
    });
  }

  render() {
    return (
      <div className="h-full">
        <div className="fixed h-16 px-3 pin-t pin-l w-full z-40 flex flex-col items-center justify-center">
          <SearchBar onClick={this.onSearchOpen} isSearching={this.state.isSearching} closeSearch={this.closeSearch} value={this.state.searchValue} onChange={this.onSearchChange} />
        </div>
        {
          this.state.isSearching
            ?
            <SearchResult goToPlace={this.goToPlace} data={this.state.dataFromSearch} />
            :
            <React.Fragment />
        }
        <Map
          isHidden={this.state.isSearching}
          setCurrentLocation={this.setCurrentLocation}
          currentLatitude={this.state.currentLocation.currentLatitude}
          currentLongitude={this.state.currentLocation.currentLongitude}
          apiKey={this.props.env}
          apiIsLoaded={this.apiIsLoaded}
          centerLattitude={this.state.centerLattitude}
          centerLongitude={this.state.centerLongitude}
          setCenterLocation={this.setCenterLocation}
          setZoom={this.setZoom}
          currentZoom={this.state.currentZoom}
          currentMarkerLatitude={this.state.currentmarkerLocation.latitude}
          currentMarkerLongitude={this.state.currentmarkerLocation.longitude}
          clickCircleBtn={this.clickCircleBtn}
          isClickedCircleBtn={this.state.isClickedCircleBtn}
          showIosInstallMessage={this.state.showIosInstallMessage}
          openPopup={this.openPopup}
        />
        <Popup isFaddingOut={this.state.isFaddingOut} isPopupPresent={this.state.isPopupPresent} name={this.state.popup.name} picture={this.state.popup.picture} closePopup={this.closePopup} openInMaps={this.openInMaps} />
        {
          this.state.showIosInstallMessage ?
            (
              <div className="fixed pin-t pin-l z-50 mx-auto w-full h-full text-white text-lg flex flex-col justify-around items-center px-3 py-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                <div className="fixed pin-t pin-r">
                  <CloseIcon className="w-12 h-12" fill="#FFFFFF" onClick={() => this.setState({ showIosInstallMessage: false })} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl my-2">
                    Please Install the App
                </span>
                  <img src="../static/image/ios_share_1.png" className="w-64" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="my-2">
                    Select the option 'Add to Home Screen'
                </span>
                  <img src="../static/image/ios_share_2.png" className="w-64" />
                </div>
              </div>
            )
            :
            null
        }
        {
          this.state.showChromeInstallMessage
            ?
            (
              <div className="fixed pin-t pin-l z-50 mx-auto w-full h-full text-white text-lg flex flex-col justify-around items-center px-3 py-2" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                <div className="fixed pin-t pin-r">
                  <CloseIcon className="w-12 h-12" fill="#FFFFFF" onClick={() => this.setState({ showChromeInstallMessage: false })} />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl my-2">
                    Please Install the App
                  </span>
                  <button className="bg-green text-xl rounded px-6 py-3 shadow text-white" onClick={this.chromeInstall}>
                    Install
                  </button>
                </div>
              </div>
            )
            :
            null
        }
      </div>
    );
  }
}

export default App;
