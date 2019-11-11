import React, {Component} from 'react';
import SimpleCellRenderer from './simpleCellRenderer.jsx';
import {AgGridReact} from '@ag-grid-community/react';

// for community features
import {AllModules} from "@ag-grid-enterprise/all-modules";

// for enterprise features
// import {AllModules} from "@ag-grid-enterprise/all-modules";

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
                cellRendererFramework: SimpleCellRenderer,
                width: 100
            });
        });

        return columnDefs;
    }

    render() {
        return (
            <div style={{height: '100%'}} className="ag-theme-fresh">
                <AgGridReact columnDefs={this.state.columnDefs} rowData={this.state.rowData} modules={AllModules}/>
            </div>
        );
    }

}
