let generateError =  function(name, code, message){
    let c = function(customMsg, customCode){
        let temp = Error.call(this);
        temp.name = this.name = name;
        this.code = customCode || code;
        this.message = customMsg || message;
        this.stack = temp.stack;
    };

    c.prototype = Object.create(Error.prototype, {
        constructor: {
            value: c,
            writable: true,
            configurable: true
        }
    });

    return c;
};

module.exports = {
    PermissionDelied: generateError('PermissionDelied', 100000, '权限不足'),
    TokenVerificationFail: generateError('TokenVerificationFail', 100001, 'token验证失败'),
    MissingParameter: generateError('MissingParameter', 100002, '缺少参数'),
    UserIsExist: generateError('UserIsExist', 100003, '用户已经存在'),
    UserIsNotExist: generateError('UserIsNotExist', 100004, '该用户不存在'),
    PasswordIsError: generateError('PasswordIsError', 100005, '密码错误')
};
