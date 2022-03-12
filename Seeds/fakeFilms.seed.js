const mongoose = require('mongoose');
const Film = require('../models/Film.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/cinema-app";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const films = [
      {
          title: "The Godfather",
          director: "Francis Ford Coppola",
          stars: ["Marlon Brando", "Al Pacino"],
          image: "https://assets.cdn.moviepilot.de/files/14b64ec3f2321e0cde9341929086d4bc0ce0d7a0b58969e258e1487b2b18/fill/1024/492/the-godfather-part-2.jpg",
          description: "This is a film about the mafia",
          language: ["EN", "FR", "ES"],
          cinemas: ["rollberg", "sputnik"],
          // times / dates 
          // move this to new comments model
          comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
          //comments: [{userName: "jeremy", commentContent: "This film is great."}, {userName: "Sophia", commentContent:"this film is not good."}]
      }, 
      {
        title: "Queen & Slim",
        director: "Melina Matsoukas",
        stars: ["Jodie Turner-Smith", "Daniel Kaluuya"],
        image: "https://i.guim.co.uk/img/media/e97d1f3b187905c947c14f82cd1e1b44abe5c7d8/0_371_6250_3750/master/6250.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=41a4d647771f9f2c7badc70eadc9b75d",
        description: "This is a tragic romance film",
        language: ["EN", "IT"],
        cinemas: "sputnik",
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
        // times / dates 
        // comments: [{userName: "jeremy", commentContent: "This film is so sad"}]
    }, 
    {
        title: "Lamb",
        director: "Valdimar Jóhannsson",
        stars: ["Noomi Rapace", "Björn Hlynur Haraldsson"],
        image: "https://breaker.news/wp-content/uploads/2021/10/Basiert-Lamb-2021-auf-einer-wahren-Geschichte-u3veER-1.jpg",
        description: "This is a weird film",
        language: "EN", 
        cinemas: ["sputnik", "Delphi Lux", "Passenger"],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
        // times / dates 
        // comments: [],
    }
  ];

  Film.create(films).then( (createdFilms) => {
      console.log(`Successfully created ${createdFilms.length} films`);
      mongoose.connection.close();
  }).catch(error => console.log(error));