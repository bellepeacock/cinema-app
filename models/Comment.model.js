const { Schema, model } = require("mongoose");

const commentSchema = new Schema (
    {
        username: { 
            type: String,
            required: false,
            default: 'Guest'
        },
        authorId: Schema.Types.ObjectId,
        
        content: String
    },
    { 
        timestamps: true
    }
);

module.exports = model('Comment', commentSchema);