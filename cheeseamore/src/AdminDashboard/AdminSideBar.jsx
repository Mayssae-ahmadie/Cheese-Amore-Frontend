import UserTable from "../AdminDashboard/UserTable";
import OrderTable from "../AdminDashboard/OrderTable";
import ProductTable from "../AdminDashboard/ProductTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavBar from "../Components/NavBar";

const AdminSideBar = () => {
    const [section, setSection] = useState('')
    // const userId = localStorage.getItem('userId');

    return (
        <>
            <div className="admin-dash">
                <NavBar />
                <div className="Links">
                    <ul>
                        <li>
                            <Link to="" onClick={() => setSection('Users')} className="">Users</Link>
                        </li>
                        <li>
                            <Link to="" onClick={() => setSection('Products')} className="">Products</Link>
                        </li>
                        <li>
                            <Link to="" onClick={() => setSection('Orders')} className="">Orders</Link>
                        </li>
                        <li>
                            <Link to="/LogIn" className="">Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {section === 'Users' && <UserTable />}
            {section === 'Products' && <ProductTable />}
            {section === 'Orders' && <OrderTable />}
        </>
    );
};

export default AdminSideBar;