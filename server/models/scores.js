const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

// Create the Score collection(pluralizes the names in the collection name ex. creates collection as name scores instead of score)
module.exports = mongoose.model('Score', scoreSchema);