const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    GetAllPermissions,
    GetRolePermissions,
    GetAllRoles,
    AddRole,
    UpdateRole,
    DeleteRole
} = require("../Controller/Role");

router.get("/GetAllPermissions", GetAllPermissions);

router.get("/GetRolePermissions/:Role_Id", GetRolePermissions);

router.get("/GetAllRoles", GetAllRoles);

router.post(
    "/AddRole",
    [
        body("Role_Name", "Role name cannot be blank").notEmpty(),
        body("Role_Description", "Role description cannot be blank").notEmpty(),
        body("Permissions", "Permissions cannot be blank").notEmpty()
    ],
    AddRole
);

router.patch(
    "/UpdateRole",
    [
        body("Role_Name", "Role name cannot be blank").notEmpty(),
        body("Role_Id", "Role id cannot be blank").notEmpty(),
        body("Permissions", "Permissions cannot be blank").notEmpty()
    ],
    UpdateRole
);

router.delete("/DeleteRole/:Role_Id", DeleteRole);

module.exports = router;