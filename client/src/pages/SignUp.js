import axios from 'axios';
import React, { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { UserContext } from '../context/userContext';

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

const SignUp = (props) => {
  const {setUserInfo} = useContext(UserContext)
  const history = useHistory()
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
      const userInfo = await api.post('/register', { name, email, password })
      setUserInfo({name, email})
      history.push('/items')
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Form>
      <Input name="name" placeholder="name" onChange={e => setName(e.target.value)} value={name} />
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
      <Button onClick={register}>Register</Button>
    </Form>
  );
};

export default SignUp;
