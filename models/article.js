// Require mongoose
const mongoose = require("mongoose");
// Create Schema class for mongoose  
const Schema = mongoose.Schema;


const ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },
  // link is a required string
  link: {
    type: String,
    required: true
  }

});

// Create the Article model with the ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);

// Export the model to the other pages
module.exports = Article;