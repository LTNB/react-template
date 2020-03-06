import $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import * as dateFns from 'date-fns';
import toastr from 'toastr';
import { map, reduce } from 'lodash/fp';

//region ===== Configuration =====
toastr.options.closeButton = true;
toastr.options.preventDuplicates = true;
toastr.options.positionClass = 'toast-bottom-right';
//endregion

export class Ext {
  static dateInputFormat = 'yyyy-MM-dd';
  static guid = (prefix: string = '', suffix: string = '') => `${prefix}${(Math.random() * (1<<30)).toString(16).replace('.', '')}${suffix}`;
  static isEmpty = (value: any) => value == null || value === '' || (Ext.isArray(value) && value.length === 0);
  static isNotEmpty = (value: any) => !Ext.isEmpty(value);
  static isArray = (value: any) => toString.call(value) === '[object Array]';

  static alertInfo = (message: string) => toastr.info(message, 'Information');
  static alertSuccess = (message: string) => toastr.success(message, 'Success');
  static alertWarning = (message: string) => toastr.warning(message, 'Warning');
  static alertError = (message: string) => toastr.error(message, 'Error');

  static getEl = (selector: string) => $(selector);
  static toggleClass = (selector: string, className: string, state: boolean) => $(selector).toggleClass(className, state);
  static triggerEvent = (selector: string, eventType: string) => $(selector).trigger(eventType);
  static beforeProcessing = () => $('#app-splash-screen').fadeIn();
  static afterProcessing = () => $('#app-splash-screen').fadeOut();
  static showModal = (selector: string, onShow?: () => void, onHide?: () => void) => {
    $(selector).modal('show');
    onShow && $(selector).on('shown.bs.modal', onShow);
    onHide && $(selector).on('hide.bs.modal', onHide);
  }
  static hideModal = (selector: string, onHide?: () => void) => {
    $(selector).modal('hide');
    onHide && $(selector).on('hide.bs.modal', onHide);
  }


  static sleepAsync = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  static readFileAsTextAsync = (file: File): Promise<string> => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file.'));
      }
      reader.onload = () => resolve(reader.result as string);
      reader.readAsText(file);
    })
  }

  static exportToCsv = (data: any[], columnNames: string[], fileName?: string, lineDelimiter: string = '\r\n', columnDelimiter: string = ',') => {
    if (!data || !data.length) return;

    let csvContent = `${columnNames.map(name => `"${name}"`).join(columnDelimiter)}${lineDelimiter}`;

    csvContent += map(
      row => map((name: string) => `"${row[name] || ''}"`)(columnNames).join(columnDelimiter)
    )(data).join(lineDelimiter);

    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(new Blob([csvContent],{type: 'text/csv;charset=utf-8;'})));
    link.setAttribute('download', fileName || 'export.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  }

  static Number = {
    format: (value: number = 0, decimal: number = 0) => (value || 0).toLocaleString('en', { maximumFractionDigits: decimal }),
    parse: (value: string) => parseInt(value, 10),
  }


  static Date = {
    format: (date: number | Date = new Date(), pattern: string = 'YYYYMMDDHHmmssSSS') => dateFns.format(date, pattern),
    parse: (dateString: string) => dateString ? dateFns.parseISO(dateString) : new Date(),
  }

  static String = {
    isNotBlank: (value: string) => value !== undefined && value !== null && value.trim() !== '',
  }

  static Object = {
    fromQueryString: (queryString: string) => {
      queryString = queryString.replace('?', '');
      return reduce((queryParams, paramStr: string) => {
        const param = paramStr.split('=');
        queryParams[param[0]] = param[1];
        return queryParams;
      }, {})(queryString.split('&'));
    },
    toQueryString: (queryParams: { [key:string]: any }) => {
      return map(([key, value]) => `${key}=${value}`)(Object.entries(queryParams)).join('&');
    },
    deepClone: (o: any) => JSON.parse(JSON.stringify(o)),
    isEmpty: (o: any) => {
      for (let key in o) {
        if (o.hasOwnProperty(key)) {
          return false;
        }
      }

      return true;
    },
  }

  static Array = {
    toDisplayName: (list: any[], fieldName: string) => map(item => item[fieldName])(list).join(','),
  }
}