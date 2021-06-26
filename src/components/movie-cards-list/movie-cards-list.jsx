import React from 'react';
import PropTypes from 'prop-types';
import MovieCards from '../movie-cards/movie-cards';

const MovieCardsList = ({ sessionId, onError, arr }) => {
  const elements = arr.map((elem) => (
    <MovieCards
      title={elem.title}
      posterPath={elem.poster_path}
      overview={elem.overview}
      releaseDate={elem.release_date}
      voteAverage={elem.vote_average}
      id={elem.id}
      sessionId={sessionId}
      genresIds={elem.genre_ids}
      key={elem.id}
      onError={(err) => onError(err)}
      rating={elem.rating}
    />
  ));

  return <div className="ant-row ant-row-space-around">{elements}</div>;
};

MovieCardsList.propTypes = {
  sessionId: PropTypes.string.isRequired,
  onError: PropTypes.func.isRequired,
  arr: PropTypes.instanceOf(Array).isRequired,
};

MovieCards.defaultProps = {
  onError: () => {},
};
export default MovieCardsList;
