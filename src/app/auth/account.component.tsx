import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { JWT_TOKEN, httpRequest } from '../infrastructure';
import { AppCache, Ext } from '../shared';

import { AuthUser, AuthUserStore } from './auth.model';
import { Login } from './login.component';


export function Account() {
  const [currentUser, setCurrentUser] = useState(''),
    [darkMode, setDarkMode] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // AuthUserStore.load();
    AuthUserStore.data$.subscribe(user => { setCurrentUser(user.displayName); })
    const darkMode = AppCache.get('dark-mode') === 'true';
    setDarkMode(darkMode);
    toggleDarkMode(darkMode);
  }, []);

  function logout() {
    AppCache.remove(JWT_TOKEN);
    // location.reload();
    history.push('login');
  }

  function onChangeTheme() {
    let newMode = !darkMode;
    setDarkMode(newMode);
    AppCache.set('dark-mode', newMode.toString());
    toggleDarkMode(newMode);
  }

  function toggleDarkMode(darkMode: boolean) {
    Ext.toggleClass('body', 'dark-mode', darkMode);
    Ext.toggleClass('.app-header', 'navbar-dark', darkMode);
  }

  return AppCache.get(JWT_TOKEN) ? (
    <ul className="navbar-nav">
      <li className="nav-item dropdown">
        <span className="nav-link dropdown-toggle cursor-pointer" role="button" data-toggle="dropdown">
          Hi, {currentUser}
        </span>
        <div className="dropdown-menu dropdown-menu-right">
          <span className="dropdown-item d-flex flex-row cursor-pointer" onClick={() => onChangeTheme()}>
            <span className="switch switch-pill switch-success">
              <input type="checkbox" className="switch-input" readOnly checked={darkMode} />
              <span className="switch-slider"></span>
            </span>
            <span className="d-inline-block ml-2">Dark Mode</span>
          </span>
          <span className="dropdown-item cursor-pointer" onClick={() => logout()}>
            <i className="fa fa-lock"></i>Logout
        </span>
        </div>
      </li>
    </ul>
  ) : null
}