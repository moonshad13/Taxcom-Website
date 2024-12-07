const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new review
router.post('/', async (req, res) => {
    const { author, content } = req.body;
    try {
        const newReview = new Review({ author, content });
        const savedReview = await newReview.save();
        res.json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error saving review' });
    }
});

module.exports = router;
