import { createSlice } from "@reduxjs/toolkit";

import { getCountries, getCountryLocations, getEnums } from "./action";

const initialState = {
	countries: [],
	locations: [],
	enums: {},
	loading: true,
};

const baseSlice = createSlice({
	name: "bases",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// getCountries
			.addCase(getCountries.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCountries.rejected, (state) => {
				state.countries = [];
				state.loading = false;
			})
			.addCase(getCountries.fulfilled, (state, action) => {
				state.countries = action.payload;
				state.loading = false;
			})
			// getCountryLocations
			.addCase(getCountryLocations.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCountryLocations.rejected, (state) => {
				state.locations = [];
				state.loading = false;
			})
			.addCase(getCountryLocations.fulfilled, (state, action) => {
				state.locations = action.payload;
				state.loading = false;
			})
			// getEnums
			.addCase(getEnums.pending, (state) => {
				state.loading = true;
			})
			.addCase(getEnums.rejected, (state) => {
				state.enums = [];
				state.loading = false;
			})
			.addCase(getEnums.fulfilled, (state, action) => {
				state.enums = action.payload;
				state.loading = false;
			});
	},
});

export const { reducer: basesReducer } = baseSlice;
