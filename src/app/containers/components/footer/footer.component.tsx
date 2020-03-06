import React, { useEffect } from 'react';
import { Ext } from '../../../shared';
import pkg from '../../../../../package.json';

export function Footer() {

  useEffect(() => {
    Ext.afterProcessing();
  })

  return <footer className="app-footer">
    <div className="mr-auto">2020 &copy; lam.tangocbao</div>
    <div>v{pkg.version}</div>
  </footer>
}