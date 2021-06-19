import React from "react";

const GenresList = ({ allGenres, genres_ids }) => {
  const findMatch = (genres_ids) =>
    allGenres.filter((item) => genres_ids.includes(item.id));
  const filteredIds = findMatch(genres_ids);

  const genresList = filteredIds.map((genre, index) => (
    <li className="list-group-item" key={index}>
      {genre.name}
    </li>
  ));

  return <ul className="list-group">{genresList}</ul>;
};

export default GenresList;
