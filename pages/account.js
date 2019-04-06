import React, { Component } from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class Account extends Component {

    onTakePhoto = (dataUri) => {
        // Do stuff with the dataUri photo...
        console.log('takePhoto', dataUri);
    }

    render() {
        return (
            <div>
                <Camera
                    onTakePhoto={(dataUri) => this.onTakePhoto(dataUri)}
                    idealFacingMode={FACING_MODES.ENVIRONMENT}
                />
            </div>
        )
    }
}

export default Account;