const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const JWT_SECRET = "Ashwamegh_Logistics";

const GetAllUser = async (req, res) => {
    try {
        UserModel.GetAllUser((err, result) => {
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
        console.error("GetAllUser CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const AddUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { User_Name, Email, Password, Role_Id } = req.body;

        UserModel.FetchUser(Email, async (err, result) => {
            console.log("Fetch User Result:", result);

            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            if (result && result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists"
                });
            }

            try {
                const salt = await bcrypt.genSalt(10);
                const secPassword = await bcrypt.hash(Password, salt);

                UserModel.AddUser(
                    User_Name,
                    Email,
                    secPassword,
                    Role_Id,
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                error: err.message
                            });
                        }

                        const data = {
                            user: {
                                Id: result.insertId
                            }
                        };

                        const authTokeninClone = jwt.sign(
                            data,
                            JWT_SECRET
                        );

                        return res.json({
                            success: true,
                            message: "User Added Successfully",
                            user: {
                                User_Id: result.insertId,
                                User_Name,
                                Email,
                                Role_Id
                            },
                            authTokeninClone
                        });
                    }
                );
            } catch (error) {
                console.error("AddUser PASSWORD ERROR:", error);
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });
    } catch (error) {
        console.error("AddUser CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const UpdateUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            User_Name,
            Email,
            Password,
            Role_Id,
            User_Id
        } = req.body;

        let secPassword = "";

        if (Password) {
            const salt = await bcrypt.genSalt(10);
            secPassword = await bcrypt.hash(Password, salt);
        }

        console.log("Update User Body:", req.body);

        UserModel.UpdateUser(
            User_Name,
            Email,
            secPassword,
            Role_Id,
            User_Id,
            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: err.message
                    });
                }

                return res.json({
                    success: true,
                    message: "User Updated Successfully",
                    result: result
                });
            }
        );
    } catch (error) {
        console.error("UpdateUser CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const DeleteUser = async (req, res) => {
    try {
        const User_Id = req.params.User_Id;

        UserModel.GetUserById(User_Id, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            UserModel.DeleteUser(User_Id, (err, result) => {
                console.log("Delete Error:", err);
                console.log("Delete Result:", result);

                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: err.message
                    });
                }

                return res.json({
                    success: true,
                    message: "User Deleted Successfully"
                });
            });
        });
    } catch (error) {
        console.error("DeleteUser CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetUser = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        UserModel.FetchUser(email, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            if (!result || result.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: "Try and Login with valid credentials"
                });
            }

            try {
                const ComPass = await bcrypt.compare(
                    password,
                    result[0].Password
                );

                if (!ComPass) {
                    return res.status(400).json({
                        success: false,
                        error: "Try and Login with valid credentials"
                    });
                }

                const data = {
                    user: {
                        id: result[0].User_Id
                    }
                };

                const authTokeninClone = jwt.sign(
                    data,
                    JWT_SECRET
                );

                console.log("Login Result:", result);

                console.log(
                    JSON.stringify(result[0].Permissions, null, 2)
                );

                return res.json({
                    success: true,
                    authTokeninClone,
                    User_Name: result[0].User_Name,
                    Email: result[0].Email,
                    Role_Id: result[0].Role_Id,
                    Role_Name: result[0].Role_Name,
                    Permissions: result[0].Permissions
                });
            } catch (error) {
                console.error("PASSWORD COMPARE ERROR:", error);
                return res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });
    } catch (error) {
        console.error("GetUser CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = { GetAllUser, AddUser, UpdateUser, DeleteUser, GetUser };