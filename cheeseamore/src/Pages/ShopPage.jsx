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
import { Link } from "react-router-dom";
import "../CSS/ShopPage.css";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let apiUrl = '';

                switch (category) {
                    case 'All':
                        apiUrl = `${process.env.REACT_APP_URL}/product/getAll`;
                        break;
                    case 'Box':
                    case 'Small Board':
                    case 'Medium Board':
                    case 'Large Board':
                    case 'Extra Large Board':
                        apiUrl = `${process.env.REACT_APP_URL}/product/category/${encodeURIComponent(category)}`;
                        break;
                    default:
                        apiUrl = `${process.env.REACT_APP_URL}/product/getAll`;
                }

                const response = await axios.get(apiUrl);
                const data = response.data;

                const sortedData = [...data.data].sort((a, b) => {
                    const compareValue = sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
                    return compareValue;
                });

                setProducts(sortedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [category, sortOrder]);

    const handleSortToggle = () => {
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

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

            <div className="shop-all-product">
                <div className="shop-category-price">
                    <div className="shop-browse-category"> Browse By Category </div>
                    <button className="shop-button-sort" onClick={handleSortToggle}>
                        {`Sort Price: ${sortOrder === 'asc' ? 'Low to High' : 'High to Low'}`}
                    </button>
                </div>

                <div className="">
                    <div id="categoryButtons" className="shop-category">
                        <button className={`shop-button-category ${category === 'All' ? 'active' : ''}`} onClick={() => setCategory('All')}>All</button>
                        <button className={`shop-button-category ${category === 'Box' ? 'active' : ''}`} onClick={() => setCategory('Box')}>Box</button>
                        <button className={`shop-button-category ${category === 'Small Board' ? 'active' : ''}`} onClick={() => setCategory('Small Board')}>Small Board</button>
                        <button className={`shop-button-category ${category === 'Medium Board' ? 'active' : ''}`} onClick={() => setCategory('Medium Board')}>Medium Board</button>
                        <button className={`shop-button-category ${category === 'Large Board' ? 'active' : ''}`} onClick={() => setCategory('Large Board')}>Large Board</button>
                        <button className={`shop-button-category ${category === 'Extra Large Board' ? 'active' : ''}`} onClick={() => setCategory('Extra Large Board')}>Extra Large Board</button>
                    </div>
                </div>

                <div id="productList" className="shop-product-items">
                    {Array.isArray(products) &&
                        products.map((product) => (
                            <div key={product._id}>
                                <Link to={`/SingleProductPage/${product._id}`}>
                                    <img
                                        src={product.image}
                                        className="shop-product-image"
                                        alt={product.image}
                                    />
                                    <div className="shop-item-name-price">
                                        <p>{product.name}</p>
                                        <p>{product.price} $ </p>
                                    </div>
                                </Link>

                                <div className="shop-add-to-cart">
                                    <button
                                        onClick={() => {
                                            setProduct(product); // Set the selected product
                                            openModal();
                                        }}
                                        className="shop-cart-text"
                                    >
                                        ADD TO CART{" "}
                                        <span>
                                            <img src={Cart} className="shop-cart-icon" alt="cart" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>

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

            <QualityBanner />
            <Footer />
        </div>
    );
}

export default ShopPage;