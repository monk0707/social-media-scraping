const mongoose = require('mongoose');
require("dotenv").config()

const connect = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connect;


// RFLrGKq3v3XcwApV