import batchPipelineFetch from '../fetchScraping.js';
import batchPipelineSelenium from '../seleniumScraping.js';
import AllSocialMediaUrls from '../models/allSocialMediaUrls.js';
import AllOtherUrls from '../models/allOtherUrls.js';
require("dotenv").config()

function segregateURLs(urlsToScrape) {
    const socialMediaUrls = [];
    const otherUrls = [];

    urlsToScrape.forEach(url => {
        if (url.includes('linkedin.com') || url.includes('twitter.com') || url.includes('reddit.com')) {
            socialMediaUrls.push(url);
        } else {
            otherUrls.push(url);
        }
    });

    return { socialMediaUrls, otherUrls };
}

exports.collectUrls = async (req,res) => {
    const { urlsToScrape } = req.body

    // now I have to send these urls to backend by a post request : 
    
}


exports.scrapeUrls = async (req, res) => {
  const { urlsToScrape } = req.body
  console.log(urlsToScrape)
  try {

    const { socialMediaUrls, otherUrls } = segregateURLs(urlsToScrape);

    const socialMediaUrlsResponse = batchPipelineSelenium(socialMediaUrls, process.env.PROXY_LIST);
    const otherUrlsResponse = batchPipelineFetch(otherUrls, process.env.PROXY_LIST);
    // Assuming you have mongoose models defined for allSocialMediaUrls and allOtherUrls

    // Save social media URLs response to the database
    await AllSocialMediaUrls.insertMany(socialMediaUrlsResponse);

    // Save other URLs response to the database
    await AllOtherUrls.insertMany(otherUrlsResponse);

    const responses = {
      socialMediaUrlsResponse,
      otherUrlsResponse
    }

    return res.json({
      success: true,
      message: "URLS scraped successfully",
      responses : responses
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Urls scraping unsuccessful"
    })
  }
}