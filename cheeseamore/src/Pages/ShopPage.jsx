import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import QualityBanner from "../Components/QualityBanner";
import Footer from "../Components/Footer";
import "../CSS/ShopPage.css";
import Cart from "../Assets/Cart icon.png";

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

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

    return (
        <div>
            <NavBar />
            <div className="shop-all-product">
                <div className="shop-category-price">
                    <div className="shop-browse-category" > Browse By Category </div>
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
                                    <button className="shop-cart-text">
                                        Add to Cart
                                        <img className="shop-cart-icon" src={Cart} alt="cart-icon" />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <QualityBanner />
            <Footer />
        </div >
    );
};

export default ShopPage;