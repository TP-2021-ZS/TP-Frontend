import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./loginPage.scss";
import Layout from "../../Layout";
import axios from 'axios';
import parseJwt from "../../components/helpers/parseJwt";
import routes from "../../routing/routes";
import {useNavigate} from "react-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/login", {
      method: 'POST',
      body: JSON.stringify({username: username, password: password})
    })
        .then(res => {
          const jwtToken = res.headers.get('Authorization');

          if (jwtToken !== null) {
            let jwtParsed = parseJwt(jwtToken);
            localStorage.setItem("jwt", jwtToken);
            localStorage.setItem("username", jwtParsed.sub);
            localStorage.setItem("role", jwtParsed.role);

            axios.get('/api/user', {
              headers: {
                Authorization: localStorage.getItem("jwt"),
              }
            })
                .then((response) => localStorage.setItem("email",
                    response.data.email))
                .catch((error) => console.log(error));

            navigate(routes.index);
          } else {
            setError(
                'Nesprávne prihlasovacie údaje!')
          }
        })
        .catch(error => {
          setError(error.response.data)
        })
  };

  return (
      <Layout>
        <div className="login-page">
          <div className="content-container">
            <Form onSubmit={handleSubmit}>
              <h2 className="form-header">Prihlásenie</h2>
              <small className="error-message">{error}</small>
              <Form.Group size="lg" controlId="username" className="form-group-section">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password" className="form-group-section">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button size="lg" type="submit" disabled={!validateForm()}>
                  Prihlásiť sa
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Layout>
  );
}

export default LoginPage;