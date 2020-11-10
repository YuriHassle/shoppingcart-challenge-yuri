const express = require('express')
const app = express()
const mongoose = require('mongoose');
const {graphqlHTTP} = require("express-graphql");
const productSchema = require('./graphql/ProductSchema').ProductSchema;

mongoose.connect('mongodb://mongo/myappdb', { useNewUrlParser: true, useUnifiedTopology: true}).
  catch(error => console.log(error));


app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'),  () =>{
    console.log("Node app is running at localhost:" + app.get('port'))
});



app.use('/graphql', graphqlHTTP({
    schema: productSchema,
    rootValue: global,
    graphiql: true
}));

app.get('/', (req, res) => {

    res.send("hello world ! ")

})