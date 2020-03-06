import React, { PureComponent } from 'react';
import { GridApi, ColDef } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps, AgGridColumn } from 'ag-grid-react';
import { map, flow, difference } from 'lodash/fp';

import { Ext } from '../ext';

interface GridProps extends AgGridReactProps {
  style?: any;
  className?: string;
  action?: { [key:string]: (...params: any[]) => void };
}

export class Grid extends PureComponent<GridProps, any> {
  constructor(props: GridProps) {
    super(props);
    this.state = { context: { componentParent: this } };
  }

  render() {
    const { className = '', style = {} } = this.props;

    return <section className={`ag-theme-balham ${className}`} style={style}>
      <AgGridReact reactNext animateRows rowSelection="multiple"
          defaultColDef={gridConfig.defaultColDef}
          components={gridConfig.components} context={this.state.context}
          {...this.props} />
    </section>
  }
}

export function GridColumn(props: ColDef) {
  return <AgGridColumn {...props} />;
}

const DASH_SIGN = '&mdash;';

export const gridConfig = {
  DASH_SIGN,
  defaultColDef: {
    width: 125,
    resizable: true,
    filter: true,
    sortable: true,
  },
  components: {
    textFormat: ({ value }) => value,
    numericFormat: ({ value }) => value ? Ext.Number.format(value, 2) : DASH_SIGN,
    dateFormat: ({ value }) => value ? Ext.Date.format(value) : DASH_SIGN,
  },
  checkColumn: {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
  numberColumn: {
    type: 'numericColumn',
    filter: 'agNumberColumnFilter',
    cellRenderer: 'numericFormat',
  },
}

export function exportGridDataAsCsv(gridApi: GridApi, filename: string) {
  gridApi.exportDataAsCsv({
    fileName: `${filename}.csv`,
    onlySelected: gridApi.getSelectedRows().length > 0,
  })
}