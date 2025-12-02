import React, {useState, useEffect} from 'react';
import API from '../utils/api';
export default function Cart({user}){
  const [items,setItems] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const submitOrder = async ()=>{
    if (!user) {
      alert('Please login to place an order');
      return;
    }
    try{
      const res = await API.post('/orders', {items});
      alert('Order placed');
      setItems([]);
    }catch(e){ alert(e.response?.data?.message || 'Error'); }
  };

  return (<div className="cart-page">
    <h2 className="page-title">Cart</h2>
    {items.length === 0 ? (
      <p className="cart-description">Your cart is empty.</p>
    ) : (
      <>
        <div className="cart-items">
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.qty}</p>
              <p>Total: ${item.price * item.qty}</p>
              <button onClick={() => removeItem(index)} className="remove-button">Remove</button>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <h3>Total: ${total}</h3>
        </div>
        <button onClick={submitOrder} className="cart-button">Place Order</button>
      </>
    )}
  </div>);
}
