import React from 'react';
import {reactCellRendererFactory} from 'ag-grid-react';
import SimpleCellRenderer from './simpleCellRenderer.jsx';

import {AgGridReact} from 'ag-grid-react';

// put this line in to use ag-Grid enterprise
// import 'ag-grid-enterprise';

export default class MyApp extends React.Component {

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
        var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        this.columnNames = [];
        alphabet.forEach( letter1 => {
            alphabet.forEach( letter2 => {
                this.columnNames.push(letter1 + letter2);
            });
        });
    }

    createRowData() {
        var rowData = [];

        for (var i = 0; i<1000; i++) {
            var item = {};
            this.columnNames.forEach( colName => {
                item[colName] = '('+colName.toUpperCase()+','+i+')'
            });
            rowData.push(item);
        }

        return rowData;
    }

    createColumnDefs() {
        var columnDefs = [];

        // pass in the parent component to use for React component to the cellRenderer.
        // this is optional. if missing, then react router will not work.
        var cellRenderer = reactCellRendererFactory(SimpleCellRenderer, this);

        this.columnNames.forEach( colName => {
            columnDefs.push({
                headerName: colName.toUpperCase(),
                field: colName,
                cellRenderer: cellRenderer,
                width: 100
            });
        });

        return columnDefs;
    }

    render() {
        return (
            <div style={{height: '100%'}} className="ag-fresh">
                    <AgGridReact columnDefs={this.state.columnDefs} rowData={this.state.rowData} />
            </div>
        );
    }

}
