const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Create the user model
const User = mongoose.model('User', userSchema);

// Export both the User model and the userSchema
module.exports = { User, userSchema };