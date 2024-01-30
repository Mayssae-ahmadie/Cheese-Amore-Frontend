import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Logo.png";
import AccountIcon from "../Assets/Account-icon.png";
import CartIcon from "../Assets/Cart-icon.png";
import LogOutIcon from "../Assets/LogOut Icon.png";
import LogoutConfirm from '../Components/LogoutConfirmation';
import UserTable from "../AdminDashboard/UserTable";
import OrderTable from "../AdminDashboard/OrderTable";
import ProductTable from "../AdminDashboard/ProductTable";
import "../CSS/NavBar.css";
import "../CSS/AdminDashboard.css";

const NavBarDash = () => {
    const [section, setSection] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const loggedIn = userId;
        setIsLoggedIn(loggedIn);
    }, []);

    const openLogoutModal = () => {
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        setShowLogoutModal(false);
        localStorage.clear();
    };

    return (
        <>
            <div className="NavBar">
                <div className="desktop-navbar">
                    <div className="logo-icons">
                        <div className="logo">
                            <Link to="/">
                                <img src={Logo} alt="Cheese Amore" />
                            </Link>
                        </div>
                        <div className="icons">
                            <Link to='/Cart'>
                                <img className="cart-icon" src={CartIcon} alt="cart-icon" />
                            </Link>
                            {isLoggedIn ? (
                                <img onClick={openLogoutModal} src={LogOutIcon} className="logout-icon" alt="logout" />
                            ) : (
                                <Link to="/LogIn">
                                    <img className="account-icon" src={AccountIcon} alt="account-icon" />
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="navbar">
                        <ul className="mx-20 flex gap-20 text-lg">
                            <li>
                                <Link to="" onClick={() => setSection('Users')} className={`hover:border-b-2 focus:border-b-2 ${section === 'Users' ? 'border-b-2' : ''}`}>Users</Link>
                            </li>
                            <li>
                                <Link to="" onClick={() => setSection('Products')} className={`hover:border-b-2 focus:border-b-2 ${section === 'Products' ? 'border-b-2' : ''}`}>Products</Link>
                            </li>
                            <li>
                                <Link to="" onClick={() => setSection('Orders')} className={`hover:border-b-2 focus:border-b-2 ${section === 'Orders' ? 'border-b-2' : ''}`}>Orders</Link>
                            </li>
                            {/* <li>
                            <Link to="/LogIn" className="">Logout</Link>
                        </li> */}
                        </ul>
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
                )}
            </div>

            {section === 'Users' && <UserTable />}
            {section === 'Products' && <ProductTable />}
            {section === 'Orders' && <OrderTable />}
        </>
    );
};

export default NavBarDash;