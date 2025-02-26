const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a car name'],
    trim: true
  },
  price_per_day: {
    type: Number,
    required: [true, 'Please add a price per day'],
    min: [0, 'Price must be positive']
  },
  year: {
    type: Number,
    required: [true, 'Please add a manufacture year'],
    min: [1900, 'Year must be valid'],
    max: [2100, 'Year must be valid']
  },
  color: {
    type: String,
    required: [true, 'Please add a color'],
    lowercase: true
  },
  steering_type: {
    type: String,
    required: [true, 'Please add a steering type'],
    enum: ['automatic', 'manual']
  },
  number_of_seats: {
    type: Number,
    required: [true, 'Please add number of seats'],
    min: [1, 'Must have at least 1 seat'],
    max: [10, 'Cannot have more than 10 seats']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Car', CarSchema);