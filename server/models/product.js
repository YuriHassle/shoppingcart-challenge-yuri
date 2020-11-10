var mongoose = require('mongoose');


var ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  availability:{
    type:Number,
    required:true
  },
});

var ProductModel = mongoose.model('product', ProductSchema);
module.exports = ProductModel;