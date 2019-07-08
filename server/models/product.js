var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./category');

var ProductSchema = new Schema({
    itemID: {type: String, required: true, min: 10, max: 100},
    name: {type: String, required: true, min: 5, max: 100},
    desc: {type: String, max: 1000},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    release_date: {type: Date},
    sell: {type: Number, required: true, min: 0},
    buy: {type: Number, min: 0},
    exch: {type: Number, min: 0},
    new: {type: Boolean, required: true},
    stock: {type: Number, required: true, min: 0},
});

ProductSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', ProductSchema);