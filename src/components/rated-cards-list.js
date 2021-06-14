import React from "react";
import MovieCards from "./movie-cards/movie-cards";

const RatedCardsList = ({ ratedMovies, sessionId }) => {
  const ratedElements = ratedMovies.map((elem, index) => (
    <MovieCards
      title={elem.title}
      posterPath={elem.poster_path}
      overview={elem.overview}
      releaseDate={elem.release_date}
      rating={elem.rating}
      id={elem.id}
      genres_ids={elem.genre_ids}
      sessionId={sessionId}
      key={index}
    />
  ));

  return <div className="ant-row ant-row-space-around">{ratedElements}</div>;
};

export default RatedCardsList;
