import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//const host = "http://localhost:5000";
const host = "https://clone-app-238n.onrender.com";
export const GetAllBuilty = createAsyncThunk("builty/GetAllBuilty", async () => {
    const response = await fetch(`${host}/api/Builty/GetAllBuilty`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok)
        throw new Error("Failed to fetch builty");
    return await response.json();
});

export const GetBuiltyById = createAsyncThunk("builty/GetBuiltyById", async (Builty_Id) => {
    const response = await fetch(`${host}/api/Builty/GetBuiltyById`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Builty_Id })
    });
    if (!response.ok)
        throw new Error("Failed to fetch builty");
    return await response.json();
});

export const GetBuiltyByDate = createAsyncThunk(
    "builty/GetBuiltyByDate",
    async ({ fromDate, toDate }) => {
        const response = await fetch(`${host}/api/Builty/GetBuiltyByDate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                From_Date: fromDate,
                To_Date: toDate
            })
        });
        if (!response.ok)
            throw new Error("Failed to fetch builty");
        return await response.json();
    }
);

export const GetBuiltyByConsignor = createAsyncThunk("builty/GetBuiltyByConsignor", async (Consignor_Name) => {
    const response = await fetch(`${host}/api/Builty/GetBuiltyByConsignor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Consignor_Name })
    });
    if (!response.ok)
        throw new Error("Failed to fetch builty");
    return await response.json();
});

export const GetBuiltyByConsignee = createAsyncThunk("builty/GetBuiltyByConsignee", async (Consignee_Name) => {
    const response = await fetch(`${host}/api/Builty/GetBuiltyByConsignee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Consignee_Name })
    });
    if (!response.ok)
        throw new Error("Failed to fetch builty");
    return await response.json();
});

export const GetBuiltyByPay_Status = createAsyncThunk("builty/GetBuiltyByPay_Status", async (Pay_Status) => {
    const response = await fetch(`${host}/api/Builty/GetBuiltyByPay_Status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Pay_Status })
    });
    if (!response.ok)
        throw new Error("Failed to fetch builty");
    return await response.json();
});

export const GetBuiltyBy_From_Office = createAsyncThunk("builty/GetBuiltyBy_From_Office", async (From_Office_Name) => {
    const response = await fetch(`${host}/api/Builty/GetBuiltyBy_From_Office`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ From_Office_Name })
    });
    if (!response.ok)
        throw new Error("Failed to fetch builty");
    return await response.json();
});

export const GetBuiltyBy_To_Office = createAsyncThunk("builty/GetBuiltyBy_To_Office", async (To_Office_Name) => {
    const response = await fetch(`${host}/api/Builty/GetBuiltyBy_To_Office`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ To_Office_Name })
    });
    if (!response.ok)
        throw new Error("Failed to fetch builty");
    return await response.json();
});

export const AddBuilty = createAsyncThunk("builty/AddBuilty", async (data) => {
    const response = await fetch(`${host}/api/Builty/AddBuilty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        throw new Error("Failed to add builty");
    return await response.json();
});

export const UpdateBuilty = createAsyncThunk("builty/UpdateBuilty", async (data) => {
    const response = await fetch(`${host}/api/Builty/UpdateBuilty`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        throw new Error("Failed to update builty");
    return await response.json();
});

export const DeleteBuilty = createAsyncThunk("builty/DeleteBuilty", async (Builty_Id) => {
    const response = await fetch(`${host}/api/Builty/DeleteBuilty/${Builty_Id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    if (!response.ok)
        throw new Error("Failed to delete builty");
    return await response.json();
});

const BuiltySlice = createSlice({
    name: "builty",
    initialState: {
        builty: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllBuilty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllBuilty.fulfilled, (state, action) => {
                state.loading = false;
                state.builty = Array.isArray(action.payload.result) ? action.payload.result : [];
            })
            .addCase(GetAllBuilty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetBuiltyById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBuiltyById.fulfilled, (state, action) => {
                state.loading = false;
                state.builty = Array.isArray(action.payload.result) ? action.payload.result : [];
            })
            .addCase(GetBuiltyById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetBuiltyByDate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBuiltyByDate.fulfilled, (state, action) => {
                state.loading = false;
                state.builty = Array.isArray(action.payload.result) ? action.payload.result : [];
            })
            .addCase(GetBuiltyByDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetBuiltyByConsignor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBuiltyByConsignor.fulfilled, (state, action) => {
                state.loading = false;
                state.builty = Array.isArray(action.payload.result) ? action.payload.result : [];
            })
            .addCase(GetBuiltyByConsignor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetBuiltyByConsignee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBuiltyByConsignee.fulfilled, (state, action) => {
                state.loading = false;
                state.builty = Array.isArray(action.payload.result) ? action.payload.result : [];
            })
            .addCase(GetBuiltyByConsignee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetBuiltyByPay_Status.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBuiltyByPay_Status.fulfilled, (state, action) => {
                state.loading = false;
                state.builty = Array.isArray(action.payload.result) ? action.payload.result : [];
            })
            .addCase(GetBuiltyByPay_Status.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetBuiltyBy_From_Office.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBuiltyBy_From_Office.fulfilled, (state, action) => {
                state.loading = false;
                state.builty = Array.isArray(action.payload.result) ? action.payload.result : [];
            })
            .addCase(GetBuiltyBy_From_Office.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(GetBuiltyBy_To_Office.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetBuiltyBy_To_Office.fulfilled, (state, action) => {
                state.loading = false;
                state.builty = Array.isArray(action.payload.result) ? action.payload.result : [];
            })
            .addCase(GetBuiltyBy_To_Office.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AddBuilty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddBuilty.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(AddBuilty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(UpdateBuilty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateBuilty.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(UpdateBuilty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(DeleteBuilty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteBuilty.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(DeleteBuilty.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default BuiltySlice.reducer;