import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './reducers/menuSlice.js'; // Import reducer

const store = configureStore({
    reducer: {
        myState: menuReducer, // Thêm reducer vào store
    },
});

export default store;
