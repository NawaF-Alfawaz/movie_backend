const ReservationModel = require('../models/reservation');
const MovieService = require('../services/movie_services');

class ReservationService {

    static async reserveTimeSlot(movieId, timeSlotIndex, numberOfPeople) {
        try {
            // Update the booked count for the movie time slot
            const updateResult = await MovieService.updateBookedCount(movieId, timeSlotIndex, numberOfPeople);
            if (updateResult) {
                // Create and save a new reservation
                const newReservation = new ReservationModel({
                    movieId,
                    timeSlotIndex,
                    numberOfPeople,
                });

                await newReservation.save();

                return newReservation;
            } else {
                throw new Error('Failed to update booked count');
            }
        } catch (err) {
            throw new Error('Error reserving time slot: ' + err.message);
        }
    }

    // Delete all reservations from the database
    //Used only for testing purpose 
    static async deleteAllReservations(){
        try {
            await ReservationModel.deleteMany({});
            console.log('All reservations have been deleted successfully');
        } catch (error) {
            console.error('Error deleting reservations:', error);
        }
    };
}

module.exports = ReservationService;
