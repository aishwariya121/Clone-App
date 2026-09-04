const RoleModel = require("../models/Role");
const { validationResult } = require("express-validator");

const GetAllPermissions = async (req, res) => {
    try {
        RoleModel.GetAllPermissions((err, result) => {
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
        console.error("GetAllPermissions CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetRolePermissions = async (req, res) => {
    try {
        const Role_Id = req.params.Role_Id;
        RoleModel.GetRolePermissions(Role_Id, (err, result) => {
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
        console.error("GetRolePermissions CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetAllRoles = async (req, res) => {
    try {
        RoleModel.GetAllRoles((err, result) => {
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
        console.error("GetAllRoles CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const AddRole = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { Role_Name, Role_Description, Permissions } = req.body;
        RoleModel.AddRole(Role_Name, Role_Description, Permissions, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            return res.json({
                success: true,
                message: "Role Added successfully."
            });
        });
    } catch (error) {
        console.error("AddRole CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const UpdateRole = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { Role_Name, Role_Description, Permissions, Role_Id } = req.body;
        RoleModel.UpdateRole(Role_Name, Role_Description, Permissions, Role_Id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            return res.json({
                success: true,
                message: "Role Updated successfully.",
                result: result
            });
        });
    } catch (error) {
        console.error("UpdateRole CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const DeleteRole = async (req, res) => {
    try {
        const Role_Id = req.params.Role_Id;
        RoleModel.GetRoleById(Role_Id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }
            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Role not found"
                });
            }
            RoleModel.DeleteRole(Role_Id, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: err.message
                    });
                }
                return res.json({
                    success: true,
                    message: "Role Deleted Successfully"
                });
            });
        });
    } catch (error) {
        console.error("DeleteRole CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    GetAllPermissions,
    GetRolePermissions,
    GetAllRoles,
    AddRole,
    UpdateRole,
    DeleteRole
};