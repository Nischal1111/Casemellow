// Cart.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from '../redux/CartSlice';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../components/Cart.css'; // Import the CSS file

const Cart = () => {
    const cartItems = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const [rem,setRem]=useState(false);

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
        setRem(true)
        setTimeout(()=>{
            setRem(false)
        },2000)
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleIncreaseQuantity = (itemId) => {
        dispatch(increaseQuantity(itemId));
    };

    const handleDecreaseQuantity = (itemId) => {
        dispatch(decreaseQuantity(itemId));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) =>total + (parseInt(item.price) * item.quantity), 0); // Ensure using 'price' property
    };

    return (
        <>
            <Navbar/>
            <Sidebar/>
            <div className={rem?"item-removed active":"item-removed"}>Item Removed</div>
            <div className="cart-container">
            <h1>Cart</h1>
                {cartItems.length === 0 ? (
                    <p>No items in the cart at the moment</p>
                ) : (
                    <>
                        <ul className="cart-items-list">
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item">
                                    <div className='flex items-center justify-center'>
                                      <img src={item.img} alt="" className='cart-imggg' />
                                      <div>
                                        <p>Name: {item.Cname}</p>
                                        <p>Description: {item.desc}</p>
                                        <p>Price: {item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                        <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                        <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                      </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="total-price">Total Price: {getTotalPrice()}</p>
                        <button onClick={handleClearCart}>Clear Cart</button>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
