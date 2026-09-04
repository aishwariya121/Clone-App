const DashModel = require("../models/Dashboard");

const GetTotalBuiltyCount = async (req, res) => {
    try {
        const { From_Date, To_Date } = req.body;
        DashModel.GetTotalBuiltyCount(From_Date, To_Date, (err, result) => {
            if (err) {
                console.log("GetTotalBuiltyCount MODEL ERROR:", err);
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
        console.error("GetTotalBuiltyCount CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetTotalPendingBuiltyCount = async (req, res) => {
    try {
        const { From_Date, To_Date } = req.body;
        DashModel.GetTotalPendingBuiltyCount(From_Date, To_Date, (err, result) => {
            if (err) {
                console.log("GetTotalPendingBuiltyCount MODEL ERROR:", err);
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
        console.error("GetTotalPendingBuiltyCount CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetTotalNewCustCount = async (req, res) => {
    try {
        const { From_Date, To_Date } = req.body;
        DashModel.GetTotalNewCustCount(From_Date, To_Date, (err, result) => {
            if (err) {
                console.log("GetTotalNewCustCount MODEL ERROR:", err);
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
        console.error("GetTotalNewCustCount CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetTotalCountByCity = async (req, res) => {
    try {
        const { From_Date, To_Date } = req.body;
        DashModel.GetTotalCountByCity(From_Date, To_Date, (err, result) => {
            if (err) {
                console.log("GetTotalCountByCity MODEL ERROR:", err);
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
        console.error("GetTotalCountByCity CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const GetTotalCountByOffice = async (req, res) => {
    try {
        const { From_Date, To_Date } = req.body;
        DashModel.GetTotalCountByOffice(From_Date, To_Date, (err, result) => {
            if (err) {
                console.log("GetTotalCountByOffice MODEL ERROR:", err);
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
        console.error("GetTotalCountByOffice CONTROLLER ERROR:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    GetTotalBuiltyCount,
    GetTotalPendingBuiltyCount,
    GetTotalNewCustCount,
    GetTotalCountByCity,
    GetTotalCountByOffice
};