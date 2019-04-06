import React from 'react'
import App, { Container } from 'next/app'
import { MapIcon, PersonIcon } from '../components/shared-components/Icons';
import Link from 'next/link'

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

    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}
    
        if (Component.getInitialProps) {
          pageProps = await Component.getInitialProps(ctx)
        }
        const pathName = ctx.pathname;
    
        return { pageProps, pathName }
      }

    render() {
        const { pathName } = this.props;
        const { Component, pageProps } = this.props
        return (
            <Container>
                <Layout path={pathName}>
                    <Component {...pageProps} />
                </Layout>
            </Container>
        )
    }
}