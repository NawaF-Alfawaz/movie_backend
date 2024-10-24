const mongoose = require('mongoose');
const db = require('../config/database');

const { Schema } = mongoose;

// Define the Movie schema
const movieSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    genre: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    thumbnailUrl: {
        type: String,
        required: false
    },
    timeSlots: [
        {
          startTime: {
            type: Date,
            required: true,
          },
          capacity: {
            type: Number,
            required: true,
          },
          bookedCount: {
            type: Number,
            default: 0,
          },
          _id: false,
        },
      ],
  });


// Create the Movie model
const MovieModel = db.model('Movie', movieSchema);

module.exports = MovieModel;
