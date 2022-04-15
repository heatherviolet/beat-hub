// create express app
const express = require('express');
const app = express();

// require the code for connecting to the db
const db = require('./config/connection');

// server port
const PORT = 3001 || process.env.PORT;

// parse the URL-encoded data using the qs library, allowing for JSON-like experience
app.use(express.urlencoded({ extended: true }));

// only parse JSON
app.use(express.json());

// open the database
db.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})