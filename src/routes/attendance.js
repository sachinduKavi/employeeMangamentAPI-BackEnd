const express = require('express');
const router = express.Router();


const { getAttendanceOf, checkAvailability, updateAttendance } = require('../controllers/attendance');


router.get('/getAttendanceOf', getAttendanceOf);

router.get('/checkAvailable/:empNo/:year/:month', checkAvailability);

router.post('/updateAttendance/:empNo/:year/:month/:attendance', updateAttendance);


module.exports = router;


