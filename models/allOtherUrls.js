const mongoose = require('mongoose');
const singleUrlScrapedSchema = require('./singleUrlScraped');

const allOtherResponsesSchema = new mongoose.Schema({
    responses: [singleUrlScrapedSchema]
});

module.exports = mongoose.model('AllResponses', allOtherResponsesSchema);