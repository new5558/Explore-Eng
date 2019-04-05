import React, { Component } from 'react';
import { SearchIcon, CloseIcon } from '../shared-components/Icons';

export default class extends Component {

    render() {
        const { value, onChange, closeSearch, isSearching, onClick } = this.props;
        return (
            <div className="mx-3 px-3 h-12 w-full bg-white shadow-md items-center rounded-lg flex">
                <SearchIcon onClick={onClick} />
                <input placeholder="Search ECO ATM Location" onClick={onClick} value={value} onChange={onChange} className="h-12 py-2 w-full mx-2" />
                <CloseIcon className="w-8 h-8" onClick={closeSearch} isSearching={isSearching} />
            </div>
        );
    }
}