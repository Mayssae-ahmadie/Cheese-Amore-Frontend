import axios from "axios";
import "../CSS/AdminDashboard.css";
import { useEffect, useState } from "react";
import { useToasts } from 'react-toast-notifications'

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const headers = { authorization: `Bearer ${token}` };
    const { addToast } = useToasts();

    const [userInfo, setUserInfo] = useState({
        phoneNumber: '',
        fullAddress: { floor: '', building: '', street: '', description: '' },
        city: ''
    });

    useEffect(() => {
        const getUserInfoByID = async (userId) => {
            console.log('User ID to be checked:', userId);
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/user/getById/${userId}`);
                setUserInfo(response.data.data);
            } catch (error) {
                console.error('Error retrieving User data: ', error);
            }
        };

        getUserInfoByID(userId);
    }, [userId]);

    const fetchUsers = () => {
        axios
            .get(`${process.env.REACT_APP_URL}/user/getAll`)
            .then((response) => {
                console.log(response);
                setUsers(response.data.data);
            })
            .catch((error) => {
                setError(error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSwitchToAdmin = async (switchId) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/user/switchToAdmin/${switchId}`
            );

            if (response.data.success) {
                fetchUsers();
                addToast("Switched to admin successfully", {
                    appearance: 'success',
                    autoDismiss: true,
                });
            } else {
                addToast("Switching to admin failed", {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        } catch (error) {
            console.error(error);
            setError(error);
            addToast("Unable to switch to admin", {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    };

    const handleDelete = async (ID) => {
        try {
            await axios.delete(
                `${process.env.REACT_APP_URL}/user/delete/${ID}`,
                {
                    headers,
                }
            );
            fetchUsers();
            addToast("User deleted successfully", {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (error) {
            setError(error);
            addToast("Unable to delete user", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    };

    return (
        <div className="card-main">
            <h1 className="dashboard-title"> Users Table </h1>
            {error && <p className="error-message">{error.message}</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>User Info</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fullName.firstName} {user.fullName.lastName}</td>
                            <td>{user.email}</td>
                            <td>Phone Number: {user.phoneNumber} <br />
                                City : {user.city},
                                Street : {user.fullAddress.street},
                                Building: {user.fullAddress.building},
                                Floor: {user.fullAddress.floor},
                                Description: {user.fullAddress.description}
                            </td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="button secondary-button"
                                    onClick={() => {
                                        handleSwitchToAdmin(user._id);
                                    }}

                                >
                                    Switch to Admin
                                </button>
                                <button
                                    className="button delete-button"
                                    onClick={() => {
                                        handleDelete(user._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;