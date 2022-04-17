const { Schema, model } = require('mongoose');

// review schema
const reviewSchema = new Schema(
    {
        albumId: {
            type: String,
            required: true,
            unique: true
        },
        body: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        author: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)

const Review = model('Review', reviewSchema);

module.exports = Review;