import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/axios.customize.js";

export const getPermissionsForRoles = createAsyncThunk("getPermissionsForRoles", async () => {
	const res = await axios.get("/permissionsForRole");
	return res.data;
})

const getPermissionsForRolesSlice = createSlice({
	name : "permissionsForRoles",
	initialState : {
		isLoading : false,
		data : {},
		isError : false
	},
	extraReducers : (builder) => {
		builder.addCase(getPermissionsForRoles.pending, (state, action) => {
			state.isLoading = true;
		})
		builder.addCase(getPermissionsForRoles.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		})
		builder.addCase(getPermissionsForRoles.rejected, (state, action) => {
			state.isError = true;
		})
	}
})

export default getPermissionsForRolesSlice.reducer;