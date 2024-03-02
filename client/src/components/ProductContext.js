// ProductContextProvider.js

import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const url = "http://localhost:4000";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [covertype, setCovertype] = useState([]);
  const [selectedCoverType, setSelectedCoverType] = useState('All devices');

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

  useEffect(() => {
    const alltype = products.map((item) => {
      return item.coverType;
    });

    const uniqueType = ['All devices', ...new Set(alltype)];
    setCovertype(uniqueType);
  }, [products]);

  const handleClick = (selectedType) => {
    setLoading(true);
    setSelectedCoverType(selectedType);
    if (selectedType === 'All devices') {
      setCovertype(['All devices', ...new Set(products.map(item => item.coverType))]);
    } else {
      const newType = products.filter((item) => item.coverType === selectedType);
      setCovertype(newType);
    }
    setLoading(false);
  };

  return (
    <ProductContext.Provider value={{ covertype, setCovertype, products, handleClick, selectedCoverType }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
