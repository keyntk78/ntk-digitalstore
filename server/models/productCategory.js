const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      default: true,
    },
    brand: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
)

//Export the model
module.exports = mongoose.model('ProductCategory', productCategorySchema)
