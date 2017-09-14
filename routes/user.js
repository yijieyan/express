const express = require('express');
const router = express.Router();
const commonError = require('../libs/error');
const wrap = require('co-express');
let {getParams} = require('../libs/util');
let User = require('../models/user');

/**
 * 退出登陆
 */
router.post('/signOut', wrap(function* (req, res, next) {
    yield req.deleteSession(req.headers.token);
    res.success({data: `signOut successful!`});
}));

module.exports = router;
