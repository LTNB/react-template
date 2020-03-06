import React, { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthUserStore, NavItem } from './auth.model';

export function Navigation() {
  const [navigation, setNavigation] = useState([] as NavItem[]);

  useEffect(() => {
    AuthUserStore.data$.subscribe(user => user && setNavigation(user.navigation || []));
  }, []);

  return <ul className="navbar-nav mr-auto">
    {navigation.map((navItem: NavItem, index: number) => <li className={`nav-item px-3 ${navItem.children ? 'dropdown' : ''}`} key={index}>
      {navItem.url && <NavLink to={navItem.url} className="nav-link" activeClassName="active">
        {navItem.name}
      </NavLink>}
      {navItem.children && <Fragment>
        <span className="nav-link dropdown-toggle cursor-pointer" role="button" data-toggle="dropdown">
          {navItem.name}
        </span>
        <div className="dropdown-menu">
          {navItem.children.map((childNavItem: NavItem, childIndex: number) => <NavLink to={childNavItem.url} className="dropdown-item" activeClassName="active" key={childIndex}>
            {childNavItem.name}
          </NavLink>)}
        </div>
      </Fragment>}
    </li>)}
  </ul>
}