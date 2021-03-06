import React from 'react';
import ReactDOM from 'react-dom';

// React Components
import { MainView } from './components/main-view/main-view';
import { MovieCard } from './components/movie-card/movie-card';
import { RegistrationView } from './components/registration-view/registration-view';
import { LoginView } from './components/login-view/login-view';

// React-Bootstrap Components
import { Container } from 'react-bootstrap';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container fluid>
        <MainView />
        {/* <RegistrationView /> */}
        {/* <LoginView /> */}
      </Container>  
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);