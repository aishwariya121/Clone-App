import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ExportExcel from "./Export/ExportExcel";
import ExportPdf from "./Export/ExportPdf";
import {
    GetAllBuilty,
    GetBuiltyById,
    GetBuiltyByDate,
    GetBuiltyByConsignor,
    GetBuiltyByConsignee,
    GetBuiltyByPay_Status,
    GetBuiltyBy_From_Office,
    GetBuiltyBy_To_Office,
    DeleteBuilty
} from "../Redux/Slice/BuiltySlice";
import BuiltyModal from "./BuiltyModal";

export default function BuiltyReport(props) {
    const dispatch = useDispatch();
    const builty = useSelector(state => state.builty?.builty || []);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalPages = Math.ceil(builty.length / rowsPerPage);
    const [isEdit, setIsEdit] = useState(false);

    const [builtyData, setbuiltyData] = useState({
        From_Office_Id: "",
        From_Office_Name: "",
        To_Office_Id: "",
        To_Office_Name: "",
        Builty_Date: dayjs().format("YYYY-MM-DD"),
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
    });

    const [Filter, setFilter] = useState({
        Builty_Id: "",
        Consignor_Name: "",
        Consignee_Name: "",
        Pay_Status: "",
        From_Office_Name: "",
        To_Office_Name: "",
        From_Date: null,
        To_Date: null
    });

    useEffect(() => {
        dispatch(GetAllBuilty());
    }, [dispatch]);

    useEffect(() => {
        if (Filter.From_Date && Filter.To_Date) {
            dispatch(GetBuiltyByDate({
                fromDate: Filter.From_Date.format("YYYY-MM-DD"),
                toDate: Filter.To_Date.format("YYYY-MM-DD")
            }));
        }
    }, [Filter.From_Date, Filter.To_Date, dispatch]);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onResetClick = async () => {
        setFilter({
            Builty_Id: "",
            Consignor_Name: "",
            Consignee_Name: "",
            Pay_Status: "",
            From_Office_Name: "",
            To_Office_Name: "",
            From_Date: null,
            To_Date: null
        });
        setPage(0);
        await dispatch(GetAllBuilty());
    };

    const handlePrevious = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const onChangename = (e) => {
        const { name, value } = e.target;

        setFilter({
            Builty_Id: "",
            Consignor_Name: "",
            Consignee_Name: "",
            Pay_Status: "",
            From_Office_Name: "",
            To_Office_Name: "",
            From_Date: null,
            To_Date: null,
            [name]: value
        });

        if (value === "") {
            dispatch(GetAllBuilty());
            return;
        }

        switch (name) {
            case "Builty_Id":
                dispatch(GetBuiltyById(value));
                break;
            case "Consignor_Name":
                dispatch(GetBuiltyByConsignor(value));
                break;
            case "Consignee_Name":
                dispatch(GetBuiltyByConsignee(value));
                break;
            case "Pay_Status":
                dispatch(GetBuiltyByPay_Status(value));
                break;
            case "From_Office_Name":
                dispatch(GetBuiltyBy_From_Office(value));
                break;
            case "To_Office_Name":
                dispatch(GetBuiltyBy_To_Office(value));
                break;
            default:
                break;
        }
    };

    return (
        <>
            <BuiltyModal
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                builtyData={builtyData}
                setbuiltyData={setbuiltyData}
                dateFilter={{
                    fromDate: Filter.From_Date ? Filter.From_Date.format("YYYY-MM-DD") : null,
                    toDate: Filter.To_Date ? Filter.To_Date.format("YYYY-MM-DD") : null
                }}
                showAlert={props.showAlert}
            />

            <div className="row mb-3">
                <div className="col-md-6">
                    <h2>Builty Report</h2>
                </div>
                <div className="col-md-6 d-flex justify-content-end gap-2">
                    <ExportPdf data={builty} />
                    <ExportExcel data={builty} />
                </div>
            </div>

            <div className="conatiner">
                <div className="mt-5">
                    <div className="row mt-3">
                        <div className="mb-4 col-md-3">
                            <input type="text" className="form-control" placeholder="Enter Builty Id" name="Builty_Id" value={Filter.Builty_Id} onChange={onChangename} />
                        </div>
                        <div className="mb-3 col-md-3">
                            <input type="text" className="form-control" placeholder="Consignor Name" name="Consignor_Name" value={Filter.Consignor_Name} onChange={onChangename} />
                        </div>
                        <div className="mb-3 col-md-3">
                            <input type="text" className="form-control" placeholder="Consignee Name" name="Consignee_Name" value={Filter.Consignee_Name} onChange={onChangename} />
                        </div>
                        <div className="mb-3 col-md-3">
                            <input type="text" className="form-control" placeholder="Payment Status" name="Pay_Status" value={Filter.Pay_Status} onChange={onChangename} />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="mb-3 col-md-3">
                            <input type="text" className="form-control" placeholder="From Office" name="From_Office_Name" value={Filter.From_Office_Name} onChange={onChangename} />
                        </div>
                        <div className="mb-3 col-md-3">
                            <input type="text" className="form-control" placeholder="To Office" name="To_Office_Name" value={Filter.To_Office_Name} onChange={onChangename} />
                        </div>

                        <div className="mb-3 col-md-3">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="From Date"
                                    value={Filter.From_Date}
                                    format="DD-MM-YYYY"
                                    onChange={(newValue) => setFilter({ ...Filter, From_Date: newValue })}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: "small"
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="mb-3 col-md-3">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="To Date"
                                    value={Filter.To_Date}
                                    format="DD-MM-YYYY"
                                    onChange={(newValue) => setFilter({ ...Filter, To_Date: newValue })}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: "small"
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="container mt-2">
                            <button className="col-md-2 btn btn-secondary" onClick={onResetClick}>
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-scroll">
                <table className="table table-bordered table-hover mt-4">
                    <thead>
                        <tr>
                            <th>Builty NO.</th>
                            <th>Consignor</th>
                            <th>Consignee</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Oty.</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(builty) && (
                            builty.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        <h5>No Records to Display</h5>
                                    </td>
                                </tr>
                            ) : (
                                builty.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                                    <tr key={item.Builty_Id}>
                                        <td>{item.Builty_Id}</td>
                                        <td>{item.Consignor_Name}</td>
                                        <td>{item.Consignee_Name}</td>
                                        <td>{item.From_Office_Name}</td>
                                        <td>{item.To_Office_Name}</td>
                                        <td>{item.Quantity}</td>
                                        <td>{dayjs(item.Builty_Date).format("YYYY-MM-DD")}</td>
                                        <td>{item.Total_Amount}</td>
                                        <td>{item.Pay_Status}</td>

                                        <td>
                                            <img
                                                src="./edit.png"
                                                alt="edit"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setIsEdit(true);
                                                    setbuiltyData({
                                                        Builty_Id: item.Builty_Id || "",
                                                        From_Office_Id: item.From_Office_Id || "",
                                                        From_Office_Name: item.From_Office_Name || "",
                                                        To_Office_Id: item.To_Office_Id || "",
                                                        To_Office_Name: item.To_Office_Name || "",
                                                        Consignor_Id: item.Consignor_Id || "",
                                                        Consignee_Id: item.Consignee_Id || "",
                                                        Consignor_Name: item.Consignor_Name || "",
                                                        Consignee_Name: item.Consignee_Name || "",
                                                        Consignor_Phone_No: item.Consignor_Phone_No || "",
                                                        Consignee_Phone_No: item.Consignee_Phone_No || "",
                                                        Consignor_GST: item.Consignor_GST || "",
                                                        Consignee_GST: item.Consignee_GST || "",
                                                        Package_Value: item.Package_Value ?? "",
                                                        Invoice_No: item.Invoice_No || "",
                                                        E_Way_Bill_No: item.E_Way_Bill_No || "",
                                                        Weight: item.Weight ?? "",
                                                        Quantity: item.Quantity ?? "",
                                                        Charge_per_parcel: item.Charge_per_parcel ?? "",
                                                        Descriptions: item.Descriptions || "",
                                                        Builty_Charge: item.Builty_Charge ?? 20,
                                                        Insurance: item.Insurance ?? 0,
                                                        Hamali: item.Hamali ?? 0,
                                                        Damrage: item.Damrage ?? 0,
                                                        GST: item.GST ?? 0,
                                                        Pay_Status: item.Pay_Status || "",
                                                        Total_Amount: item.Total_Amount ?? 0,
                                                        Truck_No: item.Truck_No || "",
                                                        Builty_Date: item.Builty_Date ? dayjs(item.Builty_Date).format("YYYY-MM-DD") : ""
                                                    });
                                                }}
                                            />

                                            <img
                                                className="mx-3"
                                                src="./delete.png"
                                                alt="delete"
                                                style={{ cursor: "pointer" }}
                                                onClick={async () => {
                                                    if (window.confirm("Are you sure you want to delete this Builty?")) {
                                                        const result = await dispatch(DeleteBuilty(item.Builty_Id));
                                                        if (DeleteBuilty.fulfilled.match(result)) {
                                                            await dispatch(GetAllBuilty());
                                                            props.showAlert("Builty Deleted Successfully", "success");
                                                        }
                                                    }
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <div className="container" style={{ display: "flex", justifyContent: "end" }}>
                <nav className="mt-3">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={handlePrevious}>Previous</button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${page === index ? "active" : ""}`}>
                                <button className="page-link" onClick={() => setPage(index)}>{index + 1}</button>
                            </li>
                        ))}

                        <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
                            <button className="page-link" onClick={handleNext}>Next</button>
                        </li>
                    </ul>
                </nav>

                <div className="mx-4 mt-3">
                    <select className="form-select" style={{ width: "90px" }} value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>
        </>
    );
}