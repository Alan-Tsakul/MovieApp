import React, { Component } from "react";
import { Row, Col, Spin, Alert, Input, Pagination, Tabs } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import debounce from "lodash.debounce";
import MovieService from "../../services/movie-service";
import MovieCardsList from "../movie-cards-list/movie-cards-list.jsx";
import { Provider } from "../my-content/my-context";
import "./app.css";
import "antd/dist/antd.css";

export default class App extends Component {
  movieService = new MovieService();
  updatingDebounced = debounce(() => this.updateMovies(), 500);

  state = {
    movies: [],
    loading: true,
    label: "return",
    page: 1,
    sessionId: "",
    currentTab: 1,
    ratedMovies: [],
    allGenres: [],
    hasError: false,
  };

  componentDidMount() {
    const session = this.movieService.guestSessionOpen();
    session.then((data) => this.setState({ sessionId: data.guest_session_id }));
    const genres = this.movieService.getAllGenres();
    genres.then((data) =>
      this.setState({
        allGenres: data.genres,
      })
    );
  }

  componentDidUpdate(prevState) {
    if (this.state.page !== prevState.page) {
      this.updateMovies();
      this.setState({
        page: this.props.page,
      });
    }
  }

  componentWillUnmount() {
    this.updateMovies();
  }

  onLabelChange = (event) => {
    if (event.target.value === "") {
      this.setState({
        label: null,
        loading: false,
      });
    } else {
      this.setState({
        label: event.target.value,
        loading: true,
      });
      this.updatingDebounced();
    }
  };

  onPageChange = (event) => {
    this.setState({
      page: event,
    });
  };

  updateMovies() {
    const { page, label } = this.state;
    this.movieService
      .getAllMovies(label, page)
      .then((data) => {
        this.setState({
          movies: data.results,
          loading: false,
          error: false,
        });
      })
      .catch((err) => {
        this.onError(err);
      });
  }

  updateRatedMovies() {
    const { sessionId } = this.state;
    this.movieService.getRatedMovies(sessionId).then((data) => {
      this.setState({
        ratedMovies: data.results,
      });
    });
  }

  onError = (err) => {
    if (err.message === "Failed to fetch") {
      setTimeout(() => this.updateMovies(), 5000);
    }
    this.setState({ error: true, loading: false });
  };

  onTabChange = (key) => {
    this.setState({
      currentTab: key,
    });
    this.updateRatedMovies();
  };

  render() {
    const {
      movies,
      loading,
      error,
      label,
      page,
      ratedMovies,
      sessionId,
      allGenres,
    } = this.state;

    const hasData = !(loading || error);
    const antIcon = <LoadingOutlined style={{ fontSize: 100 }} />;
    const spinner = loading ? (
      <Spin indicator={antIcon} className="spinner" />
    ) : null;

    const errorMessage = error ? (
      <Alert
        message="Error"
        description="Error!"
        type="error"
        showIcon
        closable
      />
    ) : null;

    const content =
      movies.length !== 0 && hasData && !spinner ? (
        <>
          <Col span={4}>
            <MovieCardsList
              arr={movies}
              sessionId={sessionId}
              onError={this.onError}
            />
          </Col>
          <Pagination
            className="pagination tabs-movies"
            defaultCurrent={page}
            total={50}
            onChange={(event) => this.onPageChange(event)}
          />
        </>
      ) : null;

    const ratedContent =
      ratedMovies.length !== 0 && hasData && !spinner ? (
        <Col span={4}>
          <MovieCardsList
            arr={ratedMovies}
            sessionId={sessionId}
            allGenres={allGenres}
          />
        </Col>
      ) : null;

    const visibleContent =
      movies.length === 0 && !spinner ? (
        <Alert
          message="Ooops!"
          description="Sorry, not found!"
          type="warning"
          showIcon
          closable
        />
      ) : (
        content
      );

    const input = (
      <Input
        type="text"
        onChange={(event) => this.onLabelChange(event)}
        value={label}
        placeholder="Type to search..."
      />
    );

    const { TabPane } = Tabs;

    return (
      <Provider value={allGenres}>
        <div className="pages-container">
          {errorMessage}
          <Row>
            <Tabs
              defaultActiveKey="1"
              className="tabs-movies"
              onChange={this.onTabChange}
            >
              <TabPane tab="Search" key="1">
                {input}
                {spinner}
                {visibleContent}
              </TabPane>
              <TabPane tab="Rated" key="2">
                {spinner}
                {ratedContent}
              </TabPane>
            </Tabs>
          </Row>
        </div>
      </Provider>
    );
  }
}
