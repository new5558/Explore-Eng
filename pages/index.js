import React, { Component } from 'react';
import Map from '../components/home/Map'
import SearchBar from '../components/home/SearchBar';
import '../util/tw.css';
import CircleBtn from '../components/home/CircleBtn';
import { LocationIcon } from '../components/shared-components/Icons';

const key = process.env.GOOGLEMAP_API_KEY;

class App extends Component {
  static getInitialProps() {
    return {
      "env": key,
    }
  }

  render() {
    return (
      <div>
        <div className="fixed h-48 px-6 pin-t pin-l w-full z-50 flex flex-col items-center justify-center">
          <SearchBar />
        </div>
        <Map apiKey={this.props.env} />
        <div className="fixed z-50 pin-b pin-r mr-24 mb-24">
          <CircleBtn>
            <div className="w-16 h-16" >
              <LocationIcon fill="white" />
            </div>
          </CircleBtn>
        </div>
      </div>
    );
  }
}

export default App;
