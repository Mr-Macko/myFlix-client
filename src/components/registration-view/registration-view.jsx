import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container, Form, Button, FormGroup, FormControl, Card, CardGroup, Col, Row, CardBody, Navbar, NavbarBrand } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // form validation
    if (username.length < 5) return setError('Must include a username that is longer than 5 characters');
    if (password1.length < 6) return setError('Must include a password that is longer than 6 characters');
    var alphaNum = /^[0-9a-zA-Z]+$/;
    if (!username.match(alphaNum)) return setError('Username must contain only letters and numbers');

    axios.post('https://max-movie-api.herokuapp.com/users', {
      Username: username,
      Password: password1,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data)
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Registration</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder='Enter a username'
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="text"
                      value={password1}
                      onChange={e => setPassword1(e.target.value)}
                      required
                      placeholder='Enter a password'
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Re-enter password</Form.Label>
                    <Form.Control
                      type="text"
                      value={password2}
                      onChange={e => setPassword2(e.target.value)}
                      required
                      placeholder='Enter same password'
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder='Enter valid email-adress'
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button className='button' type="submit" onClick={handleSubmit}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  )
}

// prop-types
// Give informational warnings in browser if data does not match required shape
// LoginView.propTypes = {
//   onLoggedIn: PropTypes.func.isRequired
// }; 
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
};