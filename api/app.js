const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')
const graphQLSchema = require('./graphql/schema/index.graphql')
const graphQLResolvers = require('./graphql/resolvers/index')

const app = express()

app.use(bodyParser.json())

const PORT = 4000;

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

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-zo482.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
  .then(() => {
    app.listen(PORT)
    console.log('Listening on port : ' + PORT)
  })
  .catch(err => {
    console.log(err)
  })