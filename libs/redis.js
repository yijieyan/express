const redis = require('redis');
const config = require('../config')[env];
const {timeout, host, port} = config.redis;

let redisClient;

function connectionServer() {
   redisClient = redis.createClient(port, host);
};

/**
 *
 * @param key
 * 判断key是否存在redis中
 */
function* has(key) {
    if(!key) return ;
    if(!redisClient)
        connectionServer();
    return yield redisClient.exists.bind(redisClient, key);
};

/**
 * 根据key去redis中获取信息
 */

function* get(key){
    if(!key) return;
    if(!redisClient)
        connectionServer();
    let str =  yield redisClient.get.bind(redisClient, key);
    return JSON.parse(str);
};



/**
 *
 * 根据key删除信息
 */
function* del(key) {
    if(!key) return;
    if(!redisClient)
        connectionServer();
    return yield redisClient.del.bind(redisClient, key);
};


function* set(key, value, _timeout = timeout) {
     if(!key || !value) return ;
     if(!redisClient)
         connectionServer();
     if(value instanceof Object) {
         value = JSON.stringify(value);
     }
     let val = yield redisClient.set.bind(redisClient, key, value);
     yield redisClient.expire.bind(redisClient, key, _timeout);
     return val;
};


 module.exports = {
     has, get, del, set
 };

