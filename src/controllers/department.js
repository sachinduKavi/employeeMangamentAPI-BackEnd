// Initializing database
const {conn} = require('../db');


const getDepartmentDetails = (req, res) => {
    console.log("Get Department details");
    conn.query("select name, numEmployees, headEMPID, concat(f_name, ' ', l_name) as headName from departmentView inner join employee_details on headEMPID=employee_id", function(err, result, fields) {
        if(err) throw err;
        res.status(200).json({
            data: result
        });
    });
};

module.exports = {
    getDepartmentDetails
}