import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//const host = "http://localhost:5000";
const host = "https://clone-app-238n.onrender.com";
// Get all states
export const GetAllState = createAsyncThunk("city/GetAllState", async () => {
    const response = await fetch(`${host}/api/City/GetAllState`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok)
        throw new Error("Failed to fetch states");
    const data = await response.json();
    return Array.isArray(data.result) ? data.result : [];
});

// Get all cities
export const GetAllCity = createAsyncThunk("city/GetAllCity", async () => {
    const response = await fetch(`${host}/api/City/GetAllCity`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok)
        throw new Error("Failed to fetch cities");
    const data = await response.json();
    return Array.isArray(data.result) ? data.result : [];
});

// Add city
export const AddCity = createAsyncThunk("city/AddCity", async ({ City_Name, State_Id }) => {
    const response = await fetch(`${host}/api/City/AddCity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ City_Name, State_Id })
    });
    if (!response.ok)
        throw new Error("Failed to add city");
    const data = await response.json();
    return data;
});

// Update city
export const UpdateCity = createAsyncThunk("city/UpdateCity", async ({ City_Name, State_Id, City_Id }) => {
    const response = await fetch(`${host}/api/City/UpdateCity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ City_Name, State_Id, City_Id })
    });
    if (!response.ok)
        throw new Error("Failed to update city");
    const data = await response.json();
    return data;
});

const initialState = {
    city: [],
    states: [],
    loading: false,
    error: null
};

const CitySlice = createSlice({
    name: "city",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllState.fulfilled, (state, action) => {
                state.loading = false;
                state.states = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(GetAllState.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetAllCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllCity.fulfilled, (state, action) => {
                state.loading = false;
                state.city = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(GetAllCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AddCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddCity.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(AddCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(UpdateCity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateCity.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(UpdateCity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default CitySlice.reducer;