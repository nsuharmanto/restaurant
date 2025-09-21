import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import filtersReducer from './filters/filtersSlice';
import userReducer from './user/userSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;