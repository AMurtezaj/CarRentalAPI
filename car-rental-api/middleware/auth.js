const jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verifikimi tokenit
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Konektimi mee Mongo DB
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db('carRental');
    
    // Get user nga tokenii
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id) });
    
    if (!user) {
      await client.close();
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }

    req.user = user;
    await client.close();
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};