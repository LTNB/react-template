import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { httpRequest, HttpParams } from './http';
import axios from 'axios'

type ProxyConfig = {
  url: string,
  method?: string,
  reader?: {
    rootProperty: string,
  },
}

export type StoreConfig = {
  proxy?: ProxyConfig,
  resolver?: (data: any, params?: HttpParams) => any,
  onError?: () => void,
}

export class DataStore<T> {
  public data$ = new ReplaySubject<T>(1);

  load = (params?: HttpParams) => this.fetch(params).subscribe(data => this.data$.next(data));
  query = (params?: HttpParams) => this.fetch(params).toPromise();
  mutate = (params?: HttpParams) => this.fetch(params).toPromise();

  constructor(protected config: StoreConfig) { }

  fetch(params?: HttpParams) {
    if (!this.config.proxy) return;
    const { proxy, resolver, onError } = this.config,
      { url, method, reader } = proxy;
    return httpRequest(url, method, params, onError)
        .pipe<T>(map(response => {
          if (!response) return null;
          let result = reader && reader.rootProperty ? response[reader.rootProperty] : response;
          resolver && (result = resolver(result, params));
          return result;
        }));
  }
}