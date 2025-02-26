const express = require('express');
const { getRentalCars } = require('../controllers/carController');

const router = express.Router();

router.get('/rental-cars', getRentalCars);

module.exports = router;