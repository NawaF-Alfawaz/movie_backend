const express = require('express');
const {listMovies, checkAvailability} = require('../controllers/movieControllers');


const router = express.Router();

// Route to list all movies
router.get('/', listMovies);
router.get('/:movieId/timeslots/:timeSlotId/availability', checkAvailability);


// Route to get a movie by ID
//router.get('/movies/:id', getMovieById);


module.exports = router;
