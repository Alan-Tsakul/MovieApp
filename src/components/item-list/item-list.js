import React, { Component } from "react";
import ClampLines from 'react-clamp-lines';
import toDate from 'date-fns/toDate';
import format from 'date-fns/format';

import "./item-list.css";
export default class ItemList extends Component {

  render() {
    const { title, posterPath, overview, releaseDate, voteAverage, id,  } =
      this.props;
      let formatedDate;
      try {
        formatedDate = String(format(toDate(new Date(releaseDate)), 'MMMM dd, yyyy'));
      } catch (error) {
        formatedDate = String(format(toDate(new Date()), 'MMMM dd, yyyy'));
      }

    return (

      <div className="card">
      <img src={`https://image.tmdb.org/t/p/w200${posterPath}`} className="card-img-top" alt="..."></img>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className="raiting">{voteAverage}</div>
        <span className="date">{formatedDate}</span>
        <ul className="list-group">
          <li className="list-group-item">
            <a href="/">Action</a>
          </li>
          <li className="list-group-item">
            <a href="/">Drama</a>
          </li>
        </ul>
        <ClampLines
        text={overview}
        id={id}
        lines={4}
        ellipsis="..."
        className="card-text"
        innerElement="p"
      />
      </div>
    </div>
  ); 
    
  }

}
