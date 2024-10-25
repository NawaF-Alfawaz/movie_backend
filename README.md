# Movie Backend Project

This project is a Node.js backend server for managing movie-related data. It allows you to perform  operations on a movie and reservation database, and it is built using MongoDB as the database, Express.js for the server, and Mongoose for database modeling.

## Features

### Backend (Node.js, Nest.js or Express.js, MongoDB):

1. **Movie Listing**:
   - Create an API endpoint to retrieve and return a list of available movies.
   - Each movie should include its title and a list of time slots with their capacities and booked count.

2. **Check Availability**:
   - Create an API endpoint to check the availability of a specific time slot for a movie.
   - The endpoint should take the movie ID and time slot ID as parameters and return the remaining capacity for that time slot.

3. **Reserve Time Slot**:
   - Create an API endpoint to reserve seats for a movie time slot.
   - The API should take the movie ID, time slot ID, and the number of people to reserve.
   - Ensure the reservation doesn’t exceed the available capacity of the time slot.
   - Once reserved, update the booked count accordingly.

## Prerequisites
- **Node.js**: Install Node.js from [https://nodejs.org/](https://nodejs.org/).
- **MongoDB**: You need access to MongoDB. You can either install MongoDB locally or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **npm**: npm (Node Package Manager) should be installed with Node.js. You can verify by running:
  ```bash
  node -v
  npm -v
  ```

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/NawaF-Alfawaz/movie_backend.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd movie_backend
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```

## Connecting to the Database
To connect the backend to a MongoDB database, follow these steps:

1. **Create a MongoDB Database**: If you haven't done so, create your MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based database or install MongoDB locally.

2. **Update Database Configuration**: Edit the `src/config/database.js` file to reflect your MongoDB connection details. Replace the existing URI with your actual database URI. Below is the code snippet you need to modify:

    ```javascript
    const mongoose = require('mongoose');

    // Update this URI with your MongoDB connection string
    const mongoURI = 'mongodb://localhost:27017/movie_app';

    const connection = mongoose.createConnection(mongoURI).on('open', () => {
        console.log("Connection is created");
    }).on('error', () => {
        console.log("Connection fail");
    });

    module.exports = connection;
    ```

    Replace `'mongodb://localhost:27017/movie_app'` with your MongoDB URI if you're using a cloud database (like MongoDB Atlas). Example:

    ```javascript
    const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/movie_app?retryWrites=true&w=majority';
    ```

    Make sure to replace `<username>`, `<password>`, and other placeholders with your actual MongoDB credentials.

## Running the Project

To run the backend server in development mode:

1. **Start the Server**:
    ```bash
    npm run dev
    ```
    This command will start the server, and you should see a message in the console indicating that the connection to MongoDB was successful and the server is running.

2. **Access the API**:
    Once the server is running, you can access the API on `http://localhost:3000` (or another port if configured differently).

## Scripts
- **`npm run dev`**: Runs the server in development mode using `nodemon` for hot-reloading.

## Project Structure
- **`src/`**: Contains the source code for the backend application.
  - **`config/`**: Contains configuration files such as the database connection setup.
  - **`controllers/`**: Contains controller functions to handle the request logic.
  - **`models/`**: Mongoose models that define the structure of the movie documents.
  - **`routes/`**: Defines API endpoints for interacting with movie-related data.
  - **`services/`**: Contains service logic for business-related functions.
- **`app.js`**: Entry point for configuring the application middleware and routes.
- **`server.js`**: Starts the server and listens on the defined port.
- **`package.json`**: Contains project dependencies and scripts.

## Issues
If you encounter any issues while running the project, feel free to contact me at nawaf.alfawaz55@gmail.com
