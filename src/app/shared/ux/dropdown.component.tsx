import React, { useState } from 'react';
import $ from 'jquery';
import { findIndex, filter, remove, map } from 'lodash/fp';

$(document).on('click', '.dropdown-multi-select .dropdown-menu', e => e.stopPropagation());

type DropdownProps = {
  options: any[];
  displayField?: string;
  valueField?: string;
  multiple?: boolean;
  defaultText?: string;
  separator?: string;
  smartButtonText?: boolean;
  rightAligned?: boolean;
  searchBox?: boolean;
  buttonClass?: string;
  buttonStyle?: any;
  value: any[];
  valueChange: (value: any[]) => void;
  className?: string;
}

export function Dropdown(props: DropdownProps) {
  const [searchFilter, setSearchFilter] = useState('');

  const {
    options,
    displayField = 'name',
    valueField = 'value',
    multiple = false,
    defaultText = 'Select',
    separator = ': ',
    smartButtonText = true,
    rightAligned = false,
    searchBox = true,
    buttonClass = '',
    buttonStyle = {},
    value,
    valueChange,
    className = '',
  } = props;

  function displayText() {
    if (!smartButtonText || !value.length) {
      return defaultText;
    }

    const names = map(item => item[displayField])(value).join(',');
    return `${defaultText}${separator}${names}`;
  }

  function isSelected(opt: any) {
    return findIndex(item => item[valueField] === opt[valueField])(value) > -1;
  }

  function select(opt: any) {
    let newValue = value;
    if (!multiple) {
      newValue = [opt];
    } else if (isSelected(opt)) {
      newValue = remove(item => item[valueField] === opt[valueField])(value);
    } else {
      newValue = filter(item => isSelected(item) || item[valueField] === opt[valueField])(options);
    }
    valueChange(newValue);
  }
  return <div className={`dropdown ${multiple ? 'dropdown-multi-select' : ''} ${className}`}>
    <button className={`btn btn-sm btn-outline-secondary dropdown-toggle border ${buttonClass}`} style={buttonStyle} type="button" data-toggle="dropdown">
      {displayText()}
    </button>
    <div className={`dropdown-menu p-0 ${rightAligned ? 'dropdown-menu-right' : ''}`}>
      {searchBox && <div className="p-1 border-bottom">
        <input type="text" className="form-control form-control-sm" name="searchFilter" placeholder="Search..."
            value={searchFilter} onChange={event => setSearchFilter(event.target.value)} />
      </div>}
      <div className="dropdown-item-list">
        {options.map(opt => {
          return <span className={`dropdown-item ${isSelected(opt) ? 'active': ''}`} key={opt[valueField]}
              onClick={() => select(opt)}>
            {opt[displayField]}
          </span>
        })}
      </div>
    </div>
  </div>
}