import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/product-slice";
import shopProductSlice from "./shop/products-slice"
import shopCartSlice from "./shop/cart-slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice
  },
});

export default store;
