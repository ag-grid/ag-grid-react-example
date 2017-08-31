import React, {Component} from "react";

import {AgGridReact} from "ag-grid-react";
import {connect} from "react-redux";

import PriceRenderer from "./PriceRenderer";

/*
 * This component serves to display the row data (provided by redux)
 */
class GridComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: 'Symbol', field: 'symbol'},
                {headerName: 'Price', field: 'price', cellClass: 'align-right', cellRendererFramework: PriceRenderer}
            ]
        };

        this.onGridReady = this.onGridReady.bind(this);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    // row data will be provided via redux on this.props.rowData
    render() {
        return (
            <div style={{height: 400, width: 945, marginTop: 15}}
                 className="ag-fresh">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}
                    rowData={this.props.rowData}

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        )
    }
}

// pull off row data changes
export default connect(
    (state) => {
        return {
            rowData: state.rowData
        }
    }
)(GridComponent);