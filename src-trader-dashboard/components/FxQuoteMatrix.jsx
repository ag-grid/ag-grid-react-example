import React, {Component} from "react";
import {connect} from "react-redux";

import {AgGridReact} from "ag-grid-react";

import assign from "lodash/assign";
import uniq from "lodash/uniq";

class FxQuoteMatrix extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: this.props.fxDataService.getFxMatrixHeaderNames()
        };

        // grid events
        this.onGridReady = this.onGridReady.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
    }

    componentDidMount() {
        this.gridApi.setRowData(this.props.rowData);
    }

    componentWillReceiveProps(nextProps) {
        const newRowData = nextProps.rowData;

        const updatedNodes = [];
        const updatedCols = [];

        for (let i = 0; i < newRowData.length; i++) {
            // note that for this use case we assume the existing and new row data have the same
            // row and column order
            let node = this.gridApi.getModel().getRow(i);
            let newRow = newRowData[i];

            const {data} = node;
            let updated = false;
            for (const def of this.state.columnDefs) {
                if (data[def.field] !== newRow[def.field]) {
                    updatedCols.push(def.field);

                    updated = true;
                }
            }
            if(updated) {
                assign(data, newRow);
                updatedNodes.push(node);
            }
        }

        this.gridApi.refreshCells(updatedNodes, uniq(updatedCols));
    }

    render() {
        return (
            <div style={{height: 410, width: 800}}
                 className="ag-fresh">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    enableSorting="false"
                    enableFilter="false"

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
            rowData: state.fxData
        }
    }
)(FxQuoteMatrix);