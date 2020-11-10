var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLFloat = require('graphql').GraphQLFloat;
var productType = require('../types/productType');
var productModel = require('../../models/product');

exports.update = {
    type: productType.productType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        title: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: new GraphQLNonNull(GraphQLString)
        },
        availability: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        price: {
            type: new GraphQLNonNull(GraphQLFloat)
        }
    },
    resolve: async(root, args) =>{
        const UpdatedProduct = await productModel.findByIdAndUpdate(args.id,args);
        if (!UpdatedProduct) {
          throw new Error('Error')
        }
        return UpdatedProduct;
    }
}
