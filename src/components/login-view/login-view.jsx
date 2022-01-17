import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// react-bootstrap components
import { Container, Form, Button, FormGroup, FormControl, Card, CardGroup, Col, Row, Navbar, NavbarBrand} from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://max-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    console.log('handleClickRegister');
    props.toRegistrationView('');
  }

  return (
    <Container>

      <Navbar expand='lg' className='Navbar'>
        <Container fluid>
          <NavbarBrand href='#home'>MyFlix</NavbarBrand>
        </Container>
      </Navbar>

      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Login</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={e => setPassword(e.target.value)} />
                  </Form.Group>

                  <Button className='button' type="submit" onClick={handleSubmit}>Submit</Button>

                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

// prop-types
// Give informational warnings in browser if data does not match required shape
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}; 