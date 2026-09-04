const OfficeModel = require("../models/Office");
const { body, validationResult } = require("express-validator");

const GetAllOffices = async (req, res) => {
    try {
        OfficeModel.GetAllOffices((err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            return res.json({
                success: true,
                result: result || []
            });
        });
    } catch (error) {
        console.error("GetAllOffices CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetOffice = async (req, res) => {
    try {
        const Office_Id = req.params.id;
        console.log("Office_Id:", Office_Id);
        OfficeModel.GetOffice(Office_Id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Office not found"
                });
            }
            return res.json({
                success: true,
                result: result[0]
            });
        });
    } catch (error) {
        console.error("GetOffice CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const AddOffice = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { Office_Name, City_Id } = req.body;
        OfficeModel.AddOffice(Office_Name, City_Id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            return res.json({
                success: true,
                message: "Office Added Successfully"
            });
        });
    } catch (error) {
        console.error("AddOffice CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const UpdateOffice = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { Office_Id, City_Id, Office_Name } = req.body;
        console.log("Office_Id:", Office_Id);
        console.log("Office_Name:", Office_Name);
        console.log("City_Id:", City_Id);
        OfficeModel.UpdateOffice(Office_Id, City_Id, Office_Name, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            return res.json({
                success: true,
                message: "Office Updated Successfully"
            });
        });
    } catch (error) {
        console.error("UpdateOffice CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const DeleteOffice = async (req, res) => {
    try {
        const Office_Id = req.params.id;
        OfficeModel.DeleteOffice(Office_Id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            return res.json({
                success: true,
                message: "Office Deleted Successfully"
            });
        });
    } catch (error) {
        console.error("DeleteOffice CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    GetAllOffices,
    GetOffice,
    AddOffice,
    UpdateOffice,
    DeleteOffice
};