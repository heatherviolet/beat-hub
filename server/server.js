// create express app
const express = require('express');
const app = express();

// server port
const PORT = 3001 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))