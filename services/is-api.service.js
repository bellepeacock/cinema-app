const axios = require('axios');

class ApiISService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.internationalshowtimes.com/v4',
      headers: {'X-Api-Key': process.env.API_IS_KEY }
    });
  }

  getFilms() {
    const [ page_size, offset ] = arguments;
    return this.api.get(`/movies/?page_size=${page_size}&offset=${offset}`);
  }

  getFilm(id) {
    return this.api.get(`/movies/${id}`);
  }

  getCinemas() {
    return this.api.get('/cinemas/?limit=15');
  }

  getCinema(id) {
    return this.api.get(`/cinemas/${id}`);
  }

  getShowtimes(){
    return this.api.get('/showtimes');
  }
}

module.exports = ApiISService;