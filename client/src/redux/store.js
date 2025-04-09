import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './reducers/menuSlice.js'; // Import reducer
import getDataPersonal from './reducers/getDataPersonal.js'; // Import reducer

const store = configureStore({
    reducer: {
        myState: menuReducer, // Thêm reducer vào store
        todo : getDataPersonal
    },
});

export default store;
