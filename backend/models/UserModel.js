var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'name' : String,
	'email' : String,
	'reviews' : [{ type: Schema.Types.ObjectId, ref: 'Review' }],
	'trusted_status' : Boolean
});

module.exports = mongoose.model('User', UserSchema);
