// Initializing the database
const { conn } = require('../db');


const getAttendanceOf = (req, res) => {
    console.log("Get Attendance of");
    conn.query(`SELECT * FROM attendance`, function(err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            result: result
        });
    });
};

const checkAvailability = (req, res) => {
    console.log("Get attendance");
    const empNo = req.params.empNo;
    const year = req.params.year;
    const month = req.params.month;
    console.log(empNo, year, month);

    conn.query(`SELECT empID, noDays, payRate, CONCAT(f_name, ' ', l_name) as fullName, position, nic, mobile_number, department.name as deptName FROM attendance JOIN employee_details ON attendance.empID=employee_details.employee_id LEFT JOIN department ON department.deptID=employee_details.deptID WHERE empID='${empNo}' and year='${year}' and month='${month}'`, function(err, result, fields) {
        if(err) throw err;
            if (result.length > 0) {
            res.status(200).json({
                status: "File Found",
                data: result
            });
        } else{
            res.status(404).json({
                status: "Not Found"
            })
        }
    });
};

const updateAttendance = (req, res) => {
    console.log("Update Attendance");
    const empNo = req.params.empNo;
    const year = req.params.year;
    const month = req.params.month;
    const attendance = req.params.attendance;

    conn.query(`SELECT noDays FROM attendance WHERE empID='${empNo}' AND year='${year}' AND month='${month}'`, function(err, result, fields) {
        if (err) throw err;
        if(result.length > 0) {
            conn.query(`UPDATE attendance SET noDays='${attendance}' WHERE empID='${empNo}' AND year='${year}' AND month='${month}'`);
            res.status(200).json({
                status: "EXISTS",
                preAttendance: result[0]['noDays'],
                newAttendance: attendance
            });
        } else {
            conn.query(`INSERT INTO attendance VALUES('${empNo}', '${year}', '${month}', '${attendance}')`);
            res.status(200).json({
                status: "NOT EXISTS"
            });
        }
    });
};


module.exports = {
    getAttendanceOf,
    checkAvailability,
    updateAttendance
}