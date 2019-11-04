import React, {Component} from "react";
import {connect} from "react-redux";

import {AgGridReact} from "@ag-grid-community/grid-react";

class FxQuoteMatrix extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: this.props.fxDataService.getFxMatrixHeaderNames()
        };

        // grid events
        this.onGridReady = this.onGridReady.bind(this);

        // grid callbacks
        this.getRowNodeId = this.getRowNodeId.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        if (this.props.rowData) {
            this.gridApi.setRowData(this.props.rowData)
        }
    }

    getRowNodeId(data) {
        return data.symbol;
    }

    componentWillReceiveProps(nextProps) {
        if (this.gridApi) {
            const newRowData = nextProps.rowData;

            const updatedRows = [];

            for (let i = 0; i < newRowData.length; i++) {
                let newRow = newRowData[i];
                let currentRowNode = this.gridApi.getRowNode(newRow.symbol);

                const {data} = currentRowNode;
                for (const def of this.state.columnDefs) {
                    if (data[def.field] !== newRow[def.field]) {
                        updatedRows.push(newRow);
                        break;
                    }
                }
            }


            this.gridApi.updateRowData({update: updatedRows});
        }

    }

    render() {
        return (
            <div style={{height: 410, width: 800}}
                 className="ag-theme-fresh">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    defaultColDef={{
                        sortable: false,
                        filter: false
                    }}

                    // callbacks
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
            rowData: state ? state.fxData : null
        }
    }
)(FxQuoteMatrix);
