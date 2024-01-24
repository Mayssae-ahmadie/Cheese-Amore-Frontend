import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/NavBar.css";
import Logo from "../Assets/Logo.png";
import AccountIcon from "../Assets/Account-icon.png";
import CartIcon from "../Assets/Cart-icon.png";
import LogOutIcon from "../Assets/LogOut Icon.png";
import LogoutConfirm from './LogoutConfirmation';

function NavBar() {
    // const [isMenuOpen, setMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const cartId = localStorage.getItem('cartId');
        const loggedIn = userId && cartId;
        setIsLoggedIn(loggedIn);
    }, []);

    // const toggleMenu = () => {
    //     setMenuOpen(!isMenuOpen);
    // };

    const openLogoutModal = () => {
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        setShowLogoutModal(false);
        localStorage.clear();
    };

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
                            <img src={Logo} alt="Cheese Amore"></img>
                        </Link>
                    </div>
                    <div className="icons">
                        <Link to='/Cart'>
                            <img className="cart-icon" src={CartIcon} alt="cart-icon"></img>
                        </Link>
                        {isLoggedIn ? (
                            <img onClick={openLogoutModal} src={LogOutIcon} className="logout-icon" alt="logout" />
                        ) : (
                            <Link to="/LogIn">
                                <img className="account-icon" src={AccountIcon} alt="account-icon"></img>
                            </Link>
                        )}
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

            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 relative z-10">
                        <button onClick={closeLogoutModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                        <LogoutConfirm closeLogoutModal={closeLogoutModal} />
                    </div>
                </div>
            )
            }

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
                        <Link to='/Cart'>
                            <img className="cart-icon" src={CartIcon} alt="cart-icon"></img>
                        </Link>
                        {isLoggedIn ? (
                            <img onClick={openLogoutModal} src={LogOutIcon} className="logout-icon" alt="logout" />
                        ) : (
                            <Link to="/LogIn">
                                <img className="account-icon" src={AccountIcon} alt="account-icon"></img>
                            </Link>
                        )}
                    </div>

                    {showLogoutModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                            <div className="bg-white p-6 relative z-10">
                                <button onClick={closeLogoutModal} className="absolute top-0 right-0 m-4 px-2 py-1">X</button>
                                <LogoutConfirm closeLogoutModal={closeLogoutModal} />
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default NavBar;