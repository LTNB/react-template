import { DataStore } from '../../../infrastructure';

export type Navigation = {
  id: number,
  name: string,
  to: string,
  icon?: string
}

export const NavigationStore = new DataStore<Navigation[]>({
  proxy: { url: '/api/navigation' },
});