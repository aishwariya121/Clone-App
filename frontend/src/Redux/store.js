import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AuthSlice";
import userReducer from "./Slice/userSlice";
import roleReducer from "./Slice/RoleSlice";
import officeReducer from "./Slice/OfficeSlice";
import cityReducer from "./Slice/CitySlice";
import builtyReducer from "./Slice/BuiltySlice";
import customerReducer from "./Slice/CustomerSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        role: roleReducer,
        office: officeReducer,
        city: cityReducer,
        builty: builtyReducer,
        customer: customerReducer
    }
});