
// connecting database
const db = require("../db");


const GetAllPermissions = (callback) => {

    const sql = 'Select * from  permission';
    db.query(sql, callback)

}

//get all permissions by role id..
const GetRolePermissions = (Role_Id, callback) => {
    const sql = 'Select Permission_Id from  role_permission where Role_Id=?';
    db.query(sql, [Role_Id], callback)

}

// Get All roles
const GetAllRoles = (callback) => {
    const sql = "SELECT * FROM role";
    db.query(sql, (err, result) => {
        console.log("GetAllRoles MODEL ERROR:", err);
        console.log("GetAllRoles MODEL RESULT:", result);
        callback(err, result);
    });
};
// Add  role and role_permission
const AddRole = (Role_Name, Role_Description, Permissions, callback) => {

    // Insert Role
    const sql = `
        INSERT INTO role (Role_Name, Role_Description)
        VALUES (?, ?)
    `;

    db.query(
        sql,
        [Role_Name, Role_Description],
        (err, result) => {

            // Error while inserting Role then return
            if (err) {
                return callback(err);
            }
            // Newly created Role Id to insert it into role-permission table
            const Role_Id = result.insertId;

            // If no permission selected then no records will be inserted into role-permission so return..
            if (!Permissions || Permissions.length === 0) {
                return callback(null, result);
            }

            // Create array for bulk insert into role-permission table
            const values = Permissions.map(permissionId => [
                Role_Id,
                permissionId
            ]);

            // Insert all permissions at once...
            const permissionSql = `  INSERT INTO role_permission (Role_Id, Permission_Id) VALUES ? `;
            db.query(
                permissionSql,
                [values],
                (err2) => {
                    if (err2) {
                        return callback(err2);
                    }
                    callback(null, result);
                }
            );
        }
    );

};

//Get user by id
const GetRoleById = (Role_Id, callback) => {
    const sql = "SELECT * FROM role WHERE Role_Id=?";
    db.query(sql, [Role_Id], callback)
}

//update role and role_permission
const UpdateRole = (
    Role_Name,
    Role_Description,
    Permissions,
    Role_Id,
    callback
) => {

    // Update Role
    const sql = `
        UPDATE role
        SET
            Role_Name=?,
            Role_Description=?
        WHERE Role_Id=?
    `;

    db.query(sql, [Role_Name, Role_Description, Role_Id],
        (err, result) => {
            if (err) {
                return callback(err);
            }

            // Delete old permissions to make it easy to insert the new changes...
            const deleteSql = ` DELETE FROM role_permission WHERE Role_Id=? `;

            db.query(deleteSql, [Role_Id], (err2) => {
                if (err2) {
                    return callback(err2);
                }
                // No permission selected then no need to update
                if (!Permissions || Permissions.length === 0) {
                    return callback(null, result);
                }

                // Prepare bulk values
                const values = Permissions.map(permissionId => [
                    Role_Id,
                    permissionId
                ]);

                const insertSql = `
                    INSERT INTO role_permission(Role_Id, Permission_Id)
                    VALUES ?  `;

                db.query(insertSql, [values], (err3) => {
                    if (err3) {
                        return callback(err3);
                    }
                    callback(null, result);
                });
            });
        }
    );
};

//Delete User
const DeleteRole = (Role_Id, callback) => {
    const sql = `Delete from role WHERE Role_Id=?`;
    db.query(sql, [Role_Id], callback)
}

module.exports = { AddRole, UpdateRole, DeleteRole, GetRoleById, GetAllRoles, GetAllPermissions, GetRolePermissions };