import { DataStore } from '../../../infrastructure';

export type User = {
  id?: number,
  email: string,
  role: string,
  full_name?: string,
  password?: string,
  active: boolean,
  created_at?: number,
  created_by?: string,
  updated_at?: number,
  updated_by?: string,
}

export type UserError = {
  email?: string,
  userName?: string,
  role?: string
}

export const UserStore = new DataStore<User[]>({
  proxy: { url: 'http://192.168.0.104:8000/api/user', method: 'get' },
})

// export const UserStorePost = new DataStore<User>({
//   proxy: { url: '/api/users', method: 'post' }
// })

// export const UserStoreUpdate = new DataStore<User>({
//   proxy: { url: '/api/users/id', method: 'put' }
// })