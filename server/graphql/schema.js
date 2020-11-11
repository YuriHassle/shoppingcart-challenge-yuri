const { gql, makeExecutableSchema } = require('apollo-server-express');
const Product = require('../models/product').Products;

const typeDefs = gql `
   type Product {
     id: ID!
     title: String!
     description: String!
     price: Float!
     availability: Int!
   }
   type Query {
     getProducts: [Product]
     getProduct(id: ID!): Product
   }
   type Mutation {
     addProduct(title: String!, description: String!, price: Float!, availability:Int!): Product
     updateProduct(id: ID!, title: String!, description: String!, price: Float!, availability:Int!): Product
     deleteProduct(id: ID!): Product
   }
`

const resolvers = {
    Query: {
      getProducts: (parent, args) => {
        return Product.find({});
      },
      getProduct: (parent, args) => {
        return Product.findById(args.id);
      }
    },
    Mutation: {
      addProduct: (parent, args) => {
        let product = new Product({
          title: args.title,
          description: args.description,
          price: args.price,
          availability: args.availability,
        });
        return product.save();
      },
      updateProduct: (parent, args) => {
        if (!args.id) return;
          return Product.findOneAndUpdate(
           {
             _id: args.id
           },
           {
             $set: {
               title: args.title,
               description: args.description,
               price: args.price,
               availability: args.availability,
             }
           }, {new: true}, (err, Product) => {
             if (err) {
               console.log('Something went wrong when updating the product');
             } else {
             }
           }
        );
      }
    }
  }

  module.exports = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: resolvers
  });