var mongoose = require('mongoose');

var LegoSchema = mongoose.Schema(
   {
      name: String,
      price: Number,
      quantity: Number, 
      image: String,
      video: String,
      movie: String
   }
);

var LegoModel = mongoose.model("LEGO", LegoSchema, "lego");
module.exports = LegoModel;