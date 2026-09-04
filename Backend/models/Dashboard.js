// connecting database
const db = require("../db");

// Total builty count by selected date
const GetTotalBuiltyCount = (From_Date, To_Date, callback) => {
    const query = `select count(*) AS 'Count' from builty WHERE Builty_Date BETWEEN ? AND ?;`
    db.query(query, [From_Date, To_Date], callback);
}
// Total pending builty count by selected date
const GetTotalPendingBuiltyCount = (From_Date, To_Date, callback) => {
    const query = `SELECT COUNT(*) AS 'Count'
                    FROM builty
                    WHERE Builty_Date BETWEEN ? AND ?
                    AND Pay_Status = 'To pay';`
    db.query(query, [From_Date, To_Date], callback);
}
// Total new customer count by selected date
const GetTotalNewCustCount = (From_Date, To_Date, callback) => {
    const query = ` SELECT COUNT(*) AS 'Count'
                    FROM customer
                    WHERE Created_Date BETWEEN ? AND ?;`
    db.query(query, [From_Date, To_Date], callback);
}
// Total Revenue by location cities for selected date range
const GetTotalCountByCity = (From_Date, To_Date, callback) => {
    const query = `SELECT c.City_Name, SUM(b.Total_Amount) AS Revenue
                   FROM builty b
                   INNER JOIN office o
                       ON b.From_Office_Id = o.Office_Id
                   INNER JOIN city c
                       ON o.City_Id = c.City_Id
                    WHERE Builty_Date BETWEEN ? AND ?   
                   GROUP BY c.City_Id, c.City_Name;`
    db.query(query, [From_Date, To_Date], callback);
}
// Total Revenue by location Office for selected date range
const GetTotalCountByOffice = (From_Date, To_Date, callback) => {
    const query = `SELECT o.Office_Name, SUM(b.Total_Amount) AS Revenue
                   FROM builty b
                   INNER JOIN office o
                   ON b.From_Office_Id = o.Office_Id
                   WHERE Builty_Date BETWEEN ? AND ?   
                   GROUP BY o.Office_Id, o.Office_Name;`
    db.query(query, [From_Date, To_Date], callback);
}

module.exports = { GetTotalBuiltyCount, GetTotalPendingBuiltyCount, GetTotalNewCustCount, GetTotalCountByCity, GetTotalCountByOffice }
