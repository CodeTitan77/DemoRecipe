const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Intermediate', 'Difficult']
  },
  prepTime: {
    type: Number,
    required: true,
    min: 0
  },
  cookTime: {
    type: Number,
    required: true,
    min: 0
  },
  ingredients: {
    type: [String],
    required: true
  },
  instructions: {
    type: [String],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;