const express = require('express');

const employeeRouter = require('./routes/employee_details');
const adminRouter = require('./routes/admin_details');
const departmentRouter = require('./routes/department');
const attendanceRouter = require('./routes/attendance');

const PORT = 3000;  

const {conn} = require('./db');
const app = express();



conn.connect(function(error){
    if(error) throw error;
    console.log("Connected to database..");
});

// Fetching details about employees
app.use('/employee_details', employeeRouter);


// Fetching from admin
app.use('/admin', adminRouter);


// Fetching data from department
app.use('/department', departmentRouter);


// Fetching data from attendance
app.use('/attendance', attendanceRouter);


app.listen(PORT, () => {console.log("API is running...");});



