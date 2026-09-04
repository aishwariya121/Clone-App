import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = "http://localhost:5000";

// Get all offices
export const GetAllOffices = createAsyncThunk("office/GetAllOffices", async () => {
    const response = await fetch(`${host}/api/Office/GetAllOffices`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok)
        throw new Error("Failed to fetch offices");
    const data = await response.json();
    return data.result || [];
});

// Add office
export const AddOffice = createAsyncThunk("office/AddOffice", async ({ Office_Name, City_Id }) => {
    const response = await fetch(`${host}/api/Office/AddOffice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Office_Name, City_Id })
    });
    if (!response.ok)
        throw new Error("Failed to add office");
    const data = await response.json();
    return data;
});

// Update office
export const UpdateOffice = createAsyncThunk("office/UpdateOffice", async ({ Office_Name, City_Id, Office_Id }) => {
    const response = await fetch(`${host}/api/Office/UpdateOffice`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Office_Name, City_Id, Office_Id })
    });
    if (!response.ok)
        throw new Error("Failed to update office");
    const data = await response.json();
    return data;
});

const initialState = {
    office: [],
    loading: false,
    error: null
};

const OfficeSlice = createSlice({
    name: "office",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllOffices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllOffices.fulfilled, (state, action) => {
                state.loading = false;
                state.office = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(GetAllOffices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AddOffice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddOffice.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(AddOffice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(UpdateOffice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateOffice.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(UpdateOffice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default OfficeSlice.reducer;