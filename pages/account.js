import React, { Component } from 'react';
import firebase from '../util/firebase'
import { FacebookIcon } from '../components/shared-components/Icons';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginErrorMessage: "",
        }
    }

    facebookLogin = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult().then((result) => {
            if (result.credential) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
            this.setUserInfo(user, true);
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            this.setState({
                loginErrorMessage: errorMessage,
            })
            // ...
        });
    }

    setUserInfo = (userInfo, isLogin) => {
        this.props.setUserInfo(userInfo, isLogin);
    }

    logout = () => {
        firebase.auth().signOut().then(response => {
            this.setUserInfo({}, false);
        })
    }

    render() {
        // console.log(this.props.userInfo.displayName, this.props)
        return (
            <div className="flex items-center flex-col justify-center h-screen">
                {
                    this.props.isLogin === null
                        ?
                        (
                            <div className="lds-facebook relative">
                                <div style={{ background: "grey" }}></div>
                                <div style={{ background: "grey" }}></div>
                                <div style={{ background: "grey" }}></div>
                            </div>
                        )
                        :
                        (
                            this.props.isLogin
                                ?
                                (
                                    <React.Fragment>
                                        <div className="flex items-center">
                                            Welcome:&nbsp;
                                            <span className="text-blue">
                                                {this.props.userInfo.displayName}
                                            </span>
                                        </div>
                                        <div className="m-2 px-8 py-2 flex items-end shadow text-white" style={{ borderRadius: "1rem", background: "linear-gradient(to right, #ff9933 0%, #ff0000 100%)" }} onClick={this.logout}>
                                            <span>
                                                    LOGOUT
                                            </span>
                                        </div>
                                    </React.Fragment>
                                )
                                :
                                (
                                    <div className="m-2 px-2 py-2 flex items-end shadow text-white" style={{ borderRadius: "1rem", background: "linear-gradient(to right, #000099 0%, #0099cc 100%)" }} onClick={this.facebookLogin}>
                                        <div className="w-8 h-8 mr-6">
                                            <FacebookIcon fill="#FFFFFF" />
                                        </div>
                                        <span className="mr-4">
                                            LOGIN WITH FACEBOOK
                                </span>
                                    </div>
                                )
                        )
                }
            </div>
        )
    }
}

export default Account;