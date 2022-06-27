import React, {Component} from 'react';
import SimpleCellRenderer from './simpleCellRenderer.jsx';
import {AgGridReact} from '@ag-grid-community/react';

import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {ExcelExportModule} from "@ag-grid-enterprise/excel-export";
import {FiltersToolPanelModule} from "@ag-grid-enterprise/filter-tool-panel";
import {SparklinesModule} from "@ag-grid-enterprise/sparklines";
import {GridChartsModule} from "@ag-grid-enterprise/charts";
import {MasterDetailModule} from "@ag-grid-enterprise/master-detail";
import {MenuModule} from "@ag-grid-enterprise/menu";
import {MultiFilterModule} from "@ag-grid-enterprise/multi-filter";
import {RangeSelectionModule} from "@ag-grid-enterprise/range-selection";
import {RichSelectModule} from "@ag-grid-enterprise/rich-select";
import {RowGroupingModule} from "@ag-grid-enterprise/row-grouping";
import {ServerSideRowModelModule} from "@ag-grid-enterprise/server-side-row-model";
import {SetFilterModule} from "@ag-grid-enterprise/set-filter";
import {SideBarModule} from "@ag-grid-enterprise/side-bar";
import {StatusBarModule} from "@ag-grid-enterprise/status-bar";
import {ViewportRowModelModule} from "@ag-grid-enterprise/viewport-row-model";
import {ClipboardModule} from "@ag-grid-enterprise/clipboard";

export default class MyApp extends Component {

    constructor() {
        super();

        this.createColumnNames();

        this.state = {
            columnDefs: this.createColumnDefs(),
            rowData: this.createRowData()
        };
    }

    createColumnNames() {
        // creates column names by iterating the alphabet twice, eg {'aa','ab','ac',.....'zz'}
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        this.columnNames = [];
        alphabet.forEach(letter1 => {
            alphabet.forEach(letter2 => {
                this.columnNames.push(letter1 + letter2);
            });
        });
    }

    createRowData() {
        const rowData = [];

        for (let i = 0; i < 1000; i++) {
            const item = {};
            this.columnNames.forEach(colName => {
                item[colName] = '(' + colName.toUpperCase() + ',' + i + ')'
            });
            rowData.push(item);
        }

        return rowData;
    }

    createColumnDefs() {
        const columnDefs = [];

        this.columnNames.forEach(colName => {
            columnDefs.push({
                headerName: colName.toUpperCase(),
                field: colName,
                cellRenderer: SimpleCellRenderer,
                width: 100
            });
        });

        return columnDefs;
    }

    render() {
        return (
            <div style={{height: '100%'}} className="ag-theme-balham">
                <AgGridReact columnDefs={this.state.columnDefs} rowData={this.state.rowData} modules={[
                    ClientSideRowModelModule,
                    ColumnsToolPanelModule,
                    ExcelExportModule,
                    FiltersToolPanelModule,
                    SparklinesModule,
                    GridChartsModule,
                    MasterDetailModule,
                    MenuModule,
                    MultiFilterModule,
                    RangeSelectionModule,
                    RichSelectModule,
                    RowGroupingModule,
                    ServerSideRowModelModule,
                    SetFilterModule,
                    SideBarModule,
                    StatusBarModule,
                    ViewportRowModelModule,
                    ClipboardModule
                ]}/>
            </div>
        );
    }

}
