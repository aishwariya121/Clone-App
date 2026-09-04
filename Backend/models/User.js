
// connecting database
const db = require("../db");

// Get All user
const GetAllUser = (callback) => {

    const sql = `SELECT 
    user.User_Id,
    user.User_Name,
    user.Email,
    user.Role_Id,
    role.Role_Name AS Role
FROM user
LEFT JOIN role 
ON user.Role_Id = role.Role_Id;
 `;
    db.query(sql, callback)

}

//creating a function to insert record in database
const AddUser = (UserName, email, password, Role_Id, callback) => {
    //inserting record using SQL query
    const sql = 'INSERT INTO user(User_Name, Email, Password,Role_Id) VALUES(?,?,?,?)';

    db.query(sql, [UserName, email, password, Role_Id], callback)

}

//function for finding user by its email
const FetchUser = (email, callback) => {
    const sql = `
        SELECT 
            u.User_Id,
            u.User_Name,
            u.Email,
            u.Password,
            u.Role_Id,
            r.Role_Name,
            COALESCE(
                JSON_ARRAYAGG(
                    CASE 
                        WHEN p.Permission_Id IS NOT NULL THEN
                            JSON_OBJECT(
                                'Permission_Id', p.Permission_Id,
                                'Module_Name', p.Module_Name,
                                'Permission_Name', p.Permission_Name
                            )
                    END
                ),
                JSON_ARRAY()
            ) AS Permissions
        FROM user u
        LEFT JOIN role r
            ON u.Role_Id = r.Role_Id
        LEFT JOIN role_permission rp
            ON u.Role_Id = rp.Role_Id
        LEFT JOIN permission p
            ON rp.Permission_Id = p.Permission_Id
        WHERE u.Email = ?
        GROUP BY
            u.User_Id,
            u.User_Name,
            u.Email,
            u.Password,
            u.Role_Id,
            r.Role_Name;
    `;
    db.query(sql, [email], (err, result) => {

        console.log("FetchUser Callback");
        console.log(err);
        console.log(result);

        callback(err, result);
    });
};

//Get user by id
const GetUserById = (User_Id, callback) => {
    const sql = "SELECT * FROM user WHERE User_Id=?";
    db.query(sql, [User_Id], callback)
}


//update user
const UpdateUser = (User_Name, Email, Password, Role_Id, User_Id, callback) => {

    let sql;
    let values;

    if (Password) {
        sql = `UPDATE user
               SET User_Name=?, Email=?, Password=?,Role_Id=?
               WHERE User_Id=?`;

        values = [User_Name, Email, Password, Role_Id, User_Id];
    } else {
        sql = `UPDATE user
               SET User_Name=?, Email=?,Role_Id=?
               WHERE User_Id=?`;

        values = [User_Name, Email, Role_Id, User_Id];
    }

    db.query(sql, values, callback);
}

//Delete User
const DeleteUser = (User_Id, callback) => {
    const sql = `Delete from user WHERE User_Id=?`;
    db.query(sql, [User_Id], callback)
}
module.exports = { AddUser, FetchUser, UpdateUser, DeleteUser, GetUserById, GetAllUser };