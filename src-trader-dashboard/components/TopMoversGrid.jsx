import React, {Component} from "react";
import {connect} from "react-redux";

import {AgGridReact} from "@ag-grid-community/react";
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";

class TopMoversGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    field: 'symbol',
                    headerName: 'Symbol'
                },
                {
                    field: 'last',
                    headerName: 'Last',
                    headerClass: 'align-right',
                    cellRenderer: 'agAnimateShowChangeCellRenderer',
                    cellClass: 'align-right'
                },
                {
                    field: 'net',
                    headerName: 'Net',
                    headerClass: 'align-right',
                    cellRenderer: 'agAnimateShowChangeCellRenderer',
                    cellClass: 'align-right'
                },
                {
                    field: 'pct_net_change',
                    headerName: '% NC',
                    headerClass: 'align-right',
                    cellRenderer: 'agAnimateShowChangeCellRenderer',
                    cellClass: 'align-right',
                    sort: 'desc',
                    valueFormatter(params) {
                        return params.value.toFixed(2)
                    }
                },
            ]
        };

        // grid events
        this.onGridReady = this.onGridReady.bind(this);

        // grid callbacks
        this.getRowId = this.getRowId.bind(this);
    }

    getRowId(params) {
        return params.data.symbol;
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{height: 410, width: 400}}
                 className="ag-theme-balham">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.rowData}
                    defaultColDef={{
                        sortable: true,
                        filter: false
                    }}
                    animateRows
                    getRowId={this.getRowId}

                    modules={[ClientSideRowModelModule]}

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            rowData: state ? state.fxTopMovers : null
        }
    }
)(TopMoversGrid);
