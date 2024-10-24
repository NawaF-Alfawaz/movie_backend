const mongoose = require('mongoose');
const db = require('../config/database');

const { Schema } = mongoose;

// Define the Reservation schema
const reservationSchema = new Schema({
    movieId: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
      required: true,
    },
    timeSlotIndex: {
      type: Number,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    reservedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Create Models
  const ReservationModel = db.model('Reservation', reservationSchema);

  
  // Export Models
  module.exports =  ReservationModel;
  