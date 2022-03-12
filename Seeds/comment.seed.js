const mongoose = require('mongoose');
const Comment = require('../models/Comment.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/cinema-app";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const comments = [
      {
          username: [{ type: Schema.Types.ObjectId, ref: 'User' }],
          film: [{ type: Schema.Types.ObjectId, ref: 'Film' }],
          content: String
      }
  ];

  Comment.create(films).then( (createdFilms) => {
      console.log(`Successfully created comment for ${comments.film}`);
      mongoose.connection.close();
  }).catch(error => console.log(error));