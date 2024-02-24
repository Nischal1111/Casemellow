import React, { useState } from 'react';
import { FaHome, FaMobile, FaLaptop, FaLayerGroup, FaCog } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {

    const [closeMenu,setCloseMenu]=useState(true);
    const userInfoSide = JSON.parse(localStorage.getItem("userInfo"));
    const url = "http://localhost:4000"
    const handletoggle=()=>{
        setCloseMenu(!closeMenu)
    }
  return (
    <div className={closeMenu===false?"prasidebar":"prasidebar active"}>
      <div className={closeMenu===false?"logo-container":"logo-container active"}>
        <img src="logo.png" alt="" className="logo h-10 w-10" />
        <h2 className="title-name">CoverCraft</h2>
      </div>
      <div className={closeMenu===false ? "burger":"burger active"}>
        <div className="burgertrigger" onClick={()=>{handletoggle()}}></div>
        <div className="burgermenu"></div>
      </div>
      <div className={closeMenu===false?"profile":"profile active"}>
        <img src={`${url}/${userInfoSide?.photo}`} alt="" className="profile" />
        <div className="profilecontents">
          <p className="name">{userInfoSide?.firstName}</p>
          <p className="email">{userInfoSide?.email}</p>
        </div>
      </div>
      <div className={closeMenu === false?"pagescontainer":"pagescontainer active"}>
        <ul>
          <li>
            <div className='flex'>
            <Link to="/">
              <FaHome className='icons'/> 
            <span>Home</span>
            </Link>
            </div>
          </li>
          <li>
            <div className='flex'>
            <Link to="/phones">
              <FaMobile className='icons' /> 
            <span>Phones</span>
            </Link>
            </div>
          </li>
          <li>
            <div className='flex'>
            <Link to="/laptops">
              <FaLaptop className='icons'/> 
            <span>Laptops</span>
            </Link>
            </div>
          </li>
          <li>
            <div className='flex'>
            <Link to="/wraps">
              <FaLayerGroup className='icons'/> 
            <span>Wraps</span>
            </Link>
            </div>
          </li>
          <li>
            <div className='flex'>
            <Link to="/settings">
              <FaCog className='icons'/> 
            <span>Settings</span>
            </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
