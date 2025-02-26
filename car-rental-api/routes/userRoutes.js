const express = require('express');
const { getMyProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/my-profile', protect, getMyProfile);

module.exports = router;