import React from 'react';
import PropTypes from 'prop-types'; 

//SCSS Import
import './movie-card.scss'

// react-bootstrap components
import { Button, Card, CardGroup, CardImg, Col, Row } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className='button'>Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};