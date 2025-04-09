import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/axios.customize.js";

export const fetchTodos  = createAsyncThunk("fetchTodos", async () => {
	const res = await axios.get(`site/getPersonalInformation`);
	return res.data;
});

const getDataPersonalSlice = createSlice({
	name : "todo",
	initialState: {
		// isLoading: false,
		data: [],
		// isError: false
	},
	extraReducers: (builder) => {
		// builder.addCase(fetchTodos.pending, (state, action) => {
		// 	state.isLoading = true;
		// })
		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			// state.isLoading = false;
			state.data = action.payload;
		})
		// builder.addCase(fetchTodos.rejected, (state, action) => {
		// 	state.isError = true;
		// })
	}
})

export default getDataPersonalSlice.reducer