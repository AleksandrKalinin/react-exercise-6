import { Fragment, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login() {

  const [inputPassword, setInputPassword] = useState('');
  const [inputUsername, setInputUsername] = useState('');

  const updateUsername = e => setInputUsername(e.target.value);
  const updatePassword = e => setInputPassword(e.target.value);
  
  const logIn = () => {
    const user = {};
    user.name = inputUsername;
    user.password = inputPassword;
    user.id = 1;
    user.isAuthenticated = true;
    localStorage.setItem('user', JSON.stringify(user));
    window.location.pathname = `user/${user.id}`;
  }

  return (
    <Fragment>
      <div className="header">          
      </div>
      <Container>
        <Row>
          <Col md={12} lg={12} xs={12} >
            <div className="login-body">
              <div className="login-modal login">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="login-label">Email address</Form.Label>
                    <Form.Control defaultValue={inputUsername} onChange={updateUsername} type="text" placeholder="Username" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="login-label">Password</Form.Label>
                    <Form.Control defaultValue={inputPassword} onChange={updatePassword} type="password" placeholder="Password" />
                  </Form.Group>
                  <Button variant="primary" onClick = {logIn}>
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container> 
      <div className="footer">          
      </div>
    </Fragment>
  );
}

export default Login;
