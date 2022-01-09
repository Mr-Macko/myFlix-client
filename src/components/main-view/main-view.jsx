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
import { Container, Navbar, NavbarBrand, Row, Nav, Col} from "react-bootstrap";

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

    render() {
      const { movies, selectedMovie } = this.state;
  
      if (movies.length === 0) return <div className="main-view" />;
  
      return (
        <div className="main-view">

          <Navbar className='Navbar'>
            <Container>
              <NavbarBrand href='#home'>MyFlix</NavbarBrand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
              </Navbar.Collapse>
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
                <Col  md={3}>
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

