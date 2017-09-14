const commonError = require('../libs/error');
const security = require('../libs/security');
const redis = require('../libs/redis');
module.exports = function*(req, res, next) {
    res.success = function (data) {
        res.json({code: 0, data});
    };

    res.fail = function (data) {
         res.json({code: data.code || -1, message: data.message});
    };

    //从Redis获取session
    req.getSession = function*(token) {
            let [userId, time] = security.decipher(token).split(':');
            let session = yield redis.get(userId);
            if(!session || session.time != time) {
                throw new commonError.TokenVerificationFail();
            }
            delete session.time;
            return session;
    };

    //重新设置session
    req.reSetSession = function*(value) {
            let [userId, time] = security.decipher(token).split(':');
            let session = yield redis.get(userId);
            if(!session || session.time != time) {
                throw new commonError.TokenVerificationFail();
            }
            Object.assign(session, value);
            return yield redis.set(userId, session);
    };

    //设置session
    req.setSession = function*(user, token) {
        try{
            let [userId, time] = security.decipher(token).split(':');
            user.time = time;
            user._doc.time = time;
            let status = yield redis.set(userId, user);
            return status;
        }catch(err) {
            throw new commonError.TokenVerificationFail();
        }
    };

    //删除session
    req.deleteSession = function*(token) {

            let [userId, time] = security.decipher(token).split(':');
            let session = yield redis.get(userId);
            if(!session || session.time != time) {
                throw new commonError.TokenVerificationFail();
            }
            return yield redis.del(userId);

    };
    if(req.path == '/favicon.ico') return;
    if(!req.path.startsWith('/public')) {
        let {token, cookies} = req.headers;
        //如果cookies存在，再具体分析需要验证cookies里的那个值，我这里用token
        if(!token) {
            throw  new commonError.TokenVerificationFail();
        }
        let session = yield req.getSession(token);
        req.user= {};
        req.user.userId = session.userId;
    }
    next();
};