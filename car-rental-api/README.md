# Car Rental API

A simple REST API for a car rental service built with Express and MongoDB.

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository:
   git clone <repository-url>
   cd car-rental-api

2. Install dependencies:
npm install

3.Set up environment variables:
.env file:
PORT=3000
MONGO_URI=mongodb://localhost:27017/carRental
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_EXPIRE=30d

4. Start the server:
npm start

5. API ENDPOINTS: 
API Endpoints
Authentication

POST (http://localhost:3000/api/login) - Register a new user
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123"
}

POST /api/login - Login a user
{
  "username": "johndoe",
  "password": "password123"
}

GET /api/my-profile - Get current user profile (Requires authentication)
Headers:
Authorization: Bearer <token>

Cars

GET /api/rental-cars - Get all rental cars sorted by price
Query parameters (optional):

year
color
steering_type
number_of_seats

Testing the API
You can test the API using tools like Postman or curl.

## Step 11: Test Data for MongoDB

Before testing the API, you might want to add some car data to your MongoDB collection. Here's a MongoDB script to add some sample data:

// Connect to MongoDB shell and run:
use carRental;

// Insert some sample cars
db.cars.insertMany([
  {
    "name": "Golf mk8",
    "price_per_day": 50.0,
    "year": 2015,
    "color": "black",
    "steering_type": "automatic",
    "number_of_seats": 5
  },
  {
    "name": "Toyota Corolla",
    "price_per_day": 45.0,
    "year": 2018,
    "color": "white",
    "steering_type": "automatic",
    "number_of_seats": 5
  },
  {
    "name": "Honda Civic",
    "price_per_day": 48.0,
    "year": 2019,
    "color": "red",
    "steering_type": "manual",
    "number_of_seats": 5
  },
  {
    "name": "BMW 3 Series",
    "price_per_day": 80.0,
    "year": 2020,
    "color": "blue",
    "steering_type": "automatic",
    "number_of_seats": 5
  },
  {
    "name": "Mercedes C-Class",
    "price_per_day": 85.0,
    "year": 2021,
    "color": "silver",
    "steering_type": "automatic",
    "number_of_seats": 5
  }
]);