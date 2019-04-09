import React, { Component } from 'react';
import firebase, { firestore } from '../util/firebase'
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
        firebase.auth().getRedirectResult().then((result) => {
            if (result.credential) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // ...
            }
            // The signed-in user info.
            // this.createUser(result.user);
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

    createUser = (user) => {
        firestore.collection("users").doc(user.uid).get()
            .then(doc => {
                if (!doc.exists) {
                    firestore.collection("users").doc(user.uid).set({
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        score: 0
                    })
                }
            })

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
        const { isLogin, userInfo } = this.props;
        return (
            <div className="flex items-center flex-col justify-start pt-2 h-screen">
                <div className="flex flex-col h-full items-center justify-start pb-32">
                    {
                        isLogin === null
                            ?
                            (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <Loading color="grey" />
                                </div>
                            )
                            :
                            (
                                isLogin
                                    ?
                                    (
                                        <React.Fragment>
                                            <div className="flex items-center justify-between flex-col h-full">
                                                <div className="flex flex-col items-center mt-5">
                                                    <img style={{ height: "100px", width: "100px", background: '#b2b8c1 url(../static/icons/person.svg)  no-repeat center', backgroundSize: "70px" }} className="rounded-full shadow" src={userInfo.photoURL + "?height=100"} />
                                                    <div className="flex text-center items-center flex-col">
                                                        <div className="text-grey-darker text-xl mt-5 mb-2">
                                                            {userInfo.displayName}
                                                        </div>
                                                        <div className="text-blue">
                                                            <span className="text-3xl">{userInfo.score ? userInfo.score : 0} </span>
                                                            <span className="text-xl">Points</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="m-2 px-8 py-2 flex items-end shadow text-white" style={{ borderRadius: "1rem", background: "linear-gradient(to right, #ff9933 0%, #ff0000 100%)" }} onClick={this.logout}>
                                                    <span>
                                                        LOGOUT
                                                    </span>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                    :
                                    (
                                        <React.Fragment>
                                            <div className="flex items-center flex-col justify-center h-full">
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
