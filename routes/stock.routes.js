const express = require('express');
const stockControllers = require("../controllers/stock.controllers");



const router = express.Router();

router.post("/add-admin-stock",stockControllers.addAdminStock);
router.post("/view-admin-stock",stockControllers.viewAdminStock);
router.post("/delete-admin-stock",stockControllers.deleteStock);


router.post("/add-employee-stock",stockControllers.addEmployeeStock);

router.post("/edit-employee-stock",stockControllers.editStock);


module.exports = router;