import React, { Component, useContext } from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
//import '/client/src/pages/itemPatient.css';
=======
>>>>>>> 4092184e5c4d019249512df2839ad55988ed8b7a
import Links from './Links';
import { UserContext } from '../context/userContext';
import { useHistory } from 'react-router-dom';





const Container = styled.div.attrs({
  className: 'container',
})`
  max-width: 100%;
  padding-left: 0px;
  padding-right: 0px;
`;


const Nav = styled.nav.attrs({
  className: 'navbar navbar-expand-lg navbar-dark bg-dark',
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
{  userInfo.email && <button onClick={handleSignOut}>Sign out</button>
}        </Nav>
      </Container>
    );
}

export default NavBar;
