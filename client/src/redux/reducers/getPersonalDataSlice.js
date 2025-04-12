import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/axios.customize.js";

export const getPersonalData  = createAsyncThunk("getPersonalDataSlice", async () => {
	const res = await axios.get(`site/getPersonalData`);
	return res.data;
});

const getDataPersonalSlice = createSlice({
	name : "personalData",
	initialState: {
		isLoading: false,
		data: [],
		isError: false
	},
	extraReducers: (builder) => {
		builder.addCase(getPersonalData.pending, (state, action) => {
			state.isLoading = true;
		})
		builder.addCase(getPersonalData.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		})
		builder.addCase(getPersonalData.rejected, (state, action) => {
			state.isError = true;
		})
	}
})

export default getDataPersonalSlice.reducer