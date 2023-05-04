// Destructing the Schema and model
const { Schema, model } = require('mongoose');

// creating a new Schema, same thing as mongoose.Schema
const vegetableSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  readyToEat: Boolean,
});

// creating a new model, same thing as mongoose.model
const Vegetable = model('Vegetable', vegetableSchema);

module.exports = Vegetable;