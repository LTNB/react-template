import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ext } from '../../../shared';
import { Navigation, NavigationStore } from './sidebar.model';
import { Layout, Menu, Icon } from 'antd';


export function SideBar(props) {
  const handleClickMenu = key => {
    const navigations = props.navigations.map(oneNav => {
      oneNav.key === key ? oneNav.active = true : oneNav.active = false;
      return oneNav
    })
    props.onChange(navigations)
  }

  return <div className="sidebar">
    {props.navigations.map(oneNav => <Link key={oneNav.key} to={oneNav.path} className={oneNav.active === true ? 'active': ''} onClick={() => handleClickMenu(oneNav.key)}>
      <Icon type={oneNav.icon} style={{paddingRight: 6}}/>
      <span>{oneNav.name}</span>
    </Link>
    )}
  </div>
}