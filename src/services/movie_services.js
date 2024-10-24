const MovieModel = require('../models/movie');

class MovieService {


    // Helper function to find movie by ID
    static async findMovieById(movieId) {
        try {
        // Find the movie by ID
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }
        return movie;
        } catch (err) {
            throw new Error('Error finding movie: ' + err.message);
        }
    }

    static async listMovies() {
        try {
        const movies = await MovieModel.find({});
        return movies.map(movie => ({
            _id:movie._id,
            title: movie.title,
            thumbnailUrl: movie.thumbnailUrl,
            rating: movie.rating,
            genre:movie.genre,
            timeSlots: movie.timeSlots.map(slot => ({
            startTime: slot.startTime,
            capacity: slot.capacity,
            bookedCount: slot.bookedCount,
            })),
        }));
        } catch (err) {
        throw err; 
        }
    }

    static async checkAvailability(movieId, timeSlotIndex) {
        try {
        // Find the movie by ID
        const movie = await MovieService.findMovieById(movieId);
    
        // Access the time slot using the provided index
        if (!movie.timeSlots[timeSlotIndex]) {
            throw new Error('Time slot not found');
        }
    
        const timeSlot = movie.timeSlots[timeSlotIndex];
    
        // Calculate the remaining capacity
        const remainingCapacity = timeSlot.capacity - timeSlot.bookedCount;
    
        return { remainingCapacity };
        } catch (err) {
        throw err;
        }
    }

    // Update booked count for a specific time slot
    static async updateBookedCount(movieId, timeSlotIndex, numberOfPeople) {
        try {
            // Find the movie by ID
            const movie = await MovieService.findMovieById(movieId);

            // Validate the timeSlotIndex
            if (!movie.timeSlots[timeSlotIndex]) {
                throw new Error('Time slot not found');
            }

            const timeSlot = movie.timeSlots[timeSlotIndex];
            

            // Update the booked count for the time slot
            timeSlot.bookedCount += numberOfPeople;

            // Save the updated movie document
            await movie.save();

            return {
                message: 'Booked count updated successfully',
                updatedBookedCount: timeSlot.bookedCount
            };
        } catch (err) {
            throw new Error('Error updating booked count: ' + err.message);
        }
    }

    //Add list of prepared movies
    //Used only for testing purpose 
    static async addMovies() {
        const movies = [
            {
                title: "The Grudge",
                genre: "Horror",
                rating: 3.5,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg",
                timeSlots: [
                    {
                        startTime: new Date('2024-10-25T14:00:00Z'),
                        capacity: 50,
                        bookedCount: 10
                    },
                    {
                        startTime: new Date('2024-10-25T18:00:00Z'),
                        capacity: 50,
                        bookedCount: 25
                    }
                ]
            },
            {
                title: "Underwater",
                genre: "Action, Horror, Science Fiction",
                rating: 3.0,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/4/4a/Underwater_poster.jpeg",
                timeSlots: [
                    {
                        startTime: new Date('2024-10-26T12:00:00Z'),
                        capacity: 60,
                        bookedCount: 20
                    },
                    {
                        startTime: new Date('2024-10-26T16:00:00Z'),
                        capacity: 60,
                        bookedCount: 30
                    }
                ]
            },
            {
                title: "Like a Boss",
                genre: "Comedy",
                rating: 2.8,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/9/9a/LikeaBossPoster.jpg",
                timeSlots: [
                    {
                        startTime: new Date('2024-10-27T14:00:00Z'),
                        capacity: 70,
                        bookedCount: 15
                    },
                    {
                        startTime: new Date('2024-10-27T19:00:00Z'),
                        capacity: 70,
                        bookedCount: 40
                    }
                ]
            },
            {
                title: "Three Christs",
                genre: "Drama",
                rating: 3.2,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/a/a1/Three_Christs_poster.jpg",
                timeSlots: [
                    {
                        startTime: new Date('2024-10-28T13:00:00Z'),
                        capacity: 40,
                        bookedCount: 5
                    },
                    {
                        startTime: new Date('2024-10-28T17:00:00Z'),
                        capacity: 40,
                        bookedCount: 10
                    }
                ]
            },
            {
                title: "Inherit the Viper",
                genre: "Crime, Drama",
                rating: 3.0,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Inherit_the_Viper_%282019%29_Film_Poster.jpg",
                timeSlots: [
                    {
                        startTime: new Date('2024-10-29T15:00:00Z'),
                        capacity: 30,
                        bookedCount: 12
                    },
                    {
                        startTime: new Date('2024-10-29T20:00:00Z'),
                        capacity: 30,
                        bookedCount: 18
                    }
                ]
            },
            {
                title: "The Sonata",
                genre: "Mystery, Thriller",
                rating: 2.9,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/1/13/The_Sonata_%282018%29_Film_Poster.jpg",
                timeSlots: [
                    {
                        startTime: new Date('2024-10-30T14:00:00Z'),
                        capacity: 45,
                        bookedCount: 20
                    },
                    {
                        startTime: new Date('2024-10-30T18:00:00Z'),
                        capacity: 45,
                        bookedCount: 25
                    }
                ]
            },
            {
                title: "The Murder of Nicole Brown Simpson",
                genre: "Crime, Horror",
                rating: 2.5,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/e/ed/The_Murder_of_Nicole_Brown_Simpson_poster.jpg",
                timeSlots: [
                    {
                        startTime: new Date('2024-10-31T12:00:00Z'),
                        capacity: 35,
                        bookedCount: 10
                    },
                    {
                        startTime: new Date('2024-10-31T17:00:00Z'),
                        capacity: 35,
                        bookedCount: 15
                    }
                ]
            },
            {
                title: "Bad Boys for Life",
                genre: "Action, Comedy",
                rating: 4.0,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/9/90/Bad_Boys_for_Life_poster.jpg",
                timeSlots: [
                    {
                        startTime: new Date('2024-11-01T14:00:00Z'),
                        capacity: 80,
                        bookedCount: 50
                    },
                    {
                        startTime: new Date('2024-11-01T19:00:00Z'),
                        capacity: 80,
                        bookedCount: 60
                    }
                ]
            },
            {
                title: "Dolittle",
                genre: "Adventure, Fantasy",
                rating: 3.1,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/1/1f/Dolittle_%282020_film_poster%29.png",
                timeSlots: [
                    {
                        startTime: new Date('2024-11-02T13:00:00Z'),
                        capacity: 100,
                        bookedCount: 70
                    },
                    {
                        startTime: new Date('2024-11-02T18:00:00Z'),
                        capacity: 100,
                        bookedCount: 80
                    }
                ]
            },
            {
                title: "A Fall from Grace",
                genre: "Thriller",
                rating: 2.8,
                thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/4/4e/AFallFromGrace.png",
                timeSlots: [
                    {
                        startTime: new Date('2024-11-03T15:00:00Z'),
                        capacity: 55,
                        bookedCount: 25
                    },
                    {
                        startTime: new Date('2024-11-03T20:00:00Z'),
                        capacity: 55,
                        bookedCount: 35
                    }
                ]
            },
        ];
    
        try {
            await MovieModel.insertMany(movies);
            console.log('Movies have been added successfully');
        } catch (error) {
            console.error('Error adding movies:', error);
        }
    };

    // Delete all movies from the database
    //Used only for testing purpose 
    static async deleteAllMovies(){
    try {
        await MovieModel.deleteMany({});
        console.log('All movies have been deleted successfully');
    } catch (error) {
        console.error('Error deleting movies:', error);
    }
};

    


}

module.exports = MovieService;
