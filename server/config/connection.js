const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/beat-hub');

/* 
Apparently the options useNewUrlParser, useUnifiedTopology, 
useFindAndModify, and useCreateIndex are deprecated in Mongoose v6
despite using them in former assignments.
*/

module.exports = mongoose.connection;