import React from "react";
import MovieCards from "../movie-cards/movie-cards";

const MovieCardsList = ({ sessionId, onError, arr }) => {
  const elements = arr.map((elem, index) => (
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
      onError={(err) => onError(err)}
      rating={elem.rating}
    />
  ));

  return (
    <>
      <div className="ant-row ant-row-space-around">{elements}</div>
    </>
  );
};

export default MovieCardsList;
