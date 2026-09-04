import React, { useEffect, useContext, useState, useRef } from "react";
import Context from "../Context/Context";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser, AddUser,UpdateUser,DeleteUser } from "../Redux/Slice/userSlice";



export default function User(props) {

    const { roles, FetchUser, GetAllRoles } = useContext(Context);
    const [UserData, setUserData] = useState({ User_Name: "", Email: "", Password: "", Role_Id: "", User_Id: null });
    const [isEdit, setIsEdit] = useState(false);
    const closeBtnRef = useRef();
    const [ErrorMsg, setErrorMsg] = useState({});
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
    let errors = {};

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);

    useEffect(() => {
        GetAllRoles();
    }, []);
    useEffect(() => {
        dispatch(GetAllUser());
    }, [dispatch]);

    const onChangename = (e) => {
        setUserData({ ...UserData, [e.target.name]: e.target.value })
        setErrorMsg((prev) => ({ ...prev, [e.target.name]: "" }));
    }

    const onAddbtn = () => {
        setUserData({
            User_Name: "", Email: "", Password: "", User_Id: ""
        });
        setErrorMsg({});
        setIsEdit(false);

    }


    const Permissions = useSelector((state) => state.auth.Permissions);

    const hasPermission = (moduleName, permissionName) => {
        return Permissions.some(
            permission =>
                permission.Module_Name === moduleName &&
                permission.Permission_Name === permissionName
        );
    };


    const onclickAddUser = async () => {

        if (!UserData.User_Name) {
            errors.User_Name = "Please Enter User Name";
        }

        if (!UserData.Email) {
            errors.Email = "Please Enter Email";
        }

        else if (!/\S+@\S+\.\S+/.test(UserData.Email)) {
            errors.Email = "Please enter a valid email.";
        }

        if (!UserData.Password) {
            errors.Password = "Please Enter Password";
        }
        else if (!passwordRegex.test(UserData.Password)) {
            errors.Password = "Password must contain at least 8 characters, 1 uppercase letter and 1 special character."
        }

        if (!UserData.Role_Id) {
            errors.Role_Id = "Please select a Role";
        }

        setErrorMsg(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const selectedRole = roles.find(
            (item) => item.Role_Id === UserData.Role_Id
        );
        const result = await dispatch(AddUser({
            User_Name: UserData.User_Name,
            Email: UserData.Email,
            Password: UserData.Password,
            Role_Id: UserData.Role_Id
        }));

        if (AddUser.fulfilled.match(result)) {
            closeBtnRef.current.click();
            dispatch(GetAllUser());
            props.showAlert("User Added Successfully", "success");
        }

    }


    const onclickUpdateUser = async () => {

        if (!UserData.User_Name) {
            errors.User_Name = "Please Enter User Name";
        }

        if (!UserData.Email) {
            errors.Email = "Please Enter Email";
        }
        else if (!/\S+@\S+\.\S+/.test(UserData.Email)) {
            errors.Email = "Please enter a valid email.";
        }

        if (UserData.Password && UserData.Password.length < 5) {
            errors.Password = "Password must be at least 5 characters long";
        }

        if (!UserData.Role_Id) {
            errors.Role_Id = "Please select a Role";
        }

        setErrorMsg(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }
        const selectedRole = roles.find(
            (item) => item.Role_Id === UserData.Role_Id
        );
        const result = await dispatch(UpdateUser({
            User_Name: UserData.User_Name,
            Email: UserData.Email,
            Password: UserData.Password,
            Role_Id: UserData.Role_Id,
            User_Id: UserData.User_Id
        }));

        if (UpdateUser.fulfilled.match(result)) {
            closeBtnRef.current.click();
            dispatch(GetAllUser());
            props.showAlert("User Updated Successfully", "success");
        }
    }
    return (
        <>
            <div className="row mb-3">
                <div className="col-md-6">
                    <h2>User</h2>
                </div>
                <div className="col-md-6 d-flex justify-content-end" style={{ paddingRight: "2rem" }}>
                    {hasPermission("User", "Create") && (
                        <div className="d-flex mx-5 my-4 mt-2" style={{ justifyContent: "end" }}>
                            <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={onAddbtn}>Add User</button>
                        </div>
                    )}
                </div>
            </div>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-0 pb-0">
                            <h4 className="modal-title fw-bold" id="exampleModalLabel"> {isEdit ? "Update User" : "Add User"} </h4>
                            <button type="button" className="btn-close" ref={closeBtnRef} data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    User Name <span className="text-danger"> *</span>
                                </label>
                                <input type="text" className={`form-control ${ErrorMsg.User_Name ? "is-invalid" : ""}`} placeholder="Enter User Name" name="User_Name" value={UserData.User_Name || ""} onChange={onChangename} />
                                {ErrorMsg.User_Name && (
                                    <div className="text-danger mt-1">
                                        {ErrorMsg.User_Name}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold"> Email <span className="text-danger"> *</span> </label>

                                <input type="text" className={`form-control ${ErrorMsg.Email ? "is-invalid" : ""}`} placeholder="Enter Email" name="Email" value={UserData.Email || ""} onChange={onChangename} />
                                {ErrorMsg.Email && (
                                    <div className="text-danger mt-1">
                                        {ErrorMsg.Email}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold"> Password {isEdit ? <span></span> : <span className="text-danger"> *</span>}  </label>

                                <input type="text" className={`form-control ${ErrorMsg.Password ? "is-invalid" : ""}`} placeholder="Enter Password" name="Password" value={UserData.Password || ""} onChange={onChangename} />
                                {ErrorMsg.Password && (
                                    <div className="text-danger mt-1">
                                        {ErrorMsg.Password}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold"> Role <span className="text-danger"> *</span> </label>

                                <Select className={`form-control ${ErrorMsg.Role_Id ? "is-invalid" : ""}`}
                                    options={roles.map((item) => ({
                                        value: item.Role_Id,
                                        label: item.Role_Name,
                                    }))}
                                    value={
                                        roles.map((item) => ({

                                            value: item.Role_Id,
                                            label: item.Role_Name,
                                        }))
                                            .find((option) => option.value === UserData.Role_Id) || null
                                    }
                                    onChange={(selected) => {
                                        setUserData({
                                            ...UserData,
                                            Role_Id: selected.value,
                                        });
                                        setErrorMsg((prev) => ({
                                            ...prev,
                                            Role_Id: "",
                                        }));
                                    }} />
                                {ErrorMsg.Role_Id && (
                                    <div className="text-danger mt-1">
                                        {ErrorMsg.Role_Id}
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-success w-100 py-2 fw-semibold" onClick={isEdit ? onclickUpdateUser : onclickAddUser}> Submit </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* -------------------- Display User Data ---------------------------- */}
            <div>
                <table className="table  table-hover" style={{ justifyContent: "center" }}>
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, index) => (
                            console.log("items from user:", item),
                            <tr key={item.User_Id || index}>
                                <td>{item.User_Name}</td>
                                <td>{item.Email}</td>
                                <td>{item.Role || "No Role Assigned"}</td>
                                <td><img src="./edit.png" alt="edit" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                    onClick={() => {
                                        setIsEdit(true);
                                        setUserData({
                                            User_Name: item.User_Name,
                                            Email: item.Email,
                                            Password: "",
                                            Role_Id: item.Role_Id,
                                            User_Id: item.User_Id
                                        });
                                    }} />
                                    <img className="mx-3" src="./delete.png" alt="edit" onClick={async () => {
                                        if (window.confirm("Are you sure you want to delete this User?")) {
                                            await dispatch(DeleteUser({ User_Id: item.User_Id }));
                                            await dispatch(GetAllUser());
                                            props.showAlert("User Deleted Successfully", "success");
                                        }
                                    }} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* -------------------- ------------------ ---------------------------- */}
        </>
    )
}
