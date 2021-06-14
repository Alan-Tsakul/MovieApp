import React from "react";
import MovieCards from "./movie-cards/movie-cards";

const MovieCardsList = ({ movies, sessionId }) => {
  const elements = movies.map((elem, index) => (
    <MovieCards
      title={elem.title}
      posterPath={elem.poster_path}
      overview={elem.overview}
      releaseDate={elem.release_date}
      voteAverage={elem.vote_average}
      id={elem.id}
      sessionId={sessionId}
      genres_ids={elem.genre_ids}
      key={index}
    />
  ));

  return <div className="ant-row ant-row-space-around">{elements}</div>;
};

export default MovieCardsList;
