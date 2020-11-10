var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;

// Product Type
exports.productType = new GraphQLObjectType({
  name: 'product',
  fields:  () =>{
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      availability: {
        type: GraphQLInt
      },
      price:{
        type: GraphQLFloat
      }
    }
  }
});


