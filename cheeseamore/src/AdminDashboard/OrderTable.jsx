import React, { useEffect, useState } from "react";
import "../CSS/AdminDashboard.css";
import axios from "axios";
import { useToasts } from 'react-toast-notifications';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [orderStatus, setOrderStatus] = useState("");
    const [error, setError] = useState(null);
    const [productDetails, setProductDetails] = useState({});
    const { addToast } = useToasts();
    const token = localStorage.getItem('token');
    const headers = { authorization: `Bearer ${token}` };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/order/getAll`, { headers });
            setOrders(response.data.data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/order/delete/${orderId}`, { headers });
            setOrders(orders.filter(order => order._id !== orderId));
            addToast("Order deleted successfully", { appearance: 'success', autoDismiss: true });
        } catch (error) {
            setError(error.message);
            addToast("Unable to delete order", { appearance: 'error', autoDismiss: true });
        }
    };

    const handleUpdateOrderClick = (order) => {
        setSelectedOrder(order);
        setOrderStatus(order.status);
        setShowUpdateModal(true);
    };

    const handleUpdateOrder = async () => {
        try {
            await axios.put(
                `${process.env.REACT_APP_URL}/order/update/${selectedOrder._id}`,
                { status: orderStatus },
                { headers }
            );
            fetchOrders();
            addToast("Order updated successfully", { appearance: 'success', autoDismiss: true });
            setShowUpdateModal(false);
        } catch (error) {
            setError(error.message);
            addToast("Unable to update order", { appearance: 'error', autoDismiss: true });
        }
    };


    return (
        <div className="card-main">
            <h1 className="dashboard-title"> Orders Table </h1>
            {error && <p className="error-message">{error}</p>}

            <table className="table">
                <thead>
                    <tr>
                        <th>Product Details</th>
                        <th>Shipping Method</th>
                        <th>Receive Date & Time</th>
                        <th>Order Status</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>
                                {order.productIds.map(product => (
                                    <div key={product._id}>
                                        <p><strong>Product ID:</strong> {product._id}</p>
                                        {product.instructions && <p><strong>Instructions:</strong> {product.instructions}</p>}
                                    </div>
                                ))}
                            </td>
                            <td>{order.shippingMethod}</td>
                            <td>{order.receiveDateTime}</td>
                            <td>{order.status}</td>
                            <td>${order.totalPrice}</td>
                            <td>
                                <button className="button button-primary" onClick={() => handleUpdateOrderClick(order)}>Update</button>
                                <button className="button button-secondary" onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showUpdateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
                        <h2>Update Order</h2>
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-input">
                            <input
                                type="text"
                                value={orderStatus}
                                placeholder="Order Status"
                                onChange={(e) => setOrderStatus(e.target.value)}
                            />
                        </div>
                        <button className="button button-primary" onClick={handleUpdateOrder}>Update Order</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;