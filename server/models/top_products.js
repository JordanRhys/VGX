var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopProducts = new Schema({
    products: [{type: Schema.Types.ObjectId, ref: 'product'}],
});