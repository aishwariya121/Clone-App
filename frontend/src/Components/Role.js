import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    GetAllRoles,
    AddRole,
    UpdateRole,
    DeleteRole,
    GetAllPermissions,
    GetRolePermissions
} from "../Redux/Slice/RoleSlice";

export default function Role() {

    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const dispatch = useDispatch();

    const roles = useSelector((state) => state.role?.roles || []);
    const permissions = useSelector((state) => state.role?.permissions || []);
    const loading = useSelector((state) => state.role?.loading || false);

    const Permissions = useSelector((state) => state.auth?.Permissions || []);

    const [isEdit, setIsEdit] = useState(false);
    const closeBtnRef = useRef();
    const [ErrorMsg, setErrorMsg] = useState({});
    const [RoleData, setRoleData] = useState({
        Role_Id: "",
        Role_Name: "",
        Role_Description: ""
    });

    useEffect(() => {
        dispatch(GetAllPermissions());
    }, [dispatch]);

    useEffect(() => {
        dispatch(GetAllRoles());
    }, [dispatch]);

    const hasPermission = (moduleName, permissionName) => {
        return Permissions.some(
            permission =>
                permission.Module_Name === moduleName &&
                permission.Permission_Name === permissionName
        );
    };

    const groupedPermissions = permissions.reduce((acc, item) => {
        if (!acc[item.Module_Name]) {
            acc[item.Module_Name] = [];
        }

        acc[item.Module_Name].push(item);

        return acc;
    }, {});

    const handlePermissionChange = (Permission_Id) => {
        if (selectedPermissions.includes(Permission_Id)) {
            setSelectedPermissions(
                selectedPermissions.filter(id => id !== Permission_Id)
            );
        } else {
            setSelectedPermissions([
                ...selectedPermissions,
                Permission_Id
            ]);
        }
    };

    const AddRoleOnClick = async () => {
        const errors = {};

        if (!RoleData.Role_Name) {
            errors.Role_Name = "Please Enter Role Name";
        }

        if (!RoleData.Role_Description) {
            errors.Role_Description = "Please enter Description about the role";
        }

        if (selectedPermissions.length === 0) {
            errors.Permissions = "Please select at least one permission";
        }

        setErrorMsg(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const result = await dispatch(AddRole({
            Role_Name: RoleData.Role_Name,
            Role_Description: RoleData.Role_Description,
            Permissions: selectedPermissions
        }));

        if (AddRole.fulfilled.match(result)) {
            await dispatch(GetAllRoles());

            setRoleData({
                Role_Id: "",
                Role_Name: "",
                Role_Description: ""
            });

            setSelectedPermissions([]);
            setErrorMsg({});
            closeBtnRef.current.click();
        }
    };

    const UpdateRoleOnClick = async () => {
        const errors = {};

        if (!RoleData.Role_Name) {
            errors.Role_Name = "Please Enter Role Name";
        }

        if (!RoleData.Role_Description) {
            errors.Role_Description = "Please enter Description about the role";
        }

        if (selectedPermissions.length === 0) {
            errors.Permissions = "Please select at least one permission";
        }

        setErrorMsg(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const result = await dispatch(UpdateRole({
            Role_Id: RoleData.Role_Id,
            Role_Name: RoleData.Role_Name,
            Role_Description: RoleData.Role_Description,
            Permissions: selectedPermissions
        }));

        if (UpdateRole.fulfilled.match(result)) {
            await dispatch(GetAllRoles());

            setRoleData({
                Role_Id: "",
                Role_Name: "",
                Role_Description: ""
            });

            setSelectedPermissions([]);
            setErrorMsg({});
            setIsEdit(false);
            closeBtnRef.current.click();
        }
    };

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-6">
                    <h2>Roles</h2>
                </div>

                <div className="col-md-6 d-flex justify-content-end" style={{ paddingRight: "2rem" }}>
                    {hasPermission("Role", "Create") && (
                        <button
                            className="btn btn-success mx-5"
                            data-bs-toggle="modal"
                            data-bs-target="#RoleModal"
                            onClick={() => {
                                setIsEdit(false);
                                setRoleData({
                                    Role_Id: "",
                                    Role_Name: "",
                                    Role_Description: ""
                                });
                                setSelectedPermissions([]);
                                setErrorMsg({});
                            }}
                        >
                            Add Role
                        </button>
                    )}
                </div>
            </div>

            <table className="table table-hover mt-4">
                <thead className="table-light">
                    <tr>
                        <th width="10%">Id</th>
                        <th>Role Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {roles.length > 0 ? (
                        roles.map(item => (
                            <tr key={item.Role_Id}>
                                <td>{item.Role_Id}</td>
                                <td>{item.Role_Name}</td>
                                <td>{item.Role_Description}</td>

                                <td>
                                    {hasPermission("Role", "Update") && (
                                        <img
                                            src="./edit.png"
                                            alt="edit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#RoleModal"
                                            style={{
                                                width: "22px",
                                                cursor: "pointer"
                                            }}
                                            onClick={async () => {
                                                setIsEdit(true);
                                                setErrorMsg({});

                                                setRoleData({
                                                    Role_Id: item.Role_Id,
                                                    Role_Name: item.Role_Name,
                                                    Role_Description: item.Role_Description
                                                });

                                                const result = await dispatch(
                                                    GetRolePermissions(item.Role_Id)
                                                );

                                                console.log(
                                                    "GetRolePermissions Response:",
                                                    result.payload
                                                );

                                                if (GetRolePermissions.fulfilled.match(result)) {
                                                    setSelectedPermissions(
                                                        (result.payload.result || []).map(
                                                            p => p.Permission_Id
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                    )}

                                    {hasPermission("Role", "Delete") && (
                                        <img
                                            className="mx-3"
                                            src="./delete.png"
                                            alt="delete"
                                            style={{
                                                width: "22px",
                                                cursor: "pointer"
                                            }}
                                            onClick={async () => {
                                                if (window.confirm("Are you sure you want to delete this Role?")) {
                                                    const result = await dispatch(
                                                        DeleteRole({
                                                            Role_Id: item.Role_Id
                                                        })
                                                    );

                                                    if (DeleteRole.fulfilled.match(result)) {
                                                        await dispatch(GetAllRoles());
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                {loading ? "Loading..." : "No Roles Found"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="container">
                <div className="modal fade" id="RoleModal" tabIndex="-1">
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEdit ? "Update Role" : "Add Role"}
                                </h5>

                                <button
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    ref={closeBtnRef}
                                />
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Role Name</label>

                                    <input
                                        type="text"
                                        className={`form-control ${ErrorMsg.Role_Name ? "is-invalid" : ""}`}
                                        value={RoleData.Role_Name}
                                        onChange={(e) =>
                                            setRoleData({
                                                ...RoleData,
                                                Role_Name: e.target.value
                                            })
                                        }
                                    />

                                    {ErrorMsg.Role_Name && (
                                        <div className="text-danger">
                                            {ErrorMsg.Role_Name}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Description</label>

                                    <textarea
                                        rows="2"
                                        className={`form-control ${ErrorMsg.Role_Description ? "is-invalid" : ""}`}
                                        value={RoleData.Role_Description}
                                        onChange={(e) =>
                                            setRoleData({
                                                ...RoleData,
                                                Role_Description: e.target.value
                                            })
                                        }
                                    />

                                    {ErrorMsg.Role_Description && (
                                        <div className="text-danger">
                                            {ErrorMsg.Role_Description}
                                        </div>
                                    )}
                                </div>

                                {ErrorMsg.Permissions && (
                                    <div className="text-danger mb-3">
                                        {ErrorMsg.Permissions}
                                    </div>
                                )}

                                {Object.entries(groupedPermissions).map(([module, modulePermissions]) => {
                                    const modulePermissionIds = modulePermissions.map(
                                        p => p.Permission_Id
                                    );

                                    const allSelected = modulePermissionIds.every(
                                        id => selectedPermissions.includes(id)
                                    );

                                    return (
                                        <div className="card shadow-sm mb-3" key={module}>
                                            <div className="card-body py-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h6 className="mb-0 fw-bold">
                                                        {module}
                                                    </h6>

                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={allSelected}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSelectedPermissions(prev => [
                                                                        ...new Set([
                                                                            ...prev,
                                                                            ...modulePermissionIds
                                                                        ])
                                                                    ]);
                                                                } else {
                                                                    setSelectedPermissions(prev =>
                                                                        prev.filter(
                                                                            id => !modulePermissionIds.includes(id)
                                                                        )
                                                                    );
                                                                }
                                                            }}
                                                        />

                                                        <label className="form-check-label">
                                                            All
                                                        </label>
                                                    </div>
                                                </div>

                                                <hr className="my-2" />

                                                <div className="d-flex flex-wrap gap-4">
                                                    {["Get", "Create", "Update", "Delete"].map(action => {
                                                        const permission = modulePermissions.find(
                                                            p => p.Permission_Name === action
                                                        );

                                                        if (!permission) {
                                                            return null;
                                                        }

                                                        return (
                                                            <div
                                                                className="form-check"
                                                                key={permission.Permission_Id}
                                                            >
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={selectedPermissions.includes(
                                                                        permission.Permission_Id
                                                                    )}
                                                                    onChange={() =>
                                                                        handlePermissionChange(
                                                                            permission.Permission_Id
                                                                        )
                                                                    }
                                                                />

                                                                <label className="form-check-label">
                                                                    {action}
                                                                </label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-success"
                                    onClick={
                                        isEdit
                                            ? UpdateRoleOnClick
                                            : AddRoleOnClick
                                    }
                                >
                                    {isEdit ? "Update Role" : "Save Role"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}