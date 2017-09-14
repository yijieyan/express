const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
   username: String, //用户名
   password: String, //密码
   phone: String,    //手机号
   email: String,    //密码
   avatar: String,   //头像
   gender: Boolean   //性别
},{versionKey: false, timestamps: true});

module.exports = mongoose.model('user', userSchema);