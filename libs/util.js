const xss = require('xss');
const security = require('../libs/security');

/**
 *转义 html的标签
 */
let getParams = function (obj) {
    let o = {};
    for(let key in obj) {
        o[key] = xss(obj[key]);
    }
    return o;
};

/**
 *密码做签名，存数据库为密文
 */
let generatorPassword = function(password) {
    password = security.sign('sha256', security.sign('md5', password));
    return password;
};

/**
 *生成token,用户唯一标示
 */

let generatorToken = function(userId) {
    return security.cipher(`${userId}:${Date.now()}`);
};
module.exports= {
    getParams,
    generatorPassword,
    generatorToken
};