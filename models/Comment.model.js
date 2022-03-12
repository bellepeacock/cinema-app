const { Schema, model } = require("mongoose");

const commentSchema = new Schema (
    {
        username: { 
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: String
    },
    { 
        timestamps: true
    }
);

module.exports = model('Comment', commentSchema);