const { MongoClient } = require('mongodb');
require('dotenv').config();

exports.getRentalCars = async (req, res) => {
  try {
    
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db('carRental');
    
    const query = {};
    
    if (req.query.year) {
      query.year = parseInt(req.query.year);
    }
    
    if (req.query.color) {
      query.color = req.query.color;
    }
    
    if (req.query.steering_type) {
      query.steering_type = req.query.steering_type;
    }
    
    if (req.query.number_of_seats) {
      query.number_of_seats = parseInt(req.query.number_of_seats);
    }
    
    const cars = await db.collection('cars')
      .find(query)
      .sort({ price_per_day: 1 })
      .toArray();
    
    await client.close();
    
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }

};