const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    comments: [commentSchema], 
    likes: {
        type: Number,
        default: 0 
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("postEvent", postSchema);
