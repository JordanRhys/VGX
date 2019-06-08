var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    itemID: {type: String, required: true, min: 10, max: 100},
    name: {type: String, required: true, min: 5, max: 100},
    desc: {type: String, max: 1000},
    category: {type: Schema.Types.ObjectId, ref: 'category', required: true},
    release_date: {type: Date},
    sell: {type: Number, required: true, min: 0},
    buy: {type: Number, required: true, min: 0},
    exch: {type: Number, required: true, min: 0},
    new: {type: Boolean, required: true},
    stock: {type: Number, required: true, min: 0},
});