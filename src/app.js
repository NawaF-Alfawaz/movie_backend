const express = require('express');
const bodyParser = require('body-parser');
const moviesRoutes = require('./routes/movies_route');
const reservationsRoutes = require('./routes/reservation_route');
const MovieService = require('./services/movie_services');  // Import MovieService
const ReservationService = require('./services/reservation_services');  // Import ReservationService


const app = express();

app.use(express.json());
app.use(bodyParser.json());

// Default route to test if server is running
app.get('/', (req, res) => {
    res.send("Hello, welcome to the Movie API!");
});

// Movie and reservation routes
app.use('/movies', moviesRoutes);
app.use('/reservations', reservationsRoutes);

// Lifecycle Hooks Integration
//Used only for testing purpose 
const onAppStart = async () => {
    await Promise.all([
        MovieService.deleteAllMovies(), // Delete movies
        ReservationService.deleteAllReservations() // Delete reservations
    ]);

    await MovieService.addMovies(); // Add movies when the app starts
};

const onAppClose = async () => {
    await Promise.all([
        MovieService.deleteAllMovies(), // Delete movies
        ReservationService.deleteAllReservations() // Delete reservations
    ]);
};

// Run lifecycle hooks when backend starts
onAppStart();

// Handle application close events (e.g., Ctrl+C)
process.on('SIGINT', async () => {
    await onAppClose();
    process.exit(0);
});

module.exports = app;
