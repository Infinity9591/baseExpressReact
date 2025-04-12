import { createSlice } from '@reduxjs/toolkit';

const sideBarStateSlice = createSlice({
	name: 'sideBarState',
	initialState: {
		state: "2", // Biến cần lưu
	},
	reducers: {
		setSideBarState: (state, action) => {
			state.state = action.payload;
		},
	},
});

export const { setSideBarState } = sideBarStateSlice.actions; // Export action để dùng

export default sideBarStateSlice.reducer;