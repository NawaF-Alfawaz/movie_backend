const MovieService = require('../services/movie_services');


const listMovies = async (req, res) => {
  try {
    const movies = await MovieService.listMovies(); // Call listMovies from the service layer
    res.status(200).json(movies); // Send the movies list as a JSON response with a 200 status
  } catch (err) {

    // Handle any error that occurred
    console.error('Error listing movies:', err);
    res.status(500).json({ message: 'Error listing movies', error: err.message });
  }
};


const checkAvailability = async (req, res) => {
    try {
      const { movieId, timeSlotId } = req.params;
  
      // Convert timeSlotId to integer to use as an index
      const timeSlotIndex = parseInt(timeSlotId, 10);


      // Use the MovieService to check availability
      const { remainingCapacity } = await MovieService.checkAvailability(movieId, timeSlotIndex);
  
      // Return the remaining capacity
      res.status(200).json({ remainingCapacity });
    } catch (err) {
      console.error('Error checking availability:', err);
      if (err.message === 'Movie not found' || err.message === 'Time slot not found') {
        return res.status(404).json({ message: err.message });
      }
      res.status(500).json({ message: 'Error checking availability', error: err.message });
    }
  };

  module.exports = {
    listMovies,
    checkAvailability,
  };