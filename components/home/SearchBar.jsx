import React, { Component } from 'react';
import { SearchIcon } from '../shared-components/Icons';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state={
            test:"teat",
        };
    }

    render() {
        return (
            <div className="mx-3 px-3 h-12 w-full bg-white shadow-md items-center rounded-lg flex">
                <SearchIcon/>
                <input className="h-12 py-2 w-full mx-2" />
            </div>
        );
    }
}