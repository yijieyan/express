const crypto = require('crypto');
const algorihtm = 'des3';
const securityKey = '!@#$%^&*()*&^%$#@!qwertyuiop~!@#$%^&*1234567890'; //越复杂越好
const intEncoding = "ascii";
const outEncoding = "hex";

/**
 * 加密
 */

function cipher(buf) {
   let encrypted = '';
   let cip = crypto.createCipher(algorihtm, securityKey);
    encrypted += cip.update(buf, intEncoding, outEncoding);
    encrypted += cip.final(outEncoding);
    return encrypted;
};


/**
 * 解密
 */

function decipher(encryptedBuf) {
    let decrypted = '';
    let decipher = crypto.createDecipher(algorihtm, securityKey);
    decrypted += decipher.update(encryptedBuf, outEncoding, intEncoding);
    decrypted += decipher.final(intEncoding);
    return decrypted;
};

/**
 * 签名，   encryption选择 md5,sha256 自己随便选或者其他的
 */
function sign(encryption, buf) {
  let signature = crypto.createHash(encryption);
    signature.update(buf);
  let hash = signature.digest('hex');
  return hash;
};


module.exports = {
    cipher, decipher, sign,
};

