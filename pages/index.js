import React, { Component } from 'react';
import Map from '../components/home/Map'
import SearchBar from '../components/home/SearchBar';
import SearchResult from '../components/home/SearchResult';
import '../util/tw.css';

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
      isSearching: false
    }
  }

  onSearchChange = (e) => {
    const target = e.target;
    const value = target.value;
    this.setState({
      searchValue: value,
      isSearching: !(value === ""),
    })
    this.searchLocation(value);
  }

  apiIsLoaded = (map, maps) => {
    const service = new maps.places.PlacesService(map);
    console.log(map, 'service')
    textSearch = (a, b) => service.textSearch(a, b);
  }

  closeSearch = () => {
    this.setState({
      searchValue: "",
      isSearching: false,
      dataFromSearch: [],
    })
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
              lattitude: location.lat(),
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

  render() {
    return (
      <div className="h-full">
        <div className="fixed h-16 px-3 pin-t pin-l w-full z-50 flex flex-col items-center justify-center">
          <SearchBar isSearching={this.state.isSearching} closeSearch={this.closeSearch} value={this.state.searchValue} onChange={this.onSearchChange} />
        </div>
        {
          this.state.isSearching
            ?
            <SearchResult data={this.state.dataFromSearch} />
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
        />
      </div>
    );
  }
}

export default App;
