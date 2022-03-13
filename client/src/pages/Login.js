import axios from 'axios';
import React, { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { UserContext } from '../context/userContext';
import PatientForm from '../components/forms/PatientForm';

const Input = styled.input`
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  font-family: 'Open Sans';
  margin-bottom: 8px;
  width: 100%;
  box-sizing: border-box;
  height: 40px;
`;

const Form = styled.form`
    width: 100%;
    margin: auto;
    max-width: 400px;
    background: white;
    border: 1px solid #eee;
    padding: 16px;
    box-sizing: border-box;
    color: black;
    border-radius: 4px;
    .alt-text{
        text-align: center;
        margin: 10px 0;
    }
    }
`;

const Button = styled.button`
  color: white;
  background: blue;
  font-weight: bold;
  box-shadow: none;
  border: none;
  width: 100%;
  display: block;
  white-space: none;
`;

const Login = () => {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const history = useHistory()
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  if (userInfo.email) {
    history.push('/items')
  }
  const register = async e => {
    e.preventDefault();
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
      hostname: process.env.REEACT_APP_API_HOST || 'http://localhost:3000/',
      // httpsAgent: https.Agent({
      //   rejectUnauthorized: false,
      // }),
    });
    try {
      const user = await api.post('/signin', { email, password })
      setUserInfo({ email, name : user.data.user[0].name  })
      window.localStorage.setItem('name', user.data.user[0].name)
      window.localStorage.setItem('email', user.data.user[0].email)
      history.push('/items')
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Form>
      <Input
        name="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <Input
        name="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <Button onClick={register}>Login</Button>
    </Form>
  );
};

export default Login;
