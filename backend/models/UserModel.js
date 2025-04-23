var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'name' : String,
	'email' : String,
	'reviews' : Array,
	'trusted_status' : Boolean
});

module.exports = mongoose.model('User', UserSchema);
