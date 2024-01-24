import React from 'react';
import { Link } from "react-router-dom";
import '../CSS/Header.css';
import HeaderImage from "../Assets/Header image.png";

const HomepageHeader = () => {
    return (
        <div className='header-grid'>
            <div className='image-header-container'><img className="header-image" src={HeaderImage} alt="" srcSet="" /> </div>
            <div>
                <p className='header-text'> Epicurean Escapade </p>
                <p className='header-text'> Cheese & Charcuterie Delights For Every Occasion </p>
                <Link to="/Shop">
                    <button className='header-button'> Order now </button>
                </Link>
            </div>
        </div >
    );
};

export default HomepageHeader;