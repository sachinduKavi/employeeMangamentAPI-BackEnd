const express = require('express');

const { getUserDetails, getAllEmployees, lastEMPid, addNewEmployee } = require('./controllers/employee_details');
const { getAdminDetails, updateAccess    } = require('./controllers/admin_details');
const PORT = 3000;  

const {conn} = require('./db');
const app = express();


conn.connect(function(error){
    if(error) throw error;
    console.log("Connected..");
});

// Fetching details about employees
app.get('/employee_details/:user_email', getUserDetails);

app.get('/employee_details/', getAllEmployees);

app.get('/get_emp/', lastEMPid);

app.post('/employee_details/add-employee/:empID/:fName/:lName/:email/:position/:department/:payRate/:nic/:mobileNumber/', addNewEmployee);



// Fetching from admin
app.get('/admin/:user_email', getAdminDetails);

app.put('/admin/:emp_id', updateAccess);

app.listen(PORT, () => {console.log("API is running...");});



