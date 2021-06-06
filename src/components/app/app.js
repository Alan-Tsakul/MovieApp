import React, { Component } from "react";
import { Row, Col, Spin, Alert, Input, Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import debounce  from 'lodash.debounce'

import MovieService from "../../services/movie-service";
import ItemList from "../item-list/item-list";

import "./app.css";
import "antd/dist/antd.css";

export default class App extends Component {
  movieService = new MovieService();
  debounced = debounce(() => this.updateMovies(), 1500)

  state = {
    movies: [],
    loading: true,
    label: 'return',
    page: 1
  };

  componentDidMount() {
    this.updateMovies();
  }

  componentDidUpdate(prevState) {
    if(this.state.page !== prevState.page) {
      this.updateMovies();
    }
  }

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
      loading: true
    });
    this.debounced()
  };

  onPageChange = (event) => {
    this.setState({
      page: event,
    })
  }

  updateMovies() {
    const { page, label } = this.state
    this.movieService
      .getAllMovies(label, page)
      .then((data) => {
        this.setState({
          movies: data,
          loading: false,
          error: false,
        });
      })
      .catch(this.onError);
  }

  onError = (err) => {
      this.setState({
        error: true,
        loading: false,
      });
      console.log(err);
  };

  render() {
    const { movies, loading, error, label, page } = this.state;

    const elements = movies.map((elem) => (
      <>
        <ItemList
          title={elem.title}
          posterPath={elem.poster_path}
          overview={elem.overview}
          releaseDate={elem.release_date}
          voteAverage={elem.vote_average}
          id={elem.id}
        />
      </>
    ));

    const hasData = !(loading || error);
    const antIcon = <LoadingOutlined style={{ fontSize: 200 }} spin />;
    const spinner = loading ? <Spin indicator={antIcon} /> : null;
    const errorMessage = error ? (
      <Alert
        message="Error"
        description="Error!"
        type="error"
        showIcon
        closable
      />
    ) : null;
    const content = hasData ? (
      <Col span={4}>
        <div className="ant-row ant-row-space-around">
          {elements}
        </div>
      </Col>
    ) : null;
    const noResults = elements.length === 0 && !spinner?    <Alert
    message="Ooops!"
    description="Sorry, not found!"
    type="warning"
    showIcon
    closable
  /> : content

    return (
      <>
          {errorMessage}
        <Row justify="space-around" className="movies-block">
          <Input type="text"
              onChange={(event) => this.onLabelChange(event)}
              value={label}
              placeholder="Type to search..."/>
          {spinner}
          {content}
          {noResults}
        <Pagination className="pagination" defaultCurrent={page} total={500} onChange={(event) => this.onPageChange(event)} />
        </Row>
      </>
    );
  }
}
