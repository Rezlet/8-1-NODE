var mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  price: Number,
  isDelete: Boolean,
  order: Number,
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
});

module.exports = mongoose.model("product", schema);
