import axios from 'axios';
import React, { useState, useContext} from 'react';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components';
import { UserContext } from '../context/userContext';
import { Button } from '@mui/material';
import './SignUp.css';

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


const SignUp = (props) => {
  const {userInfo, setUserInfo} = useContext(UserContext)
  const history = useHistory()
  const [name, setName] = useState('');
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
      const user = await api.post('/register', { name, email, password })
      window.localStorage.setItem('name', user.data.user[0].name)
      window.localStorage.setItem('email', user.data.user[0].email)
      setUserInfo({ email, name : user.data.user[0].name  })
      history.push('/items')
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className='Signup'>
      <h1 className='Title-Signup'>Sign Up</h1>
    <Form>
      <div className='Form'>
      <div className='TextBoxForm'>
      <Input name="name" placeholder="Name" onChange={e => setName(e.target.value)} value={name} />
      </div>
      <div className='TextBoxForm'>
      <Input
        name="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      </div>
     <div className='TextBoxForm'>
      <Input
        name="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      </div>
      <div className='Button'>
      <Button style={{ fontWeight:"bold",  fontSize:"15px", fontFamily: '"PT Sans", sans-serif', minWidth:"100%"}} variant="contained" onClick={register}>Register</Button>
      </div>
      <p>Already Registered? <a href='/login'>Login</a> </p>
      </div>
    </Form>
    
    </div>
  );
};

export default SignUp;
