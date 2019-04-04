import React, { Component } from 'react';
import Map from '../components/home/Map'
import SearchBar from '../components/home/SearchBar';
import '../util/tw.css';

const key = process.env.GOOGLEMAP_API_KEY;

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
    }
  }

  onSearchChange = (e) => {
    const target = e.target;
    const value = target.value;
    this.setState({
      searchValue: value,
    })
    this.searchLocation();
  }

  searchLocation = () => {
    
  }

  render() {
    return (
      <div className="h-full">
        <div className="fixed h-16 px-3 pin-t pin-l w-full z-50 flex flex-col items-center justify-center">
          <SearchBar value={this.state.searchValue} onChange={this.onSearchChange}/>
        </div>
        <Map apiKey={this.props.env} />
      </div>
    );
  }
}

export default App;
