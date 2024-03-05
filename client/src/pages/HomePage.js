import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as m } from "framer-motion";
import axios from "axios";
import "../App.css";
import "../css/home.css";
import Search from "../components/Search";

export default function HomePage() {
  const url = "http://localhost:4000";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/get-products`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProducts(response.data);
      if (response.status === 200) {
        console.log("Ok");
      } else {
        console.log("Error to get data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="">
        {/* Image with Info */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg"
            alt="Big Image"
            className="w-full object-cover"
            style={{ height: "90vh" }}
          />
        </div>

        {/* Shopping Cards Section */}
        {loading && <span className="loader"></span>}
        <div className="flex justify-center">
          {!loading && (
            <section className="p-8 w-4/5">
              <div className="mt-2 mb-4">
                <h2 className="text-3xl font-bold mb-4">Our Products</h2>
              </div>
              <Search/>
              {products && (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl"
                    >
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={`${url}/${product.coverPhoto}`}
                          alt={product.name}
                          className="w-full h-48 object-contain rounded-t-md"
                        />
                      </Link>
                      <div className="p-4">
                        <h3 className="font-bold text-xl mb-2">
                          {product.coverName}
                        </h3>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-red-600 font-bold">
                            Rs {product.coverPrice}
                          </span>
                          <Link to={`/product/${product._id}`}>
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {!products && (
                <div>
                  <h1 className="text-2xl mb-4">No Product Found</h1>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </m.div>
  );
}
