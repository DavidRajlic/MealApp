const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  rating: { type: Number, required: true },
  dishName: {type: String, required: false},
  anonymous: { type: Boolean, default: false },
  comment: String,
  images: [{ type: String }],
  votes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    value: { type: Number, enum: [1, -1] } // 1 = upvote, -1 = downvote
  }],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
