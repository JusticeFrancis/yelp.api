const axios = require("axios");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_KEY,
});

const sdk = require("api")("@yelp-developers/v1.0#z7c5z2vlkqskzd6");
sdk.auth(process.env.YELP_KEY);

async function getBusinesses(req, res) {
  var url = "https://api.yelp.com/v3/business/search";
}

async function handleQuery(req, res) {
  console.log(req.body);
  const body = req.body;
  let keywords = body.keywords;
  let url = body.url;
  let main_keyword = body.main_keyword;
  let location = body.location;
  let newLocation = url.replace("mainkeyword", main_keyword);
  let query = `You are a world class SEO Writer for local businesses. 

    Generate a UNIQUE, casual and easy-to-read article with the goal of showing up first in a local search or the following keyword: ${main_keyword},${keywords}, 
    Criteria:
    For each article title start with the word "Best" then emphasize the primary keyword from the title of the URL, followed by "in" and the specific city and state (e.g., "Best Coffee Shops in ${location}")
    
    Start each article with a two paragraph brief introduction of the ${location}}. The write a description of the service or product being searched.
    
    Then add 3-5 tips or best practices regarding the topic for the reader.
    
   
    
    Conclude each article with a summary of the article.
    All this should be written in html paragraphs appropriately.
    The whole content should be written within <html> <html/> tags
    Use bold html tag for title and headings of paragraphs.
    Before the closing body tag add a div tag with id attribute yelpdata, this tag should be empty.

   
    `;

  try {
    //chatgpt api
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }],
    });
    const responseMessage = response.choices[0].message;

    //undetectable ai
    var myHeaders = new Headers();
    myHeaders.append("api-key", process.env.UNDETECTABLE_KEY);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: responseMessage.content,
      readability: "High School",
      purpose: "General Writing",
      strength: "More Human",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://api.undetectable.ai/submit", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    //yelp api

    await sdk
      .v3_business_search({
        sort_by: "best_match",
        limit: 3,
        term: main_keyword,
        location,
      })
      .then(({ data }) => {
        console.log(data);
        return res.json({ yelp: data.businesses, chatgpt: responseMessage });
      })
      .catch((err) => console.error(err));
  } catch (err) {
    console.error("", "", "Ask AI Error: " + err.message);
    return sendInternalError(err);
  }
}
module.exports = {
  getBusinesses,
  handleQuery,
};
