import React from "react";

export default function Alert({ alert }) {

    if (!alert) {
        return null;
    }

    return (
        <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
            style={{
                position: "fixed",
                top: "70px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 9999,
                minWidth: "350px",
                textAlign: "center",
            }}
        >
            {alert.msg}
        </div>
    );
}