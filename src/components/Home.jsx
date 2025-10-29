import React from "react";
import heroforhome from "../assets/heroforhome.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
// Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
        const data = await res.json();
        setProducts(data.slice(0, 3)); // pick only 3 products
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
  className="card-img img-fluid"
  src={heroforhome}
  alt="Card"
  height={500} width={1500}
/><div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">New Summer Arrivals</h5>
              <p className="card-text fs-5">Check out our latest products now !</p>
              <Link to="/products" className="btn btn-dark mt-3">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
{/* Featured Products */}
      <div className="container py-5">
        <h2 className="text-center text-2xl font-bold mb-4">Featured Products</h2>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="card p-4 text-center border">
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: "150px", height: "150px", objectFit: "contain" }}
                />
                <h3 className="mt-2">{product.title}</h3>
                <p>${product.price}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
                <Link to={`/products/${product.id}`} className="btn btn-dark mt-2">
                  View Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

