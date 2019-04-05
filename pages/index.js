import React, { Component } from 'react';
import Map from '../components/home/Map'
import SearchBar from '../components/home/SearchBar';
import SearchResult from '../components/home/SearchResult';
import '../util/tw.css';
import '../static/css/body.css'

const key = process.env.GOOGLEMAP_API_KEY;
let textSearch = null;

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
        currentLongtitude: null,
      },
      isSearching: false,
      centerLattitude: null,
      centerLongtitude: null,
      currentZoom: 15,
      currentmarkerLocation: {
        latitude: null,
        longtitude: null,
      },
      isClickedCircleBtn: false,
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
    const longtitude = target.dataset.longtitude - 0;
    this.setState({
      isSearching: false,
      dataFromSearch: [],
      currentmarkerLocation: {
        latitude: latitude,
        longtitude: longtitude,
      },
      isClickedCircleBtn: false,
    }, () => this.setCenterLocation(latitude, longtitude, null, 16)
    );
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
        location: new google.maps.LatLng(this.state.currentLocation.currentLatitude, this.state.currentLocation.currentLongtitude),
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
              longtitude: location.lng(),
            }
          })
        }
        this.setState({ dataFromSearch: places });
      })
  }

  setCurrentLocation = (lat, lng) => {
    this.setState({
      currentLocation: { currentLatitude: lat, currentLongtitude: lng },
    })
  }

  setCenterLocation = (latitude, longitude, callBack, zoom = 15) => {
    this.setState({
      currentZoom: zoom,
      centerLattitude: latitude,
      centerLongtitude: longitude,
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

  render() {
    return (
      <div className="h-full">
        <div className="fixed h-16 px-3 pin-t pin-l w-full z-50 flex flex-col items-center justify-center">
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
          currentLongtitude={this.state.currentLocation.currentLongtitude}
          apiKey={this.props.env}
          apiIsLoaded={this.apiIsLoaded}
          centerLattitude={this.state.centerLattitude}
          centerLongtitude={this.state.centerLongtitude}
          setCenterLocation={this.setCenterLocation}
          setZoom={this.setZoom}
          currentZoom={this.state.currentZoom}
          currentMarkerLatitude={this.state.currentmarkerLocation.latitude}
          currentMarkerLongtitude={this.state.currentmarkerLocation.longtitude}
          clickCircleBtn={this.clickCircleBtn}
          isClickedCircleBtn={this.state.isClickedCircleBtn}
        />
      </div>
    );
  }
}

export default App;
