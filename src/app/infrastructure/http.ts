import { ajax, AjaxError } from 'rxjs/ajax';
import { map, catchError, takeUntil } from 'rxjs/operators';
import { Subject, EMPTY } from 'rxjs';
import { forEach } from 'lodash/fp';

import { Ext } from '../shared';
import { AppCache } from '../shared/cache';

export const JWT_TOKEN = 'jwtToken';

const cancelPendingRequestSubject: Subject<void> = new Subject<void>();
export const cancelPendingRequest = () => cancelPendingRequestSubject.next();

export type HttpParams = {
  pathParams?: { [key: string]: any },
  queryParams?: { [key: string]: any },
  body?: any;
}

export function httpRequest<T>(url: string, method: string = 'get', params?: HttpParams, onError = () => { Ext.afterProcessing() }) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    'timeout': '0',
  },
    token = AppCache.get(JWT_TOKEN);

  if (token) { headers['Authorization'] = token; }

  if (params && params.pathParams) {
    forEach(([key, value]) => url = url.replace(`${key}`, value))(Object.entries(params.pathParams));
  }

  if (params && params.queryParams) {
    url = `${url}?${Ext.Object.toQueryString(params.queryParams)}`;
  }

  Ext.beforeProcessing();

  return ajax({ url, method, headers, body: (params || {}).body, timeout: 0 })
    .pipe(takeUntil(cancelPendingRequestSubject))
    .pipe(catchError((reason: AjaxError) => {
      const { xhr } = reason;
      Ext.alertError(`Http failure response for ${xhr.responseURL}: ${xhr.status} ${xhr.statusText}`);
      onError();

      return EMPTY;
    }))
    .pipe(map(response => response.response as T));
}