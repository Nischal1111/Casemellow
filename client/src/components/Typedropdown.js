// Typedropdown.js

import React, { useState, useContext } from 'react';
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import "../css/search.css"
import { Menu } from "@headlessui/react";
import { ProductContext } from './ProductContext';

const Typedropdown = () => {
  const { covertype, setCovertype, products, handleClick, selectedCoverType } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Menu as="div" className="dropdown">
        <Menu.Button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
          <div>
            <div className='days'>
              {selectedCoverType}
            </div>
            <div className='daysp'>Select your duration</div>
          </div>
          {
            isOpen ? <RiArrowDownSLine className='mappinline2' /> : <RiArrowUpSLine className='mappinline2' />
          }
        </Menu.Button>
        <Menu.Items className="dropdown-menu">
          {covertype.map((cover, index) => (
            <Menu.Item as="li" key={index} className="dropdown--li" onClick={() => handleClick(cover)}>
              {cover}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </>
  );
};

export default Typedropdown;
