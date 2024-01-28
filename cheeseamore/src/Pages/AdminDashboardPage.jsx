import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../CSS/AdminDashboard.css";
import AdminSideBar from '../AdminDashboard/AdminSideBar';
import OrderTable from '../AdminDashboard/OrderTable';
import ProductTable from '../AdminDashboard/ProductTable';
import UserTable from '../AdminDashboard/UserTable';

function AdminDashboard() {
    return (
        <div className='dashboard-flex'>
            <div className='dashboard-sidebar'>
                <AdminSideBar />
            </div>
            <div className='dashboard-main'>
                <Routes>
                    <Route path="orders" element={<OrderTable />} />
                    <Route path="products" element={<ProductTable />} />
                    <Route path="users" element={<UserTable />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminDashboard;