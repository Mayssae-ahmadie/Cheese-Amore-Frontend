import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import ConfirmDelete from "./ConfirmDelete";
import "../../CSS/Cart.css";

function CartTable({ cartData, OnDelete }) {
    const token = localStorage.getItem('token');
    const cartId = localStorage.getItem('cartId');
    const [selectedProduct, setSelectedProduct] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [instruction, setInstruction] = useState("");

    const openConfirmationModal = () => {
        setShowConfirmationModal(true);
    };

    const removeFromCart = async () => {
        console.log(selectedProduct);
        console.log(cartId);
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_URL}/cart/removeProduct/${cartId}/${selectedProduct}`,
            );

            setShowConfirmationModal(false);
            OnDelete();

        } catch (error) {
            console.error('Error removing product from Cart:', error);
        }
    };

    const removeFromCartWithConfirmation = async (productId) => {
        await removeFromCart(cartId, productId);
        setShowConfirmationModal(false);
    };

    const fetchProductDetails = async (productId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/product/getById/${productId}`);
            return response.data.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let totalPrice = 0;
                const productDetails = await Promise.all(
                    cartData.productIds.map(async (cartItem) => {
                        const productId = cartItem.productId;
                        const product = await fetchProductDetails(productId);

                        if (product && product.price) {
                            totalPrice += parseFloat(product.price);
                        }

                        return product;
                    })
                );

                setTotalPrice(totalPrice);
                localStorage.setItem("total", totalPrice.toFixed(2));


                setProducts(productDetails);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchData();
    }, [cartData.productIds, totalPrice]);

    return (
        <div className="mt-8 wishlistTable-table">
            <div className="italic flex justify-end">
                <Link to='/Shop'>
                    <a href="" className="text-2xl">
                        Continue Shopping <span className="ml-2 text-3xl">&#8594;</span>
                    </a>
                </Link>
            </div>
            <table className="mt-10 min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="border-b border-black p-4 text-center font-thin text-2xl">Product</th>
                        <th className="border-b border-black p-4 text-center font-thin text-2xl">Name</th>
                        <th className="border-b border-black p-4 text-center font-thin text-2xl">Category</th>
                        <th className="border-b border-black p-4 text-center font-thin text-2xl">Price</th>
                        <th className="p-4 text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        if (product && product.price) {
                            return (
                                <tr key={product._id}>
                                    <td className="p-4 text-center">
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt="Product"
                                                className="w-32 h-45 object-cover mx-auto"
                                                style={{ width: '100px', height: '130px' }}
                                            />
                                        )}
                                    </td>
                                    <td className="p-4 text-center text-2xl">
                                        {product.name}
                                    </td>
                                    <td className="p-4 text-center text-2xl">
                                        {product.category}
                                    </td>
                                    <td className="p-4 text-center text-2xl italic">
                                        ${product.price}
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => {
                                                openConfirmationModal(product._id);
                                                setSelectedProduct(product._id);
                                            }}
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            );
                        } else {
                            return null;
                        }
                    })}
                </tbody>
            </table>

            {showConfirmationModal && selectedProduct && (
                <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="absolute bg-white p-8 rounded shadow-md">
                        <ConfirmDelete
                            onConfirm={() => removeFromCartWithConfirmation(selectedProduct)}
                            closeModal={() => setShowConfirmationModal(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartTable;