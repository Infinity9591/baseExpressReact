import { createSlice } from '@reduxjs/toolkit';

const headerBarStateSlice = createSlice({
	name: 'headerBarState',
	initialState: {
		state: null, // Biến cần lưu
	},
	reducers: {
		setHeaderBarState: (state, action) => {
			state.state = action.payload;
		},
	},
});

export const { setHeaderBarState } = headerBarStateSlice.actions; // Export action để dùng

export default headerBarStateSlice.reducer;