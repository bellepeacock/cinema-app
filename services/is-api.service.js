const axios = require('axios');

class ApiISService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.internationalshowtimes.com/v4',
      headers: {'X-Api-Key': process.env.API_IS_KEY }
    });
  }

  getFilms() {
    return this.api.get('/movies/?page_size=12');
  }

  getCinemas() {
    return this.api.get('/cinemas');
  }

  getShowtimes(){
    return this.api.get('/showtimes');
  }
}

module.exports = ApiISService;