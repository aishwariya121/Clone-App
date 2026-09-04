import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { AddCust, UpdateCust, GetAllCust } from "../Redux/Slice/CustomerSlice";

export default function CustomerOffcanvas({ isOpen, setIsOpen, isEdit, CustData, setCustData, city }) {
    const dispatch = useDispatch();
    const [ErrorMsg, setErrorMsg] = useState({});
    const data = CustData || { Cust_Id: "", Cust_Name: "", Phone_No: "", City_Id: "", GST_No: "" };

    useEffect(() => {
        if (isOpen) setErrorMsg({});
    }, [isOpen]);

    const handleChange = (field, value) => {
        setCustData((prev) => ({ ...prev, [field]: value }));
        setErrorMsg((prev) => ({ ...prev, [field]: "" }));
    };

    const validate = () => {
        const errors = {};
        if (!data.Cust_Name?.trim()) errors.Cust_Name = "Please Enter Customer Name";
        if (!data.Phone_No) errors.Phone_No = "Please Enter Phone No";
        else if (!/^\d{10}$/.test(data.Phone_No)) errors.Phone_No = "Please enter a valid 10 digit phone number";
        if (data.GST_No && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(data.GST_No)) errors.GST_No = "Please enter valid GST number";
        if (!data.City_Id) errors.City_Id = "Please select City";
        setErrorMsg(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        if (isEdit) {
            await dispatch(UpdateCust({ Cust_Name: data.Cust_Name, Phone_No: data.Phone_No, City_Id: data.City_Id, GST_No: data.GST_No, Cust_Id: data.Cust_Id })).unwrap();
        } else {
            await dispatch(AddCust({ Cust_Name: data.Cust_Name, Phone_No: data.Phone_No, City_Id: data.City_Id, GST_No: data.GST_No })).unwrap();
        }
        dispatch(GetAllCust());
        setIsOpen(false);
        setErrorMsg({});
    };

    const cityOptions = Array.isArray(city) ? city.map((c) => ({ value: c.City_Id, label: c.City_Name })) : [];
    const selectedCity = cityOptions.find((x) => x.value === data.City_Id) || null;

    return (
        <>
            <div className={`customer-popup ${isOpen ? "customer-popup-show" : ""}`} tabIndex="-1" id="customerOffcanvas" style={{ zIndex: 2000, width: "920px", height: "500px", padding: "1rem", position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)", visibility: isOpen ? "visible" : "hidden", backgroundColor: "white" }}>
                <div className="offcanvas-header">
                    <h5>{isEdit ? "Update Customer" : "Add Customer"}</h5>
                    <button type="button" className="btn-close" onClick={() => { setIsOpen(false); setErrorMsg({}); }} />
                </div>
                <div className="offcanvas-body">
                    <div className="mb-3">
                        <label>Customer Name</label>
                        <input type="text" className={`form-control ${ErrorMsg.Cust_Name ? "is-invalid" : ""}`} value={data.Cust_Name || ""} onChange={(e) => handleChange("Cust_Name", e.target.value)} />
                        {ErrorMsg.Cust_Name && <div className="invalid-feedback">{ErrorMsg.Cust_Name}</div>}
                    </div>
                    <div className="mb-3">
                        <label>Phone</label>
                        <input type="text" maxLength={10} className={`form-control ${ErrorMsg.Phone_No ? "is-invalid" : ""}`} value={data.Phone_No || ""} onChange={(e) => handleChange("Phone_No", e.target.value)} />
                        {ErrorMsg.Phone_No && <div className="invalid-feedback">{ErrorMsg.Phone_No}</div>}
                    </div>
                    <div className="mb-3">
                        <label>City</label>
                        <Select value={selectedCity} options={cityOptions} isClearable onChange={(selected) => handleChange("City_Id", selected ? selected.value : "")} />
                        {ErrorMsg.City_Id && <div className="text-danger small mt-1">{ErrorMsg.City_Id}</div>}
                    </div>
                    <div className="mb-3">
                        <label>GST</label>
                        <input type="text" className={`form-control ${ErrorMsg.GST_No ? "is-invalid" : ""}`} value={data.GST_No || ""} onChange={(e) => handleChange("GST_No", e.target.value.toUpperCase())} />
                        {ErrorMsg.GST_No && <div className="invalid-feedback">{ErrorMsg.GST_No}</div>}
                    </div>
                    <button type="button" className="btn btn-success w-100" onClick={handleSubmit}>{isEdit ? "Update Customer" : "Add Customer"}</button>
                </div>
            </div>
            {isOpen && <div className="offcanvas-backdrop fade show" style={{ zIndex: 1999 }} onClick={() => { setIsOpen(false); setErrorMsg({}); }} />}
        </>
    );
}