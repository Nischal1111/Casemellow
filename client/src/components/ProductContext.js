// ProductContextProvider.js
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const url = "http://localhost:4000";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCoverType, setSelectedCoverType] = useState('All devices');
  const [covertype, setCovertype] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/get-products`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allCoverTypes = products.map((product) => product.coverType);
    const uniqueCoverTypes = ['All devices', ...new Set(allCoverTypes)];
    setCovertype(uniqueCoverTypes);
  }, [products]);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${url}/get-products`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          coverType: selectedCoverType
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider value={{ covertype, products, handleClick, selectedCoverType, setSelectedCoverType, setLoading, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
