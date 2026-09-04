
const { GetTotalBuiltyCount, GetTotalPendingBuiltyCount, GetTotalNewCustCount, GetTotalCountByCity, GetTotalCountByOffice } = require("../Controller/Dashboard")
const express = require("express");
const router = express.Router();

//fetch total builty count by Date range endpoint api/Dashboard/GetTotalBuiltyCount
router.post("/GetTotalBuiltyCount",
    GetTotalBuiltyCount
)

//fetch total pending builty count by Date range endpoint api/Dashboard/GetTotalPendingBuiltyCount
router.post("/GetTotalPendingBuiltyCount",
    GetTotalPendingBuiltyCount
)

//fetch total new customer count by Date range endpoint api/Dashboard/GetTotalNewCustCount
router.post("/GetTotalNewCustCount",
    GetTotalNewCustCount
)

//fetch total Revenue count by city for Date range endpoint api/Dashboard/GetTotalCountByCity
router.post("/GetTotalCountByCity",
    GetTotalCountByCity
)

//fetch total Revenue count by office for Date range endpoint api/Dashboard/GetTotalCountByOffice
router.post("/GetTotalCountByOffice",
    GetTotalCountByOffice
)
        

module.exports = router;