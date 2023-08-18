const express = require('express');
const router = express.Router();

const { getDepartmentDetails } = require('../controllers/department');


router.get('/details', getDepartmentDetails);


module.exports = router;