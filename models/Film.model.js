const { Schema, model } = require("mongoose");

const filmSchema = new Schema (
    {
        id: {
            type: Number,
            required: true
        },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    },
    { 
        timestamps: true
    }
);

module.exports = model('Film', filmSchema);