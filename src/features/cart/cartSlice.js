import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    // cart: [
    //     {
    //         pizzaId: 12,
    //         name: 'Mediterranean',
    //         quantity: 2,
    //         unitPrice: 16,
    //         totalPrice: 32,
    //     },
    // ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            //payload is the new cart object passed into the action creator on dispatch
            state.cart.push(action.payload);
        },
        deleteItem(state, action) {
            //payload will be pizza-id
            state.cart = state.cart.filter(
                (item) => item.pizzaId !== action.payload,
            );
        },
        increaseItemQuantity(state, action) {
            //payload will be pizza-id
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload,
            );
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload,
            );
            // if (item.quantity === 1) return;
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;
            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action);
        },
        clearCart(state) {
            state.cart.length = 0;
        },
    },
});

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//redux elector functions
export const getCart = (store) => store.cart.cart;

export const getTotalCartQuantity = (store) =>
    store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
    store.cart.cart
        .map((item) => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
