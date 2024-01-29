import React from 'react';
import '../CSS/ContactSection.css';
import Love from "../Assets/The Love Board.png";
import Classic from "../Assets/The Classic Board.png";
import Location from "../Assets/Location icon.png";
import Instagram from "../Assets/Instagram icon.png";
import Mail from "../Assets/Mail icon.png";

const ContactSection = () => {
    return (
        <div className='contact-grazing-container'>
            <div className='contact-grazing-grid'>
                <div>
                    <p className='contact-grazing-title'>Let's Brie Friends </p>
                    <img className="contact-grazing-image" src={Love} alt="" srcSet="" />
                </div>
                <div><img className="contact-grazing-image1" src={Classic} alt="" srcSet="" />
                    <div className="contact-social">
                        <div className="contact-social-icons">
                            <img className='contact-location-icon' src={Location} alt="Location" />
                            <p className="contact-social-text1"> Sawfar, Mount-Lebanon </p>
                        </div>
                        <div className="contact-social-icons">
                            <a href="mailto:">
                                <img className='contact-mail-icon' src={Mail} alt="Email" />
                            </a>
                            <a href="mailto:" className="contact-social-text2" >cheese.amore@gmail.com</a>
                        </div>
                        <div className="contact-social-icons">
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img className="contact-instagram-icon" src={Instagram} alt="Instagram" />
                            </a>
                            <a href="" target="_blank" rel="noopener noreferrer" className="contact-social-text3"> @cheeseamore.leb </a>
                            {/* The target="_blank" attribute opens the link in a new tab or window, and rel="noopener noreferrer" is used for security and performance reasons. */}
                        </div>
                    </div >
                </div >
            </div >
        </div >
    );
};

export default ContactSection;