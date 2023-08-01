// Init database
const { response } = require('express');
const {conn} = require('../db');


const getUserDetails = (req, res) => {
    const user_email = req.params.user_email;
    console.log("Get USer details function");
    conn.query("SELECT * FROM employee_details WHERE email='" + user_email + "'", function(err, result, fields) {
        if(err) throw err;
        var state, status_code;
        if(result.length > 0){
            state = "Record found";
            status_code = 200;
        }else{
            state = "Not found";
            status_code = 404;
        }

        res.status(status_code).json({
            status: state,
            request: user_email,
            data: result, 
        });
    });
};

const getAllEmployees = (req, res) => {
    conn.query("SELECT employee_id, concat(f_name, ' ', l_name) as name, email, position, payRate, department.name as department, NIC, mobile_number FROM employee_details INNER JOIN department ON department.deptID = employee_details.deptID ORDER BY employee_id desc", function(err, result, fields) {
        if(err) throw err;
        var state, status_code;
        if(result.length > 0){
            state = "Record found";
            status_code = 200;
        }else{
            state = "Not found";
            status_code = 404;
        }

        res.status(status_code).json({
            status: state,
            data: result
        });
    });
};

const lastEMPid = (req, res) => {
    console.log("active");
    var last_id, departments;
    conn.query("SELECT employee_id FROM employee_details ORDER BY employee_id DESC LIMIT 1", function(err, results, fields) {
        if(err) throw err;
        if(results.length > 0){
            state = "Record found";
            status_code = 200;
        }else{
            state = "Not found";
            status_code = 404;
        }
        conn.query("SELECT name FROM department", function(err, result, fields) {
            if(err) throw err;
            if(result.length > 0){
                res.status(200).json({
                    result,
                    last_emp: results[0]
                });
            }
        });
        // res.status(status_code).json(results[0]);
    });
};

const addNewEmployee = (req, res) => {
    const empID = req.params.empID;
    const fName = req.params.fName;
    const lName = req.params.lName;
    const email = req.params.email;
    const position = req.params.position;
    const department = req.params.department;
    const payRate = req.params.payRate;
    const nic = req.params.nic;
    const mobileNumber = req.params.mobileNumber;


    conn.query("SELECT deptID FROM department WHERE name='" + department + "'", function(err, result, fields) {
        if(err) throw err;
        console.log(result);
        const deptID = result[0]['deptID'];
        
        conn.query(`INSERT INTO employee_details VALUES('${empID}', '${fName}', '${lName}', '${email}', '${position}','${deptID}', '${payRate}', '${nic}', '${mobileNumber})`, function(err, result, fields) {
            if(err) throw err;
            res.status(201).json({
            });
        });
    });
    

};


module.exports = {
    getUserDetails,
    getAllEmployees,
    lastEMPid,
    addNewEmployee
}