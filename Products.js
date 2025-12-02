import React, {useEffect, useState} from 'react';
import API from '../utils/api';

export default function Products(){
  const [products,setProducts] = useState([]);
  useEffect(()=>{ API.get('/products').then(r=>setProducts(r.data)).catch(()=>{}); },[]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.product === product._id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ product: product._id, qty: 1, price: product.price, name: product.name });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  };

  return (
    <div className="products-page">
      <h2 className="page-title">Products</h2>
      <div className="products-grid">
        {products.map(p=>(
          <div key={p._id} className="product-card">
            {p.images && p.images[0] && <img src={'http://localhost:5000'+p.images[0]} alt={p.name} className="product-image" />}
            <div className="product-info">
              <h3 className="product-name">{p.name}</h3>
              <p className="product-description">{p.description}</p>
              <p className="product-price">${p.price}</p>
              <button onClick={() => addToCart(p)} className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
