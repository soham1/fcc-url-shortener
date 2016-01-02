var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var urlSchema = new Schema({
    url          : String,
    shortUrl     : String,
    counter      : Number
});

urlSchema.statics.findMax = function(callback){
    this.findOne({}).sort('-counter')
                    .exec(callback);
};
module.exports = mongoose.model('Url', urlSchema);