const { gql, makeExecutableSchema } = require('apollo-server-express');
const Product = require('../models/product').Products;
const Order = require('../models/order').Orders;

const typeDefs = gql `
   type Product {
     id: ID!
     title: String!
     description: String!
     price: Float!
     availability: Int!
   }
   type Order {
     id: ID!
     creditCardNumber: String!
     productIds: [ID]!
   }
   type Query {
     products: [Product]
     product(id: ID!): Product
   }
   type Mutation {
     addProduct(title: String!, description: String!, price: Float!, availability:Int!): Product
     updateProduct(id: ID!, title: String, description: String, price: Float, availability:Int): Product
     deleteProduct(id: ID!): Product
     addOrder(creditCardNumber: String!, productIds: [ID]!): Order
   }
`

const resolvers = {
    Query: {
      products: (parent, args) => {
        return Product.find({});
      },
      product: (parent, args) => {
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
           }, {new: true, omitUndefined:true}, (err, Product) => {
             if (err) {
               console.log('Something went wrong when updating the product');
             } else {
             }
           }
        );
      },
      addOrder: (parent, args) => {
        let order = new Order({
          creditCardNumber: args.creditCardNumber,
          productIds: []
        })
        args.productIds.map(id => {
          order.productIds.push(id)
        })
        return order.save();
      }
    }
  }

  module.exports = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: resolvers
  });