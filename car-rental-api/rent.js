const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const mongodb = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await mongodb.connect();
    console.log("Connected to MongoDB");
    return mongodb.db("carRental");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = { mongodb, connectToDatabase };