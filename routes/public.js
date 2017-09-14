const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ccap = require('ccap')();
const commonError = require('../libs/error');
const wrap = require('co-express');
const multer  = require('multer');
let now = new Date(),
    currMonth = now.toISOString().substr(0, 7);
let upload = multer({ dest: `uploads/${currMonth}/`});
let {getParams, generatorPassword, generatorToken} = require('../libs/util');
let User = require('../models/user');
let File = require('../models/file');

/**
 * 用户注册
 */
router.post('/signUp', wrap(function*(req, res, next) {
        let {phone, email, password, gender, username} = getParams(req.body);
        if((!phone && !email) ||  !password) {
            throw new commonError.MissingParameter();
        }
        let u = yield User.findOne({$or:[{phone}, {email}]});
        if(u) {
            throw new commonError.UserIsExist()
        }
        password = generatorPassword(password);
        let user = yield User.create({phone, email, password, gender, username});
        res.success({message: 'signUp successful'});

}));

/**
 * 用户登陆
 */
router.post('/signIn', wrap(function*(req, res, next) {
    let {email, phone, password} = getParams(req.body);
    if((!email && !phone) || !password) {
        throw new commonError.MissingParameter();
    }
    let u = yield User.findOne({$or: [{email}, {phone}]});
    if(!u) {
        throw new commonError.UserIsNotExist();
    }
    if(u.password != generatorPassword(password)) {
        throw new commonError.PasswordIsError();
    }
    let token = generatorToken(u._id.toString());
    yield req.setSession(u, token);
    res.success({token});

}));

/**
 * 上传文件
 */

router.post('/uploadFile', upload.single('files'), wrap(function* (req, res, next) {
    let item = req.file;
        let f = yield File.create({
            originalname: item.originalname,
            mimetype: item.mimetype,
            filename: item.filename,
            path: item.path,
            size: item.size
        });
    res.success({fileId: f._id});
}));

/**
 * 下载文件
 */

router.get('/downloadFile', wrap(function* (req, res, next) {
    let {fileId} = getParams(req.query);
    f = yield File.findOne({_id: fileId});
    res.header('Content-disposition', `attachment; filename=${encodeURIComponent(f.originalname)}`);
    res.header('Content-type', f.mimetype);
    f.size ? res.header("Content-Length", Number(+f.size).toString()) : '';
    fs.createReadStream(path.resolve(process.env.dataDir, f.path)).pipe(res);
}));

/**
 * 验证码图片
 */

router.get('/getCcap', wrap(function* (req, res, next) {
    let ary = ccap.get();
    let txt = ary[0];
    let buf = ary[1];
    let ccapPath = process.env.dataDir + '/ccap';
    fs.existsSync(ccapPath) ? '' : fs.mkdirSync(ccapPath);
    yield wrieFile(buf, ccapPath + '/1.png');
    res.header('Content-type', 'image/png');
    fs.createReadStream(path.resolve(process.env.dataDir, ccapPath, '1.png')).pipe(res);
}));



function wrieFile(buf, path) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, buf, function(err) {
            if(err) {
                reject(err);
            }else {
                resolve();
            }
        })
    });
}
module.exports = router;