
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Context from "../Context/Context";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Slice/AuthSlice";

export default function Navbar() {

  const [filterType, setFilterType] = useState("today");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { dateFilter, setDateFilter } = useContext(Context);
  const User_Name = useSelector((state) => state.auth.User_Name);
  const navigate = useNavigate();
  
  
  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login")
  }
  
  const location = useLocation();
  useEffect(() => {
  }, [location]);

  useEffect(() => {

    const today = new Date();

    if (filterType === "today") {
      const date = today.toISOString().slice(0, 10);
      setDateFilter({ fromDate: date, toDate: date });
    }

    else if (filterType === "month") {

      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10);
      setDateFilter({
        fromDate: firstDay, toDate: lastDay,
      });
    }

    else if (filterType === "year") {
      const firstDay = `${today.getFullYear()}-01-01`;
      const lastDay = `${today.getFullYear()}-12-31`;
      setDateFilter({ fromDate: firstDay, toDate: lastDay });
    }

    else if (
      filterType === "custom" && fromDate !== "" && toDate !== "") {
      setDateFilter({ fromDate, toDate });
    }
  }, [filterType, fromDate, toDate]);

const dispatch = useDispatch();

  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >

      <div className="d-flex align-items-center">
        <img
          src="./horse.png"
          alt=""
          style={{ height: "30px", width: "30px" }}
        />
        <b className="ms-2">Ashwamegh Logistics</b>
      </div>

      <div className="d-flex align-items-center ms-auto flex-wrap gap-2">

        <h5 className="mb-0">
          Welcome  {User_Name ? User_Name : "User"}
        </h5>

        <select
          className="form-select"
          style={{ width: "140px" }}
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
          <option value="custom">Custom</option>
        </select>

        {filterType === "custom" && (
          <>
            <input
              type="date"
              className="form-control"
              style={{ width: "160px" }}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />

            <input
              type="date"
              className="form-control"
              style={{ width: "160px" }}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </>
        )}

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>
  )
}



