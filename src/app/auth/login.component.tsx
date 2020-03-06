import React from 'react';

import { httpRequest, JWT_TOKEN } from '../infrastructure';
import { AppCache } from '../shared';

import { AuthUser } from './auth.model';

export function Login() {
  async function login() {
    httpRequest<AuthUser>('/api/login', 'post').subscribe(user => {
      AppCache.set(JWT_TOKEN, user.token);
      location.reload();
    })
  }

  return <ul className="navbar-nav">
    <li className="nav-item dropdown">
      <span className="nav-link dropdown-toggle cursor-pointer" role="button" data-toggle="dropdown">Login</span>
      <div className="dropdown-menu dropdown-menu-right login-form">
        <div className="card border-0 mb-0">
          <div className="card-body">
            <p className="text-muted">Sign in to your account</p>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-user" /></div>
              </div>
              <input type="text" className="form-control" placeholder="Username" />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fa fa-lock" /></div>
              </div>
              <input type="password" className="form-control" placeholder="Password" />
            </div>
            <button type="button" className="btn btn-block btn-primary" onClick={login}>Login</button>
          </div>
        </div>
      </div>
    </li>
  </ul>
}