import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const host = "http://localhost:5000";
const initialState = {
    user: [],
    loading: false,
    error: null
};


// this createAyncThunk function is used to create an asynchronous action that fetches all users from the backend API. It handles the pending, fulfilled, and rejected states of the asynchronous operation

//GetAllUser Thunk function....
export const GetAllUser = createAsyncThunk(
    "user/GetAllUser",
    async () => {
        const response = await fetch(`${host}/api/Auth/GetAllUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch users");
        }

        return data.result || [];
    }
);

//AddUser Thunk
export const AddUser = createAsyncThunk("user/AddUser",
    async ({ User_Name, Email, Password, Role_Id }) => {
        const response = await fetch(`${host}/api/Auth/AddUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                User_Name,
                Email,
                Password,
                Role_Id
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to add user");
        }

        return data;
    }
);

//UpdateUser Thunk api/Auth/UpdateUser
export const UpdateUser = createAsyncThunk("user/UpdateUser",
    async ({  User_Name, Email, Password, Role_Id ,User_Id}) => {
        const response = await fetch(`${host}/api/Auth/UpdateUser`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                User_Name,
                Email,
                Password,
                Role_Id,
                User_Id,
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to update user");
        }

        return data;
    }
);


//DeleteUser Thunk
export const DeleteUser = createAsyncThunk(
  "user/DeleteUser",
  async ({ User_Id }) => {
    const response = await fetch(
      `${host}/api/Auth/DeleteUser/${User_Id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete user");
    }

    return data;
  }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},

    //extraReducers is used to handle the different states of the GetAllUser asynchronous action. It updates the state based on whether the action is pending, fulfilled, or rejected.
    extraReducers: (builder) => {
        builder
            .addCase(GetAllUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(GetAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(GetAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(AddUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AddUser.fulfilled, (state, action) => {
                state.loading = false;
                
            })
            .addCase(AddUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
              .addCase(UpdateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdateUser.fulfilled, (state, action) => {
                state.loading = false;
                
            })
            .addCase(UpdateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
              .addCase(DeleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                state.loading = false;
                
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default userSlice.reducer;