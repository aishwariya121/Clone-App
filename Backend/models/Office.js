



// connecting database
const db = require("../db");



// fetch all office 
const GetAllOffices = (callback) =>{

    const query = `SELECT * FROM office`
    db.query(query, callback)
}

// fetch office details by id 
const GetOffice = (Office_Id,callback) =>{

    const query = `SELECT * FROM office WHERE Office_Id=?`
    db.query(query,[Office_Id], callback)
}

//Create function for inserting office into database
const AddOffice = (Office_Name, City_Id, callback) => {

    const query = 'INSERT INTO office(Office_Name, City_Id)  VALUES(?,?)'
    db.query(query, [Office_Name, City_Id], callback)

}

//Update function to change office name into database
const UpdateOffice = (Office_Name, City_Id, Office_Id, callback) => {

    const query = `
        UPDATE office
        SET Office_Name = ?, City_Id = ?
        WHERE Office_Id = ?
    `;

    db.query(query, [Office_Id, City_Id, Office_Name], callback);
}

//Delete function 
const DeleteOffice = (Office_Id, callback) => {

    const query = `
        Delete from office
        WHERE Office_Id = ?
    `;

    db.query(query, [Office_Id], callback);
}



module.exports = {GetAllOffices, GetOffice, AddOffice, UpdateOffice, DeleteOffice};