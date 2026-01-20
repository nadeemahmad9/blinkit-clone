// import axios from 'axios';
// import { create } from 'zustand';

// export const useCartStore = create((set, get) => ({
//     cartItems: [],

//     // NEW: UI State for the Drawer
//     isCartOpen: false,
//     openCart: () => set({ isCartOpen: true }),
//     closeCart: () => set({ isCartOpen: false }),

//     addToCart: (product) => { /* ... keep existing code ... */
//         const items = get().cartItems;
//         const existingItem = items.find((item) => item._id === product._id);
//         if (existingItem) {
//             set({ cartItems: items.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item) });
//         } else {
//             set({ cartItems: [...items, { ...product, quantity: 1 }] });
//         }
//     },

//     removeFromCart: (product_id) => { /* ... keep existing code ... */
//         const items = get().cartItems;
//         const existingItem = items.find((item) => item._id === product_id);
//         if (!existingItem) return;
//         if (existingItem.quantity > 1) {
//             set({ cartItems: items.map((item) => item._id === product_id ? { ...item, quantity: item.quantity - 1 } : item) });
//         } else {
//             set({ cartItems: items.filter((item) => item._id !== product_id) });
//             // Optional: Close cart if empty
//             if (items.length === 1) set({ isCartOpen: false });
//         }
//     },

//     getCartTotal: () => { /* ... keep existing code ... */
//         return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//     },


//     // NEW: Place Order Function
//     placeOrder: async (userId) => {
//         const { cartItems, getCartTotal } = get();
//         const totalPrice = getCartTotal();

//         try {
//             // Map cart items to match Backend Schema
//             const orderItems = cartItems.map(item => ({
//                 product: item._id,
//                 name: item.name,
//                 image: item.image,
//                 price: item.price,
//                 qty: item.quantity
//             }));

//             const { data } = await axios.post('/api/orders', {
//                 userId,
//                 orderItems,
//                 totalPrice
//             });

//             // Success! Clear cart and close drawer
//             set({ cartItems: [], isCartOpen: false });
//             alert("Order Placed Successfully! Order ID: " + data._id);
//             return true;

//         } catch (error) {
//             console.error(error);
//             alert("Order Failed");
//             return false;
//         }
//     },
// }));




// import axios from 'axios';
// import { create } from 'zustand';

// export const useCartStore = create((set, get) => ({
//     cartItems: [],

//     // NEW: UI State for the Drawer
//     isCartOpen: false,
//     openCart: () => set({ isCartOpen: true }),
//     closeCart: () => set({ isCartOpen: false }),

//     addToCart: (product) => { /* ... keep existing code ... */
//         const items = get().cartItems;
//         const existingItem = items.find((item) => item._id === product._id);
//         if (existingItem) {
//             set({ cartItems: items.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item) });
//         } else {
//             set({ cartItems: [...items, { ...product, quantity: 1 }] });
//         }
//     },

//     removeFromCart: (product_id) => { /* ... keep existing code ... */
//         const items = get().cartItems;
//         const existingItem = items.find((item) => item._id === product_id);
//         if (!existingItem) return;
//         if (existingItem.quantity > 1) {
//             set({ cartItems: items.map((item) => item._id === product_id ? { ...item, quantity: item.quantity - 1 } : item) });
//         } else {
//             set({ cartItems: items.filter((item) => item._id !== product_id) });
//             // Optional: Close cart if empty
//             if (items.length === 1) set({ isCartOpen: false });
//         }
//     },

//     getCartTotal: () => { /* ... keep existing code ... */
//         return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//     },


//     // NEW: Place Order Function
//     placeOrder: async (userId) => {
//         const { cartItems, getCartTotal } = get();
//         const totalPrice = getCartTotal();

//         try {
//             // Map cart items to match Backend Schema
//             const orderItems = cartItems.map(item => ({
//                 product: item._id,
//                 name: item.name,
//                 image: item.image,
//                 price: item.price,
//                 qty: item.quantity
//             }));

//             const { data } = await axios.post('/api/orders', {
//                 userId,
//                 orderItems,
//                 totalPrice
//             });

//             // Success! Clear cart and close drawer
//             set({ cartItems: [], isCartOpen: false });
//             alert("Order Placed Successfully! Order ID: " + data._id);
//             return true;

//         } catch (error) {
//             console.error(error);
//             alert("Order Failed");
//             return false;
//         }
//     },
// }));


import { create } from 'zustand';
// ❌ DELETE: import axios from 'axios';
// ✅ ADD: Import your API helper
import api from '../services/api';

export const useCartStore = create((set, get) => ({
    cartItems: [],
    isCartOpen: false,

    openCart: () => set({ isCartOpen: true }),
    closeCart: () => set({ isCartOpen: false }),

    // ✅ Added clearCart helper (used by CartDrawer)
    clearCart: () => set({ cartItems: [] }),

    addToCart: (product) => {
        const items = get().cartItems;
        const existingItem = items.find((item) => item._id === product._id);
        if (existingItem) {
            set({ cartItems: items.map((item) => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item) });
        } else {
            set({ cartItems: [...items, { ...product, quantity: 1 }] });
        }
    },

    removeFromCart: (product_id) => {
        const items = get().cartItems;
        const existingItem = items.find((item) => item._id === product_id);
        if (!existingItem) return;
        if (existingItem.quantity > 1) {
            set({ cartItems: items.map((item) => item._id === product_id ? { ...item, quantity: item.quantity - 1 } : item) });
        } else {
            const newItems = items.filter((item) => item._id !== product_id);
            set({ cartItems: newItems });
            if (newItems.length === 0) set({ isCartOpen: false });
        }
    },

    getCartTotal: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    // ✅ FIXED PLACE ORDER FUNCTION
    placeOrder: async (userId) => {
        const { cartItems, getCartTotal } = get();
        const totalPrice = getCartTotal();

        try {
            // Map items for backend
            const orderItems = cartItems.map(item => ({
                product: item._id, // Ensure this matches your Product Schema ID
                name: item.name,
                image: item.image,
                price: item.price,
                qty: item.quantity
            }));

            // ✅ FIX: Use 'api.post' (Uses Render URL automatically)
            // Note: We remove '/api' because api.js base URL includes it
            const { data } = await api.post('/orders', {
                userId,
                orderItems,
                totalPrice
            });

            // Success: Return consistent object
            return { success: true, order: data };

        } catch (error) {
            console.error("Place Order Error:", error);
            // Return failure object
            return {
                success: false,
                message: error.response?.data?.message || "Order Failed"
            };
        }
    },
}));
