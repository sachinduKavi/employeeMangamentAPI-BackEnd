const express = require("express");
const router = express.Router();

const { getAdminDetails, updateAccess } = require("../controllers/admin_details");



router.get('/details/:user_email', getAdminDetails);

router.put('/updateAccess/:emp_id', updateAccess);

module.exports = router;