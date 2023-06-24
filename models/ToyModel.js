var mongoose = require('mongoose');

var ToySchema = mongoose.Schema(
   {
      name: String,
      price: Number,
      quantity: Number, 
      image: String,
      video: String,
      movie: String
   }
);

var ToyModel = mongoose.model("Toy", ToySchema, "toy");
module.exports = ToyModel;