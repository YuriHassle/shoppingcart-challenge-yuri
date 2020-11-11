const express = require('express');
const mongoose = require('mongoose');
const schema = require('./graphql/schema');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');


const url = "mongodb://mongo/shoppingcartdb";

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
connect.then((db) => {
      console.log('Connected correctly to server!');
}, (err) => {
      console.log(err);
});

const server = new ApolloServer({
      schema: schema
});

const app = express();
app.use(bodyParser.json());
app.use('*', cors());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));