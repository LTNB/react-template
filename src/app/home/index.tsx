import React, { Fragment, useEffect, useState } from 'react';

import { AuthUser, UserInfoStore } from '../auth';
import { Ext } from '../shared';

export function Home() {
  const [userInfo, setUserInfo] = useState({} as AuthUser);

  useEffect(() => {
    UserInfoStore.fetch().subscribe(userInfo => {
      setUserInfo(userInfo);
      Ext.afterProcessing();
    });
  }, [])

  return <Fragment>
    <main className="main d-flex flex-column">
      <div className="d-flex flex-column fluid auto-scroll-y pt-3">
        <div>
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">User Information</div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-4">
                    <label>Employee ID:</label>
                    <input type="text" readOnly className="form-control" value={userInfo.employeeId} />
                  </div>
                  <div className="form-group col-4">
                    <label>Display Name:</label>
                    <input type="text" readOnly className="form-control" value={userInfo.displayName} />
                  </div>
                  <div className="form-group col-4">
                    <label>Job Title:</label>
                    <input type="text" readOnly className="form-control" value={userInfo.jobTitle} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-4">
                    <label>Email:</label>
                    <input type="text" readOnly className="form-control" value={userInfo.mail} />
                  </div>
                  <div className="form-group col-4">
                    <label>Phone Number:</label>
                    <input type="text" readOnly className="form-control" value={userInfo.mobilePhone} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Fragment>
}