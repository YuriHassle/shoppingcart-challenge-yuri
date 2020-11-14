const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
/*       orders:[{
        type:mongoose.Schema.Types.ObjectId,
        required:false,
        ref: "Order"
      }], */
}, {
    timestamps: true
});

let Products = mongoose.model('Product', productSchema);
module.exports = {Products, productSchema};