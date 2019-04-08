import React, { Component } from 'react';
import firebase from '../util/firebase'
import { FacebookIcon } from '../components/shared-components/Icons';
import Loading from '../components/shared-components/Loading';

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
        console.log('firenase')
        firebase.auth().getRedirectResult().then((result) => {
            if (result.credential) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            var user = result.user;
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // console.log('error', errorMessage)
            // this.setState({
            //     loginErrorMessage: errorMessage,
            // })
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

    componentDidUpdate() {
        console.log(this.state)
    }

    render() {
        // console.log(this.props.userInfo.displayName, this.props)
        return (
            <div className="flex items-center flex-col justify-start pt-2 h-screen">
                <div className="flex flex-col h-full items-center justify-center pb-32">
                    {
                        this.props.isLogin === null
                            ?
                            (
                                <Loading color="grey"/>
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
                                        <React.Fragment>
                                            <img src="../static/image/iphonexspacegrey_portrait.jpg" style={{ maxHeight: "60vh", height: "100%", maxWidth: "auto" }} />
                                            <span className="mt-2">
                                                To Earn Points
                                        </span>
                                            <div className="m-2 px-2 mt-2 py-2 flex items-end shadow text-white" style={{ borderRadius: "1rem", background: "linear-gradient(to right, #000099 0%, #0099cc 100%)" }} onClick={this.facebookLogin}>
                                                <div className="w-8 h-8 mr-6">
                                                    <FacebookIcon fill="#FFFFFF" />
                                                </div>
                                                <span className="mr-4">
                                                    LOGIN WITH FACEBOOK
                                        </span>
                                            </div>
                                        </React.Fragment>
                                    )
                            )
                    }
                </div>
            </div >
        )
    }
}

export default Account;