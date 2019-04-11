const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const graphQLSchema = require('./graphql/schema/index.graphql')
const graphQLResolvers = require('./graphql/resolvers/index')
const twitter = require('twitter');
const client = new twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
const PORT = 4000;

const app = express()

app.listen(PORT)
console.log('Listening on port : ' + PORT)

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


app.get('/twitter', (req, res) => {

  client.get('search/tweets', {q: "#apple", count: 1, result_type: "mixed"}, function (error, tweets, response) {
    if (error) {
      console.log("Error getting tweets");
      return;
    }
    res.json(tweets);
  });

})


mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
  .then(() => {
    console.log('Sucess connect to mongoDB')
  })
  .catch(err => {
    console.error('Error connect to mongoDB', err)
  })