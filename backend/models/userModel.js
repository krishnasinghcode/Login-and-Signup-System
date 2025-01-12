const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create the model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
