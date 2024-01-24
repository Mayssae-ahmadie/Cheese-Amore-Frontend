import React from 'react';
import '../CSS/About.css';
import Divine from "../Assets/The Divine Board.png";
import { Link } from "react-router-dom";

const HomepageAbout = () => {
    return (
        <div>
            <h2 className='about-heading'> About </h2>
            <div className='about-grid'>
                <div>
                    <p className='about-text'> Not your average board...  </p>
                    <p className='about-text1'> Elevate your event with ease, ensuring a worry-free experience and an unmatched wow factor that guests will be gushing about for months! </p>
                    <Link to="/About">
                        <button className='about-button'> Read more </button>
                    </Link>
                </div>
                <div><img className="homepage-about-image" src={Divine} alt="" srcSet="" /> </div>
            </div >
        </div >
    );
};

export default HomepageAbout;