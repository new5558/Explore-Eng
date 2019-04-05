import React, { Component } from 'react';
import { SearchIcon, CloseIcon } from '../shared-components/Icons';

export default class extends Component {

    render() {
        const { value, onChange, closeSearch, isSearching } = this.props;
        return (
            <div className="mx-3 px-3 h-12 w-full bg-white shadow-md items-center rounded-lg flex">
                <SearchIcon />
                <input placeholder="Search ECO ATM Location" value={value} onChange={onChange} className="h-12 py-2 w-full mx-2" />
                <CloseIcon onClick={closeSearch} isSearching={isSearching} />
            </div>
        );
    }
}