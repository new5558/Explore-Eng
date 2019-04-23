import React, { Component } from 'react';
import Map from '../components/home/Map'
import SearchBar from '../components/home/SearchBar';
import SearchResult from '../components/home/SearchResult';
import { CloseIcon, CameraIcon, SuccessIcon } from '../components/shared-components/Icons';
import Popup from '../components/home/Popup';
import ProgressiveImage from 'react-progressive-image';
import Loading from '../components/shared-components/Loading';
import firebase, { firestore } from '../util/firebase';

let textSearch = null;
let deferredPrompt = null;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      dataFromSearch: [],
      currentLocation: {
        currentLatitude: null,
        currentLongitude: null,
        currentAccuracy: null
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
      isInRange: false,
      popup: {
        type: null,
        name: null,
        latitude: null,
        longitude: null,
        picture: null,
        file: null,
      },
      isFaddingOut: false,
      waitingForQuery: false,
    }
    this.timeout = 0;
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
      waitingForQuery: true,
    })
    // this.searchLocation(value)
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.searchLocation(value), 300);
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
    firebase.auth().onAuthStateChanged(user => {
      if (user != undefined) {
        firestore.collection("users").doc(user.uid).get()
          .then(result => result.data())
          .then(data => {
            user.score = data.score;
            this.setUserInfo(user, true);
          }).catch(() => {
            this.setUserInfo(user, true)
          })
        // this.setUserInfo(user, true);
        this.createUser(user);
      } else {
        this.setUserInfo({}, false);
      }
    })
    this.setState({ apiKey: this.props.env })

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

  setUserInfo = (userInfo, isLogin) => {
    this.props.setUserInfo(userInfo, isLogin);
  }

  createUser = (user) => {
    this.props.createUser(user)
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
          places = result.map(place => {
            const location = place.geometry.location;
            return {
              name: place.name,
              latitude: location.lat(),
              longitude: location.lng(),
            }
          })
        }
        this.setState({ dataFromSearch: places, waitingForQuery: false });
      })
  }

  setCurrentLocation = (lat, lng, currentAccuracy) => {
    this.setState({
      currentLocation: { currentLatitude: lat, currentLongitude: lng, currentAccuracy },
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

  openPopup = (e, name) => {
    let picture = null;
    let latitude = null;
    let longitude = null;
    let file = null;
    let type = 1;
    let isInRange = false;
    if (e) {
      const target = e.target;
      type = 0;
      name = target.dataset.name;
      picture = target.dataset.picture;
      latitude = target.dataset.latitude;
      longitude = target.dataset.longitude;
      const { currentLatitude, currentLongitude, currentAccuracy } = this.state.currentLocation
      const distance = this.distance(latitude, longitude, currentLatitude, currentLongitude);
      isInRange = distance < (0.1 + currentAccuracy / 1000);
      // isInRange = true;
    }
    if (name === "Success") {
      type = 2;
    }
    this.setState({
      isPopupPresent: true,
      popup: {
        type,
        name,
        picture,
        latitude,
        longitude,
        file,
      },
      isInRange,
    })
  }

  closePopup = () => {
    this.setState({
      isFaddingOut: true,
    })
    setTimeout(() => this.setState({
      popup: {
        type: null,
        picture: null,
        name: null,
        latitude: null,
        longitude: null,
        file: null,
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
      if((iOSversion(1) && (iOSversion(2)[0] === 12) && (iOSversion(3)[1] === 2))) {
        // alert("alert")
        window.open("http://maps.apple.com/?daddr=" + latitude + "," + longitude, '_blank');
      } else {
        window.open("maps://maps.google.com/maps?daddr=" + latitude + "," + longitude + "&amp;ll=", '_blank');
      }
      // location.href = "maps://maps.google.com/maps?daddr=" + latitude + "," + longitude + "&amp;ll=";
    else /* else use Google */
      window.open("https://maps.google.com/maps?daddr=" + latitude + "," + longitude + "&amp;ll=", '_blank');
      // location.href = "https://maps.google.com/maps?daddr=" + latitude + "," + longitude + "&amp;ll=";
  }

  dropOff = (e) => {
    const { name, latitude, longitude } = this.state.popup;
    this.closePopup()
    setTimeout(() => this.openPopup(null, name), 300)
  }

  submit = () => {
    this.receivePoints()
    this.closePopup()
    setTimeout(() => this.openPopup(null, "Success"), 300)
  }

  receivePoints = () => {

    let user = this.props.userInfo
    // firestore.collection("users").doc(user.uid).get()
    //   .then(result => result.data())
    //   .then(data => {
    //     firestore.collection("users").doc(user.uid).set({
    //       displayName: user.displayName,
    //       photoURL: user.photoURL,
    //       score: 
    //     })
    //   })
    user.score = (user.score ? (user.score + 50) : 50)
    firestore.collection("users").doc(user.uid).set({
      displayName: user.displayName,
      photoURL: user.photoURL,
      score: user.score
    })

    this.props.setUserInfo(user, true);
  }

  getImage = (e) => {
    const file = e.target.files;
    this.setState(prevState => {
      prevState.popup.file = URL.createObjectURL(file[0]);
      return ({
        popup: prevState.popup
      })
    })
  }

  chromeInstall = () => {
    deferredPrompt.prompt()
    deferredPrompt.userChoice
      .then((choiceResult) => {
        deferredPrompt = null;
      });
  }

  distance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km (change this constant to get miles)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  generatePopup = (type) => {
    const popup = {
      0: (
        (this.state.popup.picture || this.state.isPopupPresent)
          ?
          (
            <ProgressiveImage src={this.state.popup.picture} placeholder="../static/image/placeholder.jpg">
              {(src, loading) =>
                (
                  <div className="flex justify-center items-center" style={{ width: "300px", height: "200px" }}>
                    <Loading loading={loading} positionFixed={true} />
                    <img
                      style={{
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "300px",
                        height: "200px"
                      }}
                      src={src}
                    />
                  </div>
                )
              }
            </ProgressiveImage>
          )
          :
          null
      ),
      1: (
        <div className="flex justify-center items-center py-3 px-3">
          {
            !this.state.popup.file
              ?
              (
                <React.Fragment>
                  <div className="flex justify-center items-center rounded-lg shadow" style={{ filter: "blur(1px)", background: "linear-gradient(to top right, #ff99ff 0%, #00ccff 100%)", width: "200px", height: "267px" }}>
                  </div>
                  <div className="w-24 h-24 fixed">
                    <CameraIcon fill="#4f4d4d" />
                  </div>
                  <input onChange={this.getImage} className="fixed rounded-lg" style={{ width: "200px", height: "267px", opacity: "0" }} type="file" accept="image/*" capture="environment" />
                </React.Fragment>
              )
              :
              (
                <React.Fragment>
                  <img src={this.state.popup.file} className="flex justify-center items-center rounded-lg shadow" style={{ width: "200px", height: "267px" }} />
                  <div className="w-16 h-16 fixed">
                    <CameraIcon fill="#d1cfcf" />
                  </div>
                  <input onChange={this.getImage} className="fixed rounded-lg" style={{ width: "200px", height: "267px", opacity: "0" }} type="file" accept="image/*" capture="environment" />
                </React.Fragment>
              )
          }
        </div>
      ),
      2: (
        <div
          className="flex justify-center items-center bg-green-light"
          style={{
            width: "300px",
            height: "200px",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem"
          }}
        >
          <div className="w-24 h-24">
            <SuccessIcon fill="#FFFFFF" />
          </div>
        </div>
      )
    }
    return popup[type]
  }

  render() {
    const onClickRight = {
      0: this.openInMaps,
      1: this.closePopup,
      2: this.closePopup,
    }
    const onClickLeft = {
      0: this.dropOff,
      1: this.submit,
      2: this.closePopup,
    }
    return (
      <div className="h-full" >
        <div className="fixed h-16 px-3 pin-t pin-l w-full z-40 flex flex-col items-center justify-center">
          <SearchBar
            onClick={this.onSearchOpen}
            isSearching={this.state.isSearching}
            closeSearch={this.closeSearch}
            value={this.state.searchValue}
            onChange={this.onSearchChange}
          />
        </div>
        {
          this.state.isSearching
            ?
            <SearchResult loading={this.state.waitingForQuery} goToPlace={this.goToPlace} data={this.state.dataFromSearch} />
            :
            <React.Fragment />
        }
        < Map
          isHidden={this.state.isSearching}
          setCurrentLocation={this.setCurrentLocation}
          currentLatitude={this.state.currentLocation.currentLatitude}
          currentLongitude={this.state.currentLocation.currentLongitude}
          currentAccuracy={this.state.currentLocation.currentAccuracy}
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
        <Popup
          isFaddingOut={this.state.isFaddingOut}
          isPopupPresent={this.state.isPopupPresent}
          name={this.state.popup.name}
          closePopup={this.closePopup}
          onClickRight={onClickRight[this.state.popup.type]}
          onClickLeft={onClickLeft[this.state.popup.type]}
          type={this.state.popup.type}
          disabled={!this.props.isLogin || (!this.state.popup.file && !this.state.isInRange && this.state.popup.type !== 2)}
          latitude={this.state.popup.latitude} 
          longitude={this.state.popup.longitude}
        >
          {this.generatePopup(this.state.popup.type)}
        </Popup>
        {
          this.state.showIosInstallMessage ?
            (
              <div
                className="fixed pin-t pin-l z-50 mx-auto w-full h-full text-white text-lg flex flex-col justify-around items-center px-3 py-2"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
              >
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
              <div
                className="fixed pin-t pin-l z-50 mx-auto w-full h-full text-white text-lg flex flex-col justify-around items-center px-3 py-2"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
              >
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
      </div >
    );
  }
}


const iOSversion = () => {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // alert('version ' + debug)
        // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        // alert([parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)])
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
}

export default App;
