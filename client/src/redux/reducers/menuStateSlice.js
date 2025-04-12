import { createSlice } from '@reduxjs/toolkit';

const menuStateSlice = createSlice({
    name: 'menuState',
    initialState: {
        state: null, // Biến cần lưu
    },
    reducers: {
        setMyVariable: (state, action) => {
            state.state = action.payload;
        },
    },
});

export const { setMyVariable } = menuStateSlice.actions; // Export action để dùng
export default menuStateSlice.reducer;
