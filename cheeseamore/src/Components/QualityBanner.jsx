import React from "react";
import "../CSS/QualityBanner.css";
import Logo from "../Assets/Logo.png";
import Chilled from "../Assets/Chilled icon.png";
import Cheese from "../Assets/Cheese icon.png";
import Chef from "../Assets/Chef icon.png";

const QualityBanner = () => {
    return (
        <div className="quality-banner">
            <div className="quality-logo">
                <img src={Logo} alt="" srcset="" />
            </div>
            <div className="quality-grid">
                <div className="quality-grid-section">
                    <img className="quality-grid-image" src={Chilled} alt="" srcset="" />
                    <p className="quality-banner-text"> Shipped Chilled </p>
                </div>
                <div className="quality-grid-section">
                    <img className="quality-grid-image" src={Cheese} alt="" srcset="" />
                    <p className="quality-banner-text"> Premium Ingredients </p>
                </div>
                <div className="quality-grid-section">
                    <img className="quality-grid-image" src={Chef} alt="" srcset="" />
                    <p className="quality-banner-text"> Made Daily </p>
                </div>
            </div>
        </div>
    );
};

export default QualityBanner;