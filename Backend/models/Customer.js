



// connecting database
const db = require("../db");



// fetch all customers 
const GetAllCust = (callback) => {

    const query = `SELECT * FROM customer`
    db.query(query, callback)
}

// fetch customer details by Name 
const GetCustByName = (Cust_Name, callback) => {

    const query = `SELECT * FROM customer WHERE Cust_Name Like ?`
    db.query(query, [`${Cust_Name}%`], callback)
}

// fetch Customer details by Phone number 
const GetCustByPhone = (Phone_No, callback) => {

    const query = `SELECT * FROM customer WHERE Phone_No=?`
    db.query(query, [Phone_No], callback)
}


// fetch customer details by Name 
const GetCustById = (Cust_Id, callback) => {

    const query = `SELECT * FROM customer WHERE Cust_Id  =?`
    db.query(query, [Cust_Id], callback)
}

//Create function for inserting Customer into database
const AddCust = (Cust_Name, Phone_No, City_Id, GST_No, callback) => {

    const query = 'INSERT INTO customer(Cust_Name, Phone_No, City_Id,GST_No)  VALUES(?,?,?,?)'
    db.query(query, [Cust_Name, Phone_No, City_Id, GST_No], callback)

}

//Update function to change Customer details into database
const UpdateCust = (Cust_Name,Phone_No, City_Id, GST_No, Cust_Id, callback) => {

    const query = `
        UPDATE customer
        SET Cust_Name = ?,Phone_No=?, City_Id = ?, GST_No=?
        WHERE Cust_Id = ?
    `;

    db.query(query, [Cust_Name, Phone_No,City_Id, GST_No ,Cust_Id], callback);
}

//Delete function 
const DeleteCust = (Cust_Id, callback) => {

    const query = `
        Delete from customer
        WHERE Cust_Id = ?
    `;

    db.query(query, [Cust_Id], callback);
}



module.exports = { GetAllCust, GetCustByPhone ,GetCustByName, AddCust, UpdateCust, DeleteCust , GetCustById};