import React, { useEffect, useState } from "react";
import "../CSS/AdminDashboard.css";
import axios from "axios";
import { useToasts } from 'react-toast-notifications'

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [payment, setPayment] = useState("");
    const [shippingMethod, setShippingMethod] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [error, setError] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const token = localStorage.getItem('token');
    const headers = { authorization: `Bearer ${token}` };
    const { addToast } = useToasts();

    useEffect(() => {
        fetchOrders();
        fetchProducts();
    }, []);

    const validateInput = () => {
        if (!quantity || !totalPrice || !shippingMethod || !orderStatus) {
            setError("All fields are required.");
            return false;
        }
        return true;
    };

    const fetchOrders = async () => {
        axios
            .get(`${process.env.REACT_APP_URL}/order/getAll`)
            .then((response) => {
                setOrders(response.data.data);
            })
            .catch((error) => {
                setError(error);
            });
    };

    const fetchProducts = async () => {
        axios
            .get(`${process.env.REACT_APP_URL}/product/getAll`)
            .then((response) => {
                setProducts(response.data.data);
            })
            .catch((error) => {
                setError(error);
            });
    };


    const handelUpdateOrderClickButton = (order) => {
        setShowUpdateModal(true);
        setSelectedOrder(order);
        setQuantity(order.quantity);
        setTotalPrice(order.totalPrice);
        setPayment(order.payment);
        setOrderStatus(order.status);
    };

    const handleUpdateOrder = async () => {
        if (!validateInput()) return;

        try {
            await axios.put(
                `${process.env.REACT_APP_URL}/order/update/${selectedOrder}`,
                { quantity, totalPrice, shippingMethod, orderStatus },
                { headers }
            );

            setShowUpdateModal(false);
            fetchOrders();
            addToast("Order updated successfully", {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (error) {
            setError(error);
            addToast("Unable to update order", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    };

    const handleDeleteOrder = async (orderID) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_URL}/order/delete/${orderID}`,
                {
                    headers,
                }
            );

            fetchOrders();
            addToast("Order deleted successfully", {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (error) {
            setError(error);
            addToast("Unable to delete order", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    };

    return (
        <div className="card-main">
            <h1 className="dashboard-title"> Orders Table </h1>
            {error && <p className="error-message">{error.message}</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Shipping Method</th>
                        <th>Order Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order.userId.fullName}</td>
                            <td>{order.productIds.quantity}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.shippingMethod}</td>
                            <td>{order.status}</td>
                            <td>
                                <button
                                    className="button button-primary"
                                    onClick={() => {
                                        handelUpdateOrderClickButton(order);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="button button-secondary"
                                    onClick={() => {
                                        handleDeleteOrder(order._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => {
                                setShowAddModal(false);
                            }}
                        >
                            &times;
                        </span>
                    </div>
                </div>
            )}

            {showUpdateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => {
                                setShowUpdateModal(false);
                            }}
                        >
                            &times;
                        </span>
                        <h2>Update Order</h2>
                        {error && <p className="error-message">{error.message}</p>}

                        <div className="form-input">
                            <input
                                type="text"
                                value={quantity}
                                placeholder="Total Quantity"
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-input">
                            <input
                                type="number"
                                value={totalPrice}
                                placeholder="Total Price"
                                onChange={(e) => {
                                    setTotalPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-input">
                            <textarea
                                value={payment}
                                placeholder="Payment"
                                onChange={(e) => {
                                    setPayment(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <div className="form-input">
                            <textarea
                                value={orderStatus}
                                placeholder="Order Status"
                                onChange={(e) => {
                                    setOrderStatus(e.target.value);
                                }}
                            ></textarea>
                        </div>
                        <button
                            className="button button-primary"
                            onClick={handleUpdateOrder}
                        >
                            Update Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;