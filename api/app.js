const process = require('process');
const express = require('express')
const https = require('https')
const fs = require('fs');
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')

// ENV 🔧

const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/.env.local' })

// DB 🗄

const mongoose = require('mongoose')
const graphQLSchema = require('./graphql/schema/index.graphql')
const graphQLResolvers = require('./graphql/resolvers/index')

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`, { useNewUrlParser: true })
  .then(() => {
    console.log('🗄 Success connect to mongoDB')
  })
  .catch(err => {
    console.error('🗄 Error connect to mongoDB', err)
  })

// TWITTER 🐦

const Twitter = require('twitter');
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// APP 📱

const app = express()

const PORT = process.env.PORT || 4000;

if(process.env.HTTPS === "true" && process.env.NODE_ENV === "developement") {
  // To create certificate :
  // https://flaviocopes.com/express-https-self-signed-certificate/
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(PORT, () => {
    console.log('🚀 🔒 HTTPS 🔒 : Listening on port : ' + PORT)
  });
} else {
  app.listen(PORT, () => {
    console.log('🚀 HTTP : Listening on port : ' + PORT)
  })
}

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

app.use('/api', graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
}))

app.post('/twitter', (req, res) => {

  const { hashtags } = req.body
  let hashtagsString = ''

  hashtags.forEach(hashtag => {
    hashtagsString += `#${hashtag} `
  })

  console.log("🐦 API > /twitter/", hashtags, hashtagsString);

  client.get('search/tweets', {
    q: hashtagsString + ' filter:twimg filter:images',
    count: 15,
    result_type: "recent",
    include_entities: true,
    tweet_mode: "extended"
  }, function (error, tweets, response) {
    if (error) {
      console.log("🐦 Error getting tweets");
    } else {
      console.log("🐦 Success getting tweets", );
      res.json(tweets);
    }

  });

})