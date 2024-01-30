import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "../CSS/AdminDashboard.css";
import OrderTable from '../AdminDashboard/OrderTable';
import ProductTable from '../AdminDashboard/ProductTable';
import UserTable from '../AdminDashboard/UserTable';
import NavBarDash from '../Components/NavBarDash';

function AdminDashboard() {
    return (
        <div className='dashboard-flex'>
            <NavBarDash />
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