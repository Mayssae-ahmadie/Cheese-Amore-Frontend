import React from 'react';
import { Link } from "react-router-dom";
import '../CSS/Grazing.css';
import Grazing22 from "../Assets/Grazing22.png";
import Grazing23 from "../Assets/Grazing23.png";

const HomepageGrazing = () => {
    return (
        <div>
            <h2 className='grazing-heading1'> Grazing Tables </h2>
            <h3 className='grazing-heading2'> Customize and Request your grazing table </h3>
            <div>
                <div className='grazing-grid'>
                    <div><img className="grazing-image" src={Grazing22} alt="" srcSet="" /> </div>
                    <div><img className="grazing-image" src={Grazing23} alt="" srcSet="" /> </div>
                </div >
                <Link to="/GrazingRequest">
                    <button className='grazing-button'> Request now </button>
                </Link>
            </div >
        </div >
    );
};

export default HomepageGrazing;