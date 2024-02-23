import React, { useState } from 'react'
import {Link} from "react-router-dom"
import "./Cart.css"
import "./Nav.css"
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
        const cartItems=useSelector(state=>state.cart.cart)
        const userInfoLS = JSON.parse(localStorage.getItem("userInfo"));
    const isAdmin = userInfoLS ? userInfoLS.isAdmin : false;

    const url = "http://localhost:4000"
  return (
    <>
    <div className="nav fixed w-full  top-0 bg-white z-50 " >
                <div className=" flex flex-col items-center">
                    {/* Header */}
                        <header className="flex justify-between items-center p-4  w-4/5">
                            <div className="flex items-center ">
                            {/* Logo */}
                            <h1 className="heading"> Welcome to CoverCraft</h1>
                            </div>
                            <div className='flex justify-between items-center'>
                            {userInfoLS ? (
                                <div className="flex items-center">
                                {isAdmin && (
                                    <Link
                                    to="/admin/dashboard"
                                    className="font-bold text-black bg-white hover:bg-red-200 px-4 py-2 rounded-full transition all duration-300 mb-4 mr-4"
                                    >
                                    Admin Panel
                                    </Link>

                                )}
                                    <div className="border-2 border-black p-1 px-3 rounded-full flex items-center mb-4">
                                    <div className="mr-2 ">
                                        <img
                                            src={`${url}/${userInfoLS.photo}`}
                                            alt="Profile Image"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-semibold">
                                            {userInfoLS.firstName} {userInfoLS.lastName}
                                        </h1>
                                    </div>
                                </div>
                                </div>
                                ):(
                                    <div className="flex items-center bg-black rounded-full">
                                        <Link
                                            to="/login"
                                            className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-l-full transition duration-300"
                                        >
                                            Login
                                        </Link>
                                        <span className="text-gray-500 mx-2">|</span>
                                        <Link
                                            to="/register"
                                            className="text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-r-full transition duration-300"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                                <Link to="/cart" className='link-cart'>
                             <div className='cart-items'>
                                <div className='cart-number'> {cartItems.length} </div>
                                <FaShoppingCart className='cart'/>
                            </div>
                                </Link>
                            </div>     
                        </header>
                </div>
               
                
            </div>
    </>
  )
}

export default Navbar
