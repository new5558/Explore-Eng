import React, { Component } from 'react';

export default class extends Component {
    render() {
        return (
            <div className="mx-6 px-6 text-5xl h-32 w-full bg-white shadow-md items-center rounded-lg flex">
                <img className="w-16 h-16" src="../../static/icons/search.svg" style={{ color: "red" }} />
                <input className="w-full mx-3" />
            </div>
        );
    }
}