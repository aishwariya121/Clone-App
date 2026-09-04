import React, { useEffect, useState, useRef } from "react";
import Context from "../Context/Context";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOffices, AddOffice, UpdateOffice } from "../Redux/Slice/OfficeSlice";

export default function Office(props) {
    const { city, GetAllCity } = React.useContext(Context);
    const dispatch = useDispatch();
    const office = useSelector((state) => state.office?.office || []);
    const Permissions = useSelector((state) => state.auth?.Permissions || []);
    const [OfficeData, setOfficeData] = useState({ Office_Name: "", City_Id: "" });
    const closeBtnRef = useRef();
    const [isEdit, setIsEdit] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});

    useEffect(() => {
        GetAllCity();
    }, []);

    useEffect(() => {
        dispatch(GetAllOffices());
    }, [dispatch]);

    const hasPermission = (moduleName, permissionName) => {
        return Permissions.some(permission => permission.Module_Name === moduleName && permission.Permission_Name === permissionName);
    };

    const onChangename = (e) => {
        setOfficeData({ ...OfficeData, [e.target.name]: e.target.value });
        setErrorMsg(prev => ({ ...prev, [e.target.name]: "" }));
    };

    const onclickAddOffice = async () => {
        const errors = {};

        if (!OfficeData.Office_Name) {
            errors.Office_Name = "Please Enter Office Name";
        }

        if (!OfficeData.City_Id) {
            errors.City_Id = "Please select City";
        }

        setErrorMsg(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const result = await dispatch(AddOffice({
            Office_Name: OfficeData.Office_Name,
            City_Id: OfficeData.City_Id
        }));

        if (AddOffice.fulfilled.match(result)) {
            await dispatch(GetAllOffices());
            props.showAlert("Office Added Successfully", "success");
            closeBtnRef.current.click();
            setOfficeData({ Office_Id: "", Office_Name: "", City_Id: "" });
        }
    };

    const onclickUpdateOffice = async () => {
        const errors = {};

        if (!OfficeData.Office_Name) {
            errors.Office_Name = "Please Enter Office Name";
        }

        if (!OfficeData.City_Id) {
            errors.City_Id = "Please select City";
        }

        setErrorMsg(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const result = await dispatch(UpdateOffice({
            Office_Name: OfficeData.Office_Name,
            City_Id: OfficeData.City_Id,
            Office_Id: OfficeData.Office_Id
        }));

        if (UpdateOffice.fulfilled.match(result)) {
            await dispatch(GetAllOffices());
            props.showAlert("Office Updated Successfully", "success");
            closeBtnRef.current.click();
            setOfficeData({ Office_Id: "", Office_Name: "", City_Id: "" });
        }
    };

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-0 pb-0">
                            <h4 className="modal-title fw-bold" id="exampleModalLabel">{isEdit ? "Update Office" : "Add Office"}</h4>
                            <button type="button" className="btn-close" ref={closeBtnRef} data-bs-dismiss="modal" onClick={() => setErrorMsg({})}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Office Name <span className="text-danger">*</span></label>
                                <input type="text" className={`form-control ${ErrorMsg.Office_Name ? "is-invalid" : ""}`} placeholder="Enter Office name" name="Office_Name" value={OfficeData.Office_Name} onChange={onChangename} />
                                {ErrorMsg.Office_Name && <div className="text-danger mt-1">{ErrorMsg.Office_Name}</div>}
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">City <span className="text-danger">*</span></label>
                                <Select
                                    className={`form-control ${ErrorMsg.City_Id ? "is-invalid" : ""}`}
                                    value={city.map(item => ({ value: item.City_Id, label: item.City_Name })).find(x => x.value === OfficeData.City_Id) || null}
                                    options={city.map(item => ({ value: item.City_Id, label: item.City_Name }))}
                                    onChange={(selectedOption) => {
                                        setOfficeData(prev => ({ ...prev, City_Id: selectedOption ? selectedOption.value : "" }));
                                        setErrorMsg(prev => ({ ...prev, City_Id: "" }));
                                    }}
                                />
                                {ErrorMsg.City_Id && <div className="text-danger mt-1">{ErrorMsg.City_Id}</div>}
                            </div>
                            <button className="btn btn-success w-100 py-2 fw-semibold" onClick={isEdit ? onclickUpdateOffice : onclickAddOffice}>{isEdit ? "Update" : "Submit"}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <h2>Office</h2>
                </div>
                <div className="col-md-6 d-flex justify-content-end" style={{ paddingRight: "2rem" }}>
                    {hasPermission("Office", "Create") && (
                        <div className="d-flex mx-5 my-4 mt-2" style={{ justifyContent: "end" }}>
                            <button
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                    setIsEdit(false);
                                    setErrorMsg({});
                                    setOfficeData({ Office_Id: "", Office_Name: "", City_Id: "" });
                                }}
                            >
                                Add Office
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <table className="table table-hover mt-4" style={{ justifyContent: "center" }}>
                    <thead>
                        <tr>
                            <th>Office</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(office) && office.map((item, index) => (
                            <tr key={item.Office_Id || index}>
                                <td>{item.Office_Name}</td>
                                <td>
                                    {hasPermission("Office", "Update") && (
                                        <img
                                            src="./edit.png"
                                            alt="edit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setIsEdit(true);
                                                setErrorMsg({});
                                                setOfficeData({
                                                    Office_Id: item.Office_Id,
                                                    Office_Name: item.Office_Name,
                                                    City_Id: item.City_Id
                                                });
                                            }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}