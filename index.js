const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const { json } = require("body-parser");
const cors = require('cors')
// parser aplication/json

app.use(bodyParser.json());

// create database
const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password :"",
    database : "crud",
})

conn.connect((err)=>{
    if(err) throw err
    console.log("database connected...");
});

// create api
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.post("/api/add",(req,res)=>{
    let data = {name : req.body.name}
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql,data,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify
        ({
            status:200,
            error:null,
            response:"New Record add successfully"
        }))
    });
});
// show all records
app.use(cors())
app.use(express.json())
app.get("/api/view",(req,res)=>{
    let sql = "SELECT * FROM users";
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({
            status:200,
            error : null,
            response:result
        }));
    });
});

// show a single record
app.use(cors())
app.use(express.json())
app.get("/api/view/:id",(req,res)=>{
    let sql = "SELECT * FROM users where id ="+req.params.id;
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(JSON.stringify({
            status:200,
            error : null,
            response:result
        }));
    });
});

// update a record

app.put("/api/update",(req,res)=>{
    let sql = "UPDATE users SET name='" + req.body.name + "' WHERE id=" + req.body.id;
    let query = conn.query(sql,(err,result)=>{
        if(err) throw err
        res.send(JSON.stringify({
            status:200,
            error:null,
            response:"Recourd updated"
        }));
    });
});

app.listen(8000 , ()=>{
    console.log("server startde on port 8000...");
})