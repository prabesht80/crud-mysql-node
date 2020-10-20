const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'Smarika124#',
    database: 'CRUD',
});

mysqlConnection.connect((err) => {
    if(!err)
    console.log('DB connected');
    else
    console.log('DB connection failed');
})

//GET all employee data
app.get('/employee', (req,res) => (
    mysqlConnection.query('SELECT * FROM Employee', (err, rows) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
))

//GET single employee data
app.get('/employee/:id', (req,res) => (
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID=?', [req.params.id], (err, rows) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
))

//Delete an employee
app.delete('/employee/:id', (req,res) => (
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID=?', [req.params.id], (err, rows) => {
        if(!err)
        res.send('deleted successfully');
        else
        console.log(err);
    })
))

//Post an employee data
mysqlConnection.connect(() => (
    mysqlConnection.query('INSERT INTO Employee (EmpID, Name, EmpCode, Salary) VALUES (3,"prabesh dada", "7474", "9000")', (err) => {
        if(!err)
        console.log('posted');
        else
        console.log(err);
    })
))


app.listen(8000, () => {
    console.log('server running at port 8000');
})

