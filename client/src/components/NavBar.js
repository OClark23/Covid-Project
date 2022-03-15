import React, { Component, useContext } from 'react';
import styled from 'styled-components';
import Links from './Links';
import { UserContext } from '../context/userContext';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';




const Container = styled.div.attrs({
  className: 'container',
})`
  max-width: 100%;
  padding-left: 0px;
  padding-right: 0px;
`;


const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-white',
})`
  margin-bottom: 20px;

  @media screen and (min-width: 992px) {
    padding: 0.5em 25%;
  }
`;

const navBarItems = [
  {
    //name: 'Items',
    name:'Exams',
    toPathname: '/items',
    className: 'nav-link',
  },
  {
    //name: 'Create Item',
    name:'Add Exam',
    toPathname: '/item/create',
    className: 'nav-link',
  },
];

const NavBar = () =>   {
  const {userInfo, setUserInfo} = useContext(UserContext)
  let history = useHistory()
  const handleSignOut = () => {
  localStorage.removeItem('name', 'email');
  setUserInfo({name: '', email: ''})
  history.push('/')
  }
   return (
      <Container>
        <Nav>
          <Links navBarItems={userInfo.email ? navBarItems : []} />
{  userInfo.email && <Button color="inherit" onClick={handleSignOut}>Sign out</Button>
}        </Nav>
      </Container>
    );
}

export default NavBar;
