const { Schema, model } = require("mongoose");

const commentSchema = new Schema (
    {
        username: String,
        content: String
    },
    { 
        timestamps: true
    }
);

module.exports = model('Comment', commentSchema);