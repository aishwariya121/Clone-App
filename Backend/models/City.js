

// connecting database
const db = require("../db");

//Create function for inserting city into database
const GetAllCity = (callback)=>{

    const query = 'SELECT city.*, state.State_Name FROM city INNER JOIN state ON city.State_Id = state.State_Id;'
    db.query(query, callback)
} 

//Create function for inserting city into database
const GetAllState = (callback)=>{

    const query = 'SELECT * from state;'
    db.query(query, callback)
} 

//Create function for inserting city into database
const AddCity = (cityName, State_Id, callback)=>{

    const query = 'INSERT INTO city(City_Name, State_Id)  VALUES(?,?)'
    db.query(query, [cityName,State_Id],callback)

} 

//Update function to change city name into database
const UpdateCity = (cityName, State_Id,City_Id, callback)=>{

    const query = 'Update city set City_Name = ?, State_Id=? WHERE City_Id=? '
    db.query(query, [cityName,State_Id,City_Id],callback)

} 


module.exports = { AddCity,UpdateCity,GetAllCity,GetAllState };