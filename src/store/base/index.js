import { createSlice } from "@reduxjs/toolkit";

import { getCountries, getCountryLocations } from "./action";

const initialState = {
	countries: [],
	locations: [],
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
			});
	},
});

export const { reducer: basesReducer } = baseSlice;
