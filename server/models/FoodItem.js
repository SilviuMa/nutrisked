// server/models/Article.js
const mongoose = require('mongoose')

let FoodItemSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        calories: Number,        
        protein: Number,
        fiber: Number,
        minerals: Number,
    }
);

export default mongoose.model('FoodItem', FoodItemSchema);