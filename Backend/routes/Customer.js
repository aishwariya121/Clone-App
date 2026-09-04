

const { GetAllCust, GetCustByName, AddCust, UpdateCust, DeleteCust, GetCustByPhone , GetCustById} = require("../Controller/Customer")
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");


//fetch all Customers endpoint api/Cust/GetAllCust
router.get("/GetAllCust",
 GetAllCust
)
//fetch all Customer detail by Cust Name endpoint api/Cust/GetCustByName
router.post("/GetCustByName",
    GetCustByName
)
//fetch customer detail by Phone number endpoint api/Cust/GetCustByPhone
router.get("/GetCustByPhone",
   GetCustByPhone
)
// ADD FUNCTION FOR ADDING CUSTOMER INTO DATABASE  endpoint api/Cust/AddCust
router.post("/AddCust",
   AddCust
)
//UPDATE FUNCTION FOR EDITING CUSTOMER BY CUST ID endpoint api/Cust/UpdateCust
router.patch("/UpdateCust",
   UpdateCust
)
//DELETE FUNCTION TO DELETE Customer BY Cust ID  endpoint api/Cust/DeleteCust/:id
router.delete("/DeleteCust/:Cust_id",
   DeleteCust);

module.exports = router;