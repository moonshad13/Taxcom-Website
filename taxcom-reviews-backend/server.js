const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taxcom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Review Schema
const reviewSchema = new mongoose.Schema({
  name: String,
  review: String,
  rating: Number,
});

const Review = mongoose.model('Review', reviewSchema);

// API Endpoint: Get All Reviews
app.get('/reviews', async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

// API Endpoint: Add a New Review
app.post('/reviews', async (req, res) => {
  const { name, review, rating } = req.body;
  const newReview = new Review({ name, review, rating });
  await newReview.save();
  res.json({ message: 'Review added successfully!' });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

