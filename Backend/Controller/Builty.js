const BuiltyModel = require("../models/Builty");
const { body, validationResult } = require("express-validator");

// get all builty 
const GetAllBuilty = async (req, res) => {
    try {
        BuiltyModel.GetAllBuilty((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}

//fetch Builty detail by Date range
const GetBuiltyByDate = async (req, res) => {
    try {
        const { From_Date, To_Date } = req.body;
        BuiltyModel.GetBuiltyByDate(From_Date, To_Date, (err, result) => {
            if (err) {
                console.log("GetBuiltyByDate MODEL ERROR:", err);
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
        console.error("GetBuiltyByDate CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//fetch Builty detail by Consignor Name
const GetBuiltyByConsignor = async (req, res) => {
    try {
        const { Consignor_Name } = req.body;
        BuiltyModel.GetBuiltyByConsignor(Consignor_Name, (err, result) => {

            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Builty not found"
                });
            }
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}

//fetch Builty detail by Consignee Name
const GetBuiltyByConsignee = async (req, res) => {
    try {
        const { Consignee_Name } = req.body;
        BuiltyModel.GetBuiltyByConsignee(Consignee_Name, (err, result) => {

            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Builty not found"
                });
            }
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}

//fetch Builty detail by Pay_Status
const GetBuiltyByPay_Status = async (req, res) => {
    try {
        const { Pay_Status } = req.body;
        BuiltyModel.GetBuiltyByPay_Status(Pay_Status, (err, result) => {

            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Builty not found"
                });
            }
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}

//fetch Builty detail by From Office
const GetBuiltyBy_From_Office = async (req, res) => {
    try {
        const { From_Office_Name } = req.body;
        BuiltyModel.GetBuiltyBy_From_Office(From_Office_Name, (err, result) => {

            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Builty not found"
                });
            }
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}

//fetch Builty detail by To Office
const GetBuiltyBy_To_Office = async (req, res) => {
    try {
        const { To_Office_Name } = req.body;
        BuiltyModel.GetBuiltyBy_To_Office(To_Office_Name, (err, result) => {

            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Builty not found"
                });
            }
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}

//genereate builty id
const GenerateBuiltyId = (From_Office_Id) => {
    return new Promise((resolve, reject) => {
        BuiltyModel.GenerateBuiltyId(
            From_Office_Id,
            (err, officeResult) => {
                if (err) {
                    return reject(err);
                }

                if (officeResult.length === 0) {
                    return reject(new Error("Office not found"));
                }

                const officeName = officeResult[0].Office_Name;

                const officePrefix = officeName
                    .substring(0, 5)
                    .toUpperCase();

                resolve({
                    officeName,
                    officePrefix
                });
            }
        );
    });
};

//get last Builty Id
const GetLastBuilty = async (From_Office_Id) => {
    try {

        const { officeName, officePrefix } =
            await GenerateBuiltyId(From_Office_Id);

        const builtyResult = await new Promise((resolve, reject) => {

            BuiltyModel.GetLastBuilty(
                From_Office_Id,
                (err, result) => {

                    if (err) {
                        return reject(err);
                    }

                    resolve(result);
                }
            );

        });

        let runningNo = 1;

        if (builtyResult.length > 0) {
            runningNo =
                parseInt(
                    builtyResult[0].Builty_Id.split("-")[2]
                ) + 1;
        }

        return {
            officeName,
            officePrefix,
            runningNo
        };

    } catch (error) {
        throw error;
    }
};

// ADD FUNCTION FOR ADDING BUILTY
const AddBuilty = async (req, res) => {
    try {
        const {
            From_Office_Id,
            From_Office_Name,

            To_Office_Id,
            To_Office_Name,
            Builty_Date,
            Truck_No,

            Consignor_Id,
            Consignor_Name,
            Consignor_Phone_No,
            Consignor_GST,

            Consignee_Id,
            Consignee_Name,
            Consignee_Phone_No,
            Consignee_GST,

            Package_Value,
            Invoice_No,
            E_Way_Bill_No,
            Weight,
            Quantity,
            Charge_per_parcel,
            Descriptions,
            Builty_Charge,
            Insurance,
            Hamali,
            Damrage,
            GST,
            Pay_Status,
            Total_Amount
        } = req.body;

        // Get Last Builty
        const {
            officePrefix,
            runningNo
        } = await GetLastBuilty(From_Office_Id);

        // Date
        const today = new Date(Builty_Date);

        const datePart =
            String(today.getFullYear()).slice(-2) +
            String(today.getMonth() + 1).padStart(2, "0") +
            String(today.getDate()).padStart(2, "0");

        // Generate Builty Id
        const Builty_Id =
            `${officePrefix}-${datePart}-${String(runningNo).padStart(4, "0")}`;

        // Add Builty
        BuiltyModel.AddBuilty(
            Builty_Id,

            From_Office_Id,
            From_Office_Name,

            To_Office_Id,
            To_Office_Name,
            Builty_Date,
            Truck_No,

            Consignor_Id,
            Consignor_Name,
            Consignor_Phone_No,
            Consignor_GST,

            Consignee_Id,
            Consignee_Name,
            Consignee_Phone_No,
            Consignee_GST,

            Package_Value,
            Invoice_No,
            E_Way_Bill_No,
            Weight,
            Quantity,
            Charge_per_parcel,
            Descriptions,
            Builty_Charge,
            Insurance,
            Hamali,
            Damrage,
            GST,
            Pay_Status,
            Total_Amount,

            (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        error: err.message
                    });
                }

                return res.json({
                    success: true,
                    message: "Builty Added Successfully",
                    Builty_Id
                });
            }
        );

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//UPDATE FUNCTION FOR EDITING Builty BY Builty ID
const UpdateBuilty = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            From_Office_Id,
            From_Office_Name,

            To_Office_Id,
            To_Office_Name,
            Builty_Date,
            Truck_No,

            Consignor_Id,
            Consignor_Name,
            Consignor_Phone_No,
            Consignor_GST,

            Consignee_Id,
            Consignee_Name,
            Consignee_Phone_No,
            Consignee_GST,

            Package_Value,
            Invoice_No,
            E_Way_Bill_No,
            Weight,
            Quantity,
            Charge_per_parcel,
            Descriptions,
            Builty_Charge,
            Insurance,
            Hamali,
            Damrage,
            GST,
            Pay_Status,
            Total_Amount,
            Builty_Id

        } = req.body;


        console.log("UPDATE BODY:", req.body);


        BuiltyModel.UpdateBuilty(

            From_Office_Id,
            From_Office_Name,

            To_Office_Id,
            To_Office_Name,
            Builty_Date,
            Truck_No,

            Consignor_Id,
            Consignor_Name,
            Consignor_Phone_No,
            Consignor_GST,

            Consignee_Id,
            Consignee_Name,
            Consignee_Phone_No,
            Consignee_GST,

            Package_Value,
            Invoice_No,
            E_Way_Bill_No,
            Weight,
            Quantity,
            Charge_per_parcel,
            Descriptions,
            Builty_Charge,
            Insurance,
            Hamali,
            Damrage,
            GST,
            Pay_Status,
            Total_Amount,

            Builty_Id,

            (err, result) => {

                if (err) {

                    console.log("UPDATE MODEL ERROR:", err);

                    return res.status(500).json({
                        success: false,
                        error: err.message
                    });
                }

                console.log("UPDATE RESULT:", result);

                return res.json({
                    success: true,
                    message: "Builty Updated Successfully",
                    result: result
                });

            }
        );

    } catch (error) {

        console.log("UPDATE CONTROLLER ERROR:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetBuiltyById = async (req, res) => {
    try {
        const { Builty_Id } = req.body;
        BuiltyModel.GetBuiltyById(Builty_Id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Builty not found"
                });
            }
            return res.json({
                success: true,
                result: result
            });
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}

//DELETE FUNCTION TO DELETE Customer BY Cust ID
const DeleteBuilty = async (req, res) => {
    try {
        const Builty_Id = req.params.id;
        GetBuiltyById(Builty_Id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            BuiltyModel.DeleteBuilty(Builty_Id, (err, result) => {

                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                return res.json({
                    success: true,
                    message: "Builty Deleted Successfully"
                });
            })

        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}


module.exports = { GetLastBuilty, GenerateBuiltyId, GetAllBuilty, GetBuiltyById, GetBuiltyByDate, GetBuiltyByConsignor, GetBuiltyByConsignee, GetBuiltyByPay_Status, GetBuiltyBy_From_Office, GetBuiltyBy_To_Office, AddBuilty, UpdateBuilty, DeleteBuilty };