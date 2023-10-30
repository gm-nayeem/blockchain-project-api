const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.error(err));