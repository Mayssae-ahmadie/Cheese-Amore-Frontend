import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../CSS/Footer.css";
import Heart1 from "../Assets/Heart-1.png";
import Heart2 from "../Assets/Heart-2.png";
import Location from "../Assets/Location icon.png";
import Instagram from "../Assets/Instagram icon.png";
import Mail from "../Assets/Mail icon.png";


const Footer = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const goToDashboard = () => {
        if (role === 'admin') {
            navigate('/AdminDashboard');
        }
    };

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        document.getElementById('currentYearPlaceholder').innerText = currentYear;
    }, []);

    return (
        <div className="footer">
            <div className="footer-section-1">
                <img className="heart1" src={Heart1} alt="Heart" srcset="" />
                <p className="footer-text"> "Life is great, but cheese makes it grate-er" </p>
                <img className="heart2" src={Heart2} alt="Heart" srcset="" />
            </div>
            <div className="footer-section-2">
                <div>
                    <Link to="/Shop" className="footer-links">
                        Shop
                    </Link>
                </div>
                <div>
                    <Link to="/About" className="footer-links">
                        About
                    </Link>
                </div>
                <div>
                    <Link to="/Contact" className="footer-links">
                        Contact
                    </Link>
                </div>
            </div>
            <div Footer-section-3>
                <div>
                    <h2 className="footer-social-header"> Let's Brie Friends </h2>
                </div>
                <div className="footer-social">
                    <div className="footer-social-icons">
                        <img className='location-icon' src={Location} alt="Location" />
                        <p className="footer-social-text1"> Sawfar, Mount-Lebanon </p>
                    </div>
                    <div className="footer-social-icons">
                        <a href="mailto:">
                            <img className='mail-icon' src={Mail} alt="Email" />
                        </a>
                        <a href="mailto:" className="footer-social-text2" >cheese.amore@gmail.com</a>
                    </div>
                    <div className="footer-social-icons">
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <img className="instagram-icon" src={Instagram} alt="Instagram" />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer" className="footer-social-text3"> @cheeseamore.leb </a>
                        {/* The target="_blank" attribute opens the link in a new tab or window, and rel="noopener noreferrer" is used for security and performance reasons. */}
                    </div>
                </div>
            </div>
            <div id="copyright" className="footer-copyright" onClick={goToDashboard}>
                &copy; <span id="currentYearPlaceholder">YEAR</span> All rights reserved
            </div>
        </div >
    );
};

export default Footer;