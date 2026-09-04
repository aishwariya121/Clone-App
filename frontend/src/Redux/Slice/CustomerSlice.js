import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = "http://localhost:5000";

export const GetAllCust = createAsyncThunk("customer/GetAllCust", async () => {
    const response = await fetch(`${host}/api/Cust/GetAllCust`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok)
        throw new Error("Failed to fetch customers");
    const data = await response.json();
    return data.result || [];
});

export const GetCustByName = createAsyncThunk("customer/GetCustByName", async (Cust_Name) => {
    const response = await fetch(`${host}/api/Cust/GetCustByName`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Cust_Name })
    });
    if (!response.ok)
        throw new Error("Failed to search customer");
    const data = await response.json();
    return data.result || [];
});

export const AddCust = createAsyncThunk("customer/AddCust", async ({ Cust_Name, Phone_No, City_Id, GST_No }) => {
    const response = await fetch(`${host}/api/Cust/AddCust`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Cust_Name, Phone_No, City_Id, GST_No })
    });
    if (!response.ok)
        throw new Error("Failed to add customer");
    const data = await response.json();
    return data;
});

export const UpdateCust = createAsyncThunk("customer/UpdateCust", async ({ Cust_Name, Phone_No, City_Id, GST_No, Cust_Id }) => {
    const response = await fetch(`${host}/api/Cust/UpdateCust`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Cust_Name, Phone_No, City_Id, GST_No, Cust_Id })
    });
    if (!response.ok)
        throw new Error("Failed to update customer");
    const data = await response.json();
    return data;
});

export const DeleteCust = createAsyncThunk("customer/DeleteCust", async (Cust_Id) => {
    const response = await fetch(`${host}/api/Cust/DeleteCust/${Cust_Id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok)
        throw new Error("Failed to delete customer");
    const data = await response.json();
    return data;
});

const initialState = {
    cust: [],
    loading: false,
    error: null
};

const CustomerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllCust.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllCust.fulfilled, (state, action) => {
                state.loading = false;
                state.cust = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(GetAllCust.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetCustByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetCustByName.fulfilled, (state, action) => {
                state.loading = false;
                state.cust = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(GetCustByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AddCust.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddCust.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(AddCust.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(UpdateCust.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateCust.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(UpdateCust.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(DeleteCust.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteCust.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(DeleteCust.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default CustomerSlice.reducer;