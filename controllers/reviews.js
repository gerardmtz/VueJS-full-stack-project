const express = require('express');
const Counter = require('../models/counter');
const Review = require('../models/review');

async function getNextSequence(name) {
    const counter = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return counter.seq;
}

// Controllers for review routes
const putReview = async (req, res) => {
    const reviewId = req.params.id;
    const reviewData = req.body;

    try {
        if (reviewId) {
            const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
            if (!updatedReview) {
                return res.status(404).send('Review not found');
            }
            return res.status(200).send(updatedReview);
        } else {
            const newReviewId = await getNextSequence(reviewId);
            const newReview = new Review({
                review_id: newReviewId,
                ...reviewData
            });
            await newReview.save();
            return res.status(201).send(newReview);
        }
    } catch (err) {
        return res.status(500).send('Error processing request: ' + err.message);
    }
}

const deleteReview = async (req, res) => {
    const reviewId = req.params.id;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).send('Review not found');
        }

        await Review.findByIdAndDelete(reviewId);
        return res.send({ message: 'Review successfully deleted' });
    } catch (err) {
        return res.status(500).send('Error deleting the review: ' + err.message);
    }
}

const getProductReview = async (req, res) => {
    const productId = parseInt(req.params.productId, 10);
    try {
        const reviews = await Review.find({ product_id: productId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reseñas.' });
    }
}

const getAverageProductReview = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await Review.find({ product_id: productId });
        if (reviews.length === 0) {
            return res.status(200).json({ averageRating: 0 });
        }
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = (totalRating / reviews.length).toFixed(1);
        res.status(200).json({ averageRating });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching average rating.' });
    }
}

module.exports = {
    putReview,
    deleteReview,
    getProductReview,
    getAverageProductReview
}
