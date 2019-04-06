import React, { Component } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state ={
            debug: null,
        }
    }

    onTakePhoto = (dataUri) => {
        // Do stuff with the dataUri photo...
        // console.log('takePhoto', dataUri);
        this.setState({
            debug: dataUri
        })
    }

    render() {
        return (
            <div>
                {this.state.debug}
                <Camera
                    onTakePhoto={(dataUri) => this.onTakePhoto(dataUri)}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                />
            </div>
        )
    }
}

export default Account;