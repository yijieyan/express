const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger1 = require('morgan');
require('./libs/log').logger();
const bodyParser = require('body-parser');
const fs = require('fs');
const wrap = require('co-express');
const db = require('./libs/db');
const auth = require('./middleware/auth');
process.env.dataDir = path.join(__dirname, './');

let router = require('./routes');

let app = express();
app.use(logger1('dev'));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(wrap(auth));
app.use(function(req, res, next) {
    logger.info({
        method: req.method,
        url: req.url,
        headers: req.headers
    });
    next();
});
app.use(router);
app.use(function(req, res, next) {
  let err = new Error();
  err.name = "Not Found";
  err.code = 10000;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.log(err.stack);
    logger.error({
        code: err.code,
        message:err.name,
        stack: err.stack
    });
    res.fail({code:err.code, message:err.name});

});

module.exports = app;
