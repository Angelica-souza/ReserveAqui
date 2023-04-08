const express = require("express")
const app = express();
const mysql = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root", 
    password: "password",
    database: ""
});

app.get("/", (req, res) => {
    res.send("sdsdsdfdfdf");
})

app.listen(3001, () => {
    console.log("Já está rodando na porta 3001")
})