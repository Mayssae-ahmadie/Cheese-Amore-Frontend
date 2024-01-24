import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DeliveryBanner from "../Components/DeliveryBanner";
import NavBar from "../Components/NavBar";
import QualityBanner from "../Components/QualityBanner";
import Footer from "../Components/Footer";
import Cart from "../Assets/Cart icon.png";
import ConfirmAddToCart from "../Components/SingleProduct Components/ConfirmAddToCart";
import AddedToCartSuccess from "../Components/SingleProduct Components/AddedToCartSuccess";
import AlreadyInCart from "../Components/SingleProduct Components/AlreadyInCart";
import "../CSS/SingleProductPage.css";

const SingleProductPage = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [instruction, setInstruction] = useState("");
    const navigate = useNavigate();
    const { productId } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessCartModal, setShowSuccessCartModal] = useState(false);
    const [showFailCartModal, setShowFailCartModal] = useState(false);
    const modalRef = useRef(null);
    const [ModalMessage, setModalMessage] = useState('');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const cartId = localStorage.getItem('cartId');
    const role = localStorage.getItem('role');

    const addToCart = async () => {

        if (!userId || role !== 'client') {
            navigate('/LogIn');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/cart/addProduct/${cartId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productID: product._id,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setShowSuccessCartModal(true);
            } else {
                setShowFailCartModal(true);
                setModalMessage(data.message);
                console.error("API Error:", data.message);
            }

        } catch (error) {
            setShowFailCartModal(true);
            console.error("API Error:", error.message);
        }

    };

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/product/getById/${productId}`);

                setProduct(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        // Check if productId is available before making the request
        if (productId) {
            fetchProductData();
        }
    }, [productId]);

    return (
        <div>
            <DeliveryBanner />
            <NavBar />

            {product && (
                <div>
                    <div className="single-product-container">
                        <div>
                            <img
                                src={product.image}
                                className="single-product-image"
                                alt={product.name}
                            />
                            <p className="single-product-descriptive"> All images provided are illustrative examples and are subject to variations. </p>
                        </div>
                        <div>
                            <p className="single-product-title"> {product.name}</p>
                            <p className="single-product-details"> ${product.price}</p>
                            <p className="single-product-details"> {product.serving}</p>
                            <p className="single-product-details"> {product.description}</p>
                            <p> Special Instructions Or Customizations </p>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className=""
                                placeholder="Add Instruction"
                                onChange={setInstruction}
                            ></textarea>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            openModal();
                        }}
                        className="bg-white text-red-700 font-bold psy-1 px-2 border border-red-700 w-96 text-lg inline-block mt-5 flex justify-center hover:bg-red-100 SingleProductData-Cart-responsive">

                        ADD TO CART{" "}
                        <span>
                            <img src={Cart} className="w-5 h-5 ml-1 mt-1" alt="cart" />
                        </span>
                    </button>

                    {isModalOpen && (
                        <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                            <div
                                ref={modalRef}
                                className="absolute bg-white p-8 rounded shadow-md"
                            >
                                <ConfirmAddToCart
                                    onConfirm={addToCart}
                                    closeModal={closeModal}
                                />
                            </div>
                        </div>
                    )}

                    {showSuccessCartModal && (
                        <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                            <div className="absolute bg-white p-8 rounded shadow-md">
                                <AddedToCartSuccess closeModal={() => setShowSuccessCartModal(false)} />
                            </div>
                        </div>
                    )}

                    {showFailCartModal && (
                        <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                            <div className="absolute bg-white p-8 rounded shadow-md">
                                <AlreadyInCart closeModal={() => setShowFailCartModal(false)}
                                    Message={ModalMessage} />
                            </div>
                        </div>
                    )}

                </div>
            )}
            <QualityBanner />
            <Footer />
        </div>
    );
};

export default SingleProductPage;