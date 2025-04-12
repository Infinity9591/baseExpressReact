import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/axios.customize.js";

export const getPermissionsSlice = createAsyncThunk("getPermissionsSlice", async () => {
	const res = await axios.get("/permission");
	return res.data;
})

const getPermissionsSlice = createSlice({
	name : "permissions",
	initialState : {
		isLoading : false,
		data : {},
		isError : false
	},
	extraReducers : (builder) => {
		builder.addCase(getPermissionsSlice.pending, (state, action) => {
			state.isLoading = true;
		})
		builder.addCase(getPermissionsSlice.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		})
		builder.addCase(getPermissionsSlice.rejected, (state, action) => {
			state.isError = true;
		})
	}
})

export default getPermissionsSlice.reducer;