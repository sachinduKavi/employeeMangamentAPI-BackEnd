const express = require('express');
const router = express.Router();

const { getUserDetails, getAllEmployees, lastEMPid, addNewEmployee, deleteEmployee, updateEmployee, getEmployeeCount, rankOrder, isRegistered } = require('../controllers/employee_details');




router.get('/get_emp', lastEMPid);

router.get('/rankOrder', rankOrder);

router.post('/addEmployee/:user_id/:fName/:lName/:email/:position/:department/:payRate/:nic/:mobileNumber', addNewEmployee);

router.put('/updateEmployee/:user_id/:fName/:lName/:email/:position/:department/:payRate/:nic/:mobileNumber', updateEmployee);

router.get('/isRegistered/:empID', isRegistered);

router.get('/getEmployeeCount', getEmployeeCount);

router.get('/:user_email', getUserDetails);

router.get('/', getAllEmployees);

router.delete('/deleteEmp/:empNo', deleteEmployee);



module.exports = router;