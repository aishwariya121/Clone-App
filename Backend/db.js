// const mysql = require("mysql2");

// const connection = mysql.createConnection({
//     host: "127.0.0.1",
//     port: 3307,
//     user: "root",
//     password: "0000",
//     database: "ashwamegh_logistics"
// });

// connection.connect((err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("MySQL Connected successfully with Ashwamegh Logistics database...");
//     }
// });

// module.exports = connection;
const mysql = require("mysql2");
const path = require("path");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: require("fs").readFileSync(path.join(__dirname, "Certificate", "isrgrootx1.pem"))
    }
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("TiDB Connected successfully with Ashwamegh Logistics database...");
    }
});

module.exports = connection;