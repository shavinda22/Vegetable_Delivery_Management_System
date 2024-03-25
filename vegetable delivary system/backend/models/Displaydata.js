const mongoose = require("mongoose");
const schema = mongoose.Schema;

const vegetableschema = new schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const vegetable = mongoose.model("vegetable", vegetableschema);
module.exports = vegetable;
