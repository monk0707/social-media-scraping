const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    statusCode: {
        type: Number,
        required: true
    },
    headers: {
        type: Map,
        of: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;