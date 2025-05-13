const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  price: Number,
  additional_payment: Number,
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  image: { type: String, required: false },  
  averageRating: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
