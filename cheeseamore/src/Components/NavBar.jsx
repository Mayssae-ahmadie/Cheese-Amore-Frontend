import React from "react";
import "../CSS/NavBar.css";
import Logo from "../Assets/Logo.png";
import AccountIcon from "../Assets/Account-icon.png";
import CartIcon from "../Assets/Cart-icon.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {
    const token = sessionStorage.getItem('authToken')
    const handlelogout = () => { sessionStorage.removeItem('authToken'); window.location.reload() };
    useEffect(() => { }, [handlelogout])

    const [isBurgerActive, setIsBurgerActive] = useState(false);

    const toggleBurgerMenu = () => {
        setIsBurgerActive(!isBurgerActive);
    };

    return (
        <div className="NavBar">
            <div className="desktop-navbar">
                <div className="logo-icons">
                    <div className="logo">
                        <Link to="/">
                            <img src={Logo} alt="logo icon"></img>
                        </Link>
                    </div>
                    <div className="icons">
                        <Link to="/login">
                            <img className="account-icon" src={AccountIcon} alt="account-icon"></img>
                        </Link>
                        <Link to='/cart'>
                            <img className="cart-icon" src={CartIcon} alt="cart-icon"></img>
                        </Link>
                    </div>
                </div>

                <div className="navbar">
                    <div>
                        <Link to="/" className="navbar-links">
                            Home
                        </Link>
                    </div>
                    <div>
                        <Link to="/Shop" className="navbar-links">
                            Shop
                        </Link>
                    </div>
                    <div>
                        <Link to="/About" className="navbar-links">
                            About
                        </Link>
                    </div>
                    <div>
                        <Link to="/Contact" className="navbar-links">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mobile">
                <div className="mobile-navbar">
                    <button className="mobile-burger" onClick={toggleBurgerMenu}>
                        ☰
                    </button>
                    <div className={`mobile-nav ${isBurgerActive ? 'active' : ''}`}>
                        <div>
                            <Link to="/" className="mobile-nav-link">
                                Home
                            </Link>
                        </div>
                        <div>
                            <Link to="/Shop" className="mobile-nav-link">
                                Shop
                            </Link>
                        </div>
                        <div>
                            <Link to="/About" className="mobile-nav-link">
                                About
                            </Link>
                        </div>
                        <div>
                            <Link to="/Contact" className="mobile-nav-link">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="logo-mobile">
                        <Link to="/">
                            <img src={Logo} alt="logo icon"></img>
                        </Link>
                    </div>
                    <div className="icons-mobile">
                        <Link to="/LogIn">
                            <img className="account-icon-mobile" src={AccountIcon} alt="account-icon"></img>
                        </Link>
                        <Link to='/Cart'>
                            <img className="cart-icon-mobile" src={CartIcon} alt="cart-icon"></img>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;