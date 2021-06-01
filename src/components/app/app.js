import React, { Component } from 'react';
import MovieService from "../../services/movie-service";
import './app.css';
import 'antd/dist/antd.css'; 

import { Row, Col } from 'antd';
import ItemList from '../item-list/item-list';


export default class App extends Component  {

  movieService = new MovieService();

  state = {
    movies: [],
  };

  constructor() {
    super();
    this.updateFilms();
  }

  
    updateFilms() {
      this.movieService.getAllFilms().then((data) => {
          this.setState({
            movies: data
          });
      });
    }

  render() {

    const { movies } =
    this.state;

    const elements = movies.map((elem) => (
      <>
         <ItemList title={elem.title}
      posterPath={elem.poster_path}
       overview={elem.overview} 
       releaseDate={elem.release_date} 
       voteAverage={elem.vote_average}
       id={elem.id}
        />
      </>
     
    ))
    return (
          <Row justify="space-around" className="movies-block">
            <Col span={4}>
              <div className="ant-row ant-row-space-around movies-block">{elements}</div>
               </Col>
          </Row>
      )
  }
    }



