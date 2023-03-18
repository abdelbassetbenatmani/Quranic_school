const router = require('express').Router();
const { getTeachersPage } = require('../services/teachersService');
const { protect } = require('../services/authService');

router.route('/').get(protect, getTeachersPage);

module.exports = router;
