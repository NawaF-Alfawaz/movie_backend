const ReservationService = require('../services/reservation_services');

const reserveTimeSlot = async (req, res) => {
  try {
    const { movieId, timeSlotIndex, numberOfPeople } = req.body;
    console.log(req.body);


    // Convert timeSlotId to integer to use as an index
    // Reserve the time slot using the ReservationService
    const reservation = await ReservationService.reserveTimeSlot(movieId, parseInt(timeSlotIndex, 10), numberOfPeople);

    // Respond with the reservation details
    res.status(201).json({ message: 'Reservation successful', reservation });
  } catch (err) {
    console.error('Error reserving time slot:', err);
    if (err.message === 'Movie not found' || err.message === 'Not enough seats available') {
      return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Error reserving time slot', error: err.message });
  }
};

module.exports = {
    reserveTimeSlot
  };
