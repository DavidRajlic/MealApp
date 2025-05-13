const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  'name': { type: String, required: true },
  'email': { type: String, required: true, unique: true },
  'password': { type: String, required: true },
  'reviews': [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  'trusted_status': { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  // Hash password using bcryptjs
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.statics.authenticate = function(email, password, callback) {
  this.findOne({ email: email })
    .exec(function(err, user) {
      if (err) return callback(err);
      if (!user) {
        const error = new Error('User not found.');
        error.status = 401;
        return callback(error);
      }
      
      bcrypt.compare(password, user.password, function(err, result) {
        if (err) return callback(err);
        if (result === true) {
          return callback(null, user); // Authentication successful
        } else {
          return callback(null, false); // Password doesn't match
        }
      });
    });
};

module.exports = mongoose.model('User', UserSchema);
