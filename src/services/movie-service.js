const API_KEY = "4e8b5bdc758502fd137d7ef5c78f7718";

export default class MovieService {
  apiBase = "https://api.themoviedb.org/3/";

  async getResource(url) {
    const res = await fetch(
      `${this.apiBase}search/movie?api_key=${API_KEY}&include_adult=false${url}`
    );

    if (!res.ok) {
      throw new Error(`Could not fetch ` `, received ${res.status}`);
    }
    return res.json();
  }

  getAllMovies(text, page) {
    const res = this.getResource(`&query=${text}&page=${page}`);
    return res;
  }

  async guestSessionOpen() {
    const res = await fetch(
      `${this.apiBase}authentication/guest_session/new?api_key=${API_KEY}`
    );
    return res.json();
  }

  async getRatedMovies(sessionId) {
    const res = await fetch(
      `${this.apiBase}guest_session/${sessionId}/rated/movies?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc`
    );
    return res.json();
  }

  async rateMovie(id, rating, sessionId) {
    const res = await fetch(
      `${this.apiBase}movie/${id}/rating?api_key=${API_KEY}&guest_session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          value: rating
        })
      }
    );
    return res.json();
  }

  async getAllGenres() {
    const res = await fetch(
      `${this.apiBase}genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return res.json();
  }
}
