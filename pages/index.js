import React, { Component } from 'react';
import SomeComponent from '../components/home/SomeComponent'
import SearchBar from '../components/home/SearchBar';
import '../util/tw.css';

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
        <SomeComponent apiKey={this.props.env} />
      </div>
    );
  }
}

export default App;
