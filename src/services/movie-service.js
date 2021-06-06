
  export default class MovieService  {

    _apiBase = `https://api.themoviedb.org/3/search/movie?api_key=4e8b5bdc758502fd137d7ef5c78f7718&include_adult=false`;

    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);
        
        if (!res.ok) {
            throw new Error(`Could not fetch ` +
            `, received ${res.status}`)
        }
        return await res.json();
    }

    async getAllMovies(text, page) {
      const res = await this.getResource(`&query=${text}&page=${page}`);
      return res.results
    }
}

