import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./registrationPage.scss";
import Layout from "../../Layout";
import axios from 'axios';
import {useNavigate} from "react-router";
import routes from "../../routing/routes";

const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/registration', null,
        {params: {username: username, password: password, email: email}})
        .then(() => {
          navigate(routes.index)
        })
        .catch(() => {
          setError("Niekde nastala chyba, skúste to znova :(");
        });
  };

  return (
      <Layout>
        <div className="registration-page">
          <div className="content-container">
            <Form onSubmit={handleSubmit}>
              <h2 className="form-header">Registrácia</h2>
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
              <Form.Group size="lg" controlId="email" className="form-group-section">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  Registrovať sa
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Layout>
  );
}

export default RegistrationPage;