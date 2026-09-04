
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { GetLastBuilty, GenerateBuiltyId, GetAllBuilty, GetBuiltyById, GetBuiltyByDate, GetBuiltyByConsignor, GetBuiltyByConsignee, GetBuiltyByPay_Status, GetBuiltyBy_From_Office, GetBuiltyBy_To_Office, AddBuilty, UpdateBuilty, DeleteBuilty } = require("../Controller/Builty")

//fetch all Builty 
router.get("/GetAllBuilty",
    GetAllBuilty
)
//fetch all Builty detail by builty id
router.post("/GetBuiltyById",
  GetBuiltyById
)
//fetch Builty detail by Date range
router.post("/GetBuiltyByDate",
    GetBuiltyByDate
)
//fetch Builty detail by Consignor Name
router.post("/GetBuiltyByConsignor",
    GetBuiltyByConsignor
)
//fetch Builty detail by Consignee Name
router.post("/GetBuiltyByConsignee",
    GetBuiltyByConsignee
)
//fetch Builty detail by Pay_Status
router.post("/GetBuiltyByPay_Status",
    GetBuiltyByPay_Status
)
//fetch Builty detail by From Office
router.post("/GetBuiltyBy_From_Office",
    GetBuiltyBy_From_Office
)
//fetch Builty detail by To Office
router.post("/GetBuiltyBy_To_Office",
    GetBuiltyBy_To_Office
)
// ADD FUNCTION FOR ADDING BUILTY
router.post("/AddBuilty",
    AddBuilty
);

//UPDATE FUNCTION FOR EDITING Builty BY Builty ID
router.patch("/UpdateBuilty",
    UpdateBuilty
)

//DELETE FUNCTION TO DELETE Customer BY Cust ID
router.delete("/DeleteBuilty/:id",
    DeleteBuilty
)

module.exports = router;