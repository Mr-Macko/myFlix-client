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
    <div>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <div>
        <span>Not an account yet?? </span>
        <button type="submit" onClick={handleClickRegister}>Register</button>
      </div>
    </div>
  )
}

// prop-types
// Give informational warnings in browser if data does not match required shape
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}; 