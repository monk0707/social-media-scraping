const mongoose = require('mongoose');
const singleUrlScrapedSchema = require('./singleUrlScraped');

const allSocialMediaResponsesSchema = new mongoose.Schema({
    responses: [singleUrlScrapedSchema]
});

module.exports = mongoose.model('AllResponses', allSocialMediaResponsesSchema);