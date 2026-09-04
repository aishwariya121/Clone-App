require("dotenv").config();

console.log("DB USER:", process.env.DB_USER);
console.log("DB HOST:", process.env.DB_HOST);
console.log("DB PORT:", process.env.DB_PORT);
const connection = require("./db");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/Auth", require("./routes/Auth"));
app.use("/api/Role", require("./routes/Role"));
app.use("/api/Dashboard", require("./routes/Dashboard"));
app.use("/api/City", require("./routes/City"));
app.use("/api/Office", require("./routes/Office"));
app.use("/api/Cust", require("./routes/Customer"));
app.use("/api/Builty", require("./routes/Builty"));

app.listen(port, () => {
    console.log(`Clone app listening on port ${port}`);
});