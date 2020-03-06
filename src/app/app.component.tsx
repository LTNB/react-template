import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { Signin } from './signin';
import { UserManagement } from './containers/pages/user/index';
import { Ext } from './shared';
import { SideBar } from './containers/components/sideBar';
import { Header } from './containers/components/header';
import { Footer } from './containers/components/footer';
import { httpRequest, JWT_TOKEN } from './infrastructure'

const routes = [
  {
    key: 1,
    path: '/',
    active: false,
    icon: 'user',
    name: 'User management',
    contentComponent: () => <UserManagement />
  },
  {
    key: 2,
    path: 'login',
    active: false,
    contentComponent: () => <Signin />
  }
]

export function App() {
  const [navigations, setNavigations] = useState([]);
  const [token, setToken] = useState('ok');
  useEffect(() => { loadNavigation() }, []);
  
  function loadNavigation() {
    setNavigations(routes);
    Ext.afterProcessing();
  }

  return <React.Fragment>
    <Router>
      {token ? (
        <>
         <Header />
        <div className="app-body position-relative">
          <SideBar navigations={navigations} onChange={newRoutes => setNavigations(newRoutes)}/>
          <div className="content">
            {navigations.map(oneRoute => (
              <Route
                key={oneRoute.key}
                path={oneRoute.path}
                exact={oneRoute.exact}
                component={oneRoute.contentComponent}
              />
            ))}
            <Redirect to='/' />
          </div>
        </div>
        <Footer />
        </>
      ) : (
        <>
        <Route path={'/login'} exact={true} component={Signin} />
        <Redirect to='/login' />
        </>
      )}
     
    </Router>
  </React.Fragment >
}