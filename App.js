import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Products from './pages/Products';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtisanDashboard from './pages/ArtisanDashboard';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import UserDashboard from './pages/UserDashboard';
import api from './utils/api';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('hm_token');
    const userData = localStorage.getItem('hm_user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 onClick={()=>navigate('/')}>Handmade Marketplace</h1>
        <nav className="nav">
          <button onClick={()=>navigate('/')}>Products</button>
          <button onClick={()=>navigate('/cart')}>Cart</button>
          {!user && <button onClick={()=>navigate('/login')}>Login</button>}
          {!user && <button onClick={()=>navigate('/register')}>Register</button>}
          {user && user.isArtisan && <button onClick={()=>navigate('/artisan-dashboard')}>Artisan</button>}
          {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<Login onLogin={(u) => { setUser(u); navigate('/'); }} />} />
          <Route path="/register" element={<Register onRegister={(u) => { setUser(u); navigate('/'); }} />} />
          <Route path="/artisan-dashboard" element={<ArtisanDashboard user={user} />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/order/:id" element={<PlaceOrder />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
