import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/NavBar.css";
import LogoutConfirm from './LogoutConfirmation';

function NavBarTest() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const cartId = localStorage.getItem('cartId');
        const loggedIn = userId && cartId;
        setIsLoggedIn(loggedIn);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const openLogoutModal = () => {
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        setShowLogoutModal(false);
    };

    return (
        <div className="App">
            <nav className="bg-white border-gray-200 white:bg-gray-900 navbar-container">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../Images/logo.png" className="h-7 navbar-logo-image" alt="Collect" />
                    </Link>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <div className="flex items-center navbar-cart-heart-cont">
                            <Link to="/Wishlist" className="mr-2">
                                <img src="../Images/heart 1.png" className="h-7" alt="wishlist" />
                            </Link>
                            <Link to="/Cart" className="mr-2">
                                <img src="../Images/cart 1.png" className="h-7" alt="cart" />
                            </Link>
                            {isLoggedIn ? (
                                <img onClick={openLogoutModal} src="../Images/dashboardIcons/logout.png" className="h-7" alt="logout" />
                            ) : (
                                <Link to="/SignIn">
                                    <img src="../Images/dashboardIcons/profile.png" className="h-7" alt="profile" />
                                </Link>
                            )}
                        </div>
                        <button
                            data-collapse-toggle="navbar-cta"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 white:text-gray-400 white:hover:bg-gray-700 white:focus:ring-gray-600 "
                            aria-controls="navbar-cta"
                            aria-expanded={isMenuOpen}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`md:flex items-center w-full md:w-auto md:order-1 ${isMenuOpen ? " justify-end block fixed top-16 right-0 left-0 z-50 flex bg-transparent" : "hidden"
                            }`}
                        id="navbar-cta"
                    >





                        <ul className={`flex flex-col font-medium p-4 md:p-0 border border-gray-100 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white white:bg-gray-800 md:white:bg-gray-900 white:border-gray-700 navbar-list centered shadow-navbar ${isMenuOpen ? "md:ml-auto" : ""
                            } sm:flex-col sm:items-end`}>



                            <li>
                                <Link
                                    to="/"
                                    className={`block py-2 px-3 md:p-0 rounded "text-red-700" : "hover:text-red-700"
                                        } md:hover:bg-transparent md:hover:text-red-700 md:white:hover:text-blue-500 white:text-white white:hover:bg-gray-700 white:hover:text-white md:white:hover:bg-transparent white:border-gray-700 navbar-title`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/Shop"
                                    className={`block py-2 px-3 md:p-0 rounded "text-red-700" : "hover:text-red-700"
                                        } md:hover:bg-transparent md:hover:text-red-700 md:white:hover:text-blue-500 white:text-white white:hover:bg-gray-700 white:hover:text-white md:white:hover:bg-transparent white:border-gray-700 navbar-title`}
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/AboutUs"
                                    className={`block py-2 px-3 md:p-0 rounded "text-red-700" : "hover:text-red-700"
                                        } md:hover:bg-transparent md:hover:text-red-700 d:white:hover:text-blue-500 white:text-white white:hover:bg-gray-700 white:hover:text-white md:white:hover:bg-transparent white:border-gray-700 navbar-title`}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/ContactUs"
                                    className={`block py-2 px-3 md:p-0 rounded "text-red-700" : "hover:text-red-700"
                                        } md:hover:bg-transparent md:hover:text-red-700 md:white:hover:text-blue-500 white:text-white white:hover:bg-gray-700 white:hover:text-white md:white:hover:bg-transparent white:border-gray-700 navbar-title`}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


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
    );
}

export default NavBarTest;