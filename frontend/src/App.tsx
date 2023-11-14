import { useState, useEffect } from 'react'
 import './App.css'
// 
import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// 
axios.defaults.xsrfCookieName = 'csrf-token';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  // baseURL: 'http://localhost:8000'
  baseURL: 'http://127.0.0.1:8000'
});



function App() {
  // App funstional components
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

useEffect(() =>{
  client.get("/")
  .then(function(res) {
    setCurrentUser(true);
  })
  .catch(function(err) {
    setCurrentUser(false);
  })
}, []);


  // toggle function
function update_form_btn() {
    if (registrationToggle){
      document.getElementById("form_btn").innerHTML = "Register New User";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Login";
      setRegistrationToggle(true);
    }
  }

// handler for logins
function submitRegistration(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  client.post(
    "signup",
    {
      username:username,
      password:password,
      email:email,
    }
  );
}

function submitLogin(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  client.post(
    "login",
    {
      username:username,
      password:password, 
    }
  ).then(function(res) {
    setCurrentUser(true);
  });
}

function submitLogout(e: React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  client.post(
    "logout",
    {withCredentials: true}
  ).then(function(res) {
    setCurrentUser(false);
  });
}


 
if (currentUser) {
   return (
    <>
      <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>React-Bootstrap Django APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Form onSubmit={(e) => submitLogout(e)}>
                  <Button type='submit' variant='light'>Log out</Button>
                </Form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <h2>Welcome {username}</h2>
        <h3>Your password is {password}</h3>
        <h3>Your email is {email}</h3>
        {/* <h3>Your token is {token}</h3> */}
    </>
  );
}
// Else for no user

return (
 
  <div>
    <Navbar expand="lg" fixed="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>React-Bootstrap And Django Rest API APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant='light'>Register New User
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>


    {
      registrationToggle ? (
      <div className='center'>
          <Form onSubmit={e => submitRegistration(e)}>
          {/* <Form>  */}
            <h2>User Registration Panel</h2>
            <Form.Group className='mb-3' controlId="formBasicEmail">
               <Form.Control type="email" placeholder="Enter email address"
              value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId="formBasicText">
               <Form.Control type="text" placeholder="Enter Username"
              value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId="formBasicText">
               <Form.Control type="password" placeholder="Enter Password"
              value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Register User
            </Button>
           </Form>
           </div>
      ) : (
        
        <Form onSubmit={e => submitLogin(e)}>
          {/* <Form>  */}
          <h2>Login user panel</h2>
            <Form.Group className='mb-3' controlId="formBasicEmail">
               <Form.Control type="text" placeholder="Enter Username"
              value={username} onChange={e => setUsername(e.target.value)} />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId="formBasicText">
               <Form.Control type="password" placeholder="Enter Password"
              value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Login Now
            </Button>
           </Form>
      )
    }
  </div>
 
);
}

export default App
