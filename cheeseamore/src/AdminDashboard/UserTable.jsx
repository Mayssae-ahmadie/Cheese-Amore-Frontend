import axios from "axios";
// import "../CSS/Dashboard.css";
import { useEffect, useState } from "react";
import { useToasts } from 'react-toast-notifications'

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [fullName, setFullName] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState(null);
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const headers = { authorization: `Bearer ${token}` };
    const { addToast } = useToasts()

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
            .get("https://cheese-amore.onrender.com/user/getAll")
            .then((response) => {
                console.log(response);
                setUsers(response.data.data);
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleSwitchToAdmin = async (Id) => {
        console.log(headers);
        try {
            await axios.put(
                `https://cheese-amore.onrender.com/user/switchToAdmin/${Id}`,
                {
                    headers,
                }
            );
            fetchUsers();
            addToast("Switched to admin successfully", {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (error) {
            setError(error);
            addToast("Unable to switch to admin", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    };

    const handleDelete = async (ID) => {
        try {
            await axios.delete(
                `https://cheese-amore.onrender.com/user/delete/${ID}`,
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
        <div className="">
            <h1 className=""> User Table </h1>
            {error && <p className="error-message">{error.message}</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fullName.firstName} {user.fullName.lastName}</td>
                            <td>{user.email}</td>
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            &times;
                        </span>
                        <h2>Update User</h2>
                        <div className="form-input">
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="form-input">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;
