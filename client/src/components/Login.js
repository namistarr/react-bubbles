import React, { useState } from "react";
import axios from 'axios';


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({ username:'', password:'' })

  const handleChange = (event) => {
    setCredentials({ ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
    .post('http://localhost:5000/api/login', credentials)
    .then(response => {
      //console.log(response);
      localStorage.setItem('token', response.data.payload);
      props.history.push('/bubble-page');
    })
    .catch(error => {
      console.log(error.response);
    })
    setCredentials({ username:'', password:'' })
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input
              placeholder='Username'
              type='text'
              name='username'
              value={credentials.username}
              onChange={handleChange}
            />
            <input
              placeholder='Password'
              type='password'
              name='password'
              value={credentials.password}
              onChange={handleChange}
            />     
            <button type='submit'>Login</button>     
        </form>
      </div>
    </>
  );
};

export default Login;
