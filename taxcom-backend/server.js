const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const reviewsRouter = require('./routes/reviews');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taxcom_reviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/reviews', reviewsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


