var mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  isDelete: Boolean,
  order: Number,
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

module.exports = mongoose.model("category", schema);
