
  export default class MovieService {

    _apiBase = `https://api.themoviedb.org/3/search/movie?api_key=4e8b5bdc758502fd137d7ef5c78f7718&page=1&include_adult=false&query=return`;

    async getResource () {
        const res = await fetch(`${this._apiBase}`);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ` +
            `, received ${res.status}`)
        }
        return await res.json();
    }

    async getAllFilms() {
      const res = await this.getResource();
      return res.results
    }
}
