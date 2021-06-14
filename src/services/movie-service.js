export default class MovieService {
  _apiKey = "api_key=4e8b5bdc758502fd137d7ef5c78f7718";

  _apiBase = "https://api.themoviedb.org/3/";

  async getResource(url) {
    const res = await fetch(
      `${this._apiBase}search/movie?${this._apiKey}&include_adult=false${url}`
    );

    if (!res.ok) {
      throw new Error(`Could not fetch ` + 
      `, received ${res.status}`);
    }
    return await res.json();
  }

  async getAllMovies(text, page) {
    const res = await this.getResource(`&query=${text}&page=${page}`);
    return await res;
  }

  async guestSessionOpen() {
    const res = await fetch(
      `${this._apiBase}authentication/guest_session/new?${this._apiKey}`
    );
    return res.json();
  }

  async getRatedMovies(sessionId) {
    const res = await fetch(
      `${this._apiBase}guest_session/${sessionId}/rated/movies?${this._apiKey}&language=en-US&sort_by=created_at.asc`
    );
    return res.json();
  }

  async rateMovie(id, rating, sessionId) {
    await fetch(
      `${this._apiBase}movie/${id}/rating?${this._apiKey}&guest_session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: rating,
        }),
      }
    )
      .then((res) => res.json())
  }

  async getAllGenres() {
    const res =  await fetch(`${this._apiBase}genre/movie/list?${this._apiKey}&language=en-US`);
    return res.json()
  }
}
