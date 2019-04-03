import React, { Component } from 'react';
import SomeComponent from '../components/home/SomeComponent'
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
        <div></div>
        <SomeComponent apiKey={this.props.env} />
      </div>
    );
  }
}

export default App;
