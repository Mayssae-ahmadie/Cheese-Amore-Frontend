import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import ShopPage from './Pages/ShopPage';
import SignUp from './Pages/SignUp';
import LogIn from "./Pages/LogIn";
import SingleProductPage from "./Pages/SingleProductPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Shop" element={<ShopPage />} />
          <Route path="/SingleProductPage/:productId" element={<SingleProductPage />} />
        </Routes >
      </Router>
    </div>
  );
}

export default App;