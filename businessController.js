const axios = require('axios')
const  OpenAI =  require("openai")

const sdk = require('api')('@yelp-developers/v1.0#z7c5z2vlkqskzd6');

const openai = new OpenAI({
    apiKey: "Bearer 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",
});

async function getBusinesses(req,res){
   var url = 'https://api.yelp.com/v3/business/search'
}

async function handleQuery(req,res){
    console.log(req.body)
    const body = req.body
    let keywords = body.keywords
    let url = body.url
    let main_keyword = body.main_keyword
    let location = body.location
    let newLocation = url.replace("mainkeyword",main_keyword)
    let query =  `You are a world class SEO Writer for local businesses. 

    Generate a UNIQUE, casual and easy-to-read article with the goal of showing up first in a local search or the following keyword: ${keywords}
    Criteria:
    For each article title start with the word "Best" then emphasize the primary keyword from the title of the URL, followed by "in" and the specific city and state (e.g., "Best Coffee Shops in Seattle, WA")
    
    Start each article with a two paragraph brief introduction of the city. The write a description of the service or product being searched.
    
    Then add 3-5 tips or best practices regarding the topic for the reader.
    
    Next, curate a numbered list section that presents the top 3 highest-rated businesses from Yelp.com IN that city that match from this URL: ${newLocation}
    Businesses should be sorted by star rating and link to their yelp profile, and in case of a tie, the number of reviews should be the secondary criteria.
    
    Conclude each article with a summary of the article.`
   

    //chatgpt api
    // const response = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: query,
    //     function_call: "auto",  // auto is default, but we'll be explicit
    // });
    // const responseMessage = response.choices[0].message;

    //yelp api
    sdk.auth('Bearer iqbD0ViPQDzqtO8flPvtF2QXOBaoe-BMA-wjSbIziFXfR5d_G6ZRyoLeXdxidcLtOPIDpxUWdIMxu5gMCgBBBxqXBlP-DXG4sf0SD-W4eWCO9iUD2e_b_cPQyqL4ZHYx');
    sdk.v3_business_search({sort_by: 'best_match', limit: 3,term: main_keyword, location})
    .then(({ data }) => {
        console.log(data)
        return res.json(data.businesses)
    })
    .catch(err => console.error(err));

}
module.exports ={
    getBusinesses,
    handleQuery
}