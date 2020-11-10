var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var ProductModel = require('../../models/product');
var productType = require('../types/productType').productType;

// Query
exports.ProductQuery = new GraphQLObjectType({
  name: 'Query',
  fields:  ()=> {
    return {
      products: {
        type: new GraphQLList(productType),
        resolve:  async ()=> {
          const products = await ProductModel.find()
          if (!products) {
            throw new Error('error while fetching data')
          }
          return products
        }
      }
    }
  }
});