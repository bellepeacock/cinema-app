const { Schema, model } = require("mongoose");

const filmSchema = new Schema (
    {
        title: String,
        director: String,
        stars: [String],
        image: String,
        description: String,
        language: [String],
        cinemas: [String],
        comments: [{
            userName:String,
            commentContent:String
         }]
    },
    { 
        timestamps: true
    }
);

module.exports = model('Film', filmSchema);