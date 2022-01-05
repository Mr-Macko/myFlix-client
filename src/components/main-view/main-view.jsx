import React from "react";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, 
          Title: 'Inception', 
          Description: 'A thief steals corporate secrets using shared dreaming technology. Then he gets an order to fix an idea in the head of a CEO.', 
          ImagePath: '...',
          Genre: 'Action',
          Director: 'Christopher Nolan'
        },
        { _id: 2, 
          Title: 'The Dark Knight', 
          Description: 'When the nasty Joker brings havoc and chaos to the people of Gotham, the "Dark Knight" must undergo one of the toughest psychological tests of his ability to fight injustice.', 
          ImagePath: '',
          Genre: 'Action',
          Director: 'Christopher Nolan'
        },
        { _id: 3, 
          Title: 'In Bruges', 
          Description: 'After a failed mission, guilt-ridden hitman Ray and his partner await instructions from their ruthless boss in Bruges, the last place in the world Ray wants to be.', 
          ImagePath: '...',
          Genre: 'Drama',
          Director: 'Martin McDonagh'
        }
      ],
      selectedMovies: null
    };
  }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    render() {
      const { movies, selectedMovie } = this.state;
  
  
      if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
      return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            ))
          }
        </div>
      );
    }
}

