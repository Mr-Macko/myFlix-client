import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(true, username);
  };

  return (
    <div>
      <p>Sign up for a free account:</p>
      <form>
        <label>
          Username: 
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          <span className="label-tips">5+ characters, no spaces</span>
          <br/>
        </label>
        <label>
          Enter desired password: 
          <input type="text" value={password1} onChange={e => setPassword1(e.target.value)} />
          <span className="label-tips">must not be blank</span>
          <br/>
        </label>
        <label>
          Re-enter password: <span className="label-tips">passwords must match</span>
          <input type="text" value={password2} onChange={e => setPassword2(e.target.value)} />
          <span className="label-tips">passwords must match</span>
          <br/>
        </label>
        <label>
          Email: 
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          <span className="label-tips">required</span>
          <br/>
        </label>
        <label>
          Birthday: 
          <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
          <span className="label-tips">optional</span>
          <br/>
        </label>

        <button type="submit" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  )
}

// prop-types
// Give informational warnings in browser if data does not match required shape
// LoginView.propTypes = {
//   onLoggedIn: PropTypes.func.isRequired
// }; 