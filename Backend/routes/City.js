

const { AddCity, GetAllCity, UpdateCity, GetAllState } = require("../Controller/City")
const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
//endpoint api/City/AddCity
router.post("/AddCity",

    AddCity
)
//endpoint api/City/GetAllCity
router.get("/GetAllCity",

    GetAllCity
)
//endpoint api/City/GetAllState
router.get("/GetAllState",
    GetAllState
)

//endpoint api/City/UpdateCity
router.patch("/UpdateCity",
    UpdateCity
)


module.exports = router;