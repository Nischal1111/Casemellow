// Redux slice
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            newItem.quantity = 1; // Initialize quantity to 1 when adding to cart
            state.cart.push(newItem);

            
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.cart = [];
        },
        increaseQuantity: (state, action) => {
            const itemId = action.payload;
            const itemToUpdate = state.cart.find(item => item.id === itemId);
            if (itemToUpdate) {
                itemToUpdate.quantity = (itemToUpdate.quantity || 0) + 1; // Ensure quantity is always a number
            }
        },
        decreaseQuantity: (state, action) => {
            const itemId = action.payload;
            const itemToUpdate = state.cart.find(item => item.id === itemId);
            if (itemToUpdate && itemToUpdate.quantity > 1) {
                itemToUpdate.quantity -= 1; // Ensure quantity doesn't go below 1
            }
        }
    }
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export const selectCart = state => state.cart.cart;