import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
    name: 'myState',
    initialState: {
        state: '', // Biến cần lưu
    },
    reducers: {
        setMyVariable: (state, action) => {
            state.state = action.payload;
        },
    },
});

export const { setMyVariable } = menuSlice.actions; // Export action để dùng
export default menuSlice.reducer;
