import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter, Router, Routes, Route, Redirect } from "react-router-dom";

import { setMovies } from "../../actions/actions";

import MoviesList from '../movies-list/movies-list';

// SCSS Import
import './main-view.scss'

// react components
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { Navbar } from "../navbar/navbar";

// react bootstrap
import { Container, Navbar, NavbarBrand, Row, Nav, Col, Form, FormControl, Button } from "react-bootstrap";

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
      // selectedMovies: null
    };
  }


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  getMovies(token) {
    axios.get('https://max-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // const { movies, user } = this.state;

    let { movies } = this.props;
    let { user } = this.state;

    return (
      <BrowserRouter>
        <Navbar />
        {/* Route for MovieCard */}
        <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies}/>;
            }} />
            {/* Route for RegistrationView */}
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />
            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            {/* Route for DirectorsView */}
            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
            {/* Route for GenreView */}
            <Route path="/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
            {/* Route for ProfileView */}
            <Route path="/users/:username" render={(history) => {
              if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <ProfileView 
                  user={user}
                  setUser={(user) => this.setUser(user)}
                  movies={movies}
                  onLoggedOut={() => this.onLoggedOut()}
                  onBackClick={() => history.goBack()} 
                />
              </Col>
            }} />
        </Row>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);