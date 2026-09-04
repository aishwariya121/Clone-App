
const { body, validationResult } = require("express-validator");
const CustModel = require("../models/Customer");

//fetch all Customers endpoint api/Cust/GetAllCust
const GetAllCust = async (req, res) => {
    try {
        CustModel.GetAllCust((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }

}

//fetch all Customer detail by Cust Name endpoint api/Cust/GetCustByName
const GetCustByName = async (req, res) => {
    try {
        const { Cust_Name } = req.body;

        CustModel.GetCustByName(Cust_Name, (err, result) => {

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


//GET CUSTOMER BY PHONE NUMBER
const GetCustByPhone = async (Phone_No) => {
    try {
        const result = await new Promise((resolve, reject) => {
            CustModel.GetCustByPhone(Phone_No, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }
            );
        });
        return result;
    }
    catch (error) {
        throw error;
    }
};

const GetCustById = async (Cust_Id) => {
    try {
        const result = await new Promise((resolve, reject) => {
            CustModel.GetCustById(
                Cust_Id,
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
        return result;
    }
    catch (error) {
        throw error;
    }
};

// ADD FUNCTION FOR ADDING CUSTOMER INTO DATABASE  endpoint api/Cust/AddCust
const AddCust = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { Cust_Name, Phone_No, City_Id, GST_No } = req.body;

        // Check Customer by Phone
        const result = await GetCustByPhone(Phone_No);
        // Customer already exists
        if (result.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Customer with this Phone number already exists"
            });
        }

        // Add Customer
        CustModel.AddCust(Cust_Name, Phone_No, City_Id, GST_No,
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                return res.json({
                    success: true,
                    message: "Customer Added Successfully",
                    result: result
                });
            }
        );
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
//UPDATE FUNCTION FOR EDITING CUSTOMER BY CUST ID endpoint api/Cust/UpdateCust
const UpdateCust = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { Cust_Name, Phone_No, City_Id, GST_No, Cust_Id } = req.body;
        CustModel.UpdateCust(Cust_Name, Phone_No, City_Id, GST_No, Cust_Id, (err, result) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            return res.json({
                success: true,
                message: "Customer Updated Successfully",
                result: result
            });
        })
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

//DELETE FUNCTION TO DELETE Customer BY Cust ID  endpoint api/Cust/DeleteCust/:id
const DeleteCust = async (req, res) => {
    try {
        const Cust_Id = req.params.Cust_id;
        // Check Customer
        const result = await GetCustById(Cust_Id);
        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        // Delete Customer
        CustModel.DeleteCust(
            Cust_Id,
            (err, result) => {
                if (err) {
                    console.log("Delete Error", err);

                    return res.status(500).json({
                        error: err.message
                    });
                }
                return res.json({
                    success: true,
                    message: "Customer Deleted Successfully",
                    result: result
                });
            }
        );
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });

    }
};

module.exports = {
    GetAllCust,
    GetCustByName,
    AddCust,
    UpdateCust,
    DeleteCust,
    GetCustByPhone,
    GetCustById
};
