import React, { Component } from 'react';
import { SearchIcon } from '../shared-components/Icons';

export default class extends Component {
    render() {
        return (
            <div className="mx-6 px-6 text-5xl h-32 w-full bg-white shadow-md items-center rounded-lg flex">
                <SearchIcon/>
                <input className="w-full mx-3" />
            </div>
        );
    }
}