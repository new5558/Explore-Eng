import React, { Component } from 'react';
import firebase from '../util/firebase'

class Account extends Component {

    constructor(props) {
        super(props);
    }

    facebookLogin = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
            this.setUserInfo(user);
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    setUserInfo = (userInfo) => {
        this.props.setUserInfo(userInfo);
    }

    render() {
        // console.log(this.props.userInfo)
        return (
            <div className="flex items-center flex-col justify-center h-screen">
                <div>
                    Welcome:&nbsp;
                    <span className="text-blue">
                        {this.props.userInfo ? this.props.userInfo.displayName : ""}
                    </span>
                </div>
                <div className="px-4 m-2 rounded-lg py-2 shadow text-white" style={{backgroundColor: "#3B5998"}} onClick={this.facebookLogin}>
                    Facebook Login
                </div>
            </div>
        )
    }
}

export default Account;