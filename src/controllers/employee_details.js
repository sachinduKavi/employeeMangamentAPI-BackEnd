// Init database
const {conn} = require('../db');


const getUserDetails = (req, res) => {
    const user_email = req.params.user_email;
    console.log("User Details", user_email)
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

const isRegistered = (req, res) => {
    const empID = req.params.empID;
    conn.query(`SELECT employee_id FROM employee_details WHERE employee_id='${empID}'`, function(err, result, fields) {
        if (result.length > 0) {
            res.status(200).json();
        } else {
            res.status(400).json();
        }
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
    console.log("Last Employee ID");
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
    console.log("Add Employee");
    const empID = req.params.user_id;
    const fName = req.params.fName.replace("+", " ");
    const lName = req.params.lName.replace("+", " ");
    const email = req.params.email;
    const position = (req.params.position).replace("+", " ");
    const department = req.params.department.replace("+", " ");
    const payRate = req.params.payRate;
    const nic = req.params.nic;
    const mobileNumber = req.params.mobileNumber;
    console.log(empID);
    
    conn.query("SELECT deptID FROM department WHERE name='" + department + "'", function(err, result, fields) {
        if(err) throw err;
        const deptID = result[0]['deptID'];
        console.log(deptID);

        var count;
        conn.query("SELECT COUNT(employee_id) AS count FROM employee_details", function(err, result, fields){
            count = result[0]['count'];
            conn.query(`INSERT INTO employee_details VALUES('${empID}', '${fName}', '${lName}', '${email}', '${position}','${deptID}', '${payRate}', '${nic}', '${mobileNumber}', '${count+1}')`, function(err, result, fields) {
                if(err) throw err;
                res.status(201).json(result);
            });
        });
    });
    

};

const deleteEmployee = (req, res) => {
    const empNo = req.params.empNo;
    console.log("Delete Employee: ", empNo);

    conn.query(`DELETE FROM employee_details WHERE employee_id='${empNo}'`, function(err, result, fields) {
        if(err) throw err;
        res.status(202).json({});
    });
};

const updateEmployee = (req, res) => {
    console.log("Updating Employee Record");    
    
    const emp_no = req.params.user_id;
    console.log("Employee number: ", emp_no);
    const fName = req.params.fName.replace("+", " ");
    const lName = req.params.lName.replace("+", " ");
    const email = req.params.email;
    const position = (req.params.position).replace("+", " ");
    const department = req.params.department.replace("+", " ");
    const payRate = req.params.payRate;
    const nic = req.params.nic;
    const mobileNumber = req.params.mobileNumber;

    conn.query("SELECT deptID FROM department WHERE name='" + department + "'", function(err, result, fields) {
        if(err) throw err;
        const deptID = result[0]['deptID'];
        console.log(deptID);

        conn.query(`UPDATE employee_details SET f_name='${fName}', l_name='${lName}', email='${email}', deptID='${deptID}',
        position='${position}', payRate='${payRate}', NIC='${nic}', mobile_number='${mobileNumber}' WHERE employee_id='${emp_no}'`, function(err, result, fields){
            if (err) throw err;
            res.status(201).json({result: "Record Updated"});
        });
    });
};

const getEmployeeCount = (req, res) => {
    console.log("Total count");
    conn.query("SELECT COUNT(employee_id) AS count from employee_details", function(err, result, fields) {
        res.status(200).json({
            count: result[0]['count']
        });
    });
};

const rankOrder = (req, res) => {
    console.log("Ranking");
    conn.query(`SELECT employee_id, CONCAT(f_name, ' ', l_name) AS name, rank from employee_details ORDER BY rank ASC LIMIT 6`, function(err, result, fields) {
        console.log(result);
        res.status(200).json({result: result});
    });
    
};



module.exports = {
    getUserDetails,
    getAllEmployees,
    lastEMPid,
    addNewEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployeeCount,
    rankOrder,
    isRegistered
}