var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String

})
mongoose.model('EduJan',UserSchema)
module.exports = mongoose.model('EduJan')