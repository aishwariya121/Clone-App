
const { body, validationResult } = require("express-validator");
const CityModel = require("../models/City");



//endpoint api/City/AddCity
const AddCity = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { City_Name, State_Id } = req.body;
        CityModel.AddCity(City_Name, State_Id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const data = {
                city: {
                    id: result.insertId
                }
            };

            return res.json({
                success: true,
                message: "City Added Successfully",
                result: result
            });
        })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }

}

//endpoint api/City/GetAllCity
const GetAllCity = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        CityModel.GetAllCity((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // console.log("city result from db :", result)
            return res.json({
                success: true,
                result: result
            });
        })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}

//endpoint api/City/GetAllState
const GetAllState = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        CityModel.GetAllState((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // console.log("city result from db :", result)
            return res.json({
                success: true,
                result: result
            });
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }
}


//endpoint api/City/UpdateCity
const UpdateCity = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const { City_Name, State_Id, City_Id } = req.body;
        CityModel.UpdateCity(City_Name, State_Id, City_Id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            return res.json({
                success: true,
                message: "City Updated Successfully",
                result: result
            });
        })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error")
    }

}



module.exports = { AddCity, GetAllCity, GetAllState, UpdateCity };