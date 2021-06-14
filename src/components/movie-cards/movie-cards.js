import React, { Component } from "react";
import ClampLines from "react-clamp-lines";
import toDate from "date-fns/toDate";
import format from "date-fns/format";
import { Rate } from "antd";
import MovieService from "../../services/movie-service";
import "../movie-cards/movie-cards.css";
import { Consumer } from "../my-context";
import GenresList from "../genres-list/genres-list";
import PropTypes from "prop-types";

export default class MovieCards extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterPath: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    genres_ids: PropTypes.instanceOf(Array).isRequired,
    overview: PropTypes.string.isRequired,
  };

  state = {
    stars: null,
    id: null,
    rating: null,
  };

  movieService = new MovieService();

  onMovieRated = (stars, id) => {
    const { sessionId, rating } = this.props;
    this.setState({
      stars: stars,
      id: id,
      rating: rating,
    });
    this.movieService.rateMovie(id, stars, sessionId);
  };

  render() {
    const {
      title,
      posterPath,
      overview,
      releaseDate,
      voteAverage,
      id,
      rating,
      genres_ids,
    } = this.props;

    const { stars } = this.state;

    let formatedDate;
    try {
      formatedDate = String(
        format(toDate(new Date(releaseDate)), "MMMM dd, yyyy")
      );
    } catch (error) {
      formatedDate = String(format(toDate(new Date()), "MMMM dd, yyyy"));
    }

    let divStyle;
    if (voteAverage >= 0 && voteAverage < 3) {
      divStyle = { borderColor: "#E90000" };
    }
    if (voteAverage >= 3 && voteAverage < 5) {
      divStyle = { borderColor: "#E97E00" };
    }
    if (voteAverage >= 5 && voteAverage < 7) {
      divStyle = { borderColor: "#E9D100" };
    }
    if (voteAverage >= 7) {
      divStyle = { borderColor: "#66E900" };
    }

    if (rating >= 0 && rating < 3) {
      divStyle = { borderColor: "#E90000" };
    }
    if (rating >= 3 && rating < 5) {
      divStyle = { borderColor: "#E97E00" };
    }
    if (rating >= 5 && rating < 7) {
      divStyle = { borderColor: "#E9D100" };
    }
    if (rating >= 7) {
      divStyle = { borderColor: "#66E900" };
    }

    const clampLines = (
      <ClampLines
        text={overview}
        lines={4}
        ellipsis="..."
        className="card-text"
        innerElement="p"
      />
    );

    const rate = (
      <Rate
        allowHalf
        defaultValue={stars}
        value={rating === undefined ? stars : rating}
        className="card-stars"
        count="10"
        onChange={(stars) => this.onMovieRated(stars, id)}
      />
    );

    return (
      <Consumer>
        {(allGenres) => {
          return (
            <div className="card">
              <img
                src={`https://image.tmdb.org/t/p/w200${posterPath}`}
                className="card-img-top"
                alt="..."
              ></img>
              <div className="card-body">
                <h5
                  className="card-title"
                  style={{ fontSize: title.length > 20 ? "16px" : null }}
                >
                  {title}
                </h5>
                <div className="raiting" style={divStyle}>
                  {rating === undefined ? voteAverage : rating}
                </div>
                <span className="card-date">{formatedDate}</span>
                <GenresList allGenres={allGenres} genres_ids={genres_ids} />
                {clampLines}
                {rate}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
