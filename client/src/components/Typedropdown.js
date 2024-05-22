import React, { useState, useEffect } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";
import axios from 'axios';
import "../css/search.css";

const Typedropdown = ({ onCoverTypeChange }) => {
  const url = "http://localhost:4000";
  const [loading, setLoading] = useState(false);
  const [selectedCoverType, setSelectedCoverType] = useState('All devices');
  const [covertype, setCovertype] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("Fetching products...");
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${url}/get-products`);
        console.log("Fetched products:", response.data);
        const allCoverTypes = response.data.map((product) => product.coverType);
        const uniqueCoverTypes = ['All devices', ...new Set(allCoverTypes)];
        console.log("Cover types:", uniqueCoverTypes);
        setCovertype(uniqueCoverTypes);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCoverTypeChange = async (cover) => {
    setSelectedCoverType(cover);
    setIsOpen(false);
    setLoading(true);
    
    try {
      const response = await axios.get(`${url}/get-products`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          coverType: cover === 'All devices' ? '' : cover
        }
      });
      onCoverTypeChange(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Menu as="div" className="dropdown">
        <Menu.Button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
          <div>
            <div className='days'>
              {selectedCoverType}
            </div>
            <div className='daysp'>Select your type</div>
          </div>
          {
            isOpen ? <RiArrowDownSLine className='mappinline2' /> : <RiArrowUpSLine className='mappinline2' />
          }
        </Menu.Button>
        <Menu.Items className="dropdown-menu">
          {covertype.map((cover, index) => (
            <Menu.Item as="li" key={index} className="dropdown--li" onClick={() => handleCoverTypeChange(cover)}>
              {cover}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
      {loading ? <p>.</p> : <div></div>}
    </>
  );
};

export default Typedropdown;
