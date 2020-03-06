import React, { useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';

import { Ext } from '../ext';

const dateFormat = Ext.dateInputFormat.replace('YYYY', 'yyyy').replace('DD', 'dd'),
      className = 'form-control form-control-sm text-center rounded-0';

export function DateComponent(props: ReactDatePickerProps) {
  const { selected, onChange } = props;

  return <DatePicker dateFormat={dateFormat} popperPlacement="bottom-end"
      selected={selected} onChange={onChange} {...props} />
}

export function DatePickerComponent(props: { logDate: Date, onClick: (checkDate: string) => void }) {
  const [logDate, setLogDate] = useState(props.logDate);

  return <section className="input-group input-group-sm">
    <div className="input-group-prepend">
      <span className="input-group-text"><i className="fa fa-calendar" /></span>
    </div>
    <DateComponent className={className} selected={logDate} onChange={date => setLogDate(date)} />
    <div className="input-group-append">
      <button type="button" className="btn btn-primary" onClick={() => props.onClick(Ext.Date.format(logDate))}>
        Apply
      </button>
    </div>
  </section>
}

export function DateRange(props: { startDate: Date, endDate: Date, onClick: (startDate: string, endDate: string) => void }) {
  const [startDate, setStartDate] = useState(props.startDate),
        [endDate, setEndDate] = useState(props.endDate);

  return <section className="input-group input-group-sm">
    <div className="input-group-prepend">
      <span className="input-group-text"><i className="fa fa-calendar" /></span>
    </div>
    <DateComponent className={className} selected={startDate} onChange={date => setStartDate(date)} />
    <DateComponent className={className} selected={endDate} onChange={date => setEndDate(date)} />
    <div className="input-group-append">
      <button type="button" className="btn btn-primary" onClick={() => props.onClick(Ext.Date.format(startDate), Ext.Date.format(endDate))}>
        Apply
      </button>
    </div>
  </section>
}

