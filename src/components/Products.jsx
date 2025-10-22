import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

const Products = () => {
  const { id } = useParams(); // optional, for viewing a single product
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingSelected, setLoadingSelected] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => dispatch(addCart(product));

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);

        if (id) {
          const product = data.find((p) => p.id === parseInt(id));
          setSelectedProduct(product);

          if (product?.category) {
            const res2 = await fetch(
              `http://localhost:5000/api/products/category/${product.category}`
            );
            const similar = await res2.json();
            setSimilarProducts(similar.filter(p => p.id !== product.id));
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [id]);

  // Skeleton for loading products
  const ProductSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="card p-4 text-center">
            <Skeleton height={200} width={200} />
            <Skeleton height={30} width={`80%`} />
            <Skeleton height={20} width={`50%`} />
            <Skeleton height={30} width={100} />
          </div>
        ))}
    </div>
  );

  // Show all products
  const ShowAllProducts = () => (
    <div className="container py-5">
      <h2 className="text-center text-2xl font-bold">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card p-4 text-center">
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Link to={`/products/${product.id}`} className="btn btn-dark">
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  // Show single product
  const ShowSingleProduct = () => (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 py-3">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            style={{ width: "300px", height: "300px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6 py-5">
          <h4 className="text-uppercase text-muted">{selectedProduct.category}</h4>
          <h1 className="display-5">{selectedProduct.title}</h1>
          <p className="lead">
            {selectedProduct.rating?.rate} <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 my-4">${selectedProduct.price}</h3>
          <p className="lead">{selectedProduct.description}</p>
          <button className="btn btn-outline-dark" onClick={() => addProduct(selectedProduct)}>
            Add to Cart
          </button>
          <Link to="/products" className="btn btn-dark mx-3">
            Back to all products
          </Link>
        </div>
      </div>

      {/* Similar products */}
      {similarProducts.length > 0 && (
        <>
          <h2 className="mt-5">You may also like</h2>
          <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
            <div className="d-flex">
              {similarProducts.map((item) => (
                <div key={item.id} className="card mx-4 text-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    height={200}
                    width={200}
                    style={{ objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title.substring(0, 15)}...</h5>
                    <Link to={`/products/${item.id}`} className="btn btn-dark m-1">
                      View
                    </Link>
                    <button className="btn btn-dark m-1" onClick={() => addProduct(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </>
      )}
    </div>
  );

  if (loadingProducts) return <ProductSkeleton />;
  return selectedProduct ? <ShowSingleProduct /> : <ShowAllProducts />;
};

export default Products;
