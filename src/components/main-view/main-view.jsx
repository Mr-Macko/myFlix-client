import React from "react";
import axios from "axios";

// SCSS Import
import './main-view.scss'

// react components
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// react bootstrap
import { Container, Navbar, NavbarBrand, Row, Nav, Col, Form, FormControl, Button} from "react-bootstrap";

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovies: null
    };
  }

  componentDidMount(){
    axios.get('https://max-movie-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
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


getMovies(token) {
  axios.get('https://max-movie-api.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    // Assign the result to the state
    this.setState({
      movies: response.data
    });
  })
  .catch(function (error) {
    console.log(error);
  });
}

    render() {
      const { movies, selectedMovie } = this.state;
  
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <div className="main-view">

          <Navbar expand='lg' className='Navbar'>
            <Container>
              <NavbarBrand href='#home'>MyFlix</NavbarBrand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#profile">Profile</Nav.Link>
                  <Nav.Link href="#logout">Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
              <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search Movie"
                    className="me-2"
                    aria-label="Search"
                  />
                 <Button className='button'>Search</Button>
                </Form>
            </Container>
          </Navbar>

          {selectedMovie
            ? (
              <Row className='justify-content-md-center'>
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              </Row>
              )
            : (
              <Row className="justify-content-md-center">
                <Col md={3}>
                {movies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                ))}
                </Col>
              </Row>
            )
          }
        </div>
      );
    }
}

