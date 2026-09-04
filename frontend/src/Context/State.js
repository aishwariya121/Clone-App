
import Context from "./Context";
import React, { useState } from "react";


const State = (props) => {
  //  const host = "http://localhost:5000";
  const host = "https://clone-app-238n.onrender.com";  
  const notInitials = [];

    const [dateFilter, setDateFilter] = useState({
        type: "today",
        fromDate: "",
        toDate: "",
    });
    const [builty, setBuilty] = useState(notInitials);
    const [city, setCity] = useState(notInitials);
    const [states, setStates] = useState(notInitials);
    const [cust, setCust] = useState(notInitials);
    const [office, setOffice] = useState(notInitials);
    const [user, setuser] = useState(notInitials);
    const [isOpen, setisOpen] = useState(false);
    const [roles, setroles] = useState(notInitials);
    const [Permissions, setPermissions] = useState([]);


    //------------------------------------- Role ---------------------------------------------------

    //Fetch all the Permissions
    const GetAllPermissions = async () => {
        const response = await fetch(`${host}/api/Role/GetAllPermissions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        console.log("permisiions : ", data)
        setPermissions(data.result || [])
        return data;
    }

    //Get all permisssions by Role_Id
    const GetRolePermissions = async (Role_Id) => {

        const response = await fetch(
            `${host}/api/Role/GetRolePermissions/${Role_Id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        const data = await response.json();

        return data.result;
    };

    //Fetch all the roles
    const GetAllRoles = async () => {
        const response = await fetch(`${host}/api/Role/GetAllRoles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        setroles(data.result || [])
        return data;
    }

    //Add Role
    const AddRole = async (Role_Name, Role_Description, Permissions) => {
        const response = await fetch(`${host}/api/Role/AddRole`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Role_Name, Role_Description, Permissions })
        });
        const data = await response.json();
        GetAllRoles();
        return data;

    }

    //Update Role
    const UpdateRole = async (Role_Name, Role_Description, Permissions, Role_Id) => {
        const response = await fetch(`${host}/api/Role/UpdateRole`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Role_Name, Role_Description, Permissions, Role_Id })
        });
        await response.json();
        GetAllRoles();
    }
    //Get role by id 
    const GetRoleById = async (Role_Id) => {

        const response = await fetch(`${host}/api/Role/GetRoleById/${Role_Id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    }
    //Delete Role 
    const DeleteRole = async (Role_Id) => {

        const response = await fetch(`${host}/api/Role/DeleteRole/${Role_Id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    }

    // -------------------------------------------------------------------------------------------------

    //------------------------------------- User ---------------------------------------------------

    //Fetch all the Users
    const GetAllUser = async () => {
        const response = await fetch(`${host}/api/Auth/GetAllUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        setuser(data.result || [])
        return data;
    }

    //Add User
    const AddUser = async (User_Name, Email, Password, Role_Id) => {
        const response = await fetch(`${host}/api/Auth/AddUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ User_Name, Email, Password, Role_Id })
        });
        await response.json();
        GetAllUser();
    }

    //Update user
    const UpdateUser = async (User_Name, Email, Password, Role_Id, User_Id) => {
        const response = await fetch(`${host}/api/Auth/UpdateUser`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ User_Name, Email, Password, Role_Id, User_Id })
        });

        await response.json();
        GetAllUser();
    }
    //Get User by id 
    const GetUserById = async (User_Id) => {

        const response = await fetch(`${host}/api/Auth/GetUserById/${User_Id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    }


    //Delete User 
    const DeleteUser = async (User_Id) => {

        const response = await fetch(`${host}/api/Auth/DeleteUser/${User_Id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    }


    // -------------------------------------------------------------------------------------------------



       //----------------------------------------Dashboard--------------------------------------------

    //fetch total builty count by date range from backend api..
    const GetTotalBuiltyCount = async (From_Date, To_Date) => {
        try {
            const response = await fetch(`${host}/api/Dashboard/GetTotalBuiltyCount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ From_Date, To_Date })
            });
            const data = await response.json();
            console.log("GetTotalBuiltyCount RESPONSE:", data);
            if (!response.ok) {
                throw new Error(data.error || data.message || "Failed to get builty count");
            }
            return data.result?.[0]?.Count || 0;
        } catch (error) {
            console.error("GetTotalBuiltyCount ERROR:", error);
            return 0;
        }
    };

    //fetch total pending builty count by date range from backend api..
    const GetTotalPendingBuiltyCount = async (From_Date, To_Date) => {
        try {
            const response = await fetch(`${host}/api/Dashboard/GetTotalPendingBuiltyCount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ From_Date, To_Date })
            });
            const data = await response.json();
            console.log("GetTotalPendingBuiltyCount RESPONSE:", data);
            if (!response.ok) {
                throw new Error(data.error || data.message || "Failed to get pending builty count");
            }
            return data.result?.[0]?.Count || 0;
        } catch (error) {
            console.error("GetTotalPendingBuiltyCount ERROR:", error);
            return 0;
        }
    };

    //fetch total New customer count by date range from backend api..
    const GetTotalNewCustCount = async (From_Date, To_Date) => {
        try {
            const response = await fetch(`${host}/api/Dashboard/GetTotalNewCustCount`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ From_Date, To_Date })
            });
            const data = await response.json();
            console.log("GetTotalNewCustCount RESPONSE:", data);
            if (!response.ok) {
                throw new Error(data.error || data.message || "Failed to get new customer count");
            }
            return data.result?.[0]?.Count || 0;
        } catch (error) {
            console.error("GetTotalNewCustCount ERROR:", error);
            return 0;
        }
    };

    //fetch total revenue for city by date range from backend api..
    const GetTotalCountByCity = async (From_Date, To_Date) => {
        try {
            const response = await fetch(`${host}/api/Dashboard/GetTotalCountByCity`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ From_Date, To_Date })
            });
            const data = await response.json();
            console.log("GetTotalCountByCity RESPONSE:", data);
            if (!response.ok) {
                throw new Error(data.error || data.message || "Failed to get city count");
            }
            return data.result || [];
        } catch (error) {
            console.error("GetTotalCountByCity ERROR:", error);
            return [];
        }
    };

    //fetch total revenue count for officies by date range from backend api..
    const GetTotalCountByOffice = async (From_Date, To_Date) => {
        try {
            const response = await fetch(`${host}/api/Dashboard/GetTotalCountByOffice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ From_Date, To_Date })
            });
            const data = await response.json();
            console.log("GetTotalCountByOffice RESPONSE:", data);
            if (!response.ok) {
                throw new Error(data.error || data.message || "Failed to get office count");
            }
            return data.result || [];
        } catch (error) {
            console.error("GetTotalCountByOffice ERROR:", error);
            return [];
        }
    };

    //---------------------------------------------------------------------------------------------

    //------------------------------------------ Builty -------------------------------------------

    //fetch all Builties from backend api..
    const GetAllBuilty = async () => {
        console.log("GetAllBuilty Called");
        const response = await fetch(`${host}/api/Builty/GetAllBuilty`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        console.log(data);
        setBuilty(data.result || []);
    }

    //fetch builty by Builty_Id from backend api..
    const GetBuiltyById = async (Builty_Id) => {

        const response = await fetch(`${host}/api/Builty/GetBuiltyById`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Builty_Id })
        });

        const data = await response.json();
        console.log(data);
        setBuilty(data.result || []);
    }

    //fetch builty by date range from backend api..
    const GetBuiltyByDate = async (From_Date, To_Date) => {
        try {
            const response = await fetch(`${host}/api/Builty/GetBuiltyByDate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ From_Date, To_Date })
            });
            const data = await response.json();
            console.log("GetBuiltyByDate RESPONSE:", data);
            if (!response.ok) {
                throw new Error(data.error || data.message || "Failed to get builty");
            }
            setBuilty(data.result || []);
        } catch (error) {
            console.error("GetBuiltyByDate ERROR:", error);
            setBuilty([]);
        }
    };

    //fetch builty by Consignor Name from backend api..
    const GetBuiltyByConsignor = async (Consignor_Name) => {

        const response = await fetch(`${host}/api/Builty/GetBuiltyByConsignor`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Consignor_Name })
        });

        const data = await response.json();
        console.log(data);
        setBuilty(data.result || []);
    }

    //fetch builty by Consignee Name from backend api..
    const GetBuiltyByConsignee = async (Consignee_Name) => {

        const response = await fetch(`${host}/api/Builty/GetBuiltyByConsignee`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Consignee_Name })
        });

        const data = await response.json();
        console.log(data);
        setBuilty(data.result || []);
    }

    //fetch builty by payment Status from backend api..
    const GetBuiltyByPay_Status = async (Pay_Status) => {

        const response = await fetch(`${host}/api/Builty/GetBuiltyByPay_Status`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Pay_Status })
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setBuilty(data.result || []);
        }
    }

    //fetch builty by payment Status from backend api..
    const GetBuiltyBy_From_Office = async (From_Office_Name) => {

        const response = await fetch(`${host}/api/Builty/GetBuiltyBy_From_Office`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ From_Office_Name })
        });

        const data = await response.json();
        console.log(data);
        setBuilty(data.result || []);
    }

    //fetch builty by To ofiice from backend api..
    const GetBuiltyBy_To_Office = async (To_Office_Name) => {

        const response = await fetch(`${host}/api/Builty/GetBuiltyBy_To_Office`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ To_Office_Name })

        });
        console.log("office name : ", To_Office_Name)

        const data = await response.json();
        console.log("resul : ", data);
        setBuilty(data.result || []);
    }

    //Add builty 
    const AddBuilty = async (
        From_Office_Id,
        From_Office_Name,
        To_Office_Id,
        To_Office_Name,
        Builty_Date,
        Truck_No,
        Consignor_Id,
        Consignor_Name,
        Consignor_Phone_No,
        Consignor_GST,
        Consignee_Id,
        Consignee_Name,
        Consignee_Phone_No,
        Consignee_GST,
        Package_Value,
        Invoice_No,
        E_Way_Bill_No,
        Weight,
        Quantity,
        Charge_per_parcel,
        Descriptions,
        Builty_Charge,
        Insurance,
        Hamali,
        Damrage,
        GST,
        Pay_Status,
        Total_Amount, State_Id) => {
        const response = await fetch(`${host}/api/Builty/AddBuilty`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                From_Office_Id,
                From_Office_Name,
                To_Office_Id,
                To_Office_Name,
                Builty_Date,
                Truck_No,
                Consignor_Id,
                Consignor_Name,
                Consignor_Phone_No,
                Consignor_GST,
                Consignee_Id,
                Consignee_Name,
                Consignee_Phone_No,
                Consignee_GST,
                Package_Value,
                Invoice_No,
                E_Way_Bill_No,
                Weight,
                Quantity,
                Charge_per_parcel,
                Descriptions,
                Builty_Charge,
                Insurance,
                Hamali,
                Damrage,
                GST,
                Pay_Status,
                Total_Amount
            })
        });
        await response.json();

    }

    //Update Builty  
    const UpdateBuilty = async (
        From_Office_Id,
        From_Office_Name,
        To_Office_Id,
        To_Office_Name,
        Builty_Date,
        Truck_No,
        Consignor_Id,
        Consignor_Name,
        Consignor_Phone_No,
        Consignor_GST,
        Consignee_Id,
        Consignee_Name,
        Consignee_Phone_No,
        Consignee_GST,
        Package_Value,
        Invoice_No,
        E_Way_Bill_No,
        Weight,
        Quantity,
        Charge_per_parcel,
        Descriptions,
        Builty_Charge,
        Insurance,
        Hamali,
        Damrage,
        GST,
        Pay_Status,
        Total_Amount, Builty_Id) => {
        const response = await fetch(`${host}/api/Builty/UpdateBuilty`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                From_Office_Id,
                From_Office_Name,
                To_Office_Id,
                To_Office_Name,
                Builty_Date,
                Truck_No,
                Consignor_Id,
                Consignor_Name,
                Consignor_Phone_No,
                Consignor_GST,
                Consignee_Id,
                Consignee_Name,
                Consignee_Phone_No,
                Consignee_GST,
                Package_Value,
                Invoice_No,
                E_Way_Bill_No,
                Weight,
                Quantity,
                Charge_per_parcel,
                Descriptions,
                Builty_Charge,
                Insurance,
                Hamali,
                Damrage,
                GST,
                Pay_Status,
                Total_Amount,
                Builty_Id
            })
        });
        await response.json();

    }

    //Delete builty
    const DeleteBuilty = async (Builty_Id) => {

        const response = await fetch(`${host}/api/Builty/DeleteBuilty/${Builty_Id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();

    }

    //----------------------------------------------------------------------------------------------

    //------------------------------------- City ---------------------------------------------------

    //fetch all states
    const GetAllState = async () => {
        const response = await fetch(`${host}/api/City/GetAllState`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();

        setStates(data.result);
    }

    //Fetch all the cities
    const GetAllCity = async () => {
        try {
            const response = await fetch(`${host}/api/City/GetAllCity`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok && Array.isArray(data.result)) {
                setCity(data.result);
            } else {
                console.log("City API Error:", data);
            }
        } catch (error) {
            console.log("GetAllCity Error:", error);
        }
    };

    //Add City
    const AddCity = async (City_Name, State_Id) => {
        const response = await fetch(`${host}/api/City/AddCity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ City_Name, State_Id })
        });

        await response.json();

        GetAllCity();
    }

    //Update City
    const UpdateCity = async (City_Name, State_Id, City_Id) => {
        const response = await fetch(`${host}/api/City/UpdateCity`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ City_Name, State_Id, City_Id })
        });

        await response.json();

        GetAllCity();
    }

    // -------------------------------------------------------------------------------------------------

    //------------------------------------------ Customer ----------------------------------------------
    //Fetch all customers 
    const GetAllCust = async () => {
        const response = await fetch(`${host}/api/Cust/GetAllCust`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();

        setCust(data.result);

    }

    //Get customer by cust name
    const GetCustByName = async (Cust_Name) => {
        const response = await fetch(`${host}/api/Cust/GetCustByName`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Cust_Name })
        });
        const data = await response.json();
        setCust(data.result);

    }

    //Add customer 
    const AddCust = async (Cust_Name, Phone_No, City_Id, GST_No) => {
        const response = await fetch(`${host}/api/Cust/AddCust`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Cust_Name, Phone_No, City_Id, GST_No })
        });
        await response.json();
        GetAllCust();
    }

    //Update customer 
    const UpdateCust = async (Cust_Name, Phone_No, City_Id, GST_No, Cust_Id) => {
        const response = await fetch(`${host}/api/Cust/UpdateCust`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Cust_Name, Phone_No, City_Id, GST_No, Cust_Id })
        });
        await response.json();
        GetAllCust();
    }

    //Delete Customer 
    const DeleteCust = async (Cust_Id) => {

        const response = await fetch(`${host}/api/Cust/DeleteCust/${Cust_Id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        console.log("resul : ", data);
        setBuilty(data.result || []);
    }

    //--------------------------------------------------------------------------------------------------

    //----------------------------------------  Office  -------------------------------------------------

    //get all offices
    const GetAllOffices = async () => {
        const response = await fetch(`${host}/api/Office/GetAllOffices`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        console.log("office from state :", data.result)
        setOffice(data.result);
    }

    //Add office
    const AddOffice = async (Office_Name, City_Id) => {
        const response = await fetch(`${host}/api/Office/AddOffice`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Office_Name, City_Id })
        });
        await response.json();
        GetAllOffices();
    }

    //Update office
    const UpdateOffice = async (Office_Name, City_Id, Office_Id) => {
        const response = await fetch(`${host}/api/Office/UpdateOffice`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Office_Name, City_Id, Office_Id })
        });
        await response.json();
        GetAllOffices();
    }

    //----------------------------------------------------------------------------------------------------

    return (
        <Context.Provider value={{ Permissions, GetRolePermissions, GetAllPermissions, roles, GetAllRoles, AddRole, UpdateRole, GetRoleById, DeleteRole, isOpen, user, GetAllUser, GetUserById, AddUser, UpdateUser, DeleteUser, dateFilter, setDateFilter, GetTotalBuiltyCount, GetTotalPendingBuiltyCount, GetTotalNewCustCount, GetTotalCountByCity, GetTotalCountByOffice, DeleteCust, DeleteBuilty, GetBuiltyById, GetBuiltyByDate, GetBuiltyByConsignor, GetBuiltyByConsignee, GetBuiltyByPay_Status, GetBuiltyBy_From_Office, GetBuiltyBy_To_Office, UpdateBuilty, AddBuilty, UpdateCity, AddOffice, UpdateOffice, office, GetAllOffices, AddCust, UpdateCust, GetCustByName, builty, GetAllBuilty, city, GetAllCity, states, GetAllState, AddCity, cust, GetAllCust }}>
            {props.children}
        </Context.Provider>
    )
}
export default State;