import React, { Component } from 'react';

export class SomeComponent extends Component {

  render() {
    return (
      <div>
        {"apiKey:" + this.props.apiKey}
      </div>
    );
  }
}

export default SomeComponent;