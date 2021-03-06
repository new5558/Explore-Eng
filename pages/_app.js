import React from 'react'
import App, { Container } from 'next/app'
import { MapIcon, PersonIcon } from '../components/shared-components/Icons';
import Link from 'next/link'
import firebase, { firestore } from '../util/firebase'
import '../static/css/body.css'
import '../util/tw.css';

const Button = ({ text, textColor, onClick, children }) => {
    return (
        <div onClick={onClick} className="flex flex-col justify-center items-center text-base w-full mx-5 py-2 rounded" style={{ boxShadow: "0 3px 4px 0 rgba(0,0,0,0.05)", color: textColor }}>
            <div className="w-6 h-6 mb-1">
                {children}
            </div>
            {text}
        </div>
    )
}

class Layout extends React.Component {

    render() {
        const { children, path } = this.props
        const color1 = path === "/" ? "#DE5C8E" : "#636160";
        const color2 = path === "/" ? "#636160" : "#DE5C8E";
        return (
            <div className='layout'>
                {children}
                <div
                    className="fixed flex justify-around items-center pb-4 pt-2 pin-b pin-l w-screen h-24 bg-white shadow-md"
                    style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                >
                    <Link href="/">
                        <Button textColor={color1} text="Map">
                            <MapIcon fill={color1} />
                        </Button>
                    </Link>
                    <Link href="account">
                        <Button textColor={color2} text="Account">
                            <PersonIcon fill={color2} />
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default class MyApp extends App {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            isLogin: null,
            apiKey: process.env.GOOGLEMAP_API_KEY,
        }
    }

    // static async getInitialProps() {
    //     const key = process.env.GOOGLEMAP_API_KEY;
    //     console.log('getInitial Props', key)
    //     return {
    //         "env": key,
    //     }
    //   }

    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        const pathName = ctx.pathname;
        const key = process.env.GOOGLEMAP_API_KEY;
        return { pageProps, pathName, "env": key }
    }

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged(user => {
    //         if (user != undefined) {
    //             firestore.collection("users").doc(user.uid).get()
    //                 .then(result => result.data())
    //                 .then(data => {
    //                     user.score = data.score;
    //                     this.setUserInfo(user, true);
    //                 }).catch(() => {
    //                     this.setUserInfo(user, true)
    //                 })
    //             // this.setUserInfo(user, true);
    //             this.createUser(user);
    //         } else {
    //             this.setUserInfo({}, false);
    //         }
    //     })
    //     this.setState({ apiKey: this.props.env })
    // }

    setUserInfo = (user, isLogin) => {
        this.setState({
            userInfo: user,
            isLogin
        })
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

    render() {
        const { pathName } = this.props;
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Layout path={pathName}>
                    <Component firestore={this.props.firestore} env={this.state.apiKey ? this.state.apiKey : this.props.env} isLogin={this.state.isLogin} userInfo={this.state.userInfo} createUser={this.createUser} setUserInfo={this.setUserInfo} {...pageProps} />
                </Layout>
            </Container>
        )
    }
}
