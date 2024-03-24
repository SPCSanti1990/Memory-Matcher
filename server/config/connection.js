// Load Mongoose ORM
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MemoryMatcher',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

// Export the connection
module.exports = mongoose.connection;