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
  } from '../pages';

import { routes } from '../constants';

// Static/Stateless
import { Welcome, NavBar } from '../components';

const FrontierContainer = () => {
    let history = useHistory();
    // const {userInfo} = useContext(UserContext)
    // const {email} = userInfo
   
    return <>  <NavBar />
    <Switch>
    <Route exact path={routes.HOME} component={SignUp} />
    {/* <Redirect to={routes.ITEMS} /> */}
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