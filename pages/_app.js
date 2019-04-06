import React from 'react'
import App, { Container } from 'next/app'
import { MapIcon } from '../components/shared-components/Icons';

const Button = ({ text, onClick, children }) => {
    return (
        <div className="flex flex-col justify-center items-center text-base w-full mx-5 py-2 rounded" style={{boxShadow: "0 3px 4px 0 rgba(0,0,0,0.05)"}}>
            <div className="w-6 h-6 mb-1">
                {children}
            </div>
            {text}
        </div>
    )
}

class Layout extends React.Component {
    render() {
        const { children } = this.props
        return (
            <div className='layout'>
                {children}
                <div
                    className="fixed flex justify-around items-center pb-4 pt-2 pin-b pin-l w-screen h-24 bg-white shadow-md"
                    style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                >
                    <Button text="Map">
                        <MapIcon fill="#636160" />
                    </Button>
                    <Button text="Contact" />
                </div>
            </div>
        )
    }
}

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        )
    }
}