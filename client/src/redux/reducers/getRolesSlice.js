import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/axios.customize.js";

export const getRoles = createAsyncThunk("getRoles", async () => {
	const res = await axios.get("/role");
	return res.data;
})

const getRolesSlice = createSlice({
	name : "roles",
	initialState : {
		isLoading : false,
		data : {},
		isError : false
	},
	extraReducers : (builder) => {
		builder.addCase(getRoles.pending, (state, action) => {
			state.isLoading = true;
		})
		builder.addCase(getRoles.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		})
		builder.addCase(getRoles.rejected, (state, action) => {
			state.isError = true;
		})
	}
})

export default getRolesSlice.reducer;