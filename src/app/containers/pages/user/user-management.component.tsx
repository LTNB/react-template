import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import { Ext } from '../../../shared';
import { Grid, GridColumn, Dialog, Dropdown } from '../../../shared/ux';
import { User, UserError, UserStore } from './user.model';
import { httpRequest, HttpParams } from '../../../infrastructure';

import axios from 'axios';

export function UserManagement() {
  const [users, setUsers] = useState([] as User[]);
  const [usersChange, setUsersChange] = useState([] as User[]);

  useEffect(() => { loadUsers() }, [])

  async function loadUsers() {
    Ext.beforeProcessing()
    const data = await axios.get('http://5e57c75d4c695f0014330085.mockapi.io/api/user');
    setUsers(data.data);
    Ext.afterProcessing();
  }

  async function addNewUser(user: User) {
    const params = { body: user } as HttpParams;
    const newUser = await axios.post(
      'http://192.168.0.104:8000/api/user',
      { user }
    );
    Ext.afterProcessing();
    // if (newUser) {
    //   setUsers(() => [...users, newUser]);
    //   Ext.hideModal('#user-creation-dialog');
    // }
  }

  const handleUsersChange = params => {
    setUsersChange((prev: User[]) => {
      const index = _.findIndex(prev, item => item.id === params.data.id);
      if (index > -1) {
        return [..._.slice(prev, 0, index), params.data, ..._.slice(prev, index + 1)];
      } else {
        return [...prev, { ...params.data, [params.column.colId]: params.newValue }];
      }
    });
  }

  return <Fragment>
    <main className="main d-flex flex-column">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">Administration</li>
        <li className="breadcrumb-item">Management</li>
        <li className="breadcrumb-item">User</li>
      </ol>
      <div className="d-flex flex-column fluid p-3">
        <div className="card fluid mb-0">
          <div className="card-header d-flex">
            User
          <div className="ml-auto">
              <button type="button" className="btn btn-sm btn-danger mr-2">
                <i className="fa fa-check mr-1" />Deactivate User
            </button>
              <button type="button" className="btn btn-sm btn-secondary mr-2" onClick={() => Ext.showModal('#user-creation-dialog')}>
                <i className="fa fa-plus mr-1" />Create New User
            </button>
              <button type="button" className="btn btn-sm btn-success">
                <i className="fa fa-download mr-1" />Export
            </button>
            </div>
          </div>
          <div className="card-footer text-muted">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Full name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(user => <tr key={user.id} >
                    <td>{user.email}</td>
                    <td>{user.full_name}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="btn btn-light mr-1"><i className="fa fa-eye"/></button>
                      <button className="btn btn-light mr-1"><i className="fa fa-pencil"/></button>
                      <button className="btn btn-light"><i className="fa fa-trash"/></button>
                    </td>
                  </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
    <UserCreationDialog addNewUser={addNewUser} />
  </Fragment>
}

function UserCreationDialog(props: { addNewUser: (User: User) => void }) {
  const [email, setEmail] = useState('');
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState({} as UserError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const options = [
    { name: 'ROLE_ADMIN', value: 'ROLE_ADMIN' },
    { name: 'ROLE_MO', value: 'ROLE_MO' },
    { name: 'ROLE_DEV', value: 'ROLE_DEV' }
  ];
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      postNewUser();
    }
  }, [errors]);

  const postNewUser = () => {
    // props.addNewUser({ email, active });
    setEmail('');
    setActive(false)
  }

  const handleAddUser = () => {
    setErrors(validate());
    setIsSubmitting(true);
  }

  const validate = () => {
    let errors = {};
    if (!email) {
      errors['mail'] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors['mail'] = 'Email is invalid';
    }
    // if (roles.length === 0) {
    //   errors['role'] = 'At least a role for a user';
    // }
    return errors;
  }

  // const onRoleChange = value => {
  //   setRoles([...value]);
  //   if (roles.length === 0) {
  //     setErrors({ ...errors, role: '' });
  //   }
  // }

  return <Dialog id="user-creation-dialog" title="User Creation Dialog">
    <div className="form-group row">
      <label className="col-4 col-form-label text-right">Email:</label>
      <div className="col-8">
        <input
          type="email"
          className={`form-control ${errors.email && 'is-error'}`}
          value={email || ''}
          onChange={event => setEmail(event.target.value)}
          onFocus={() => setErrors({ ...errors, email: '' })}
          required
        />
        {errors.email ? <p className="err-msg">{errors.email}</p> : null}
      </div>
    </div>
    {/* <div className="form-group row">
      <label className="col-4 col-form-label text-right">Role:</label>
      <div className="col-8">
        <Dropdown
          options={options}
          multiple
          value={roles || []}
          valueChange={value => onRoleChange(value)}
          buttonClass={`${errors.role && 'is-error'}`}
        />
        {errors.role ? <p className="err-msg">{errors.role}</p> : null}
      </div>
    </div> */}
    <div className="d-flex justify-content-end">
      <button type="button" className="btn btn-sm btn-secondary mr-1" data-dismiss="modal">Close</button>
      <button type="button" className="btn btn-sm btn-primary" onClick={handleAddUser}>Create</button>
    </div>
  </Dialog>
}

function ActionRenderer(props: { data: User, context: any }) {
  const { data } = props,
    { componentParent } = props.context,
    { updateUser, removeUser } = componentParent.props.action;

  return <Fragment>
    <span className="text-primary cursor-pointer mr-2" onClick={() => updateUser(data)}>Update</span>
    <span className="text-primary cursor-pointer ml-2" onClick={() => removeUser(data)}>Delete</span>
  </Fragment>
}