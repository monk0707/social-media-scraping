const express = require('express');
const bodyParser = require('body-parser');
const { dot } = require('node:test/reporters');
const dotenv = require('dotenv');
const { scrapeUrls } = require('./controllers/scrapeUrls.js');
const database = require('./config/database.js');
const { parseHtml } = require('./fetch.js');

dotenv.config();

database.connect();

const app = express();
const port = `${process.env.PORT}` || 4000;

app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.json({ urls: [
        "https://getalchemystai.com/",
        "https://tracxn.com/d/companies/alchemyst-ai/__L_m3gQ9f75cXVFvOg3TzFL-omq4cqtDvNYDZ8QcVvbA",
        "https://www.f6s.com/company/alchemyst-ai",
        "https://m.economictimes.com/tech/funding/alchemyst-ai-has-raised-funding-in-a-pre-seed-round-led-by-inflection-point-ventures-along-with-100-unicorns-and-early-seed-ventures/articleshow/114288876.cms"
    ]});
});

app.post("/augment", (req, res) => {
    /**
     * The body of the request should be an object with the following structure:
     * {
     *    results: [
     *     {
     *      url: string,
     *      content: string
     *     }
     *    ]
     * 
     * @type {{ results: { url: string, content: string }[] }}
     */
    const body = req.body;

    // bodyType = { results: [{ "url": string, "content", string}]}

    const scrapableUrls = body.results.filter(result => { return result.url
    .match(/(linkedin\.com|g2\.com)/);
    });

    const scrapedDataFromSearch = scrapableUrls.map(result => {
        return {...result, content: parseHtml(result.content)};
    })

    // Now send it to the LLM for generating response.

    // const responses = scrapedDataFromSearch.map(result => {
    //     return llm.send(result.content);
    // });
});

app.get('/alchemyst-ai/scrape',scrapeUrls);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});