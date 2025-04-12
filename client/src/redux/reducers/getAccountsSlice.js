import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/axios.customize.js";

export const getAccounts = createAsyncThunk("getAccounts", async () => {
	const res = await axios.get("/account");
	return res.data;
})

const getAccountsSlice = createSlice({
	name : "accounts",
	initialState :{
		isLoading : false,
		data : {},
		isError : false
	},
	extraReducers: (builder) => {
		builder.addCase(getAccounts.pending, (state, action) => {
			state.isLoading = true;
		})
		builder.addCase(getAccounts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		})
		builder.addCase(getAccounts.rejected, (state, action) => {
			state.isError = true;
		})
	}
})

export default getAccountsSlice.reducer