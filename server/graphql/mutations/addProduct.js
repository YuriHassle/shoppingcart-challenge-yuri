var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;
var productType = require('../types/productType');
var productModel = require('../../models/product');

exports.add = {
  type: productType.productType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    availability: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    price:{
      type: new GraphQLNonNull(GraphQLFloat)
    }
  },
  resolve: async(root, args)=> {
    const uModel = new productModel(args);
    const newProduct = await uModel.save();
    if (!newProduct) {
      throw new Error('error');
    }
    return newProduct
  }
}
