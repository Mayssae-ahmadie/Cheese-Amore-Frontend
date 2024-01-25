import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import ShopPage from './Pages/ShopPage';
import SignUp from './Pages/SignUp';
import LogIn from "./Pages/LogIn";
import SingleProductPage from "./Pages/SingleProductPage";
import AdminDashboard from "./AdminDashboard/AdminSideBar";

function App() {
  return (
    
    <div className="App">
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Contact" element={<ContactPage />} />
            <Route path="/Shop" element={<ShopPage />} />
            <Route path="/SingleProductPage/:productId" element={<SingleProductPage />} />
            {/* <Route path="/Cart" element={<Cart />} /> */}
            <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
          </Routes >
        </Router>
      </ToastProvider>
    </div>
  );
}

export default App;