import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slice/AuthSlice";

export default function Login(props) {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [eValidate, setEValidate] = useState("");
    const [pValidate, setPValidate] = useState("");
    const [emsg, setEmsg] = useState("");
    const [pmsg, setPmsg] = useState("");

    const onclicklogin = async (e) => {
        e.preventDefault();

        let valid = true;

        if (credentials.email === "") {
            setEValidate("is-invalid");
            setEmsg("Please provide Email");
            valid = false;
        }
        else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            setEValidate("is-invalid");
            setEmsg("Please enter a valid email.");
            valid = false;
        }
        else {
            setEValidate("");
            setEmsg("");
        }

        if (credentials.password === "") {
            setPValidate("is-invalid");
            setPmsg("Please provide Password");
            valid = false;
        }
        else if (credentials.password.length < 5) {
            setPValidate("is-invalid");
            setPmsg("Password must contain at least 5 characters");
            valid = false;
        }
        else {
            setPValidate("");
            setPmsg("");
        }

        if (!valid) {
            return;
        }

        try {
            const user = await fetch(
                "http://localhost:5000/api/Auth/GetUser",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    })
                }
            );

            const data = await user.json();

            console.log("Login Data:", data);

            //Using Redux to store the login data
            dispatch(
                login({
                    authTokeninClone: data.authTokeninClone,
                    User_Name: data.User_Name,
                    Email: data.Email,
                    Role_Id: data.Role_Id,
                    Role_Name: data.Role_Name,
                    Permissions: data.Permissions || [],
                })
            );
            props.showAlert(
                "Login successful",
                "success"
            );

            setTimeout(() => {
                navigate("/dashboard");
            }, 100);
        }
        catch (error) {
        console.error("Login Error:", error);
            props.showAlert(
                "Something went wrong while login",
                "danger"
            );
        }
    }
   

const onChange = (e) => {
    setEValidate("");
    setPValidate("");

    setcredentials({
        ...credentials,
        [e.target.name]: e.target.value
    });
};

return (
    <div className="container-fluid">
        <div className="row vh-100">
            <div className="col-md-6 d-flex justify-content-center align-items-center">
                <form style={{ width: "70%" }}>
                    <h2 className="mb-4">Login</h2>

                    <div className="mb-3">
                        <label>Email</label>

                        <input
                            type="text"
                            className={`form-control ${eValidate}`}
                            name="email"
                            onChange={onChange}
                        />

                        <div className="invalid-feedback">
                            {emsg}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label>Password</label>

                        <input
                            type="password"
                            className={`form-control ${pValidate}`}
                            name="password"
                            onChange={onChange}
                        />

                        <div className="invalid-feedback">
                            {pmsg}
                        </div>
                    </div>

                    <button
                        className="btn btn-primary w-100"
                        onClick={onclicklogin}
                    >
                        Login
                    </button>
                </form>
            </div>

            <div
                className="col-md-6 d-flex justify-content-center align-items-center"
                style={{ background: "#f5f7fa" }}
            >
                <img
                    src="/BG.png"
                    alt="Ashwamegh Logistics"
                    style={{
                        maxWidth: "80%",
                        maxHeight: "80%",
                        objectFit: "contain"
                    }}
                />
            </div>
        </div>
    </div>
);
}