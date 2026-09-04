

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {GetAllOffices, GetOffice,AddOffice, UpdateOffice, DeleteOffice} = require("../Controller/Office");

//fetch all office
router.get("/GetAllOffices",
     GetAllOffices
    );

//fetch office detail by office id
router.get("/GetOffice/:id",
     GetOffice
    );

//add office
router.post(
    "/AddOffice",
    [
        body("Office_Name", "Office cannot be blank").notEmpty(),
        body("City_Id", "City id cannot be blank").notEmpty()
    ],
    AddOffice
);

//update office
router.patch(
    "/UpdateOffice",
    [
        body("Office_Name", "Office cannot be blank").notEmpty(),
        body("Office_Id", "Office id cannot be blank").notEmpty()
    ],
    UpdateOffice
);

//delete office
router.delete("/DeleteOffice/:id", 
    DeleteOffice
);

module.exports = router;