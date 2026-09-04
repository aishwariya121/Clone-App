import React, { useEffect, useState, useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Context from "../Context/Context";
import Select from "react-select";
import CustomerOffcanvas from "./CustomerOffcanvas";
import { AddBuilty, UpdateBuilty, GetBuiltyByDate } from "../Redux/Slice/BuiltySlice";
import { GetAllCust, GetCustByName } from "../Redux/Slice/CustomerSlice";

export default function BuiltyModal(props) {
    const { dateFilter } = useContext(Context);
    const dispatch = useDispatch();
    const office = useSelector(state => state.office?.office || []);
    const cust = useSelector(state => state.customer?.cust || []);
    const closeBtnRef = useRef();

    const [customerIsEdit, setCustomerIsEdit] = useState(false);
    const [customerOpen, setCustomerOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState({});
    const [CustData, setCustData] = useState({
        Cust_Id: "",
        Cust_Name: "",
        Phone_No: "",
        City_Id: "",
        GST_No: ""
    });

    const emptyBuilty = {
        From_Office_Id: "",
        From_Office_Name: "",
        To_Office_Id: "",
        To_Office_Name: "",
        Builty_Date: new Date().toISOString().split("T")[0],
        Truck_No: "",
        Consignor_Id: "",
        Consignor_Name: "",
        Consignor_Phone_No: "",
        Consignor_GST: "",
        Consignee_Id: "",
        Consignee_Name: "",
        Consignee_Phone_No: "",
        Consignee_GST: "",
        Package_Value: "",
        Invoice_No: "",
        E_Way_Bill_No: "",
        Weight: "",
        Quantity: "",
        Charge_per_parcel: "",
        Descriptions: "",
        Builty_Charge: 20,
        Insurance: "",
        Hamali: "",
        Damrage: "",
        GST: "",
        Pay_Status: "",
        Total_Amount: "",
        Builty_Id: ""
    };

    const resetBuilty = () => {
        props.setbuiltyData({ ...emptyBuilty });
        setErrorMsg({});
        setCustomerOpen(false);
        setCustomerIsEdit(false);
    };

    useEffect(() => {
        dispatch(GetAllCust());
    }, [dispatch]);

    const calculateTotal_Amount = () => {
        const parcel_amount = (Number(props.builtyData.Quantity) || 0) * (Number(props.builtyData.Charge_per_parcel) || 0);
        const Sub_Total = parcel_amount + (Number(props.builtyData.Builty_Charge) || 0) + (Number(props.builtyData.Hamali) || 0) + (Number(props.builtyData.Damrage) || 0) + (Number(props.builtyData.Insurance) || 0);
        const GST_Amount = (Sub_Total * (Number(props.builtyData.GST) || 0)) / 100;
        const Total_Amount = Sub_Total + GST_Amount;

        props.setbuiltyData(prev => ({
            ...prev,
            Total_Amount: Total_Amount.toFixed(2)
        }));
    };

    useEffect(() => {
        calculateTotal_Amount();
    }, [
        props.builtyData.Quantity,
        props.builtyData.Charge_per_parcel,
        props.builtyData.Builty_Charge,
        props.builtyData.Hamali,
        props.builtyData.Damrage,
        props.builtyData.Insurance,
        props.builtyData.GST
    ]);

    const onChangename = e => {
        setCustData({
            ...CustData,
            [e.target.name]: e.target.value
        });

        if (e.target.value === "") {
            dispatch(GetAllCust());
        } else {
            dispatch(GetCustByName(e.target.value));
        }
    };

    const validateBuilty = () => {
        const errors = {};
        const data = props.builtyData;

        if (!data.From_Office_Id) errors.From_Office_Id = "Please select From Office";
        if (!data.To_Office_Id) errors.To_Office_Id = "Please select To Office";
        if (!data.Consignor_Name) errors.Consignor_Name = "Please Enter Consignor Name";
        if (!data.Consignee_Name) errors.Consignee_Name = "Please Enter Consignee Name";
        if (!data.Descriptions) errors.Descriptions = "Please Enter Description";

        if (!data.Quantity) {
            errors.Quantity = "Please Enter Quantity";
        } else if (!/^\d+$/.test(data.Quantity)) {
            errors.Quantity = "Quantity must contain only numbers";
        }

        if (props.isEdit) {
            if (!data.Charge_per_parcel) {
                errors.Charge_per_parcel = "Please Enter Charge per parcel";
            } else if (!/^\d+(\.\d+)?$/.test(data.Charge_per_parcel)) {
                errors.Charge_per_parcel = "Only numbers are allowed";
            }
        } else if (data.Charge_per_parcel !== "" && data.Charge_per_parcel !== 0) {
            if (!/^\d+(\.\d+)?$/.test(data.Charge_per_parcel)) {
                errors.Charge_per_parcel = "Only numbers are allowed";
            }
        }

        if (!data.Pay_Status) errors.Pay_Status = "Please select payment status";

        if (data.GST !== "" && data.GST !== 0) {
            if (!/^\d+(\.\d+)?$/.test(data.GST)) {
                errors.GST = "Only numbers are allowed";
            } else if (Number(data.GST) > 100) {
                errors.GST = "GST cannot be greater than 100";
            }
        }

        ["Hamali", "Damrage", "Insurance"].forEach(field => {
            if (data[field] !== "" && data[field] !== 0 && !/^\d+(\.\d+)?$/.test(data[field])) {
                errors[field] = "Only numbers are allowed";
            }
        });

        setErrorMsg(errors);
        return Object.keys(errors).length === 0;
    };

    const AddBuiltyonclick = async () => {
        setCustomerIsEdit(false);
        setCustData({
            Cust_Id: "",
            Cust_Name: "",
            Phone_No: "",
            City_Id: "",
            GST_No: ""
        });

        if (!validateBuilty()) return;

        const result = await dispatch(AddBuilty(props.builtyData));

        if (AddBuilty.fulfilled.match(result)) {
            if (dateFilter?.fromDate && dateFilter?.toDate) {
                await dispatch(GetBuiltyByDate({
                    fromDate: dateFilter.fromDate,
                    toDate: dateFilter.toDate
                }));
            }

            closeBtnRef.current.click();
            props.showAlert("Builty Added Successfully", "success");
            setCustomerOpen(false);

            if (props.onSuccess) props.onSuccess();
        }
    };

    const UpdateBuiltyonclick = async () => {
        if (!validateBuilty()) return;

        const result = await dispatch(UpdateBuilty({
            ...props.builtyData,
            Package_Value: props.builtyData.Package_Value === "" ? 0 : props.builtyData.Package_Value,
            Weight: props.builtyData.Weight === "" ? 0 : props.builtyData.Weight,
            Builty_Charge: props.builtyData.Builty_Charge === "" ? 0 : props.builtyData.Builty_Charge,
            Insurance: props.builtyData.Insurance === "" ? 0 : props.builtyData.Insurance,
            Hamali: props.builtyData.Hamali === "" ? 0 : props.builtyData.Hamali,
            Damrage: props.builtyData.Damrage === "" ? 0 : props.builtyData.Damrage,
            GST: props.builtyData.GST === "" ? 0 : props.builtyData.GST,
            Total_Amount: props.builtyData.Total_Amount === "" ? 0 : props.builtyData.Total_Amount
        }));

        if (UpdateBuilty.fulfilled.match(result)) {
            if (dateFilter?.fromDate && dateFilter?.toDate) {
                await dispatch(GetBuiltyByDate({
                    fromDate: dateFilter.fromDate,
                    toDate: dateFilter.toDate
                }));
            }

            closeBtnRef.current.click();
            props.showAlert("Builty Updated Successfully", "success");
            setCustomerOpen(false);

            if (props.onSuccess) props.onSuccess();
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        props.setbuiltyData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrorMsg(prev => ({
            ...prev,
            [name]: ""
        }));
    };

    const selectConsignor = selectedOption => {
        if (!selectedOption) {
            props.setbuiltyData(prev => ({
                ...prev,
                Consignor_Id: "",
                Consignor_Name: "",
                Consignor_Phone_No: "",
                Consignor_GST: ""
            }));
            return;
        }

        const selectedCustomer = cust.find(item => String(item.Cust_Id) === String(selectedOption.value));
        if (!selectedCustomer) return;

        props.setbuiltyData(prev => ({
            ...prev,
            Consignor_Id: selectedCustomer.Cust_Id,
            Consignor_Name: selectedCustomer.Cust_Name,
            Consignor_Phone_No: selectedCustomer.Phone_No,
            Consignor_GST: selectedCustomer.GST_No
        }));

        setErrorMsg(prev => ({
            ...prev,
            Consignor_Name: ""
        }));
    };

    const selectConsignee = selectedOption => {
        if (!selectedOption) return;

        const selectedCustomer = cust.find(item => String(item.Cust_Id) === String(selectedOption.value));
        if (!selectedCustomer) return;

        props.setbuiltyData(prev => ({
            ...prev,
            Consignee_Id: selectedCustomer.Cust_Id,
            Consignee_Name: selectedCustomer.Cust_Name,
            Consignee_Phone_No: selectedCustomer.Phone_No,
            Consignee_GST: selectedCustomer.GST_No
        }));

        setErrorMsg(prev => ({
            ...prev,
            Consignee_Name: ""
        }));
    };

    const openCustomer = () => {
        setCustomerIsEdit(false);
        setCustData({
            Cust_Id: "",
            Cust_Name: "",
            Phone_No: "",
            City_Id: "",
            GST_No: ""
        });
        setIsOpen(true);
        setCustomerOpen(true);
    };

    return (
        <>
            <div className="modal fade modal-xl pd-5" id="exampleModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content" style={{
                        filter: customerOpen ? "brightness(70%)" : "brightness(100%)",
                        transition: "0.3s ease"
                    }}>
                        <div className="modal-header">
                            <h4>{props.isEdit ? "Update Builty" : "Add Builty"}</h4>
                            <button
                                className="btn-close"
                                data-bs-dismiss="modal"
                                ref={closeBtnRef}
                                onClick={() => {
                                    if (props.setIsEdit) props.setIsEdit(false);
                                    resetBuilty();
                                }}
                            />
                        </div>

                        <div className="modal-body p-5">
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label>Send From <span style={{ color: "red" }}>*</span></label>
                                    <Select
                                        value={office.map(item => ({
                                            value: item.Office_Id,
                                            label: item.Office_Name,
                                            From_Office_Name: item.Office_Name
                                        })).find(x => String(x.value) === String(props.builtyData.From_Office_Id)) || null}
                                        options={office.map(item => ({
                                            value: item.Office_Id,
                                            label: item.Office_Name,
                                            From_Office_Name: item.Office_Name
                                        }))}
                                        onChange={selectedOption => {
                                            props.setbuiltyData(prev => ({
                                                ...prev,
                                                From_Office_Id: selectedOption ? selectedOption.value : "",
                                                From_Office_Name: selectedOption ? selectedOption.From_Office_Name : ""
                                            }));
                                            setErrorMsg(prev => ({
                                                ...prev,
                                                From_Office_Id: ""
                                            }));
                                        }}
                                    />
                                    {ErrorMsg.From_Office_Id && <div className="text-danger mt-1">{ErrorMsg.From_Office_Id}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label>Send To <span style={{ color: "red" }}>*</span></label>
                                    <Select
                                        value={office.map(item => ({
                                            value: item.Office_Id,
                                            label: item.Office_Name,
                                            To_Office_Name: item.Office_Name
                                        })).find(x => String(x.value) === String(props.builtyData.To_Office_Id)) || null}
                                        options={office.map(item => ({
                                            value: item.Office_Id,
                                            label: item.Office_Name,
                                            To_Office_Name: item.Office_Name
                                        }))}
                                        onChange={selectedOption => {
                                            props.setbuiltyData(prev => ({
                                                ...prev,
                                                To_Office_Id: selectedOption ? selectedOption.value : "",
                                                To_Office_Name: selectedOption ? selectedOption.To_Office_Name : ""
                                            }));
                                            setErrorMsg(prev => ({
                                                ...prev,
                                                To_Office_Id: ""
                                            }));
                                        }}
                                    />
                                    {ErrorMsg.To_Office_Id && <div className="text-danger mt-1">{ErrorMsg.To_Office_Id}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label>Date</label>
                                    <input type="date" className="form-control" name="Builty_Date" value={props.builtyData.Builty_Date} onChange={handleChange} />
                                </div>

                                <div className="col-md-3">
                                    <label>Truck No.</label>
                                    <input type="text" className="form-control" name="Truck_No" value={props.builtyData.Truck_No} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="row g-3 mt-2">
                                <div className="col-md-6">
                                    <label>Consignor Name <span style={{ color: "red" }}>*</span></label>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <Select
                                                value={cust.map(item => ({
                                                    value: item.Cust_Id,
                                                    label: item.Cust_Name
                                                })).find(x => String(x.value) === String(props.builtyData.Consignor_Id)) || null}
                                                options={cust.map(item => ({
                                                    value: item.Cust_Id,
                                                    label: item.Cust_Name
                                                }))}
                                                onChange={selectConsignor}
                                            />
                                        </div>
                                        <button className="btn btn-success ms-2" type="button" onClick={openCustomer}>+</button>
                                    </div>
                                    {ErrorMsg.Consignor_Name && <div className="text-danger mt-1">{ErrorMsg.Consignor_Name}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label>Consignee Name <span style={{ color: "red" }}>*</span></label>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <Select
                                                value={cust.map(item => ({
                                                    value: item.Cust_Id,
                                                    label: item.Cust_Name
                                                })).find(x => String(x.value) === String(props.builtyData.Consignee_Id)) || null}
                                                options={cust.map(item => ({
                                                    value: item.Cust_Id,
                                                    label: item.Cust_Name
                                                }))}
                                                onChange={selectConsignee}
                                            />
                                        </div>
                                        <button className="btn btn-success ms-2" type="button" onClick={openCustomer}>+</button>
                                    </div>
                                    {ErrorMsg.Consignee_Name && <div className="text-danger mt-1">{ErrorMsg.Consignee_Name}</div>}
                                </div>
                            </div>

                            <div className="row g-3 mt-2">
                                <div className="col-md-6">
                                    <label>Consignor Mobile</label>
                                    <input disabled className="form-control" value={props.builtyData.Consignor_Phone_No || ""} />
                                </div>
                                <div className="col-md-6">
                                    <label>Consignee Mobile</label>
                                    <input disabled className="form-control" value={props.builtyData.Consignee_Phone_No || ""} />
                                </div>
                            </div>

                            <div className="row g-3 mt-2">
                                <div className="col-md-6">
                                    <label>Consignor GSTIN</label>
                                    <input disabled className="form-control" value={props.builtyData.Consignor_GST || ""} />
                                </div>
                                <div className="col-md-6">
                                    <label>Consignee GSTIN</label>
                                    <input disabled className="form-control" value={props.builtyData.Consignee_GST || ""} />
                                </div>
                            </div>

                            <div className="row g-3 mt-3">
                                <div className="col-md-3">
                                    <label>Package Value</label>
                                    <input className="form-control" name="Package_Value" value={props.builtyData.Package_Value} onChange={handleChange} />
                                </div>
                                <div className="col-md-3">
                                    <label>Invoice No.</label>
                                    <input className="form-control" name="Invoice_No" value={props.builtyData.Invoice_No} onChange={handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label>Description <span style={{ color: "red" }}>*</span></label>
                                    <textarea rows="4" className={`form-control ${ErrorMsg.Descriptions ? "is-invalid" : ""}`} name="Descriptions" value={props.builtyData.Descriptions} onChange={handleChange} />
                                    {ErrorMsg.Descriptions && <div className="text-danger mt-1">{ErrorMsg.Descriptions}</div>}
                                </div>
                            </div>

                            <div className="row g-3 mt-2">
                                <div className="col-md-6">
                                    <label>E-way Bill</label>
                                    <input className="form-control" name="E_Way_Bill_No" value={props.builtyData.E_Way_Bill_No} onChange={handleChange} />
                                </div>
                                <div className="col-md-3">
                                    <label>Weight</label>
                                    <input className={`form-control ${ErrorMsg.Weight ? "is-invalid" : ""}`} name="Weight" value={props.builtyData.Weight} onChange={handleChange} />
                                    {ErrorMsg.Weight && <div className="text-danger mt-1">{ErrorMsg.Weight}</div>}
                                </div>
                                <div className="col-md-3">
                                    <label>Parcel Quantity <span style={{ color: "red" }}>*</span></label>
                                    <input className={`form-control ${ErrorMsg.Quantity ? "is-invalid" : ""}`} name="Quantity" value={props.builtyData.Quantity} onChange={handleChange} />
                                    {ErrorMsg.Quantity && <div className="text-danger mt-1">{ErrorMsg.Quantity}</div>}
                                </div>
                            </div>

                            <div className="row g-3 mt-2">
                                <div className="col-md-3">
                                    <label>Charge per Parcel <span style={{ color: "red" }}>*</span></label>
                                    <input className={`form-control ${ErrorMsg.Charge_per_parcel ? "is-invalid" : ""}`} name="Charge_per_parcel" value={props.builtyData.Charge_per_parcel} onChange={handleChange} />
                                    {ErrorMsg.Charge_per_parcel && <div className="text-danger mt-1">{ErrorMsg.Charge_per_parcel}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label>Builty Charge (Per Builty)</label>
                                    <input disabled className="form-control" value={props.builtyData.Builty_Charge} />
                                </div>

                                <div className="col-md-3">
                                    <label>Insurance</label>
                                    <input className={`form-control ${ErrorMsg.Insurance ? "is-invalid" : ""}`} name="Insurance" value={props.builtyData.Insurance} onChange={handleChange} />
                                    {ErrorMsg.Insurance && <div className="text-danger mt-1">{ErrorMsg.Insurance}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label>Hamali</label>
                                    <input className={`form-control ${ErrorMsg.Hamali ? "is-invalid" : ""}`} name="Hamali" value={props.builtyData.Hamali} onChange={handleChange} />
                                    {ErrorMsg.Hamali && <div className="text-danger mt-1">{ErrorMsg.Hamali}</div>}
                                </div>
                            </div>

                            <div className="row g-3 mt-2">
                                <div className="col-md-3">
                                    <label>Damrage</label>
                                    <input className={`form-control ${ErrorMsg.Damrage ? "is-invalid" : ""}`} name="Damrage" value={props.builtyData.Damrage} onChange={handleChange} />
                                    {ErrorMsg.Damrage && <div className="text-danger mt-1">{ErrorMsg.Damrage}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label>GST %</label>
                                    <input className={`form-control ${ErrorMsg.GST ? "is-invalid" : ""}`} name="GST" placeholder="GST in %" value={props.builtyData.GST} onChange={handleChange} />
                                    {ErrorMsg.GST && <div className="text-danger mt-1">{ErrorMsg.GST}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label>Payment Status <span style={{ color: "red" }}>*</span></label>
                                    <select className={`form-control ${ErrorMsg.Pay_Status ? "is-invalid" : ""}`} name="Pay_Status" value={props.builtyData.Pay_Status} onChange={handleChange}>
                                        <option value="">-- Payment Status --</option>
                                        <option value="To pay">To pay</option>
                                        <option value="Paid">Paid</option>
                                        <option value="Credit">Credit</option>
                                    </select>
                                    {ErrorMsg.Pay_Status && <div className="text-danger mt-1">{ErrorMsg.Pay_Status}</div>}
                                </div>

                                <div className="col-md-3">
                                    <label>Total</label>
                                    <input disabled className="form-control" value={props.builtyData.Total_Amount} />
                                </div>
                            </div>

                            <div className="mt-4">
                                <div style={{ justifyContent: "end", display: "flex" }}>
                                    <button
                                        className="btn btn-success w-100"
                                        onClick={props.isEdit ? UpdateBuiltyonclick : AddBuiltyonclick}
                                    >
                                        {props.isEdit ? "Update" : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CustomerOffcanvas
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isEdit={customerIsEdit}
                CustData={CustData}
                setCustData={setCustData}
                setCustomerOpen={setCustomerOpen}
            />
        </>
    );
}