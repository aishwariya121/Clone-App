import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
    User_Name: localStorage.getItem("User_Name") || null,
    Email: localStorage.getItem("Email") || null,
    Role_Id: localStorage.getItem("Role_Id") || null,
    Role_Name: localStorage.getItem("Role_Name") || null,
    Permissions: JSON.parse(localStorage.getItem("Permissions") || "[]"),
    isLoggedIn: !!localStorage.getItem("token")
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            const data = action.payload;

            state.token = data.authTokeninClone;
            state.User_Name = data.User_Name;
            state.Email = data.Email;
            state.Role_Id = data.Role_Id;
            state.Role_Name = data.Role_Name;
            state.Permissions = data.Permissions || [];
            state.isLoggedIn = true;

            localStorage.setItem("token", data.authTokeninClone);
            localStorage.setItem("User_Name", data.User_Name);
            localStorage.setItem("Email", data.Email);
            localStorage.setItem("Role_Id", data.Role_Id);
            localStorage.setItem("Role_Name", data.Role_Name);
            localStorage.setItem(
                "Permissions",
                JSON.stringify(data.Permissions || [])
            );
        },
        logout: (state) => {
            state.token = null;
            state.User_Name = null;
            state.Email = null;
            state.Role_Id = null;
            state.Role_Name = null;
            state.Permissions = [];
            state.isLoggedIn = false;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;