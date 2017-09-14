const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let fileSchema = new Schema({
    originalname: String,
    mimetype: String,
    filename: String,
    path: String,
    size: String
},{versionKey: false, timestamps: true});

module.exports = mongoose.model('file', fileSchema);