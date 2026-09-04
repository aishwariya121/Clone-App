import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const host = "http://localhost:5000";

export const GetAllRoles = createAsyncThunk("role/GetAllRoles", async () => {
    const response = await fetch(`${host}/api/Role/GetAllRoles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok)
        throw new Error("Failed to fetch roles");

    return await response.json();
});

export const GetAllPermissions = createAsyncThunk("role/GetAllPermissions", async () => {
    const response = await fetch(`${host}/api/Role/GetAllPermissions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok)
        throw new Error("Failed to fetch permissions");

    return await response.json();
});

export const GetRolePermissions = createAsyncThunk("role/GetRolePermissions", async (Role_Id) => {
    const response = await fetch(`${host}/api/Role/GetRolePermissions/${Role_Id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok)
        throw new Error("Failed to fetch role permissions");

    return await response.json();
});

export const AddRole = createAsyncThunk("role/AddRole", async (data) => {
    const response = await fetch(`${host}/api/Role/AddRole`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok)
        throw new Error("Failed to add role");

    return await response.json();
});

export const UpdateRole = createAsyncThunk("role/UpdateRole", async (data) => {
    const response = await fetch(`${host}/api/Role/UpdateRole`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok)
        throw new Error("Failed to update role");

    return await response.json();
});

export const DeleteRole = createAsyncThunk("role/DeleteRole", async ({Role_Id}) => {
    const response = await fetch(`${host}/api/Role/DeleteRole/${Role_Id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok)
        throw new Error("Failed to delete role");

    return await response.json();
});

const RoleSlice = createSlice({
    name: "role",
    initialState: {
        roles: [],
        permissions: [],
        rolePermissions: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetAllRoles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload.result || [];
            })
            .addCase(GetAllRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(GetAllPermissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllPermissions.fulfilled, (state, action) => {
                state.loading = false;
                state.permissions = action.payload.result || [];
            })
            .addCase(GetAllPermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(GetRolePermissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetRolePermissions.fulfilled, (state, action) => {
                state.loading = false;
                state.rolePermissions = action.payload;
            })
            .addCase(GetRolePermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(AddRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddRole.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(AddRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(UpdateRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateRole.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(UpdateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(DeleteRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteRole.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(DeleteRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default RoleSlice.reducer;