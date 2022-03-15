import React, {useContext, useEffect} from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import {
    ItemInsert,
    Items,
    ItemUpdate,
    itemPatientExam,
    // itemExamUpdate,
    ItemInfo,
    SignUp,
    Login,

  } from '../pages';

import { routes } from '../constants';

// Static/Stateless
import { Welcome, NavBar } from '../components';
import NewNavBar from '../components/NewNavBar'
import PatientForm from './forms/PatientForm';

const FrontierContainer = () => {
    let history = useHistory();
    
    return <>  
    <NewNavBar/>
    <Switch>
    <Route exact path={routes.SIGN_UP} component={SignUp} />
  
    <Route exact path={routes.LOG_IN} component={Login} />
    <Route exact path={routes.ITEM_UPDATE} component={PatientForm} />
    <Route exact path={routes.ITEM_INFO} component={ItemInfo} />
    <Route exact path={routes.HOME} component={Welcome} />
    <Route exact path={routes.ITEMS} component={Items} />
    <Route exact path={`${routes.ITEMS}/items-plain`} component={Items} />
    <Route exact path={`${routes.ITEMS}/react-table-v6`} component={Items} />
    <Route exact path={routes.ITEM_INFO} component={ItemInfo} />
    <Route exact path={routes.ITEM_INSERT} component={ItemInsert} />
    <Route exact path={routes.ITEM_UPDATE} component={ItemInsert} />
    <Route exact path={routes.ITEM_PATIENTEXAM} component={itemPatientExam} />
  </Switch>
  </>
}

export default FrontierContainer
