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

        // if (this.props.rowData) {
        //     this.gridApi.setRowData(this.props.rowData);
        // }
        this.gridApi.sizeColumnsToFit();
    }

    // componentWillReceiveProps(nextProps) {
    //     let newRowData = nextProps.rowData;
    //     let model = this.gridApi.getModel();
    //
    //     // remove nodes not in new data set
    //     let nodesToRemove = [];
    //     for (let rowIndex = 0; rowIndex < model.getRowCount(); rowIndex++) {
    //         let rowNode = model.getRow(rowIndex);
    //         if (rowNode.data.symbol !== newRowData[rowIndex].symbol) {
    //             nodesToRemove.push(rowNode);
    //         }
    //     }
    //     this.gridApi.removeItems(nodesToRemove);
    //
    //     // add new items in set
    //     for (let rowIndex = 0; rowIndex < newRowData.length; rowIndex++) {
    //         let model = this.gridApi.getModel();
    //         let rowNode = model.getRow(rowIndex);
    //
    //         if (!rowNode ||
    //             rowNode.data.symbol !== newRowData[rowIndex].symbol) {
    //             this.gridApi.insertItemsAtIndex(rowIndex, [newRowData[rowIndex]])
    //         }
    //     }
    // }

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