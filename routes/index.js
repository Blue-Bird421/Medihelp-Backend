const express = require('express');
const userRoutes = require('./user');
const distressRoutes = require('./distress');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/distress', distressRoutes);

module.exports = router;
