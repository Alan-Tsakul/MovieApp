
import React from "react";
import PropTypes from "prop-types";

const GenresList = ({ allGenres, genresIds }) => {
  const findMatch = (arr) =>
    allGenres.filter((item) => arr.includes(item.id));
  const filteredIds = findMatch(genresIds);

  const genresList = filteredIds.map((genre) => (
    <li className="list-group-item" key={genre.id}>
      {genre.name}
    </li>
  ));

  return <ul className="list-group">{genresList}</ul>;
};

GenresList.propTypes = {
  allGenres: PropTypes.instanceOf(Array).isRequired,
  genresIds: PropTypes.instanceOf(Array).isRequired
}

export default GenresList;
