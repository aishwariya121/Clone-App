import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerOffcanvas from "./CustomerOffcanvas";
import { GetAllCust, GetCustByName } from "../Redux/Slice/CustomerSlice";
import { GetAllCity } from "../Redux/Slice/CitySlice";

export default function Customer() {
    const dispatch = useDispatch();
    const { cust = [] } = useSelector((state) => state.customer);
    const { city = [] } = useSelector((state) => state.city);
    const Permissions = useSelector((state) => state.auth.Permissions);
    const [CustData, setCustData] = useState({ Cust_Id: "", Cust_Name: "", Phone_No: "", City_Id: "", GST_No: "" });
    const [isEdit, setIsEdit] = useState(false);
    const [searchCust, setSearchCust] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const hasPermission = (moduleName, permissionName) => Permissions.some((permission) => permission.Module_Name === moduleName && permission.Permission_Name === permissionName);
    const canGet = hasPermission("Customer", "Get");
    const canCreate = hasPermission("Customer", "Create");
    const canUpdate = hasPermission("Customer", "Update");
    const totalPages = Math.ceil(cust.length / rowsPerPage);

    useEffect(() => {
        dispatch(GetAllCity());
    }, [dispatch]);

    useEffect(() => {
        if (canGet) dispatch(GetAllCust());
    }, [dispatch, canGet]);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handlePrevious = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const openAddCustomer = () => {
        setIsEdit(false);
        setCustData({ Cust_Id: "", Cust_Name: "", Phone_No: "", City_Id: "", GST_No: "" });
        setIsOpen(true);
    };

    const openEditCustomer = (item) => {
        setIsEdit(true);
        setCustData({ Cust_Id: item.Cust_Id, Cust_Name: item.Cust_Name, Phone_No: item.Phone_No, GST_No: item.GST_No || "", City_Id: item.City_Id });
        setIsOpen(true);
    };

    const handleSearch = (value) => {
        setSearchCust(value);
        setPage(0);
        if (value.trim() === "") {
            setIsSearching(false);
            dispatch(GetAllCust());
        } else {
            setIsSearching(true);
            dispatch(GetCustByName(value));
        }
    };

    if (!canGet) {
        return <div className="container mt-5 text-center"><h5>You don't have permission to view Customer.</h5></div>;
    }

    return (
        <>
            <CustomerOffcanvas isOpen={isOpen} setIsOpen={setIsOpen} isEdit={isEdit} CustData={CustData} setCustData={setCustData} city={city} />
            <div className="row mb-3">
                <div className="col-md-6"><h2>Customer</h2></div>
                <div className="col-md-6 d-flex justify-content-end" style={{ paddingRight: "2rem" }}>
                    {canCreate && <div className="d-flex"><button className="btn btn-success" onClick={openAddCustomer}>Add Customer</button></div>}
                </div>
            </div>
            <div className="mx-5 mb-4">
                <input type="text" className="form-control" placeholder="Search Customer by Name" value={searchCust} onChange={(e) => handleSearch(e.target.value)} />
            </div>
            <div>
                <table className="table table-hover" style={{ justifyContent: "center" }}>
                    <thead>
                        <tr><th>Name</th><th>Phone</th>{canUpdate && <th>Action</th>}</tr>
                    </thead>
                    <tbody>
                        {cust.length > 0 ? cust.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                            <tr key={item.Cust_Id || index}>
                                <td>{item.Cust_Name}</td>
                                <td>{item.Phone_No}</td>
                                {canUpdate && <td><img src="./edit.png" alt="edit" style={{ cursor: "pointer" }} onClick={() => openEditCustomer(item)} /></td>}
                            </tr>
                        )) : (
                            <tr><td colSpan={canUpdate ? "3" : "2"} className="text-center"><h6>{isSearching ? "No Customer Found" : "No Records to Display"}</h6></td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="container" style={{ display: "flex", justifyContent: "end" }}>
                <nav className="mt-3">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${page === 0 ? "disabled" : ""}`}><button className="page-link" onClick={handlePrevious}>Previous</button></li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className={`page-item ${page === index ? "active" : ""}`}><button className="page-link" onClick={() => setPage(index)}>{index + 1}</button></li>
                        ))}
                        <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}><button className="page-link" onClick={handleNext}>Next</button></li>
                    </ul>
                </nav>
                <div className="mx-4 mt-3">
                    <select className="form-select" style={{ width: "90px" }} value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                        <option value={10}>10</option><option value={20}>20</option><option value={50}>50</option>
                    </select>
                </div>
            </div>
        </>
    );
}