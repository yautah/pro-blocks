import React from 'react';
import {Route, Switch, Redirect} from 'umi'


import List from './list'
import New from './new'
import Edit from './edit'

const Layout = ({ children }) => {
  return (
    <>
    <Switch>
      <Route key="list" path="/ROUTE_PATH/list" component={List} exact={true} />
      <Route key="new" path="/ROUTE_PATH/new" component={New} exact={true} />
      <Route key="edit" path="/ROUTE_PATH/edit/:id" component={Edit} exact={true} />

      <Redirect exact path="/ROUTE_PATH" to="/ROUTE_PATH/list" />
    </Switch>
    </>
  )

};

export default Layout;
