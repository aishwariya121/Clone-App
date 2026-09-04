import React, { useEffect, useContext, useState } from "react";
import Context from "../Context/Context";
import dayjs from "dayjs";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export default function Dashboard() {

  const { builty, GetAllBuilty, GetTotalBuiltyCount, GetTotalPendingBuiltyCount, GetTotalNewCustCount, GetTotalCountByCity, GetTotalCountByOffice, dateFilter, GetBuiltyByDate } = useContext(Context);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(builty.length / rowsPerPage);
  const [CountData, setCountData] = useState({
    TotalBuilty: 0,
    TotalRevenue: 0,
    PendingPayment: 0,
    NewCustomer: 0,
    TotalByCity: [],
    TotalByOffice: [],
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  useEffect(() => {

    if (
      dateFilter.fromDate !== "" &&
      dateFilter.toDate !== ""
    ) {
      fetchDashboardData();
    }

  }, [dateFilter]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A569BD",
    "#E74C3C",
  ];
  useEffect(() => {
    if (dateFilter.fromDate && dateFilter.toDate) {
      GetBuiltyByDate(
        dateFilter.fromDate,
        dateFilter.toDate
      );
    }
  }, [dateFilter.fromDate, dateFilter.toDate]);

  const fetchDashboardData = async () => {

    const [totalBuilty, totalbyCity, totalbyOffice, pendingPayment, newCustomer] = await Promise.all([

      GetTotalBuiltyCount(
        dateFilter.fromDate,
        dateFilter.toDate
      ),

      GetTotalCountByCity(
        dateFilter.fromDate,
        dateFilter.toDate
      ),

      GetTotalCountByOffice(
        dateFilter.fromDate,
        dateFilter.toDate
      ),

      GetTotalPendingBuiltyCount(
        dateFilter.fromDate,
        dateFilter.toDate
      ),

      GetTotalNewCustCount(
        dateFilter.fromDate,
        dateFilter.toDate
      ),
    ]);

    setCountData({
      TotalBuilty: totalBuilty,
      TotalByCity: totalbyCity,
      TotalByOffice: totalbyOffice,
      PendingPayment: pendingPayment,
      NewCustomer: newCustomer,
    });
  };

  return (
    <>
      <h2>Dashboard</h2>

      {/* ---------------------------- Card Section ---------------------------- */}
      <div className="container-fluid mt-4">
        <div className="row g-3">

          {/* Total Builty */}
          <div className="col-4 col-md-2">
            <div
              className="card h-100 shadow-sm"
              style={{
                backgroundColor: "#f3f3f3",
                border: "none",
                borderRadius: "12px",
              }}
            >
              <div className="card-body text-center">
                <h6 className="fw-semibold mb-2">Total Builty</h6>
                <h4 className="fw-bold">{CountData.TotalBuilty}</h4>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="col-4 col-md-2">
            <div
              className="card h-100 shadow-sm"
              style={{
                backgroundColor: "#f3f3f3",
                border: "none",
                borderRadius: "12px",
              }}
            >
              <div className="card-body text-center">
                <h6 className="fw-semibold mb-2">Total Pending</h6>
                <h4 className="fw-bold">{CountData.PendingPayment}</h4>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div className="col-4 col-md-2">
            <div
              className="card h-100 shadow-sm"
              style={{
                backgroundColor: "#f3f3f3",
                border: "none",
                borderRadius: "12px",
              }}
            >
              <div className="card-body text-center">
                <h6 className="fw-semibold mb-2">New Customer</h6>
                <h4 className="fw-bold">{CountData.NewCustomer}</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* -------------------------------------------------------------------- */}

      {/* ----------------------------------- pie chart data display----------------------------------- */}
      <div className="container mt-4">
        <div className="row">

          {/* ---------------- City Chart ---------------- */}
          <div className="col-md-6" style={{ border: "none", backgroundColor: "offwhite" }}>
            <div className="card p-3">
              <h5>Order by City</h5>

              {CountData.TotalByCity.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No Records to Display</h5>
                </div>
              ) : (
                <div className="d-flex align-items-center  ">
                  <PieChart style={{ width: "250px", height: "250px" }}>
                    <Pie
                      data={CountData.TotalByCity.map(item => ({
                        ...item,
                        Revenue: Number(item.Revenue)
                      }))}
                      dataKey="Revenue" nameKey="City_Name" cx="50%" cy="50%" outerRadius={80} >
                      {CountData.TotalByCity.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>

                  <div style={{ minWidth: "180px" }}>
                    {CountData.TotalByCity.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between mr-2 align-items-center mb-2" >
                        <span className="mx-5">
                          <span
                            style={{
                              display: "inline-block",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: COLORS[index % COLORS.length],
                              marginRight: "8px",
                            }} />
                          {item.City_Name}
                        </span>
                        <span className="mx-2">{item.Revenue} ₹</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ---------------- Office Chart ---------------- */}

          <div className="col-md-6">
            <div className="card p-3">
              <h5>Order by Office</h5>

              {CountData.TotalByOffice.length === 0 ? (
                <div className="text-center py-5">
                  <h5>No Records to Display</h5>
                </div>
              ) : (
                <div className="d-flex align-items-center">

                  <PieChart style={{ width: "250px", height: "250px" }}>
                    <Pie
                      data={CountData.TotalByOffice.map(item => ({
                        ...item,
                        Revenue: Number(item.Revenue)
                      }))}
                      dataKey="Revenue"
                      nameKey="Office_Name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                    >
                      {CountData.TotalByOffice.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>

                  <div style={{ minWidth: "180px" }}>
                    {CountData.TotalByOffice.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center mb-2"
                      >
                        <span className="mx-5">
                          <span
                            style={{
                              display: "inline-block",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: COLORS[index % COLORS.length],
                              marginRight: "8px",
                            }}
                          />
                          {item.Office_Name}
                        </span>

                        <span className="mx-3">{item.Revenue} ₹</span>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      {/* -------------------------------------------------------------------------------------------- */}


      {/* ----------------------- Table Display Data -------------------- */}
      <div>
        <table className="table table-responsive mt-5">
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
            </tr>
          </thead>

          <tbody>
            {Array.isArray(builty) && (
              builty.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    <h5>No Records to Display</h5>
                  </td>
                </tr>
              ) : (
                builty.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
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
                      </tr>
                    );
                  })
              )
            )}
          </tbody>
        </table>
      </div>
      {/* -------------------------------------------------------------- */}

      {/* ------------------------------------- Pagination Footer --------------------------------- */}

      <div className="container" style={{ display: "flex", justifyContent: "end" }}>
        <nav className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePrevious} >  Previous</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${page === index ? "active" : ""}`} >
                <button className="page-link" onClick={() => setPage(index)}> {index + 1} </button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleNext} > Next </button>
            </li>
          </ul>

        </nav> <div className="mx-4 mt-3">
          <select className="form-select" style={{ width: "90px" }} value={rowsPerPage} onChange={handleChangeRowsPerPage} >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div></div>

      {/* ------------------------------------------------------------------------------------------- */}
    </>
  );
}