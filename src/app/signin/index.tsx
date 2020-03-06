import React, { Fragment, useState, useEffect } from 'react';
import { Ext } from '../shared';
import { httpRequest, JWT_TOKEN } from '../infrastructure';
import { AppCache } from '../shared';
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { AuthUser } from '../auth/auth.model';
import './signin.scss';

export function Signin() {
  // let history = useHistory();
  // async function signIn() {
  //   httpRequest<AuthUser>('/api/login', 'post').subscribe(user => {
  //     AppCache.set(JWT_TOKEN, user.token);
  //     history.push('/dashboard');
  //   })
  // }

  // useEffect(() => { 
  //   Ext.afterProcessing();
  // })

  return <Fragment>
    <main className="main d-flex justify-content-center align-items-center">
      <div className="card border-0 mb-0 card-custom">
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <img src="assets/icons/user.png" className="bg-user-icon" />
          </div>
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
          <div className="input-group mb-3">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>
          {/* <button type="button" className="btn btn-block btn-primary" onClick={signIn}>Login</button> */}
        </div>
      </div>
    </main>
  </Fragment >
}