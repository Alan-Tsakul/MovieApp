import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClampLines from 'react-clamp-lines';
import { Rate } from 'antd';
import MovieService from '../../services/movie-service';
import './movie-cards.css';
import { Consumer } from '../my-content/my-context';
import GenresList from '../genres-list/genres-list';

export default class MovieCards extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    genresIds: PropTypes.instanceOf(Array).isRequired,
    overview: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    voteAverage: PropTypes.number.isRequired,
    posterPath: PropTypes.string.isRequired,
    sessionId: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired,
  };

  state = {
    stars: null,
  };

  movieService = new MovieService();

  onMovieRated = (stars, id) => {
    const { sessionId, onError } = this.props;

    this.movieService
      .rateMovie(id, stars, sessionId)
      .then(
        this.setState({
          stars,
        })
      )
      .catch((err) => {
        onError(err);
      });
  };

  render() {
    const { title, posterPath, overview, releaseDate, voteAverage, id, rating, genresIds } = this.props;

    const { stars } = this.state;

    const clampLines = <ClampLines text={overview} lines={4} ellipsis="..." className="card-text" innerElement="p" />;

    const rate = (
      <Rate
        allowHalf
        defaultValue={stars}
        value={rating === undefined ? stars : rating}
        className="card-stars"
        count="10"
        onChange={(event) => this.onMovieRated(event, id)}
      />
    );

    let classNames = 'raiting';
    if (voteAverage >= 0 && voteAverage < 3) {
      classNames += ' red-color';
    }
    if (voteAverage >= 3 && voteAverage < 5) {
      classNames += ' orange-color';
    }
    if (voteAverage >= 5 && voteAverage < 7) {
      classNames += ' yellow-color';
    }
    if (voteAverage >= 7) {
      classNames += ' green-color';
    }

    if (rating >= 0 && rating < 3) {
      classNames += ' red-color';
    }
    if (rating >= 3 && rating < 5) {
      classNames += ' orange-color';
    }
    if (rating >= 5 && rating < 7) {
      classNames += ' yellow-color';
    }
    if (rating >= 7) {
      classNames += ' green-color';
    }

    return (
      <>
        <div className="card">
          <img
            src={
              posterPath !== null
                ? `https://image.tmdb.org/t/p/w200${posterPath}`
                : 'https://upload.wikimedia.org/wikipedia/ru/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
            }
            className="card-img-top"
            alt="film"
          />
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: title.length > 20 ? '16px' : null }}>
              {title}
            </h5>
            <div className={classNames}>{rating === undefined ? voteAverage : rating}</div>
            <span className="card-date">{releaseDate}</span>
            <Consumer>{(allGenres) => <GenresList allGenres={allGenres} genresIds={genresIds} />}</Consumer>
            {clampLines}
            {rate}
          </div>
        </div>
      </>
    );
  }
}
