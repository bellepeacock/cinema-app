const axios = require('axios');

class ApiISService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.internationalshowtimes.com/v4',
      headers: {'X-Api-Key': process.env.API_IS_KEY }
    });
  }

  getFilms() {
    //const [ userLat, userLng ] = arguments;
    return this.api.get(`/movies/?page_size=18`);
  }

  getFilmById() {
    const [ id, userLat, userLng ] = arguments;
    return this.api.get(`/movies/${id}`);
  }

  getFilmByTitle(){
    const [ title , language] = arguments;
    //const [ title , language, userLat, userLng ] = arguments;
    return this.api.get(`/movies?search_query=${title}&search_field=title&lang=${language}`);
  }

  getCinemas() {
    return this.api.get('/cinemas/?limit=18');
  }

  getCinema(id) {
    return this.api.get(`/cinemas/${id}`);
  }

  getShowtimes(){
    return this.api.get('/showtimes');
  }
}

module.exports = ApiISService;