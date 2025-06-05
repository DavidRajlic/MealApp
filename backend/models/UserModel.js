const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  'name': { type: String, required: true },
  'email': { type: String, required: true, unique: true },
  'password': { type: String, required: true },
  'reviews': [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  'role': {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  'trusted_status': { type: Number, default: 0 },
  'anonymous': { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  // Hash password using bcryptjs
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (!user) {
    throw new Error('User not found.');
  }

  const result = await bcrypt.compare(password, user.password);
  if (!result) {
    throw new Error('Incorrect password.');
  }

  return user; // OK!
};


module.exports = mongoose.model('User', UserSchema);
