import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Handmade Products</h2>

      <div className="row">
        {products.length === 0 ? (
          <h4 className="text-center">No products added yet</h4>
        ) : (
          products.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card shadow-lg">
                <img src={p.image} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5>{p.name}</h5>
                  <p>{p.description}</p>
                  <h6>₹{p.price}</h6>

                  <a href={`/order/${p._id}`} className="btn btn-primary">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
