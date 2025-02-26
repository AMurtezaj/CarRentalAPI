const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Regjistrimi i nje useriii 
exports.register = async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || !email || !username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    });
  }

  try {
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db('carRental');
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      await client.close();
      return res.status(400).json({
        success: false,
        message: 'Email or username already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Krijimi i nje useriii 
    const newUser = {
      fullName,
      email,
      username,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await db.collection('users').insertOne(newUser);
    
    // Krijimi i tokenit
    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    await client.close();
    
    res.status(201).json({
      success: true,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validimi email & password
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide username and password'
    });
  }

  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db('carRental');
    
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      await client.close();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      await client.close();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    await client.close();
    
    res.status(200).json({
      success: true,
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};