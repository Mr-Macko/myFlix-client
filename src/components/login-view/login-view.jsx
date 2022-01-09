import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send auth request to server
    props.onLoggedIn(username);
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    console.log('handleClickRegister');
    props.toRegistrationView('');
  }
  
  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button className='button' type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

// prop-types
// Give informational warnings in browser if data does not match required shape
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}; 