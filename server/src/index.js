const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const connectToDatabase = require('./config/db');
const Routes = require('./routes/routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define your routes here
app.use('/', Routes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

// Connect to the database
connectToDatabase();
