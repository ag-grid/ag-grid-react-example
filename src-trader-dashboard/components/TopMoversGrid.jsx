import React, {Component} from "react";
import {connect} from "react-redux";

import {AgGridReact} from "ag-grid-react";

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
                    cellRenderer: 'animateShowChange',
                    cellClass: 'align-right'
                },
                {
                    field: 'net',
                    headerName: 'Net',
                    headerClass: 'align-right',
                    cellRenderer: 'animateShowChange',
                    cellClass: 'align-right'
                },
                {
                    field: 'pct_net_change',
                    headerName: '% NC',
                    headerClass: 'align-right',
                    cellRenderer: 'animateShowChange',
                    cellClass: 'align-right',
                    sort: 'desc',
                    cellFormatter(params) {
                        return params.value.toFixed(2)
                    }
                },
            ]
        };

        // grid events
        this.onGridReady = this.onGridReady.bind(this);
        this.getRowNodeId = this.getRowNodeId.bind(this);
    }

    getRowNodeId(data) {
        return data.symbol;
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    render() {
        return (
            <div style={{height: 410, width: 400}}
                 className="ag-fresh">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.rowData}
                    enableSorting="true"
                    enableFilter="false"
                    animateRows="true"
                    enableImmutableMode="true"
                    getRowNodeId={this.getRowNodeId}

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
            rowData: state.fxTopMovers
        }
    }
)(TopMoversGrid);