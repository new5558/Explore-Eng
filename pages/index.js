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
        <div className="fixed h-16 px-3 pin-t pin-l w-full z-50 flex flex-col items-center justify-center">
          <SearchBar />
        </div>
        <Map apiKey={this.props.env} />
        <div className="fixed z-50 pin-b pin-r mr-4 mb-8">
          <CircleBtn>
            <div className="w-8 h-8" >
              <LocationIcon fill="white" />
            </div>
          </CircleBtn>
        </div>
      </div>
    );
  }
}

export default App;
