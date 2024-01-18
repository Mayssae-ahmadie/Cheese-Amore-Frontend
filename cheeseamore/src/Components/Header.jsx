import React from 'react';
import '../CSS/Header.css';
import HeaderImage from "../Assets/Header image.png";

const HomepageHeader = () => {
    return (
        <div className='header-grid'>
            <div className='image-header-container'><img className="header-image" src={HeaderImage} alt="" srcSet="" /> </div>
            <div>
                <p className='header-text'> Epicurean Escapade </p>
                <p className='header-text'> Cheese & Charcuterie Delights For Every Occasion </p>
                <button className='header-button'>Order now</button>
            </div>
        </div >
    );
};

export default HomepageHeader;