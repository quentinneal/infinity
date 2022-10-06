/* React */
import React from 'react';

/* Styles */
import './header.styles.scss';

const Header = ({ queryRef, handleLogoClick, handleSearch, query }) => {

    return (
        <div className="header">
            <div className="header-item logo">
                <span className="logo-text" onClick={handleLogoClick}>Infinity</span>
            </div>
            <div className="header-item search">
                <input 
                    ref={queryRef} 
                    onKeyDown={(e) => handleSearch(e)} 
                    defaultValue={query}   
                    className="search-box" 
                    id="name" 
                    type="search" 
                    aria-label="Search for images" 
                    autoComplete= "off" 
                    placeholder="Search images" 
                />
            </div>
        </div>
    );
}

export default Header;