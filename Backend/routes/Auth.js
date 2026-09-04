const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
    GetAllUser,
    AddUser,
    UpdateUser,
    DeleteUser,
    GetUser
} = require("../Controller/User");

//get all users
router.get("/GetAllUser", GetAllUser);

//get user by email and password
router.post(
    "/GetUser",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password must be at least 5 characters")
            .isLength({ min: 5 })
    ],
    GetUser
);
//add user
router.post(
    "/AddUser",
    [
        body("User_Name", "Name cannot be blank").notEmpty(),
        body("Email", "Enter a valid email").isEmail(),
        body("Password", "Password must be at least 5 characters")
            .isLength({ min: 5 }),
        body("Role_Id", "Role id cannot be blank").notEmpty()
    ],
    AddUser
);

//update user
router.patch(
    "/UpdateUser",
    [
        body("User_Name", "Name cannot be blank").notEmpty(),
        body("Email", "Enter a valid email").isEmail(),
        body("User_Id", "User id cannot be blank").notEmpty(),
        body("Password")
            .optional({ checkFalsy: true })
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters"),
        body("Role_Id", "Role id cannot be blank").notEmpty()
    ],
    UpdateUser
);

//delete user
router.delete("/DeleteUser/:User_Id", DeleteUser);



module.exports = router;