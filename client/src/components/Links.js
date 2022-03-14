import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/userContext';


const HomeWrapper = styled.div``;

const Collapse = styled.div.attrs({
  // className: 'collapse navbar-collapse',
})`
  @media screen and (max-width: 420px) {
    display: flex;
    flex-grow: 1;
  }
`;

const List = styled.div.attrs({
  className: 'navbar-nav mr-auto',
})`
  @media screen and (max-width: 420px) {
    flex-direction: row;
    justify-content: space-between;
    /* justify-content: flex-start; */
    width: 100%;
  }
`;

const Item = styled.div.attrs({
  // className: 'collapse navbar-collapse',
})`
  @media screen and (max-width: 420px) {
    /* margin-right: 2em; */
  }
`;

const homeStyles = {
  marginLeft: `1em`,
};


const Links = ({navBarItems}) => {
  const {userInfo} = useContext(UserContext)
  console.log(userInfo)
    return (
      <React.Fragment>
        <HomeWrapper>
          <span style={{color: 'white'}}> {userInfo.name ? 'Dr. ' + userInfo.name : ''}</span>
          <Link to="/" className="navbar-brand" style={homeStyles}>
            COVID-19 Reporting App
          </Link>
        </HomeWrapper>
        <Collapse>
          <List>
            {navBarItems.map(navBarItem => (
              <Item key={navBarItem.name}>
                <Link to={userInfo.email ? navBarItem.toPathname : '/'} className={navBarItem.className}>
                  {navBarItem.name}
                </Link>
              </Item>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    )
}

export default Links;
