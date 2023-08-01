const {conn} = require('../db');

const getAdminDetails = (req, res) => {
    const user_email = req.params.user_email;
    var gate = 0;
    if(user_email === ':user_email') gate = 1;

    conn.query("SELECT * FROM admin_details INNER JOIN employee_details ON admin_details.emp_id = employee_details.employee_id WHERE admin_details.user_email='" + user_email + "' OR " + gate, function(err, result, fields) {
        if(err) throw err;
        var status, status_code;
        if(result.length > 0) {
            status = "Record Found";
            status_code = 200;          
        }else {
            status = "No Records";
            status_code = 404;
        }

        res.status(status_code).json({
            status: status,
            data: result
        });
    });
}

const updateAccess = (req, res) => {
    const emp_id = req.params.emp_id;
    conn.query("UPDATE admin_details SET last_accessed_date=curdate() WHERE emp_id='" + emp_id + "'", function(err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
}

module.exports = {
    getAdminDetails,
    updateAccess
}