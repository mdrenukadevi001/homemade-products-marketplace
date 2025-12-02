import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PlaceOrder = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const placeOrder = () => {
    axios.post("http://localhost:5000/api/orders", {
      productId: product._id,
      artisanId: product.artisanId,
      price: product.price
    })
    .then(() => alert("Order placed successfully!"))
    .catch(err => console.log(err));
  };

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card p-3 shadow-lg">
        <img src={product.image} className="card-img-top" />
        <h3 className="mt-3">{product.name}</h3>
        <p>{product.description}</p>
        <h4>Price: ₹{product.price}</h4>

        <button className="btn btn-success mt-3" onClick={placeOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
