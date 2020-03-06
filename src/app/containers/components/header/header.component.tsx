import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navigation, Account } from '../../../auth';
import { Ext } from '../../../shared';

export function Header() {

  useEffect(() => {
    Ext.afterProcessing();
  })

  return <header className="app-header navbar px-3">
    <img src={require("../../../../assets/logo.png")} style={{ width: 60 }} />
    <Link to="/" className="navbar-brand mb-0 mr-3 h1">Admin Template</Link>
    <Account />
  </header>
}