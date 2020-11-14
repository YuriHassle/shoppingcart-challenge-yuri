const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    creditCardNumber: {
        type: String,
        required: true
      },
      productIds:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true,
      }],
}, {
    timestamps: true
});

let Orders = mongoose.model('Order', orderSchema);
module.exports = {Orders, orderSchema};