import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { GetAllState, GetAllCity, AddCity, UpdateCity } from "../Redux/Slice/CitySlice";

export default function City(props) {
    const dispatch = useDispatch();
    const city = useSelector((state) => state.city?.city || []);
    const states = useSelector((state) => state.city?.states || []);
    const Permissions = useSelector((state) => state.auth?.Permissions || []);
    const [CityData, setCityData] = useState({ City_Name: "", State_Id: "" });
    const [isEdit, setIsEdit] = useState(false);
    const closeBtnRef = useRef();
    const [ErrorMsg, setErrorMsg] = useState({});

    useEffect(() => {
        dispatch(GetAllCity());
        dispatch(GetAllState());
    }, [dispatch]);

    const onChangename = (e) => {
        setCityData({ ...CityData, [e.target.name]: e.target.value });
        setErrorMsg(prev => ({ ...prev, [e.target.name]: "" }));
    };

    const hasPermission = (moduleName, permissionName) => {
        return Permissions.some(permission => permission.Module_Name === moduleName && permission.Permission_Name === permissionName);
    };

    const onclickAddCity = async () => {
        const errors = {};

        if (!CityData.City_Name) {
            errors.City_Name = "Please Enter City Name";
        }

        if (!CityData.State_Id) {
            errors.State_Id = "Please select state Name";
        }

        setErrorMsg(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const result = await dispatch(AddCity({
            City_Name: CityData.City_Name,
            State_Id: CityData.State_Id
        }));

        if (AddCity.fulfilled.match(result)) {
            await dispatch(GetAllCity());
            props?.showAlert?.("City Added Successfully", "success");
            closeBtnRef.current.click();
            setCityData({ City_Id: "", City_Name: "", State_Id: "" });
        }
    };

    const onclickUpdateCity = async () => {
        const errors = {};

        if (!CityData.City_Name) {
            errors.City_Name = "Please Enter City Name";
        }

        if (!CityData.State_Id) {
            errors.State_Id = "Please select state";
        }

        setErrorMsg(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        const result = await dispatch(UpdateCity({
            City_Name: CityData.City_Name,
            State_Id: CityData.State_Id,
            City_Id: CityData.City_Id
        }));

        if (UpdateCity.fulfilled.match(result)) {
            await dispatch(GetAllCity());
            props?.showAlert?.("City Updated Successfully", "success");
            closeBtnRef.current.click();
            setCityData({ City_Id: "", City_Name: "", State_Id: "" });
        }
    };

    return (
        <>
            <div className="row mb-3">
                <div className="col-md-6">
                    <h2>City</h2>
                </div>
                <div className="col-md-6 d-flex justify-content-end" style={{ paddingRight: "2rem" }}>
                    {hasPermission("City", "Create") && (
                        <div className="d-flex" style={{ justifyContent: "end" }}>
                            <button
                                className="btn btn-success"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={() => {
                                    setIsEdit(false);
                                    setErrorMsg({});
                                    setCityData({ City_Id: "", City_Name: "", State_Id: "" });
                                }}
                            >
                                Add City
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-4 shadow">
                        <div className="modal-header border-0 pb-0">
                            <h4 className="modal-title fw-bold" id="exampleModalLabel">{isEdit ? "Update City" : "Add City"}</h4>
                            <button type="button" className="btn-close" ref={closeBtnRef} data-bs-dismiss="modal" onClick={() => setErrorMsg({})}></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label fw-semibold">City Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className={`form-control ${ErrorMsg.City_Name ? "is-invalid" : ""}`}
                                    placeholder="Enter city name"
                                    name="City_Name"
                                    value={CityData.City_Name}
                                    onChange={onChangename}
                                />
                                {ErrorMsg.City_Name && <div className="text-danger mt-1">{ErrorMsg.City_Name}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">State <span className="text-danger">*</span></label>
                                <Select
                                    className={`form-control ${ErrorMsg.State_Id ? "is-invalid" : ""}`}
                                    value={states.map(item => ({ value: item.State_Id, label: item.State_Name })).find(x => x.value === CityData.State_Id) || null}
                                    options={states.map(item => ({ value: item.State_Id, label: item.State_Name }))}
                                    onChange={(selectedOption) => {
                                        setCityData(prev => ({ ...prev, State_Id: selectedOption ? selectedOption.value : "" }));
                                        setErrorMsg(prev => ({ ...prev, State_Id: "" }));
                                    }}
                                />
                                {ErrorMsg.State_Id && <div className="text-danger mt-1">{ErrorMsg.State_Id}</div>}
                            </div>

                            <button className="btn btn-success w-100 py-2 fw-semibold" onClick={isEdit ? onclickUpdateCity : onclickAddCity}>
                                {isEdit ? "Update" : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <table className="table table-hover" style={{ justifyContent: "center" }}>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(city) && city.map((item, index) => (
                            <tr key={item.City_Id || index}>
                                <td>{item.City_Name}</td>
                                <td>{item.State_Name}</td>
                                <td>
                                    {hasPermission("City", "Update") && (
                                        <img
                                            src="./edit.png"
                                            alt="edit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setIsEdit(true);
                                                setErrorMsg({});
                                                setCityData({
                                                    City_Id: item.City_Id,
                                                    City_Name: item.City_Name,
                                                    State_Id: item.State_Id
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