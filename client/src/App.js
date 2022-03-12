import React, { useEffect, useState, useContext } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  Link,
  NavLink,
  useHistory,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { UserContextProvider, UserContext } from './context/userContext';
import FrontierContainer from './components/FrontierContainer';

// Constants
// import { routes } from './constants';

// Styles
import { Container, CssBaseline, ImageList, ImageListItemBar } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Static/Stateless

const App = () => {
  const history = createBrowserHistory();

  /*ADD  <Route exact path={routes.ITEM_EXAMUPDATE} component={itemExamUpdate} />
   */
  return (
    <BrowserRouter history={history}>
      <UserContextProvider>
        <CssBaseline />
        <div className="app--main">
          <div className="view-container">
            <FrontierContainer />
          </div>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
