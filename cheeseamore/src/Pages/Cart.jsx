import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import CartDetails from "../Components/Cart Components/CartDetails";
import CartEmpty from "../Components/Cart Components/CartEmpty";
import CartTable from "../Components/Cart Components/CartTable";
import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';
import DeliveryBanner from '../Components/DeliveryBanner';
import QualityBanner from '../Components/QualityBanner';
import CartAddress from '../Components/Cart Components/CartAddress'
import Thankyou from "../Components/Cart Components/ThankyouMessage";
import "../CSS/Cart.css";
import ConfirmCheckout from "../Components/Cart Components/ConfirmCheckout";

function Cart() {
    const [shippingMethod, setShippingMethod] = useState("delivery");
    const [receiveDateTime, setSelectedreceiveDateTime] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [showThankyou, setShowThankyou] = useState(false);
    const token = localStorage.getItem('token');
    const cartId = localStorage.getItem('cartId');
    const modalRef = useRef(null);
    const [cartData, setCartData] = useState(null);

    const openAddressModal = () => {
        setAddressModalOpen(true);
    };

    const closeAddressModal = () => {
        setAddressModalOpen(false);
        window.location.reload();
    };

    const handleConfirm = async () => {
        const formattedDateTime = localStorage.getItem("date");
        const totalPrice = localStorage.getItem("Totals");
        console.log(shippingMethod, formattedDateTime, totalPrice, cartId);
        const userId = localStorage.getItem("userId");
        try {

            const orderResponse = await axios.post(`${process.env.REACT_APP_URL}/order/create/${cartId}`, {
                "shippingMethod": shippingMethod,
                "receiveDateTime": formattedDateTime,
                "totalPrice": totalPrice
            });

            console.log(orderResponse.data.data);

            try {

                const userResponse = await axios.get(`${process.env.REACT_APP_URL}/getById/${userId}`);
                const userEmail = userResponse.data.email;

                // Send order creation request
                const orderResponse = await axios.post(`${process.env.REACT_APP_URL}/order/create/${cartId}`, {
                    "shippingMethod": shippingMethod,
                    "receiveDateTime": formattedDateTime,
                    "totalPrice": totalPrice
                });

                console.log(orderResponse.data.data);

                // Send email request
                const emailData = {
                    email: userEmail, // Use the retrieved user email
                    message: `Thank you for your order! Your order details: 
                              Shipping Method: ${shippingMethod}
                              Receive Date and Time: ${formattedDateTime}
                              Total Price: ${totalPrice}`
                };

                const emailResponse = await axios.post(`${process.env.REACT_APP_URL}/email/send`, emailData);

                console.log(emailResponse.data);

                closeModal();
                setShowThankyou(true);
                updateCartData(orderResponse.data.data.updatedCart);

            } catch (error) {
                console.error("Error creating order or sending email:", error.toString());
            }
            closeModal();
            setShowThankyou(true);
            updateCartData(orderResponse.data.data.updatedCart);

        } catch (error) {
            console.error("Error creating order or sending email:", error.toString());
        }
    };

    const getCartItems = () => {
        const userId = localStorage.getItem("userId");
        axios.get(`${process.env.REACT_APP_URL}/cart/getByUserID/${userId}`)
            .then(response => {
                setCartData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching cart data:", error);
            });

    }
    useEffect(() => {
        getCartItems();
    }, []);

    console.log(cartData, ` cartData`)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    const openModal = (shippingMethod) => {
        setIsModalOpen(true);
        setShippingMethod(shippingMethod);
    };
    // console.log(shippingMethod);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const updateCartData = (newCartData) => {
        setCartData(newCartData);
    };

    if (!cartData || !cartData.cart.productIds || cartData.cart.productIds.length === 0) {

        return (
            <>
                <DeliveryBanner />
                <NavBar />
                <div className="max-w-screen-xl mx-auto p-4 Cart-cont">
                    <div className="italic">
                        <p href="" className="text-3xl">
                            My Cart
                        </p>
                    </div>
                    <CartEmpty />
                    {showThankyou && (
                        <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                            <div className="absolute bg-white p-8 rounded shadow-md">
                                <Thankyou
                                    closeModal={() => setShowThankyou(false)}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <NavBar />
            <div className="max-w-screen-xl mx-auto p-4 Cart-cont">
                <div className="italic">
                    <p href="" className="text-3xl">
                        My Cart
                    </p>
                </div>
                <CartTable
                    cartData={cartData.cart}
                    updateCartData={updateCartData}
                    OnDelete={getCartItems}
                />
                <CartDetails openModal={openModal} cartData={cartData} openAddressModal={openAddressModal} />
                {isModalOpen && (
                    <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div
                            ref={modalRef}
                            className="absolute bg-white p-8 rounded shadow-md"
                        >
                            <ConfirmCheckout
                                closeModal={closeModal}
                                confirm={handleConfirm}
                            />
                        </div>
                    </div>
                )}
                {isAddressModalOpen &&
                    <div className="fixed inset-0 flex items-center justify-center z-40">
                        <div className="fixed inset-0 bg-black opacity-50"></div>
                        <div className="absolute bg-white p-8 rounded shadow-md">
                            <CartAddress closeModal={closeAddressModal} cartData={cartData} updateCartData={updateCartData} />
                        </div>
                    </div>}

            </div>
            <QualityBanner />
            <Footer />
        </>
    );
}

export default Cart;