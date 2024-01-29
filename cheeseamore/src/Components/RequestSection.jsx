import React from 'react';
import '../CSS/ContactSection.css';
import Grazing22 from "../Assets/Grazing22.png";
import Grazing23 from "../Assets/Grazing23.png";

const RequestSection = () => {
    return (
        <div className='contact-grazing-container'>
            <div className='contact-grazing-grid'>
                <div>
                    <p className='contact-grazing-title'> Request a Grazing Table </p>
                    <img className="contact-grazing-image" src={Grazing22} alt="" srcSet="" />
                </div>
                <div>
                    <img className="contact-grazing-image1" src={Grazing23} alt="" srcSet="" />
                    <p className='request-info'> Please provide the following information and we'll get back to you as soon as possible. </p>
                </div >
            </div >
        </div >
    );
};

export default RequestSection;