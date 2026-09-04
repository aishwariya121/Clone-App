
// connecting database
const db = require("../db");

const GenerateBuiltyId = (From_Office_Id, callback) => {

    const query = `
        SELECT
            o.Office_Name,
            (
                SELECT Builty_Id
                FROM builty
                WHERE From_Office_Id = o.Office_Id
                ORDER BY Created_At DESC
                LIMIT 1
            ) AS Last_Builty_Id
        FROM office o
        WHERE o.Office_Id = ?
    `;

    db.query(query, [From_Office_Id], callback);
}

const GetLastBuilty = (From_Office_Id, callback) => {

    const query = `
        SELECT Builty_Id
        FROM builty
        WHERE From_Office_Id = ?
        ORDER BY Created_At DESC
        LIMIT 1
    `;

    db.query(query, [From_Office_Id], callback);
}

// fetch all Builty 
const GetAllBuilty = (callback) => {

    const query = `SELECT * FROM builty`
    db.query(query, callback)
}

// fetch builty details by id 
const GetBuiltyById = (Builty_Id, callback) => {

    const query = `SELECT * FROM builty WHERE Builty_Id=?`
    db.query(query, [Builty_Id], callback)
}

// fetch builty details by Date Range 
const GetBuiltyByDate = (From_Date, To_Date, callback) => {

    const query = `SELECT * FROM builty WHERE Builty_Date BETWEEN ? AND ?`
    db.query(query, [From_Date, To_Date], callback)
}

// fetch builty details by Consignor_Name 
const GetBuiltyByConsignor = (Consignor_Name, callback) => {

    const query = `SELECT * FROM builty WHERE Consignor_Name  LIKE ?`
    db.query(query, [`${Consignor_Name}%`], callback)
}

// fetch builty details by Consignee_Name
const GetBuiltyByConsignee = (Consignee_Name, callback) => {

    const query = `SELECT * FROM builty WHERE Consignee_Name LIKE ?`
    db.query(query, [`${Consignee_Name}%`], callback)
}

// fetch builty details by Payment status
const GetBuiltyByPay_Status = (Pay_Status, callback) => {

    const query = `SELECT * FROM builty WHERE Pay_Status=?`
    db.query(query, [Pay_Status], callback)
}

// fetch builty details by From Office
const GetBuiltyBy_From_Office = (From_Office_Name, callback) => {

    const query = `SELECT * FROM builty WHERE From_Office_Name  Like ?`
    db.query(query,  [`${From_Office_Name}%`], callback)
}

// fetch builty details by To Office
const GetBuiltyBy_To_Office = (To_Office_Name, callback) => {

    const query = `SELECT * FROM builty WHERE To_Office_Name Like ?`
    db.query(query,  [`${To_Office_Name}%`], callback)
}

//Create function for inserting Builty into database
const AddBuilty = (
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
    Total_Amount, callback) => {


    const query = `INSERT INTO builty(Builty_Id,
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
    Total_Amount)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    Package_Value = Package_Value === "" ? null : Number(Package_Value);
    Weight = Weight === "" ? null : Number(Weight);
    Quantity = Quantity === "" ? null : Number(Quantity);
    Charge_per_parcel = Charge_per_parcel === "" ? null : Number(Charge_per_parcel);
    Builty_Charge = Builty_Charge === "" ? null : Number(Builty_Charge);
    Insurance = Insurance === "" ? null : Number(Insurance);
    Hamali = Hamali === "" ? null : Number(Hamali);
    Damrage = Damrage === "" ? null : Number(Damrage);
    GST = GST === "" ? null : Number(GST);
    Total_Amount = Total_Amount === "" ? null : Number(Total_Amount);
    db.query(query, [Builty_Id,
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
        Total_Amount], callback)
}

//Update function for Updating Builty into database
const UpdateBuilty = (
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
    callback) => {


    const query = `Update builty

 SET From_Office_Id = ?,
    From_Office_Name = ?,   
    To_Office_Id = ?,
    To_Office_Name = ?,
    Builty_Date = ?,
    Truck_No = ?,
     Consignor_Id = ?,
    Consignor_Name = ?,
    Consignor_Phone_No = ?,
    Consignor_GST = ?,

    Consignee_Id = ?,
    Consignee_Name = ?,
    Consignee_Phone_No = ?,
    Consignee_GST = ?,

    Package_Value = ?,
    Invoice_No = ?,
    E_Way_Bill_No = ?,
    Weight = ?,
    Quantity = ?,
    Charge_per_parcel = ?,
    Descriptions = ?,
    Builty_Charge = ?,
    Insurance = ?,
    Hamali = ?,
    Damrage = ?,
    GST = ?,
    Pay_Status = ?,
    Total_Amount = ?
    
        WHERE Builty_Id = ?`;
    db.query(query, [
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
        Builty_Id],
        callback)

}

//Delete function 
const DeleteBuilty = (Builty_Id, callback) => {

    const query = `
        Delete from builty
        WHERE Builty_Id = ?
    `;

    db.query(query, [Builty_Id], callback);
}

module.exports = { GetLastBuilty, GenerateBuiltyId, GetAllBuilty, GetBuiltyById, GetBuiltyByDate, GetBuiltyByConsignor, GetBuiltyByConsignee, GetBuiltyByPay_Status, GetBuiltyBy_From_Office, GetBuiltyBy_To_Office, GetBuiltyByPay_Status, AddBuilty, UpdateBuilty, DeleteBuilty };