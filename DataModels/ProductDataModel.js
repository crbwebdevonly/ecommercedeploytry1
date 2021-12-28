const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
     {
          title: { type: String },
          price: { type: Number },
          description: { type: String },

          category: { type: String },
          image: { type: String },
          rating: { rate: { type: Number }, count: { type: Number } },
     },
     { timestamps: true }
);

module.exports = mongoose.model("ProductDataModel", ProductSchema);
