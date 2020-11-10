var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var productType = require('../types/productType');
var productModel = require('../../models/product');

exports.remove = {
  type: productType.productType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async(root, args)=> {
    const removedProduct = await productModel.findByIdAndRemove(args.id)
    if (!removedProduct) {
      throw new Error('error')
    }
    return removedProduct;
  }
}
