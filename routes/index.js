const express = require('express');
const router = express.Router();
const public1 = require('./public');
const user = require('./user');

router.use('/user', user);
router.use('/public',public1);

module.exports = router;
